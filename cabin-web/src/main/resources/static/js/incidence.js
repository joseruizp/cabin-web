headquarters 	= [];
services		= [];
incidences		= [];
incidenceValidation = "";

$(document).ready(function() {
       
        /*Initialize validation divs*/
		incidenceValidation = $("#incidenceValidation");
		/*Initialize validation divs*/
		
		/*Fill arrays*/
        fillArrayHeadquarters();
		fillArrayServices();
		fillArrayIncidences();
		/*Fill arrays*/
        
        $('#incidenceTbl').DataTable({			
			scrollY: 300,
		    paging: true,
			ordering: true,
			searching: true,
			bLengthChange: false,
			bInfo: false,
			language: {
			    search: "Buscar Incidencia: ",
			    zeroRecords: "No se encontró registros",			     
			    emptyTable: "No hay datos disponibles",
			    paginate: {
			        "first":      "Primero",
			        "last":       "Último",
			        "next":       "Siguiente",
			        "previous":   "Anterior"
			    }
			},
		});
            
        
      //Incidence save - update
		$( "#form-incidencia" ).submit(function( event ) {
			event.preventDefault();
			if ( addIncedence() ){
				
				var incidenceId = $("#incidenceId").attr("value");
				if (incidenceId !== ""){
					fnOpenEditDialog();
				}
				else{
					saveIncidence();
					console.log("Save incidencia");
				}
			}
		});
		
		
});

function fillArrayServices(){
    var length = services.length;
    services.splice(0, length);
    var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allServices/";
    var line = "";
    var ulService = $("#service");
    $.ajax({
        url:strUrl,
        crossDomain: true,
        dataType: "json",
        success: function (json) {
            $.each(json, function(index, value) {            	
            	services.push({
                    id: value.id,
                    name: value.name,                    
                });
            	line += "<li><a href='/' onclick='return false;'>"+value.name+"</a></li>";
            });            
        },        
        error: function (xhr, status) {
            console.log("Error, su solicitud no pudo ser atendida");
        },
        complete: function(){
        	ulService.html(line);	    	
	    	var serviceHtml =  $("#service li a");	    	
	    	$(serviceHtml).parents(".dropdown").find('.btn').html(services[0].name +' <span class="caret"></span>');
	    	$(serviceHtml).parents(".dropdown").find('.btn').val(services[0].id);
        }
    });    
}


function fillArrayHeadquarters(){
    var length = headquarters.length;
    headquarters.splice(0, length);
    var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allHeadquartersActives/";
    var line = "";
    var ulHeadquarter = $("#headquarter");
    $.ajax({
        url:strUrl,
        crossDomain: true,
        dataType: "json",
        success: function (json) {
            $.each(json, function(index, value) {            	
            	headquarters.push({
                    id: value.id,
                    name: value.name,                    
                });
            	line += "<li><a href='/' onclick='return false;'>"+value.name+"</a></li>";
            });            
        },        
        error: function (xhr, status) {
            console.log("Error, su solicitud no pudo ser atendida");
        },
        complete: function(){
        	ulHeadquarter.html(line);	    	
	    	var headquarterHtml =  $("#headquarter li a");	    	
	    	$(headquarterHtml).parents(".dropdown").find('.btn').html(headquarters[0].name +' <span class="caret"></span>');
	    	$(headquarterHtml).parents(".dropdown").find('.btn').val(headquarters[0].id);
        }
    });    
}

function fillArrayIncidences(){
    var length = incidences.length;
    var employeeId = $("#employeeId").attr("value");
    incidences.splice(0, length);
    var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/incidencesByEmployee";    
    $.ajax({
        url:strUrl,
        crossDomain: true,
        data: {id: employeeId},
        dataType: "json",
        success: function (json) {
            $.each(json, function(index, value) {            	
            	incidences.push({
                    id: value.id,
                    amount: value.amount,
                    date: value.date,
                    headquarter: value.headquarter.name,
                    service: value.service.name,
                    work: value.work,
                });            	
            });            
        },        
        error: function (xhr, status) {
            console.log("Error, su solicitud no pudo ser atendida");
        },
        complete: function(){
    		/*Fill incidence table*/
    		fillIncidenceTbl();
    		/*Fill incidence table*/

        }
    });    
}



/*Start select actions*/
$(document).on("click", "#headquarter li a", function(){
	console.log("Entro aqui: " + $(this).text() );
	var headquarter = $(this).text();
	headquarter = headquarter.toLowerCase();
	$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	  //Correr el arreglo para ver cual es el id y nombre del headquarter
	var length = headquarters.length;
	for ( i = 0; i< length ; i++){
		if (headquarter == headquarters[i].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(headquarters[i].id);}
	}	
} )
$(document).on("click", "#service li a", function(){
	console.log("Entro aqui: " + $(this).text() );
	var service = $(this).text();
	service = service.toLowerCase();
	$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	  //Correr el arreglo para ver cual es el id y nombre del nivel
	var length = services.length;
	for ( i = 0; i< length ; i++){
		if (service == services[i].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(services[i].id);}
	}	
} )
/*End select actions*/


/*Start validation*/
function trim(cadena){
	// USO: Devuelve un string como el parámetro cadena pero quitando los espacios en blanco de los bordes.
	var retorno=cadena.replace(/^\s+/g,'');
	retorno=retorno.replace(/\s+$/g,'');
	return retorno;
}

setTimeout(function() {
      $(".alert").hide(1000);
      $(".alert").find("label").remove();
},10000);

function updateTips( t, div ) {
	div
    .text( t )
    .show(1000);
  setTimeout(function() {
	 div.hide(1000);
  }, 5000 );
}

function checkRequired( o, n, min, div) {
	var field = o.val();
	field = trim(field);
	if ( field.length < min ) {
		o.addClass( "ui-state-error" );
		updateTips( n, div );
		return false;
	} else {
		return true;
	}
}

function checkRegexp( o, regexp, n, div ) {
	var field = o.val();
	field = trim(field);
	if ( !( regexp.test( field ) ) ) {
		o.addClass( "ui-state-error" );
		updateTips( n, div );
		return false;
	} else {
		return true;
	}
}

function addIncedence() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
			
	var headquarterHtml = $("#headquarter li a");		
	headquarterHtml = $(headquarterHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( headquarterHtml, "Debe seleccionar una sede.",1, incidenceValidation);
	var serviceHtml = $("#service li a");		
	serviceHtml = $(serviceHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( serviceHtml, "Debe seleccionar una sede.",1, incidenceValidation);
	valid = valid && checkRegexp( $("#amount"), /^[0-9]\d{0,3}$/i, "La cantidad ingresada no es válida" , incidenceValidation);
	valid = valid && checkRequired( $("#work"), "Debe ingresar el trabajo realizado.",1, incidenceValidation);
	valid = valid && checkRegexp( $("#work"), /.+/i, "El texto del trabajo realizado no es válido.",  incidenceValidation);	
	
	return valid;
}
/*End validation*/


function fnOpenEditDialog() {
    $("#dialog-confirm").html("¿Está seguro que desea actualizar la información?");
    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Actualizar Registro",
        height: 200,
        width: 400,
        //dialogClass: 'ui-dialog ui-dialog-content',
        dialogClass: "ui-dialog",
        buttons: {
	         "1": 
	         { text:"Sí", click: function () {
	            	$(this).dialog('close'); 
                	saveIncidence();	                
	            }, "class":"btn btn-default",
	         },
	         "2":
	         { text: "No", click: function () {                	
	                $(this).dialog('close');                
	            }, "class":"btn btn-default"
	         }
        },
        open: function() { $(".ui-dialog :button").blur(); }
    });
}


/*Start Fill Incidence Table*/
function fillIncidenceTbl(){
	var size = incidences.length;
	var j = 0;
	var t = $('#incidenceTbl').DataTable();	
	t.clear();
	for(i=0; i<size;i++){
		work = incidences[i].work;
		work = work.substring(0,50);
		t.row.add( [
				incidences[i].date,
				incidences[i].headquarter,				
	            incidences[i].service,
	            incidences[i].amount,
	            work,
	            "<a onclick='editIncidence("+ incidences[i].id +","+ i+")'><i class='fa fa-pencil icons' title='Editar'></i></a>"	            
	    ] ).draw( false );
	};
}
/*End Fill Incidence Table*/

/*Start CRUD Incidence*/
function editIncidence(code, index) {
    var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/incidence";
    $.ajax({
        url:strUrl,
        crossDomain: true,
        data: {id: code},
        dataType: "json",
        success: function (json) {
        	$( "#work" ).val(json.work);
        	$( "#amount " ).val(json.amount);       
        	$("#incidenceId").attr('value', json.id);
	    	var serviceHtml =  $("#service li a");	    	
	    	$(serviceHtml).parents(".dropdown").find('.btn').html(json.service.name +' <span class="caret"></span>');
	    	$(serviceHtml).parents(".dropdown").find('.btn').val(json.service.id);	    		    	
	    	var headquarterHtml =  $("#headquarter li a");	    	
	    	$(headquarterHtml).parents(".dropdown").find('.btn').html(json.headquarter.name +' <span class="caret"></span>');
	    	$(headquarterHtml).parents(".dropdown").find('.btn').val(json.headquarter.id);
	    	$("#incidenceBtn").html("Actualizar Incidencia");
        },        
        error: function (xhr, status) {
            console.log("Error, su solicitud no pudo ser atendida");
        }
    });  
}

function saveIncidence(){
	var incidendeId = $("#incidenceId").attr("value");
	var employeeId = $("#employeeId").attr("value");
	console.log("Inside form-incidence " + incidendeId);
	var incidence = {}; 
	
	incidence.employee = {};
	incidence.service = {};
	incidence.headquarter = {};
	
	incidence.work = trim( $( "#work" ).val() );
	incidence.amount = trim( $( "#amount" ).val() );	
	
	var headquarterHtml = $("#headquarter li a");
	var serviceHtml = $("#service li a");
	
	var headquarterId = $(headquarterHtml).parents(".dropdown").find('.btn').val();
	var serviceId = $(serviceHtml).parents(".dropdown").find('.btn').val();			
	
	$( "#work" ).val(""); $( "#amount" ).val("");	
	
	$(headquarterHtml).parents(".dropdown").find('.btn').html( headquarters[0].name + '<span class="caret"></span>');
	$(headquarterHtml).parents(".dropdown").find('.btn').val( headquarters[0].id );	   
	$(serviceHtml).parents(".dropdown").find('.btn').html( services[0].name + '<span class="caret"></span>');
	$(serviceHtml).parents(".dropdown").find('.btn').val( services[0].id );	
	
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/post/incidence";
	
	incidence.employee.id = employeeId;
	incidence.service.id = serviceId;
	incidence.headquarter.id = headquarterId;
	
	if (incidendeId !== "") {
		incidence.id = incidendeId;
	}					
	
	console.log(JSON.stringify(incidence));
	
	$.ajax({
		async: false,
		type: "POST",
	    url:strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(incidence), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a incidence into DB");			    	
	    	if (incidendeId != ""){
	    		$("#incidenceBtn").html("Nueva Incidencia");
	    		$("#incidenceId").attr("value", "");
	    		updateTips("Incidencia actualizada satisfactoriamente.", incidenceValidation);
	    	}
	    	else
	    		updateTips("Incidencia creada satisfactoriamente.", incidenceValidation);
	    	fillArrayIncidences();	    	
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
}


/*End CRUD Incidence*/