/* Author:WebThemez
 * Author URI:http://webthemez.com
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 */
estados = []; tipo_doc = []; perfiles = []; 
operarios = []; clientes = [];
sedes = []; sedeIndex = -1;
tarifas = []; tarifaIndex = -1;
tariffDetails = []; tariffDetailIndex = -1;
reglas = []; reglaIndex = -1;
niveles = []; nivelIndex = -1;
premios = []; premioIndex = -1;
experiences = []; experienceIndex = -1;
sedeValidation = ""; tarifaValidation = "";
reglaValidation = ""; nivelValidation = "";
premioValidation = ""; clienteValidation = "";
empleadoValidation = ""; clienteIndex = -1;
daysTarifa = []; empleados = []; empleadoIndex = -1;
map = {
        "Lun" : 0,
        "Mar" : 1,
        "Mie" : 2,
        "Jue" : 3,
        "Vie" : 4,
        "Sab" : 5,
        "Dom" : 6,
};

(function($){
	$(document).ready(function(){
		$(".input-group.date").datepicker({
		    format: "dd/mm/yyyy",
		    startDate: "01/01/1900", 
		    language: "es",
		    autoclose: true,
		    todayHighlight: true
		 });	
		$('.input-group.date').datepicker('setDate',"01/01/2000");
		
		$("#genderCustomer li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var gender = $(this).text();
			if (gender.toLowerCase() == "male" ){ $(this).parents(".dropdown").find('.btn').val("M");}
			else{ $(this).parents(".dropdown").find('.btn').val("F"); }
		});
		$("#genderEmployee li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var gender = $(this).text();
			if (gender.toLowerCase() == "male" ){ $(this).parents(".dropdown").find('.btn').val("M");}
			else{ $(this).parents(".dropdown").find('.btn').val("F"); }
		});
		//Initialize validation divs
		sedeValidation = $("#sedeValidation");
		tarifaValidation = $("#tarifaValidation");
		reglaValidation = $("#reglaValidation");
		nivelValidation = $("#nivelValidation");
		premioValidation = $("#premioValidation");
		clienteValidation = $("#clienteValidation");
		empleadoValidation = $("#empleadoValidation");		
		//Select
		$("#status li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var status = $(this).text();
			if (status.toLowerCase() == estados[0].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(estados[0].id);}
			else{ $(this).parents(".dropdown").find('.btn').val(estados[1].id); }
		});
		$("#statusCustomer li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var status = $(this).text();
			if (status.toLowerCase() == estados[0].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(estados[0].id);}
			else{ $(this).parents(".dropdown").find('.btn').val(estados[1].id); }
		});
		$("#statusEmployee li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var status = $(this).text();
			if (status.toLowerCase() == estados[0].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(estados[0].id);}
			else{ $(this).parents(".dropdown").find('.btn').val(estados[1].id); }
		});
		$("#experience_status li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var status = $(this).text();
			if (status.toLowerCase() == estados[0].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(estados[0].id);}
			else{ $(this).parents(".dropdown").find('.btn').val(estados[1].id); }
		});
		
		$('#sedeTbl').DataTable({			
			scrollY: 300,
		    paging: false,
			ordering: true,
			searching: false,
			bLengthChange: false,
			bInfo: false,
		});
		$('#tarifaTbl').DataTable({
			scrollY: 300,
		    paging: false,
			ordering: true,
			searching: false,
			bLengthChange: false,
			bInfo: false
		});
		$('#tarifaDetailTbl').DataTable({
			scrollY: 300,
		    paging: false,
			ordering: true,
			searching: false,
			bLengthChange: false,
			bInfo: false,
			columnDefs: [
			             { width: '20%', targets: 1 }
			         ],
			fixedColumns: true
		});
		$('#reglaTbl').DataTable({
			scrollY: 300,
		    paging: false,
			ordering: true,
			searching: false,
			bLengthChange: false,
			bInfo: false,
		});
		$('#nivelTbl').DataTable({
			scrollY: 300,
		    paging: false,
		    ordering: true,
		    searching: false,
			bLengthChange: false,
			bInfo: false,
		});
		$('#premioTbl').DataTable({
		    pscrollY: 300,
		    paging: false,
		    ordering: true,
		    searching: false,
			bLengthChange: false,
			bInfo: false,
		});
		$('#clienteTbl').DataTable({			
			scrollY: 300,
		    paging: false,
			ordering: true,
			searching: false,
			bLengthChange: false,
			bInfo: false,
		});
		$('#empleadoTbl').DataTable({			
			scrollY: 300,
		    paging: false,
			ordering: true,
			searching: false,
			bLengthChange: false,
			bInfo: false,
		});
		$('#experienceTbl').DataTable({
		    pscrollY: 300,
		    paging: false,
		    ordering: true,
		    searching: false,
			bLengthChange: false,
			bInfo: false,
		});
		fillArraySede();
		fillArrayTarifa();
		fillArrayRegla();
		fillArrayNivel();
		fillArrayPremio();
		fillStatus();
		fillDocTypes();
		fillProfiles();
		fillOperarios();
		fillArrayCliente();
		fillArrayEmpleado();		
		fillArrayExperience();
		//Sede save - update
		$( "#form-sede" ).submit(function( event ) {
			event.preventDefault();
			if ( addSede() ){
				var idSede = $("#idSede").attr("value");
				if (idSede !== ""){
					fnOpenEditDialog(1);
				}
				else{
					saveSede();
				}
			}
		});
		//Tarifa save - update
		$( "#btnTarifa" ).on('click', function( event ) {
			event.preventDefault();
			if ( addTarifa() ){
				var idTarifa = $("#idTarifa").attr("value");
				if (idTarifa !== ""){
					fnOpenEditDialog(2);
				}
				else{
					saveTarifa();
				}
			}
			
		});
		//Regla puntuacion save - update
		$( "#form-regla" ).submit(function( event ) {
			event.preventDefault();
			if ( addRegla() ){
				var idRegla = $("#idRegla").attr("value");
				if (idRegla !== ""){
					fnOpenEditDialog(3);
				}
				else{
					saveRegla();
				}	
			}
		});
		//Nivel save - update
		$( "#form-nivel" ).submit(function( event ) {
			event.preventDefault();
			if ( addNivel() ){
				var idNivel = $("#idNivel").attr("value");
				if (idNivel !== ""){
					fnOpenEditDialog(4);
				}
				else{
					saveNivel();
				}	
			}
		});
		//Regla premio save - update
		$( "#form-premio" ).submit(function( event ) {
			event.preventDefault();
			if ( addPremio() ){
				var idPremio = $("#idPremio").attr("value");
				if (idPremio !== ""){
					fnOpenEditDialog(5);
				}
				else{
					savePremio();
				}
			}
		});		
		//Cliente save - update
		$( "#form-cliente" ).submit(function( event ) {
			event.preventDefault();
			if ( addCliente() ){
				var idCliente = $("#idCliente").attr("value");
				if (idCliente !== ""){
					fnOpenEditDialog(6);
				}
				else{
					saveCliente();
				}
			}
		});
		//Empleado save - update
		$( "#form-empleado" ).submit(function( event ) {
			event.preventDefault();
			if ( addEmpleado() ){
				var idEmpleado = $("#idEmpleado").attr("value");
				if (idEmpleado !== ""){
					fnOpenEditDialog(7);
				}
				else{
					saveEmpleado();
				}
			}
		});
		
		$( "#form-experience" ).submit(function( event ) {
			event.preventDefault();
			if ( addExperience() ){
				var idExperience = $("#idExperience").attr("value");
				if (idExperience !== ""){
					fnOpenEditDialog(8);
				}
				else{
					saveExperience();
				}	
			}
		});
		
		 $( '.checkboxTarifa' ).on( 'click', function( event ) {
		    var val = $(this).val();
		    var idx = daysTarifa.indexOf( val );

		    if ( idx > -1 ) {
			    daysTarifa.splice( idx, 1 );
			} else {
			    daysTarifa.push( val );
			}
        });
		 
		 $("#btnViewTariffs").hide();
		 $("#btnViewTariffs").on('click', function(event) {
			 event.preventDefault();
			 event.stopPropagation();
			 $('#descriptionTarifa').val("");
			 $('#descriptionTarifa').prop('disabled', false);
			 $('#priceTariff').val("");
			 $('#priceTariff').prop('disabled', false);
			 $('#minFractionTariff').val("");
			 $('#minFractionTariff').prop('disabled', false);
	    	 $('#btnRangoTarifa').addClass('disabled');
			 fillArrayTarifa();
		 });
		 
		 $("#btnRangoTarifa").on('click', function(event) {
			 event.preventDefault();
			 event.stopPropagation();
			 saveTarifa();
		 });
		
	}); // End document ready
})(this.jQuery);


function insideSede ( idSede ) {
	//$("#formSede"+idSede).action = window.location.protocol + "//" + window.location.host + "/cabin-web/home/" + idSede;
	var url = window.location.protocol + "//" + window.location.host + "/cabin-web/home/" + idSede;
	$("#formSede"+idSede).attr("action", url)
	console.log( $("#formSede"+idSede).attr("action") );
	$("#formSede"+idSede).submit();
		
} 

function fillClientetbl(){
	var size = clientes.length;
	var j = 0;
    var t = $('#clienteTbl').DataTable();
    var date;
    t.clear();
	for(i=0; i<size;i++){
		if ( jQuery.type( clientes[i].birthDate ) === "date" ){ 
			var day = (clientes[i].birthDate).getDate();
			var month = (clientes[i].birthDate).getMonth() + 1;
			var monthStr = "";
			var year = (clientes[i].birthDate).getFullYear();			
			if (day.length == 1)
				day = "0"+day;
			if (month.toString().length == 1)
				monthStr = "0"+ month;
			else
				monthStr = "" + month;
			date = ""+ day +"-"+monthStr+"-"+year;
		}
		else{
			var arrayDate = clientes[i].birthDate.substring(0, 10).split("-");
			date = ""+ arrayDate[2] +"-"+arrayDate[1]+"-"+arrayDate[0];
		} 
		t.row.add( [
                clientes[i].id,
                clientes[i].name,
                clientes[i].email,
                clientes[i].gender,
                date,                
                clientes[i].balance,
                clientes[i].points,
                clientes[i].experience,
                clientes[i].estado,
                "",
                "",
        ] ).draw( false );
	};
    $('#clienteTbl > tbody  > tr').each(function() {
	    var edit = "<td><a onclick='editCliente("+ clientes[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
	    var remove = "<td><a onclick='fnOpenCloseDialog(6, "+ clientes[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";	    
	    j++; 
	    var tr = $(this);	    
	    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
    });
}

function fillEmpleadotbl(){
	var size = empleados.length;
	var j = 0;
    var t = $('#empleadoTbl').DataTable();
    var date;
    t.clear();
	for(i=0; i<size;i++){
		if ( jQuery.type( empleados[i].birthDate ) === "date" ){ 
			var day = "" + (empleados[i].birthDate).getDate();
			var month = (empleados[i].birthDate).getMonth() + 1;
			var monthStr = "";
			var year = (empleados[i].birthDate).getFullYear();			
			if (day.length == 1)
				day = "0"+day;
			if (month.toString().length == 1)
				monthStr = "0"+ month;
			else
				monthStr = "" + month;
			date = ""+ day +"-"+monthStr+"-"+year;
		}
		else{
			var arrayDate = empleados[i].birthDate.substring(0, 10).split("-");
			date = ""+ arrayDate[2] +"-"+arrayDate[1]+"-"+arrayDate[0];
		} 
		t.row.add( [
                empleados[i].id,
                empleados[i].name,
                empleados[i].email,
                empleados[i].gender,
                date,
                empleados[i].docTypeName, 
                empleados[i].docCode,
                empleados[i].perfil,
                empleados[i].estado,
                "",
                "",
        ] ).draw( false );
	};
    $('#empleadoTbl > tbody  > tr').each(function() {
	    var edit = "<td><a onclick='editEmpleado("+ empleados[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
	    var remove = "<td><a onclick='fnOpenCloseDialog(7, "+ empleados[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";	    
	    j++; 
	    var tr = $(this);	    
	    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
    });
}


function fillSedetbl(  ){
	var size = sedes.length;
	var j = 0;
    var t = $('#sedeTbl').DataTable();
    t.clear();
	for(i=0; i<size;i++){		
		t.row.add( [
                sedes[i].id,
                sedes[i].name,
                sedes[i].address,
                sedes[i].employee,
                "",
                "",
        ] ).draw( false );
	};
    $('#sedeTbl > tbody  > tr').each(function() {	    
    	var zoom = "<td><form method='POST' id='formSede"+sedes[j].id+"'><a onclick='insideSede("+ sedes[j].id +")'><i class='fa fa-search-plus icons' title='Entrar'></i></a></form></td>";
	    var edit = "<td><a onclick='editSede("+ sedes[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
	    var remove = "<td><a onclick='fnOpenCloseDialog(1, "+ sedes[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";	    
	    j++; 
	    var tr = $(this);	    
	    tr.find('td:last').after(edit); tr.find('td:last').after(remove); 
	    tr.find('td:last').after(zoom); 
	    
    });
}

function editSede( code, index ){
	var hostname = window.location.protocol + "//" + window.location.host;
	var strUrl = hostname + "/cabin-web/sede/" + code;
	sedeIndex = index;
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	var idSede = hrefArray[hrefArray.length -1];
	    	$( "#name" ).val(json.name);
			$( "#address" ).val(json.address);
			//$("#numberPcs").val(json.numberPcs);
			//$("#numberConsoles").val(json.numberConsoles);	
			$("#idSede").attr('value', idSede);
			$("#btnSede").html("Actualizar Sede");	
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
	var email, idUser;
	var strSede = hostname + "/cabin-web/sede/" + code+"/user";
	$.ajax({
		async:false,
	    url:strSede,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	idUser = hrefArray[hrefArray.length -1];
	    	email = json.name;	    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	strUrl = hostname + "/cabin-web/empleado/search/findByEmail?email=" + email;
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json._embedded.empleado, function(index, value) {
		    	var operarioHtml = $("#operario li a");
		    	$(operarioHtml).parents(".dropdown").find('.btn').html(value.name + ' <span class="caret"></span>');
		    	$(operarioHtml).parents(".dropdown").find('.btn').attr('value', idUser);	    		
	    	});
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
}

function deleteSede( code, index ){	
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/sede/" + code;	
	console.log("Inside deleteSede" + code);
	$.ajax({
		type: "DELETE",
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	sedes.splice(index, 1);
	    	fillSedetbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    	fnOpenErrorDialog();
	    }
	});
}

function saveSede(){
	var idSede = $("#idSede").attr("value");
	console.log("Inside form-tarifaDetail " + idSede);
	var sede = {};  var newSede = 1;
	sede.name = trim( $( "#name" ).val() );
	sede.address = trim( $( "#address" ).val() );			
	$( "#name" ).val("");	$( "#address" ).val("");
	var operarioHtml = $("#operario li a");	
	var idUser = $(operarioHtml).parents(".dropdown").find('.btn').val();
	$(operarioHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(operarioHtml).parents(".dropdown").find('.btn').val("");	
	//$("#numberPcs").val(""); $("#numberConsoles").val("");
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/sede";			
	if (idSede !== "") {
		strUrl += "/" + idSede;
		sede.id = idSede;
		newSede = 0;
		var length = operarios.length;
		for ( i = 0; i< length ; i++){
			if (idUser == operarios[i].id ){ sede.employee = operarios[i].name; break;}
		}		
		sedes.splice(sedeIndex, 1, sede);
		fillSedetbl();
	}						
	$.ajax({
		type: idSede === "" ? "POST" : "PATCH",
	    url:strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(sede), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a sede into DB");			    	
	    	if (idSede != ""){
	    		$("#btnSede").html("Nueva Sede");
	    		$("#idSede").attr("value", "");
	    	}
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function(xhr) {	    	
	    	var strLocation = xhr.getResponseHeader('Location');
	    	if(idSede == ""){
	    		var hrefArray = strLocation.split("/");
	    		idSede = hrefArray[hrefArray.length -1];
	    	}
	    	associateUser(idSede, idUser, newSede);
	    }
	});
}

function fillTarifatbl(  ){
	var size = tarifas.length;
	var j = 0; var startTime = ""; var endTime = "";
    var t = $('#tarifaTbl').DataTable();
    t.clear();
	for(i=0; i<size;i++){		
		t.row.add( [
                tarifas[i].id,
                tarifas[i].description,
                tarifas[i].price,                
                tarifas[i].minimumFraction,
        ] ).draw( false );
	};
    $('#tarifaTbl > tbody  > tr').each(function() {	    
    	var edit = "<td><a onclick='editTarifa("+ tarifas[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
	    var remove = "<td><a onclick='fnOpenCloseDialog(2,"+ tarifas[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
	    j++;
	    var tr = $(this);
	    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
    });
}

function fillTariffDetailstbl(  ){
	var size = tariffDetails.length;
	var j = 0; var startTime = ""; var endTime = "";
    var t = $('#tariffDetailTbl').DataTable();
    t.clear();
	for(i=0; i<size;i++){		
		if ( jQuery.type( tariffDetails[i].startTime ) === "date" ){ 
			startTime = tariffDetails[i].startTime.toString();
			startTime = startTime.substring(16, 21);
		}
		else{
			var dateStartTime = new Date(tariffDetails[i].startTime);
			startTime = dateStartTime.getHours() + ':' + dateStartTime.getMinutes();
		}
		if ( jQuery.type( tariffDetails[i].endTime ) === "date" ){ 
			endTime = tariffDetails[i].endTime.toString();
			endTime = endTime.substring(16, 21);
		}
		else{
			var dateEndTime = new Date(tariffDetails[i].endTime);
			endTime = dateEndTime.getHours() + ':' + dateEndTime.getMinutes();
		}
		t.row.add( [
                tariffDetails[i].id,
                tariffDetails[i].days,
                tariffDetails[i].price,             
                startTime,
                endTime,
                tariffDetails[i].minimumFraction,
        ] ).draw( false );
	};
    $('#tariffDetailTbl > tbody  > tr').each(function() {	    
    	var edit = "<td><a onclick='editTarifa("+ tariffDetails[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
	    var remove = "<td><a onclick='fnOpenCloseDialog(2,"+ tariffDetails[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
	    j++;
	    var tr = $(this);
	    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
    });
}

function editTarifa( code, index ){
	tarifaIndex = index;
	$(".checkboxTarifa").prop( 'checked', false );
	daysTarifa.splice(0,daysTarifa.length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/tarifa/" + code;	
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	var idTarifa = hrefArray[hrefArray.length -1];
	    	var daysArray = json.days.split("-");
	    	var length = daysArray.length;	    	
	    	for( i = 0 ; i < length; i++){
	    		$("#checkbox"+daysArray[i]).prop( 'checked', true );	    		
	    		daysTarifa.push(daysArray[i]);
	    	}
	    	$( "#price" ).val(json.price);	    	
			$( "#startTime" ).val(json.startTime.substring(11,16));
			$( "#endTime" ).val(json.endTime.substring(11,16));
			$( "#minFraction" ).val(json.minimumFraction);
			$( "#descriptionTarifa" ).val(json.description);
			$("#idTarifa").attr('value', idTarifa);
			$("#btnTarifa").html("Actualizar Tarifa");			
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});			
}

function deleteTarifa( code, index ){	
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/tarifa/" + code;	
	console.log("Inside deleteTarifa" + code);
	$.ajax({
		type: "DELETE",
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {	
	    	tarifas.splice(index, 1);
	    	fillTarifatbl();
	    },
	    error: function (xhr, status) {
	    	fnOpenErrorDialog();
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});			
}

function saveTarifa(){
	var idTarifa = $("#idTarifa").attr("value");
	var isNewRange = $("#descriptionTarifa").is(":disabled");
	console.log("Inside form-tarifaDetail " + idTarifa);
	
	var tarifa = {};
	var tariffDetail = {};
	var arrayTariffDetail = [];
	
	if (!isNewRange) {
		tarifa.description = trim( $( "#descriptionTarifa" ).val() );
		tarifa.price = trim( $( "#priceTariff" ).val() );
		tarifa.minimumFraction = trim( $( "#minFractionTariff" ).val() );
	}
	
	var length = daysTarifa.length;
	dateSort(); 
	var days = "";
	for( i = 0; i < length ; i++){
		if ( i == (length - 1) ){
			days +=  daysTarifa[i];
			break;
		}
		days +=  daysTarifa[i] + "-";
	}
	
	var timeStr = trim( $( "#startTime" ).val() ); 
	var arrayTime = timeStr.split(':'); 
	var startTime = new Date(); startTime.setHours(arrayTime[0]-5); startTime.setMinutes(arrayTime[1]);
	var endTimeStr = $( "#endTime" ).val(); 
	var arrayEndTime = endTimeStr.split(':'); 
	var endTime = new Date(); endTime.setHours(arrayEndTime[0]-5); endTime.setMinutes(arrayEndTime[1]);
	
	tariffDetail.startTime = startTime;			
	tariffDetail.endTime = endTime;
	tariffDetail.minimumFraction = trim( $( "#minFraction" ).val() );
	tariffDetail.days = days;
	tariffDetail.price =  trim( $( "#price" ).val() );
	$( "#price" ).val("");	$( "#startTime" ).val("");
	$( "#endTime" ).val("");	$( "#minFraction" ).val("");
	setTimeout( function() { $(".checkboxTarifa").prop( 'checked', false ) }, 0);
	daysTarifa.splice(0,length);
	
	arrayTariffDetail.push(tariffDetail);
	tarifa.tariffDetails = arrayTariffDetail;
	
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/post/tariff";
	if (isNewRange) {
		strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/post/tariffDetail";
		tarifa.id = idTarifa;
	} else {
		if (idTarifa !== "") {
			strUrl += "/" + idTarifa;	
			tarifa.id = idTarifa;
			tarifas.splice(tarifaIndex, 1, tarifa);
			fillTarifatbl();
		}
	}
	console.log(JSON.stringify(tarifa));
	
	
	
	$.ajax({
		type: isNewRange ? "POST" : (idTarifa === "" ? "POST" : "PATCH"),
	    url:strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(tarifa), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a tarifa into DB");
	    	$("#idTarifa").attr("value", data.id);
	    	$('#descriptionTarifa').prop('disabled', true);
	    	$('#priceTariff').prop('disabled', true);
	    	$('#minFractionTariff').prop('disabled', true);
	    	$('#btnRangoTarifa').removeClass('disabled');
	    	
	    	fillArrayTarifaDetails(data.id);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function() {
//	    	if (idTarifa == ""){
//	    		fillArrayTarifa();
//	    	}
	    }
	});	
}
function fillReglatbl(  ){
	var size = reglas.length;
	var j = 0;
    var t = $('#reglaTbl').DataTable();
    t.clear();
	for(i=0; i<size;i++){
		t.row.add( [
                reglas[i].id,
                reglas[i].name,
                reglas[i].rechargingFraction,
                reglas[i].points,                
                reglas[i].level,
                reglas[i].status,
        ] ).draw( false );
	};
    $('#reglaTbl > tbody  > tr').each(function() {	    
	    var edit = "<td><a onclick='editRegla("+ reglas[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
	    var remove = "<td><a onclick='fnOpenCloseDialog(3,"+ reglas[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
	    j++;
	    var tr = $(this);
	    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
    });
}

function editRegla( code, index ){
	reglaIndex = index;
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_puntuacion/" + code;	
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	var idRegla = hrefArray[hrefArray.length -1];
	    	$( "#nameReglaPunt" ).val(json.name);
			$( "#rechargingFraction" ).val(json.rechargingFraction);
			$( "#pointsReglaPunt" ).val(json.points);
			$("#idRegla").attr('value', idRegla);
			$("#btnRegla").html("Actualizar Regla");			
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	var strRule = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_puntuacion/"+code+"/status";
	$.ajax({
		async:false,
	    url:strRule,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	var idStat = hrefArray[hrefArray.length -1];
	    	var statusHtml = $("#status li a");
	    	$(statusHtml).parents(".dropdown").find('.btn').html(json.name + ' <span class="caret"></span>');
	    	$(statusHtml).parents(".dropdown").find('.btn').attr('value', idStat);
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	strRule = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_puntuacion/"+code+"/level";
	$.ajax({
		async:false,
	    url:strRule,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	var idLevel = hrefArray[hrefArray.length -1];
	    	var statusHtml = $("#regla_nivel");
	    	$(statusHtml).parents(".dropdown").find('.btn').html(json.name + ' <span class="caret"></span>');
	    	$(statusHtml).parents(".dropdown").find('.btn').attr('value', idLevel);
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function deleteRegla( code, index ){
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_puntuacion/" + code;	
	console.log("Inside deleteRegla" + code);
	$.ajax({
		type: "DELETE",
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	reglas.splice(index, 1);
	    	fillReglatbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    	fnOpenErrorDialog();
	    }
	});			
}

function saveRegla(){
	var idRegla = $("#idRegla").attr("value");
	console.log("Inside form-regla " + idRegla);
	var regla = {}; var newRegla = 1;
	regla.name = trim( $( "#nameReglaPunt" ).val() );
	regla.rechargingFraction = trim( $( "#rechargingFraction" ).val() );
	regla.points = trim( $( "#pointsReglaPunt" ).val() );
	var statusHtml = $("#status li a");
	var regla_nivelHtml = $("#regla_nivel li a");
	var idStatus = $(statusHtml).parents(".dropdown").find('.btn').val();			
	var idNivel = $(regla_nivelHtml).parents(".dropdown").find('.btn').val();
	$( "#nameReglaPunt" ).val(""); $( "#status" ).val("");
	$( "#rechargingFraction" ).val("");	$( "#pointsReglaPunt" ).val("");
	$(statusHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(statusHtml).parents(".dropdown").find('.btn').val("");	   
	$(regla_nivelHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(regla_nivelHtml).parents(".dropdown").find('.btn').val("");
	//$("#numberPcs").val(""); $("#numberConsoles").val("");
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_puntuacion";			
	if (idRegla !== "") {
		strUrl += "/" + idRegla;
		regla.id = idRegla; newRegla = 0;
		if( idStatus == estados[0].id)
			regla.status = estados[0].name;
		else
			regla.status = estados[1].name;				
		var length = niveles.length;
		for ( i = 0; i< length ; i++){
			if (idNivel == niveles[i].id ){ regla.level = niveles[i].name; break;}
		}
		reglas.splice(reglaIndex, 1, regla);
		fillReglatbl();
	}						 
	console.log(JSON.stringify(regla));
	$.ajax({
		async: false,
		type: idRegla === "" ? "POST" : "PATCH",
	    url:strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(regla), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a regla into DB");			    	
	    	if (idRegla != ""){
	    		$("#btnRegla").html("Nueva Regla");
	    		$("#idRegla").attr("value", "");			    		
	    	}			    	
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function(xhr) {
	    	var strLocation = xhr.getResponseHeader('Location');
	    	if(idRegla == ""){
	    		var hrefArray = strLocation.split("/");
	    		idRegla = hrefArray[hrefArray.length -1];
	    	}
	    	associateStatus(idRegla, idStatus, idNivel, newRegla);
	    }
	});
}
function fillNiveltbl(  ){
	var size = niveles.length;
    var j = 0;
    var t = $('#nivelTbl').DataTable(); t.clear();
	for(i=0; i<size;i++){
		t.row.add( [
                niveles[i].id,
                niveles[i].name,
                niveles[i].initialExperience,
                niveles[i].finalExperience,                
                niveles[i].question,
        ] ).draw( false );
	};
    $('#nivelTbl > tbody  > tr').each(function() {	    
    	var edit = "<td><a onclick='editNivel("+ niveles[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
	    var remove = "<td><a onclick='fnOpenCloseDialog(4,"+ niveles[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
	    j++;
	    var tr = $(this);
	    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
    });
}

function editNivel( code, index ){
	nivelIndex = index;
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/nivel/" + code;	
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	var idNivel = hrefArray[hrefArray.length -1];
	    	$( "#nameNivel" ).val(json.name);
			$( "#initialExperience" ).val(json.initialExperience);
			$( "#finalExperience" ).val(json.finalExperience);
			$( "#question" ).val(json.question);
			$("#idNivel").attr('value', idNivel);
			$("#btnNivel").html("Actualizar Nivel");			
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});			
}

function deleteNivel( code, index ){
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/nivel/" + code;	
	console.log("Inside deleteNivel" + code);
	$.ajax({
		type: "DELETE",
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	niveles.splice(index, 1);	    	
	    	fillNiveltbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    	fnOpenErrorDialog();
	    }
	});			
}

function saveNivel(){
	var idNivel = $("#idNivel").attr("value");
	console.log("Inside form-nivel " + idNivel);
	var nivel = {};
	nivel.name = trim( $( "#nameNivel" ).val() );
	nivel.initialExperience = trim( $( "#initialExperience" ).val() );
	nivel.finalExperience = trim( $( "#finalExperience" ).val() );
	nivel.question = trim( $( "#question" ).val() );
	$( "#nameNivel" ).val("");	$( "#initialExperience" ).val("");
	$( "#finalExperience" ).val("");	$( "#question" ).val("");			
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/nivel";			
	if (idNivel !== "") {
		strUrl += "/" + idNivel;
		nivel.id = idNivel;
		niveles.splice(nivelIndex, 1, nivel);
		nivelIndex = -1;
		fillNiveltbl();
	}		
	console.log(JSON.stringify(nivel));
	$.ajax({
		type: idNivel === "" ? "POST" : "PATCH",
	    url:strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(nivel), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a nivel into DB");			    	
	    	if (idNivel != ""){
	    		$("#btnNivel").html("Nuevo Nivel");
	    		$("#idNivel").attr("value", "");
	    	}			    	
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function() {
	    	if (idNivel == ""){
	    		fillArrayNivel();
	    	}
	    }
	});	
}
function fillPremiotbl(  ){
	var size = premios.length;	
    var j = 0;
    var t = $('#premioTbl').DataTable(); t.clear();
	for(i=0; i<size;i++){
		t.row.add( [
                premios[i].id,
                premios[i].name,
                premios[i].points,
                premios[i].balanceFraction,                
        ] ).draw( false );
	};
    $('#premioTbl > tbody  > tr').each(function() {	    
	    var edit = "<td><a onclick='editPremio("+ premios[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
	    var remove = "<td><a onclick='fnOpenCloseDialog(5,"+ premios[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
	    j++;
	    var tr = $(this);
	    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
    });
}

function editPremio( code, index ){
	premioIndex = index;
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_premio/" + code;	
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	var idPremio = hrefArray[hrefArray.length -1];
	    	$( "#namePrize" ).val(json.name);
			$( "#balanceFraction" ).val(json.balanceFraction);
			$( "#pointsPrize" ).val(json.points);			
			$("#idPremio").attr('value', idPremio);
			$("#btnPremio").html("Actualizar Premio");			
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});			
}

function deletePremio( code, index ){
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_premio/" + code;	
	console.log("Inside deletePremio" + code);
	$.ajax({
		type: "DELETE",
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {	
	    	premios.splice(index, 1);
	    	fillPremiotbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    	fnOpenErrorDialog();
	    }
	});			
}

function deleteCliente( code, index ){
	var hostname = window.location.protocol + "//" + window.location.host;
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + 2;
	var strUrlCustomer = window.location.protocol + "//" + window.location.host + "/cabin-web/cliente/"+code+"/status";
	//Solo para cliente	
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlCustomer,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado a cliente" + code);
	    	clientes[index].estado = "Inactivo";
	    	fillClientetbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }	    
	});	
	
}

function deleteEmpleado( code, index ){
	var userId = "";
	var hostname = window.location.protocol + "//" + window.location.host;
	var strUrlStatus = hostname + "/cabin-web/estado/" + 2;
	var strUrlEmployee = hostname + "/cabin-web/empleado/"+code+"/status";
	var strUrlUser = hostname + "/cabin-web/empleado/"+code+"/user";
	$.ajax({
		url:strUrlUser,
	    crossDomain: true,
	    dataType: "json",
	    async:false,
	    success: function (json) {	    
	    	var hrefArray = json._links.self.href.split("/");
	    	userId = hrefArray[hrefArray.length -1];
	    	console.log("Se va a dar de baja al usuario de codigo: " + userId);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }	    
	});	
	
	var strUrlSede = hostname + "/cabin-web/sede/search/findByUserId?userId=" + userId;
	var userInHeadquarter = 0;
	//Busca usuario en la sede para ver si se puede dar de baja o no
	$.ajax({
		async:false,
		url:strUrlSede,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	for ( var i in json)   		
	    		userInHeadquarter = 1;	    		    	   		   
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }	    
	});
	
	if (userInHeadquarter == 0){	
		$.ajax({
			async: false,
			type: "PUT",
		    url:strUrlEmployee,			
		    data: strUrlStatus, 
		    contentType: 'text/uri-list',
		    success: function (data) {
		    	console.log("Se asigno estado a empleado" + code);
		    	empleados[index].estado = "Inactivo";
		    	fillEmpleadotbl();
		    },
		    error: function (xhr, status) {	    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    }	    
		});	
	}
	else {
		updateTips( "Este operario ya se encuentra asignado a una sede, no se puede dar de baja", empleadoValidation );
	}
}

function savePremio(){
	var idPremio = $("#idPremio").attr("value");
	console.log("Inside form-premio " + idPremio);
	var premio = {};
	premio.name = trim( $( "#namePrize" ).val() );
	premio.balanceFraction = trim( $( "#balanceFraction" ).val() );
	premio.points = trim( $( "#pointsPrize" ).val() );
	$( "#namePrize" ).val(""); 
	$( "#balanceFraction" ).val("");	$( "#pointsPrize" ).val("");
	//$("#numberPcs").val(""); $("#numberConsoles").val("");
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_premio";			
	if (idPremio !== "") {	
		strUrl += "/" + idPremio;
		premio.id = idPremio;
		premios.splice(premioIndex, 1, premio);
		fillPremiotbl();
	}						
	console.log(JSON.stringify(premio));
	$.ajax({
		type: idPremio === "" ? "POST" : "PATCH",
	    url:strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(premio), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a premio into DB");			    	
	    	if (idPremio != ""){
	    		$("#btnPremio").html("Nuevo Premio");
	    		$("#idPremio").attr("value", "");			    		
	    	}			    	
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function(){
	    	if (idPremio == ""){						
				fillArrayPremio();		    	
			}
		}
	});
}
function fnOpenCloseDialog(val, code, index) {
    $("#dialog-confirm").html("¿Está seguro que desea eliminar este registro?");
    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Eliminar Registro",
        height: 200,
        width: 400,
        dialogClass: 'ui-dialog',
        buttons: {
        	 "1": 
	         { 	text:"Sí", click: function () {
	        	 	$(this).dialog('close');
	                if (val == '1'){
	                	deleteSede(code, index);
	                }else if (val == '2'){
	                	deleteTarifa(code, index);
	                }else if (val == '3'){
	                	deleteRegla(code, index);
	                }else if (val == '4'){
	                	deleteNivel(code, index);
	                }else if (val == '5'){
	                	deletePremio(code, index);
	                }else if (val == '6'){
	                	deleteCliente(code, index);
	                }else if (val == '7'){
	                	deleteEmpleado(code, index);
	                }else if (val == "8") {
	                	deleteExperience(code, index);
	                }
	                
	         	}, "class":"btn btn-default",
	        },
	        "2":
	         { text: "No", click: function () {                	
	                $(this).dialog('close');                
	            }, "class":"btn btn-default"
	         }
        }
    });
}

function fnOpenEditDialog(val) {
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
	                if (val == '1'){                	
	                	saveSede();
	                }else if (val == '2'){
	                	saveTarifa();
	                }else if (val == '3'){
	                	saveRegla();
	                }else if (val == '4'){
	                	saveNivel();
	                }else if (val == '5'){
	                	savePremio();
	                }else if (val == '6'){
	                	saveCliente();
	                }else if (val == '7'){
	                	saveEmpleado();
	                }else if (val == '8'){
	                	saveExperience();
	                }
	            }, "class":"btn btn-default",
	         },
	         "2":
	         { text: "No", click: function () {                	
	                $(this).dialog('close');                
	            }, "class":"btn btn-default"
	         }
        }
    });
}

function fnOpenErrorDialog() {
    $("#dialog-confirm").html("Este registro no se puede eliminar.");
    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Eliminar Registro",
        height: 200,
        width: 400,
        //dialogClass: 'ui-dialog ui-dialog-content',
        dialogClass: "ui-dialog",
        buttons: {
	         "1": 
	         { text:"Aceptar", click: function () {
	            	$(this).dialog('close');
	            }, "class":"btn btn-default",
	         }
        }
    });
}


function fillRule(idRegla, name, rechargingFraction, points){
	var strRule = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_puntuacion/"+idRegla+"/status";
	var status; var level;
	$.ajax({
		async:false,
	    url:strRule,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {	
	    	//var hrefArray = json._links.self.href.split("/");
	    	//idStatus = hrefArray[hrefArray.length -1];
	    	status = json.name;
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
	strRule = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_puntuacion/"+idRegla+"/level";
	$.ajax({
		async:false,
	    url:strRule,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {	
	    	//var hrefArray = json._links.self.href.split("/");
	    	//idStatus = hrefArray[hrefArray.length -1];
	    	level = json.name;
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	
	reglas.push({
		id: idRegla,
		name: name,
		rechargingFraction: rechargingFraction,
		points: points,
		status: status,	
		level: level,
	});
}

function fillCliente(idCliente, name, email, gender, birthDate, balance, points, experience){
	var hostname = window.location.protocol + "//" + window.location.host 
	var strLevel = hostname + "/cabin-web/cliente/"+idCliente+"/level";
	var level, status;
	$.ajax({
		async:false,
	    url:strLevel,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	level = json.name;
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
	var strUrl = hostname + "/cabin-web/cliente/"+idCliente+"/status";
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	status = json.name;
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	clientes.push({
		id: idCliente,
		name: name,
		email: email,
		gender: gender,
		birthDate: birthDate,
		balance: balance,
		points: points,
		experience: experience,
		level: level,
		estado: status,		
	});
}

function fillEmpleado(idEmpleado, name, email, gender, birthDate, docType, docCode, docName){
	var hostname = window.location.protocol + "//" + window.location.host 
	var level, status, profile;	
	var strUrl = hostname + "/cabin-web/empleado/"+idEmpleado+"/status";
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	status = json.name;
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	var idUser;
	strUrl = hostname + "/cabin-web/empleado/"+idEmpleado+"/user";
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	idUser = hrefArray[hrefArray.length -1];	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
	
	strUrl = hostname + "/cabin-web/usuario/"+idUser+"/profile";
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	profile = json.name;
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	
	empleados.push({
		id: idEmpleado,
		name: name,
		email: email,
		gender: gender,
		docType: docType,
		docTypeName: docName,
		docCode: docCode,
		birthDate: birthDate,
		estado: status,
		perfil: profile,		 
	});
}


function saveCliente(){
	var hostname = window.location.protocol + "//" + window.location.host;
	var idCustomer = $("#idCliente").attr("value");
	console.log("Inside form-cliente " + idCustomer);
	var customer = {};
	var user = {}; var newCliente = 1;
	customer.name = trim( $( "#nameCustomer" ).val() );
	customer.email = trim( $( "#emailCustomer" ).val() );	
	var birthDate = trim( $( "#birthDateCustomer" ).val() );
	var dateArray = birthDate.split("/");
	var date = new Date(); date.setDate(dateArray[1]);
	date.setMonth(dateArray[0] - 1); date.setFullYear(dateArray[2]);
	customer.birthDate = date;
	customer.balance = trim( $( "#balanceCustomer" ).val() );
	customer.points = trim( $( "#pointsCustomer" ).val() );;
	customer.experience = trim( $( "#experienceCustomer" ).val() );;
	user.pass = trim( $( "#passwordCustomer" ).val() );
	user.name = trim( $( "#emailCustomer" ).val() );
	$( "#nameCustomer" ).val(""); $( "#passwordCustomer" ).val("");
	$( "#confirmPasswordCustomer" ).val("");
	$( "#emailCustomer" ).val("");	$( "#birthDateCustomer" ).val("");
	$( "#balanceCustomer" ).val("");$( "#pointsCustomer" ).val("");
	$( "#experienceCustomer" ).val("");
	var genderHtml = $("#genderCustomer li a");	
	var gender = $(genderHtml).parents(".dropdown").find('.btn').val();
	customer.gender = gender;
	var statusHtml = $("#statusCustomer li a");	
	var idStatus = $(statusHtml).parents(".dropdown").find('.btn').val();
	var nivelCustomerHtml =  $("#nivelCustomer li a");	
	var idNivel= $(nivelCustomerHtml).parents(".dropdown").find('.btn').val();
	customer.gender = gender;
	$(genderHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(genderHtml).parents(".dropdown").find('.btn').val("");
	$(statusHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(statusHtml).parents(".dropdown").find('.btn').val("");
	$(nivelCustomerHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(nivelCustomerHtml).parents(".dropdown").find('.btn').val("");
	var idUser;
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/usuario";
	console.log(JSON.stringify(user));
	
	if (idCustomer !== "") {
		var strUsuario = hostname + "/cabin-web/cliente/" + idCustomer+"/user";		
		$.ajax({
			async:false,
		    url:strUsuario,
		    crossDomain: true,
		    dataType: "json",
		    success: function (json) {
		    	var hrefArray = json._links.self.href.split("/");
		    	idUser = hrefArray[hrefArray.length -1];		    	    	
		    },
		    error: function (xhr, status) {    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    }
		});	
		strUrl += "/" + idUser;	
		customer.id = idCustomer;		
		newCliente = 0;
		if( idStatus == estados[0].id){
			customer.estado = estados[0].name; console.log(customer.estado);}
		else{
			customer.estado = estados[1].name; }		
		var length = niveles.length;
		for ( i = 0; i< length ; i++){
			if (idNivel == niveles[i].id ){ customer.nivel = niveles[i].name; break;}
		}
		clientes.splice(clienteIndex, 1, customer);
		fillClientetbl();
	}		
	
	$.ajax({
		async: false,
		type: idCustomer === "" ? "POST" : "PATCH", 
	    url: strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(user), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a user into DB");
	    	$('#emailCustomer').prop('disabled', false);
	    	if (idCustomer != ""){
	    		console.log(strUrl);
	    		$("#btnCliente").html("Nuevo Cliente");
	    		$("#idCliente").attr("value", "");			    		
	    	}	
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },	 
	    complete: function(xhr) {
	    	if (idCustomer == ""){
		    	var strLocation = xhr.getResponseHeader('Location');	    	
		    	var hrefArray = strLocation.split("/");
		    	idUser = hrefArray[hrefArray.length -1];
	    	}
	    }
	});		
	strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/cliente";
	if (idCustomer !== "") {
		strUrl += "/" + idCustomer;	
	}
	console.log(JSON.stringify(customer));
	$.ajax({
		async: false,
		type: idCustomer === "" ? "POST" : "PATCH",
	    url: strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(customer), 
	    contentType: 'application/json',	    
	    success: function (data) {
	    	console.log("Send a user into DB");
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },	 
	    complete: function(xhr) {	    	
	    	if(idCustomer == ""){
	    		var strLocation = xhr.getResponseHeader('Location');
	    		var hrefArray = strLocation.split("/");
	    		idCustomer = hrefArray[hrefArray.length -1];
	    	}	    	
	    }
	});	
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + idStatus;
	var strUrlNivel = window.location.protocol + "//" + window.location.host + "/cabin-web/nivel/" + idNivel;
	var strUrlPerfil = window.location.protocol + "//" + window.location.host + "/cabin-web/perfil/" + 3;
	var strUrlUser = window.location.protocol + "//" + window.location.host + "/cabin-web/usuario/"+idUser;
	var strUrlCustomer = window.location.protocol + "//" + window.location.host + "/cabin-web/cliente/"+idCustomer+"/status";
	//Solo para cliente
	
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlCustomer,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado a cliente" + idCustomer);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function () {
	    	strUrlCustomer = window.location.protocol + "//" + window.location.host + "/cabin-web/cliente/"+idCustomer+"/level";
	    	$.ajax({
	    		async: false,
	    		type: "PUT",
	    	    url:strUrlCustomer,			
	    	    data: strUrlNivel, 
	    	    contentType: 'text/uri-list',
	    	    success: function (data) {
	    	    	console.log("Se asigno nivel a cliente " + idCustomer);
	    	    },
	    	    error: function (xhr, status) {	    	
	    	    	console.log("Error, su solicitud no pudo ser atendida");
	    	    },	    	
	    	    complete: function(xhr){
	    	    	strUrlCustomer = window.location.protocol + "//" + window.location.host + "/cabin-web/cliente/"+idCustomer+"/user";
	    	    	$.ajax({
	    	    		async: false,
	    	    		type: "PUT",
	    	    	    url:strUrlCustomer,			
	    	    	    data: strUrlUser, 
	    	    	    contentType: 'text/uri-list',
	    	    	    success: function (data) {
	    	    	    	console.log("Se asigno usuario a cliente " + idCustomer);
	    	    	    },
	    	    	    error: function (xhr, status) {	    	
	    	    	    	console.log("Error, su solicitud no pudo ser atendida");
	    	    	    },
	    	    	    complete: function(){
	    	    	    	if (newCliente == 1){			    		
	    	    	    		fillArrayCliente();
	    	    	    	}
	    	    	    }
	    	    	});
	    	    }
	    	});
	    }
	});	
	//Para usuario	
	strUrlUser = window.location.protocol + "//" + window.location.host + "/cabin-web/usuario/"+idUser+"/profile";	
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlUser,			
	    data: strUrlPerfil, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno perfil a usuario " + idUser);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function(xhr){
	    	
	    }
	});
	
}

function saveEmpleado(){
	var hostname = window.location.protocol + "//" + window.location.host;
	var idEmpleado = $("#idEmpleado").attr("value");
	console.log("Inside form-empleado " + idEmpleado);
	var employee = {};
	var user = {}; var newEmployee = 1;
	employee.name = trim( $( "#nameEmployee" ).val() );
	employee.email = trim( $( "#emailEmployee" ).val() );	
	var birthDate = trim( $( "#birthDateEmployee" ).val() );
	var dateArray = birthDate.split("/");
	var date = new Date(); date.setDate(dateArray[1]);
	date.setMonth(dateArray[0] - 1); date.setFullYear(dateArray[2]);
	employee.birthDate = date;	
	employee.docCode =  trim( $( "#docCode" ).val() );
	user.pass = trim( $( "#passwordEmployee" ).val() );
	user.name = trim( $( "#emailEmployee" ).val() );
	$( "#nameEmployee" ).val(""); $( "#passwordEmployee" ).val("");
	$( "#confirmPasswordEmployee" ).val("");
	$( "#emailEmployee" ).val("");	$( "#birthDateEmployee" ).val("");
	$( "#docCode" ).val("");
	var genderHtml = $("#genderEmployee li a");	
	var gender = $(genderHtml).parents(".dropdown").find('.btn').val();
	employee.gender = gender;
	var statusHtml = $("#statusEmployee li a");	
	var idStatus = $(statusHtml).parents(".dropdown").find('.btn').val();
	var profileHtml = $("#profileEmployee li a");	
	var idPerfil = $(profileHtml).parents(".dropdown").find('.btn').val();
	var docTypeHtml =  $("#docType li a");	
	var idDocType= $(docTypeHtml).parents(".dropdown").find('.btn').val();	
	$(genderHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(genderHtml).parents(".dropdown").find('.btn').val("");
	$(docTypeHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(docTypeHtml).parents(".dropdown").find('.btn').val("");
	$(statusHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(statusHtml).parents(".dropdown").find('.btn').val("");
	$(profileHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(profileHtml).parents(".dropdown").find('.btn').val("");
	var idUser;
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/usuario";
	console.log(JSON.stringify(user));
	
	if (idEmpleado !== "") {
		var strUsuario = hostname + "/cabin-web/empleado/" + idEmpleado+"/user";		
		$.ajax({
			async:false,
		    url:strUsuario,
		    crossDomain: true,
		    dataType: "json",
		    success: function (json) {
		    	var hrefArray = json._links.self.href.split("/");
		    	idUser = hrefArray[hrefArray.length -1];		    	    	
		    },
		    error: function (xhr, status) {    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    }
		});	
		strUrl += "/" + idUser;	
		employee.id = idEmpleado;		
		newEmployee = 0;
		if( idStatus == estados[0].id){
			employee.estado = estados[0].name; console.log(employee.estado);}
		else{
			employee.estado = estados[1].name; }		
		var length = tipo_doc.length;
		for ( i = 0; i< length ; i++){
			if (idDocType == tipo_doc[i].id ){ 
				employee.docType = tipo_doc[i].id;
				employee.docTypeName = tipo_doc[i].name; break;
			}
		}
		length = perfiles.length;
		for ( i = 0; i< length ; i++){
			if (idPerfil == perfiles[i].id ){ 
				employee.perfil =  perfiles[i].name; break;
			}
		}
		empleados.splice(empleadoIndex, 1, employee);
		fillEmpleadotbl();
	}		
	
	$.ajax({
		async: false,
		type: idEmpleado === "" ? "POST" : "PATCH", 
	    url: strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(user), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a user into DB");
	    	$('#emailEmployee').prop('disabled', false);
	    	$('#docCode').prop('disabled', false);
	    	$('#docTypeButton').removeClass('disabled');
	    	if (idEmpleado != ""){
	    		console.log(strUrl);
	    		$("#btnEmpleado").html("Nuevo Empleado");
	    		$("#idEmpleado").attr("value", "");			    		
	    	}	
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },	 
	    complete: function(xhr) {
	    	if (idEmpleado == ""){
		    	var strLocation = xhr.getResponseHeader('Location');	    	
		    	var hrefArray = strLocation.split("/");
		    	idUser = hrefArray[hrefArray.length -1];
	    	}
	    }
	});		
	strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/empleado";
	if (idEmpleado !== "") {
		strUrl += "/" + idEmpleado;	
	}
	console.log(JSON.stringify(employee));
	$.ajax({
		async: false,
		type: idEmpleado === "" ? "POST" : "PATCH",
	    url: strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(employee), 
	    contentType: 'application/json',	    
	    success: function (data) {
	    	console.log("Send a user into DB");
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },	 
	    complete: function(xhr) {	    	
	    	if(idEmpleado == ""){
	    		var strLocation = xhr.getResponseHeader('Location');
	    		var hrefArray = strLocation.split("/");
	    		idEmpleado = hrefArray[hrefArray.length -1];
	    	}	    	
	    }
	});	
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + idStatus;
	//var strUrlNivel = window.location.protocol + "//" + window.location.host + "/cabin-web/nivel/" + idNivel;
	var strUrlPerfil = window.location.protocol + "//" + window.location.host + "/cabin-web/perfil/" + idPerfil;
	var strUrlUser = window.location.protocol + "//" + window.location.host + "/cabin-web/usuario/"+idUser;
	var strUrlCustomer = window.location.protocol + "//" + window.location.host + "/cabin-web/empleado/"+idEmpleado+"/status";
	//Solo para cliente
	
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlCustomer,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado a empleado" + idEmpleado);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function(xhr){
	    	strUrlCustomer = window.location.protocol + "//" + window.location.host + "/cabin-web/empleado/"+idEmpleado+"/user";
	    	$.ajax({
	    		async: false,
	    		type: "PUT",
	    	    url:strUrlCustomer,			
	    	    data: strUrlUser, 
	    	    contentType: 'text/uri-list',
	    	    success: function (data) {
	    	    	console.log("Se asigno usuario a empleado " + idEmpleado);
	    	    },
	    	    error: function (xhr, status) {	    	
	    	    	console.log("Error, su solicitud no pudo ser atendida");
	    	    },
	    	    complete: function(){
	    	    	if (newEmployee == 1){			    		
	    	    		fillArrayEmpleado();
	    	    	}
	    	    }
    	    	
    	    });
	    }
	});	
	//Para usuario	
	strUrlUser = window.location.protocol + "//" + window.location.host + "/cabin-web/usuario/"+idUser+"/profile";	
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlUser,			
	    data: strUrlPerfil, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno perfil a usuario " + idUser);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function(xhr){
	    	
	    }
	});
	
}




function editCliente( code, index ){
	var hostname = window.location.protocol + "//" + window.location.host;
	var strUrl = hostname + "/cabin-web/cliente/" + code;
	clienteIndex = index;
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	var idCliente = hrefArray[hrefArray.length -1];
	    	$( "#nameCustomer" ).val(json.name);
			$( "#emailCustomer" ).val(json.email);
			$( "#emailCustomer" ).prop('disabled', true);
			$( "#balanceCustomer" ).val(json.balance);
			$( "#pointsCustomer" ).val(json.points);
			$( "#experienceCustomer" ).val(json.experience);
			var date = json.birthDate.substring(0,10);
			var arrayDate = date.split("-");
			var birthDate = arrayDate[2]+"/" + arrayDate[1]+"/" + arrayDate[0];
			$("#birthDateCustomer").val(birthDate);			
			$("#idCliente").attr('value', idCliente);
			$("#btnCliente").html("Actualizar Cliente");	
			var genderHtml = $("#genderCustomer li a");
			if ( json.gender == "M"){
				genderHtml.parents(".dropdown").find('.btn').html( 'Male <span class="caret"></span>');				
				genderHtml.parents(".dropdown").find('.btn').val("M");				
			}
			else{
				genderHtml.parents(".dropdown").find('.btn').html( 'Female <span class="caret"></span>');				
				genderHtml.parents(".dropdown").find('.btn').val("F");
			}
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	var email, idUser;
	var strSede = hostname + "/cabin-web/cliente/" + code+"/user";
	$.ajax({
		async:false,
	    url:strSede,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	idUser = hrefArray[hrefArray.length -1];
	    	console.log("contraseña: " + json.pass);
	    	$("#passwordCustomer").val(json.pass);	
	    	$("#confirmPasswordCustomer").val(json.pass);	    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	strSede = hostname + "/cabin-web/cliente/" + code+"/status";
	var idStatus;
	$.ajax({
		async:false,
	    url:strSede,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	idStatus = hrefArray[hrefArray.length -1];
	    	var statusHtml = $("#statusCustomer li a");			
			statusHtml.parents(".dropdown").find('.btn').html( json.name +' <span class="caret"></span>');				
			statusHtml.parents(".dropdown").find('.btn').val( idStatus);
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	strSede = hostname + "/cabin-web/cliente/" + code+"/level";
	var idLevel;
	$.ajax({
		async:false,
	    url:strSede,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	idLevel = hrefArray[hrefArray.length -1];
	    	var levelHtml = $("#nivelCustomer li a");			
	    	levelHtml.parents(".dropdown").find('.btn').html( json.name +' <span class="caret"></span>');				
	    	levelHtml.parents(".dropdown").find('.btn').val( idLevel);    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	
}


function editEmpleado( code, index ){
	var hostname = window.location.protocol + "//" + window.location.host;
	var strUrl = hostname + "/cabin-web/empleado/" + code;
	empleadoIndex = index;
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	var idEmployee = hrefArray[hrefArray.length -1];
	    	$( "#nameEmployee" ).val(json.name);
			$( "#emailEmployee" ).val(json.email);
			$( "#docCode" ).val(json.docCode);			
			var date = json.birthDate.substring(0,10);
			var arrayDate = date.split("-");
			var birthDate = arrayDate[2]+"/" + arrayDate[1]+"/" + arrayDate[0];
			$("#birthDateEmployee").val(birthDate);			
			$("#idEmpleado").attr('value', idEmployee);
			$("#btnEmpleado").html("Actualizar Empleado");	
			var genderHtml = $("#genderEmployee li a");
			if ( json.gender == "M"){
				genderHtml.parents(".dropdown").find('.btn').html( 'Male <span class="caret"></span>');				
				genderHtml.parents(".dropdown").find('.btn').val("M");				
			}
			else{
				genderHtml.parents(".dropdown").find('.btn').html( 'Female <span class="caret"></span>');				
				genderHtml.parents(".dropdown").find('.btn').val("F");
			}
			var docTypeHtml = $("#docType li a"); 
			docTypeHtml.parents(".dropdown").find('.btn').val(json.docType);
			if ( json.docType == 1){
				docTypeHtml.parents(".dropdown").find('.btn').html( 'DNI <span class="caret"></span>');
			}else if ( json.docType == 2){
				docTypeHtml.parents(".dropdown").find('.btn').html( 'RUC <span class="caret"></span>');
		    }else if ( json.docType == 3){
				docTypeHtml.parents(".dropdown").find('.btn').html( 'PASAPORTE <span class="caret"></span>');
			}else if ( json.docType == 4){
				docTypeHtml.parents(".dropdown").find('.btn').html( 'OTROS <span class="caret"></span>');	
			}
			
			$('#docTypeButton').addClass('disabled');
			$('#docCode').prop('disabled', true);
			$('#emailEmployee').prop('disabled', true);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	var email, idUser;
	var strSede = hostname + "/cabin-web/empleado/" + code+"/user";
	$.ajax({
		async:false,
	    url:strSede,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	idUser = hrefArray[hrefArray.length -1];
	    	console.log("contraseña: " + json.pass);
	    	$("#passwordEmployee").val(json.pass);	
	    	$("#confirmPasswordEmployee").val(json.pass);	    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	strSede = hostname + "/cabin-web/empleado/" + code+"/status";
	var idStatus;
	$.ajax({
		async:false,
	    url:strSede,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	idStatus = hrefArray[hrefArray.length -1];
	    	var statusHtml = $("#statusEmployee li a");			
			statusHtml.parents(".dropdown").find('.btn').html( json.name +' <span class="caret"></span>');				
			statusHtml.parents(".dropdown").find('.btn').val( idStatus);
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	strSede = hostname + "/cabin-web/usuario/" + idUser +"/profile";
	var idProfile;
	$.ajax({
		async:false,
	    url:strSede,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	idProfile = hrefArray[hrefArray.length -1];
	    	var profileHtml = $("#profileEmployee li a");			
	    	profileHtml.parents(".dropdown").find('.btn').html( json.name +' <span class="caret"></span>');				
	    	profileHtml.parents(".dropdown").find('.btn').val( idProfile );    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	
}



function fillSede(idSede, name, address){
	var hostname = window.location.protocol + "//" + window.location.host 
	var strSede = hostname + "/cabin-web/sede/"+idSede+"/user";
	var employee, email;
	$.ajax({
		async:false,
	    url:strSede,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	email = json.name;
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
	var strUrl = hostname + "/cabin-web/empleado/search/findByEmail?email=" + email;
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json._embedded.empleado, function(index, value) {	
	    		employee = value.name;
	    	});
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
	console.log("Valor del empleado: " + employee);
	sedes.push({
		id: idSede,
		name: name,
		address: address,
		employee: employee,		
	});
}



function fillArraySede(){
	var length = sedes.length;
	sedes.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/sede/";
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json._embedded.sede, function(index, value) {		    		
	    		var hrefArray = value._links.self.href.split("/");
		    	var idSede = hrefArray[hrefArray.length -1];
		    	fillSede(idSede, value.name, value.address)				
			});
	    	fillSedetbl();		    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function fillArrayCliente(){
	var length = clientes.length;
	sedes.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/cliente/";
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json._embedded.cliente, function(index, value) {		    		
	    		var hrefArray = value._links.self.href.split("/");
		    	var idCliente = hrefArray[hrefArray.length -1];
		    	fillCliente(idCliente, value.name, value.email, 
		    			value.gender, value.birthDate, value.balance, value.points, value.experience);				
			});
	    	fillClientetbl();		    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}


function fillArrayEmpleado(){
	var length = empleados.length;
	sedes.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/empleado/";
	var docName;
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json._embedded.empleado, function(index, value) {		    		
	    		var hrefArray = value._links.self.href.split("/");
		    	var idEmpleado = hrefArray[hrefArray.length -1];
		    	var length = tipo_doc.length; 
		    	for ( i = 0; i < length; i++){
		    		if ( value.docType == tipo_doc[i].id){
		    			docName = tipo_doc[i].name;
		    			break;
		    		}
		    	}
		    	fillEmpleado(idEmpleado, value.name, value.email, 
		    			value.gender, value.birthDate, value.docType, value.docCode, docName);				
			});
	    	fillEmpleadotbl();		    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}



function fillArrayTarifa(){
	$("#listaTarifasDiv").show();
	$("#listaDetailTariffDiv").hide();
	$("#btnTarifa").show();
	$("#btnViewTariffs").hide();
	var length = tarifas.length;
	tarifas.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allTariff/";		
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json, function(index, value) {		    		
				tarifas.push({
					id: value.id,
					description: value.description,
					price: value.price,
					minimumFraction: value.minimumFraction
				});
			});
	    	fillTarifatbl();
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function fillArrayTarifaDetails(idTariff){
	$("#listaTarifasDiv").hide();
	$("#listaDetailTariffDiv").show();
	$("#btnTarifa").hide();
	$("#btnViewTariffs").show();
	var length = tariffDetails.length;
	tariffDetails.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allTariffDetails/";		
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    data: {id : idTariff},
	    dataType: "json",
	    success: function (json) {
	    	$.each(json, function(index, value) {		    		
	    		tariffDetails.push({
					id: value.id,
					days: value.days,
					price: value.price,
					startTime: value.startTime,
					endTime: value.endTime,
					minimumFraction: value.minimumFraction
				});
			});
	    	fillTariffDetailstbl();
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function fillArrayRegla(){
	var length = reglas.length;
	reglas.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_puntuacion/";		
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json._embedded.regla_puntuacion, function(index, value) {		    		
	    		var hrefArray = value._links.self.href.split("/");
		    	var idRegla = hrefArray[hrefArray.length -1];
		    	var name = value.name;
				var rechargingFraction = value.rechargingFraction;
				var points = value.points;			    	
		    	fillRule(idRegla, name, rechargingFraction, points)
			});
	    	fillReglatbl();		    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function fillArrayNivel(){
	var length = niveles.length;
	niveles.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/nivel/";
	var ulRegla = $("#regla_nivel");
	var ulExperience = $("#experience_nivel");
	var ulCustomer = $("#nivelCustomer");
	var line = ""; 
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json._embedded.nivel, function(index, value) {		    		
	    		var hrefArray = value._links.self.href.split("/");
		    	var idNivel = hrefArray[hrefArray.length -1];
		    	line += "<li><a href='/' onclick='return false;'>"+value.name+"</a></li>";
				niveles.push({
					id: idNivel,
					name: value.name,
					initialExperience: value.initialExperience,
					finalExperience: value.finalExperience,
					question: value.question,
				});
			});
	    	fillNiveltbl();		    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function (){
	    	ulRegla.html(line);
	    	ulExperience.html(line);
	    	ulCustomer.html(line);
	    }
	});
}

function fillArrayPremio(){
	var length = premios.length;
	premios.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_premio/";		
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json._embedded.regla_premio, function(index, value) {		    		
	    		var hrefArray = value._links.self.href.split("/");
		    	var idPremio = hrefArray[hrefArray.length -1];			    	
				premios.push({
					id: idPremio,
					name: value.name,
					balanceFraction: value.balanceFraction,
					points: value.points,
				});
			});
	    	fillPremiotbl();		    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function fillStatus( ){
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/";		
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json._embedded.estado, function(index, value) {		    		
	    		var hrefArray = value._links.self.href.split("/");
	    		var idStatus = hrefArray[hrefArray.length -1];
	    		estados.push({
					id: idStatus,
					name: value.name,					
				});
			});	    			    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
}
function fillDocTypes( ){
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/tipo_documento/";
	var ulDocType = $("#docType");
	var line = "";
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json._embedded.tipo_documento, function(index, value) {		    		
	    		var hrefArray = value._links.self.href.split("/");
	    		var idTipoDocumento = hrefArray[hrefArray.length -1];
	    		tipo_doc.push({
					id: idTipoDocumento,
					name: value.name,					
				});
	    		line += "<li><a href='/' onclick='return false;'>"+value.name+"</a></li>";
			});	    			    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function (){
	    	ulDocType.html(line);
	    }
	});	
	
	
}

function fillProfiles( ){
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/perfil/";
	var ulProfileEmployee = $("#profileEmployee");
	var line = "";
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json._embedded.perfil, function(index, value) {		    		
	    		var hrefArray = value._links.self.href.split("/");
	    		var idPerfil = hrefArray[hrefArray.length -1];
	    		if ( idPerfil != 3){
	    			perfiles.push({
						id: idPerfil,
						name: value.name,					
					});
		    		line += "<li><a href='/' onclick='return false;'>"+value.name+"</a></li>";
	    		}	    		
			});	    			    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function (){
	    	ulProfileEmployee.html(line);
	    }
	});	
	
	
}


function fillOperarios( ){
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/usuario/";
	var strLine = "";
	var ulOperario = $("#operario");
	$.ajax({
		async: false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json._embedded.usuario, function(index, value) {		    		
	    		var hrefArray = value._links.self.href.split("/");
	    		var idUser = hrefArray[hrefArray.length -1];
	    		var email = value.name;
	    		console.log("Entro al primer usuario" + idUser + " correo: " + email);
	    		strLine += completeOperario(idUser, email);
			});	    			    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function(){
	    	ulOperario.html(strLine);
	    }
	});
	
}

function fillArrayExperience(){
	var length = experiences.length;
	experiences.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allExperiences/";		
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json, function(index, value) {		    		
		    	experiences.push({
					id: value.id,
					name: value.name,
					rechargeFraction: value.rechargeFraction,
					experienceToGive: value.experienceToGive,
					level: value.level.name,
					status: value.status.name
				});
			});
	    	fillExperiencetbl();		    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function fillExperiencetbl(  ){
	var size = experiences.length;	
    var j = 0;
    var t = $('#experienceTbl').DataTable(); t.clear();
	for(i=0; i<size;i++){
		t.row.add( [
                experiences[i].id,
                experiences[i].name,
                experiences[i].rechargeFraction,
                experiences[i].experienceToGive,
                experiences[i].level,
                experiences[i].status,
        ] ).draw( false );
	};
    $('#experienceTbl > tbody  > tr').each(function() {	    
	    var edit = "<td><a onclick='editExperience("+ experiences[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
	    var remove = "<td><a onclick='fnOpenCloseDialog(8,"+ experiences[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
	    j++;
	    var tr = $(this);
	    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
    });
}

function saveExperience(){
	var idExperience = $("#idExperience").attr("value");
	console.log("Inside form-experience " + idExperience);
	var experience = {};
	experience.name = trim( $( "#nameExperience" ).val() );
	experience.rechargeFraction = trim( $( "#rechargeFraction" ).val() );
	experience.experienceToGive = trim( $( "#experienceToGive" ).val() );
	$( "#nameExperience" ).val(""); 
	$( "#rechargeFraction" ).val("");	$( "#experienceToGive" ).val("");
	
	var statusHtml = $("#experience_status li a");
	var experience_nivelHtml = $("#experience_nivel li a");
	var idStatus = $(statusHtml).parents(".dropdown").find('.btn').val();			
	var idNivel = $(experience_nivelHtml).parents(".dropdown").find('.btn').val();
	
	experience.status = {};
	experience.status.id = idStatus;
	experience.level = {};
	experience.level.id = idNivel;
	
	$(statusHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(statusHtml).parents(".dropdown").find('.btn').val("");	   
	$(experience_nivelHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(experience_nivelHtml).parents(".dropdown").find('.btn').val("");
	
	
	//$("#numberPcs").val(""); $("#numberConsoles").val("");
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/post/experience";			
	if (idExperience !== "") {	
		experience.id = idExperience;
		experiences.splice(experienceIndex, 1, experience);
	}						
	console.log(JSON.stringify(experience));
	$.ajax({
		type:"POST",
	    url:strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(experience), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a experience into DB");			    	
	    	if (idExperience != ""){
	    		$("#btnExperience").html("Nueva Experiencia");
	    		$("#idExperience").attr("value", "");			    		
	    	}			    	
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function(){
			fillArrayExperience()		    	
		}
	});
}

function editExperience( code, index ){
	reglaIndex = index;
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/experience";	
	$.ajax({
		async:false,
	    url:strUrl,
	    data:{id: code},
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$( "#nameExperience" ).val(json.name);
			$( "#rechargeFraction" ).val(json.rechargeFraction);
			$( "#experienceToGive" ).val(json.experienceToGive);
			
			var statusHtml = $("#experience_status li a");
			var statusName = "";
			for ( i = 0; i< estados.length ; i++){
				if (json.status.id == estados[i].id ){ statusName = estados[i].name; break;}
			}
	    	$(statusHtml).parents(".dropdown").find('.btn').html(statusName + ' <span class="caret"></span>');
	    	$(statusHtml).parents(".dropdown").find('.btn').attr('value', json.status.id);
	    	
	    	var levelHtml = $("#experience_nivel");
	    	var levelName = "";
			for ( i = 0; i< niveles.length ; i++){
				if (json.level.id == niveles[i].id ){ levelName = niveles[i].name; break;}
			}
	    	$(levelHtml).parents(".dropdown").find('.btn').html(levelName + ' <span class="caret"></span>');
	    	$(levelHtml).parents(".dropdown").find('.btn').attr('value', json.level.id);
			
			$("#idExperience").attr('value', json.id);
			$("#btnExperience").html("Actualizar Experiencia");			
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function deleteExperience( code, index ){
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/experiencia/" + code;	
	console.log("Inside deleteExperience" + code);
	$.ajax({
		type: "DELETE",
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	experiences.splice(index, 1);
	    	fillExperiencetbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    	fnOpenErrorDialog();
	    }
	});			
}


function completeOperario( idUser, email ){
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/usuario/"+ idUser + "/profile";
	var StrLine = "";
	$.ajax({
		async: false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {	    	
    		var hrefArray = json._links.self.href.split("/");
    		var idProfile = hrefArray[hrefArray.length -1];
    		console.log("Entro al profile de id " + idProfile);
    		if ( idProfile == "1")	    			
    			StrLine = completeOperarioName(idUser, email);			   			    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
	return StrLine;
}

function completeOperarioName( idUser, email){
	var hostname = window.location.protocol + "//" + window.location.host;
	var strUrl = hostname + "/cabin-web/empleado/search/findByEmail?email=" + email;	
	var line = "";
	$.ajax({
		async: false,
		type: "GET",
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",	     
	    success: function (json) {
	    	$.each(json._embedded.empleado, function(index, value) {		
	    		console.log("Entro al empleado x usuario " + value.name );
	    		operarios.push({
	    			id : idUser,
	    			name: value.name
	    		});
	    		line += "<li><a href='/' onclick='return false;'>"+value.name+"</a></li>";
		    	//var operarioHtml = $("#operario");
		    	//$(operarioHtml).parents(".dropdown").find('.btn').html(value.name + ' <span class="caret"></span>');
		    	//$(operarioHtml).parents(".dropdown").find('.btn').attr('value', idUser);
	    	});
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },	    
	});
	return line;
		    			
}

function associateStatus( code, idStatus, idNivel, newRegla ) {
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + idStatus;
	var strUrlNivel = window.location.protocol + "//" + window.location.host + "/cabin-web/nivel/" + idNivel;
	var strUrlRegla = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_puntuacion/"+code+"/status";
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlRegla,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado a regla de puntuacion " + code);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function () {
	    	strUrlRegla = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_puntuacion/"+code+"/level";
	    	$.ajax({
	    		async: false,
	    		type: "PUT",
	    	    url:strUrlRegla,			
	    	    data: strUrlNivel, 
	    	    contentType: 'text/uri-list',
	    	    success: function (data) {
	    	    	console.log("Se asigno nivel a regla de puntuacion " + code);
	    	    },
	    	    error: function (xhr, status) {	    	
	    	    	console.log("Error, su solicitud no pudo ser atendida");
	    	    },
	    	    complete: function() {	    	
	    	    	if (newRegla === 1){			    		
	    	    		fillArrayRegla();
	    	    	}
	    	    }
	    	});
	    }
	});	
}

function associateUser( idSede, idUser, newSede){
	var strUrlUser = window.location.protocol + "//" + window.location.host + "/cabin-web/usuario/" + idUser;
	var strUrlSede = window.location.protocol + "//" + window.location.host + "/cabin-web/sede/"+idSede+"/user";
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlSede,			
	    data: strUrlUser, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno usuario" + idUser + " a sede " + idSede);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function () {	    		
	    	if (newSede === 1){			    		
	    		fillArraySede();
	    	}
	    }
	});	
}


$(document).on("click", "#docType li a", function(){
	console.log("Entro aqui: " + $(this).text() );
	var docType = $(this).text();
	docType = docType.toLowerCase();
	$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	  //Correr el arreglo paui-state-highlightra ver cual es el id y nombre correo del nivel
	var length = tipo_doc.length;
	for ( i = 0; i< length ; i++){
		if (docType == tipo_doc[i].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(tipo_doc[i].id); break;}
	}	
} )


$(document).on("click", "#profileEmployee li a", function(){
	console.log("Entro aqui: " + $(this).text() );
	var profileEmployee = $(this).text();
	profileEmployee = profileEmployee.toLowerCase();
	$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	  //Correr el arreglo paui-state-highlightra ver cual es el id y nombre correo del nivel
	var length = tipo_doc.length;
	for ( i = 0; i< length ; i++){
		if (profileEmployee == perfiles[i].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(perfiles[i].id); break;}
	}	
} )


$(document).on("click", "#regla_nivel li a", function(){
	console.log("Entro aqui: " + $(this).text() );
	var level = $(this).text();
	level = level.toLowerCase();
	$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	  //Correr el arreglo paui-state-highlightra ver cual es el id y nombre correo del nivel
	var length = niveles.length;
	for ( i = 0; i< length ; i++){
		if (level == niveles[i].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(niveles[i].id);}
	}	
} )

$(document).on("click", "#experience_nivel li a", function(){
	console.log("Entro aqui: " + $(this).text() );
	var level = $(this).text();
	level = level.toLowerCase();
	$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	  //Correr el arreglo paui-state-highlightra ver cual es el id y nombre correo del nivel
	var length = niveles.length;
	for ( i = 0; i< length ; i++){
		if (level == niveles[i].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(niveles[i].id);}
	}	
} )

$(document).on("click", "#nivelCustomer li a", function(){
	console.log("Entro aqui: " + $(this).text() );
	var level = $(this).text();
	level = level.toLowerCase();
	$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	  //Correr el arreglo paui-state-highlightra ver cual es el id y nombre correo del nivel
	var length = niveles.length;
	for ( i = 0; i< length ; i++){
		if (level == niveles[i].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(niveles[i].id);}
	}	
} )

$(document).on("click", "#operario li a", function(){
	console.log("Entro aqui: " + $(this).text() );
	var operario = $(this).text();
	operario = operario.toLowerCase();
	$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');	  
	var length = operarios.length;
	for ( i = 0; i< length ; i++){
		if (operario == operarios[i].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(operarios[i].id);}
	}	
} )


//Validation
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

function addSede() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
	valid = valid && checkRequired( $("#name"), "Debe ingresar el nombre de la sede.",1, sedeValidation);
	valid = valid && checkRegexp( $("#name"), /.+/i, "El nombre ingresado para la sede no es válido.",  sedeValidation);	
	valid = valid && checkRequired( $("#address"), "Debe ingresar la dirección de la sede.",1, sedeValidation);
	valid = valid && checkRegexp( $("#address"), /.+/i, "La dirección ingresada para la sede no es válida.",  sedeValidation);	
	var genderHtml = $("#operario li a");		
	genderHtml = $(genderHtml).parents(".dropdown").find('.btn');	
	valid = valid && checkRequired( genderHtml, "Debe seleccionar un operario.",1, sedeValidation);
	return valid;
}

function addTarifa() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
	valid = valid && checkRequired( $("#descriptionTarifa"), "Debe ingresar la descripción de la tarifa.",1, tarifaValidation);
	valid = valid && checkRegexp( $("#descriptionTarifa"), /.+/i, "La descripción de la tarifa no es válida.",  tarifaValidation);	
	valid = valid && checkRegexp( $("#minFraction"), /^[0-9]\d{0,3}($|\.\d{0,2}$)/i, "Debe ingresar un monto válido, no mayor de 999.99 soles y de dos decimales.", tarifaValidation);
	valid = valid && checkRegexp( $("#price"), /^[0-9]\d{0,3}($|\.\d{0,2}$)/i, "Debe ingresar un monto válido, no mayor de 999.99 soles y de dos decimales.", tarifaValidation );
	valid = valid && checkRequired( $("#startTime"), "Debe ingresar la hora de inicio en el formato de 24 horas, por ejemplo: 10:00.",1, tarifaValidation);
	valid = valid && checkRegexp( $("#startTime"), /([01]\d|2[0-3]):([0-5]\d)/ , "La hora de inicio ingresada no es válida, formato permitido desde 00:00 hasta 23:59.",  tarifaValidation);
	valid = valid && checkRequired( $("#endTime"), "Debe ingresar la hora de fin en el formato de 24 horas, por ejemplo: 10:00.",1, tarifaValidation);
	valid = valid && checkRegexp( $("#endTime"), /([01]\d|2[0-3]):([0-5]\d)/ , "La hora de fin no es válida, formato permitido desde 00:00 hasta 23:59.",  tarifaValidation);
	var startStr = trim( $( "#startTime" ).val() );	var endStr = trim( $( "#endTime" ).val() );
	var arrayStartTime = startStr.split(':'); var arrayEndTime = endStr.split(':'); 
	var startTime = new Date(); startTime.setHours(arrayStartTime[0]-5); startTime.setMinutes(arrayStartTime[1]);
	var endTime = new Date(); endTime.setHours(arrayEndTime[0]-5); endTime.setMinutes(arrayEndTime[1]);
	if ( startTime.getTime() >= endTime.getTime() ){
		$("#startTime").addClass( "ui-state-error" );
		$("#endTime").addClass( "ui-state-error" );
		updateTips( "La hora de inicio no puede ser mayor que la hora de fin", tarifaValidation );
		valid = false;
	}
	return valid;
}

function addRegla() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
	valid = valid && checkRequired( $("#nameReglaPunt"), "Debe ingresar el nombre de la regla de puntuación.",1, reglaValidation);
	valid = valid && checkRegexp( $("#nameReglaPunt"), /.+/i, "El nombre de la regla de puntación no es válido.",  reglaValidation);	
	valid = valid && checkRegexp( $("#rechargingFraction"), /^[0-9]\d{0,3}($|\.\d{0,2}$)/i, "Debe ingresar ingresar un monto válido, no mayor de 999.99 soles y de dos decimales.", reglaValidation);	
	valid = valid && checkRegexp( $("#pointsReglaPunt"), /^[0-9]\d{0,5}$/i, "Debe ingresar una cantidad  de puntos no mayor de 999 999, valor entero.", reglaValidation);
	var statusHtml = $("#status li a");
	var regla_nivelHtml = $("#regla_nivel li a");	
	statusHtml = $(statusHtml).parents(".dropdown").find('.btn');
	regla_nivelHtml = $(regla_nivelHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( regla_nivelHtml, "Debe seleccionar un nivel.",1, reglaValidation);
	valid = valid && checkRequired( statusHtml, "Debe seleccionar un estado.",1, reglaValidation);
	
	return valid;
}

function addNivel() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
	valid = valid && checkRequired( $("#nameNivel"), "Debe ingresar el nombre del nivel.",1, nivelValidation);
	valid = valid && checkRegexp( $("#nameNivel"), /.+/i, "El nombre ingresado para el nivel no es válido.",  nivelValidation);
	valid = valid && checkRegexp( $("#initialExperience"), /^[0-9]\d{0,5}$/i, "Debe ingresar una cantidad de puntos no mayor de 999 999, valor entero.", nivelValidation);
	valid = valid && checkRegexp( $("#finalExperience"), /^[1-9]\d{0,5}$/i, "Debe ingresar una cantidad de puntos no mayor de 999 999, valor entero.", nivelValidation);
	valid = valid && checkRequired( $("#question"), "Debe ingresar una pregunta.",1, nivelValidation);
	valid = valid && checkRegexp( $("#question"), /.+/i, "La pregunta ingresada para el nivel no es válida.",  nivelValidation);
	
	if(!valid) {
		return false;
	}
	
	var length = niveles.length;
	var startPoint = trim( $( "#initialExperience" ).val() ); var endPoint = trim( $( "#finalExperience" ).val() );
	var idNivel = $("#idNivel").attr("value");
	for ( i = 0; i < length ; i ++){
		if ( i !== nivelIndex )
			valid = isValidRange(startPoint, endPoint, niveles[i].initialExperience, niveles[i].finalExperience);		
		if (!valid){
			$("#initialExperience").addClass( "ui-state-error" );
			$("#finalExperience").addClass( "ui-state-error" );
			updateTips( "El rango de inicio y fin de puntos no es válido", nivelValidation );
			break;
		}
	}
	return valid;
}

function addPremio() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
	valid = valid && checkRequired( $("#namePrize"), "Debe ingresar el nombre del premio.",1, premioValidation);
	valid = valid && checkRegexp( $("#namePrize"), /.+/i, "El nombre ingresado para el premio no es válido.",  premioValidation);
	valid = valid && checkRegexp( $("#pointsPrize"), /^[1-9]\d{0,5}$/i, "Debe ingresar una cantidad de puntos no mayor de 999 999, valor entero.", premioValidation);
	valid = valid && checkRegexp( $("#balanceFraction"), /^[0-9]\d{0,3}($|\.\d{0,2}$)/i, "Debe ingresar ingresar un monto válido, no mayor de 999.99 soles y de dos decimales.", premioValidation);		
	return valid;
}

function addCliente() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
	valid = valid && checkRequired( $("#nameCustomer"), "Debe ingresar el nombre del cliente.",1, clienteValidation);
	valid = valid && checkRegexp( $("#nameCustomer"), /.+/i, "El nombre ingresado no es válido.",  clienteValidation);	
	valid = valid && checkRequired( $("#birthDateCustomer"), "Debe ingresar la fecha de nacimiento del cliente",1, clienteValidation);	
	var genderHtml = $("#genderCustomer li a");		
	genderHtml = $(genderHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( genderHtml, "Debe seleccionar un género.",1, clienteValidation);	
	valid = valid && checkRequired($("#emailCustomer"),"Debe ingresar un email.",1, clienteValidation);
	valid = valid && checkRegexp( $("#emailCustomer"), /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/i , "El email ingresado no es válido.", clienteValidation );
	valid = valid && checkRegexp( $("#pointsCustomer"), /^[0-9]\d{0,5}$/i, "Debe ingresar una cantidad de puntos no mayor de 999 999, valor entero.", clienteValidation);
	valid = valid && checkRegexp( $("#experienceCustomer"), /^[0-9]\d{0,5}$/i, "Debe ingresar una cantidad de experiencia no mayor de 999 999, valor entero.", clienteValidation);
	valid = valid && checkRegexp( $("#balanceCustomer"), /^[0-9]\d{0,3}($|\.\d{0,2}$)/i, "Debe ingresar ingresar un monto válido, no mayor de 999.99 soles y de dos decimales.", clienteValidation);
	valid = valid && checkRequired( $("#passwordCustomer"), "Debe ingresar una contraseña.",1, clienteValidation);
	valid = valid && checkRegexp( $("#passwordCustomer"), /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$/, "La contraseña debe contener al menos una letra minúscula, una mayúscula, un dígito. Mínimo cuatro caracteres y máximo, viente.", clienteValidation );
	valid = valid && checkRequired( $("#confirmPasswordCustomer"), "Debe confirmar su contrase&ntilde;a.",1, clienteValidation);
	valid = valid && checkRegexp( $("#confirmPasswordCustomer"), /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$/, "La contraseña debe contener al menos una letra minúscula, una mayúscula, un dígito. Mínimo cuatro caracteres y máximo, veinte.", clienteValidation );
	valid = valid && checkPassword($("#passwordCustomer"), $("#confirmPasswordCustomer"), "Las contraseñas no coinciden",  clienteValidation);	
	var nivelCustomerHtml = $("#nivelCustomer li a");	
	nivelCustomerHtml = $(nivelCustomerHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( nivelCustomerHtml, "Debe seleccionar un nivel.",1, clienteValidation);
	var statusHtml = $("#statusCustomer li a");		
	statusHtml = $(statusHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( statusHtml, "Debe seleccionar un estado.",1, clienteValidation);
	valid = valid && checkEmail( $("#emailCustomer"), "El email ya se encuentra registrado.", clienteValidation);
	return valid;
}

function addEmpleado() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
	valid = valid && checkRequired( $("#nameEmployee"), "Debe ingresar el nombre del empleado.",1, empleadoValidation);
	valid = valid && checkRegexp( $("#nameEmployee"), /.+/i, "El nombre ingresado no es válido.",  empleadoValidation);	
	valid = valid && checkRequired( $("#birthDateEmployee"), "Debe ingresar la fecha de nacimiento del empleado",1, empleadoValidation);	
	var genderHtml = $("#genderEmployee li a");		
	genderHtml = $(genderHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( genderHtml, "Debe seleccionar un género.",1, empleadoValidation);	
	valid = valid && checkRequired($("#emailEmployee"),"Debe ingresar un email.",1, empleadoValidation);
	valid = valid && checkRegexp( $("#emailEmployee"), /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/i , "El email ingresado no es válido.", empleadoValidation );
	if(!$("#docCode").is(':disabled')) {
		var docTypeHtml = $("#docType li a");		
		docTypeHtml = $(docTypeHtml).parents(".dropdown").find('.btn');
		valid = valid && checkRequired( docTypeHtml, "Debe seleccionar un tipo de documento.",1, empleadoValidation);
		//valid = valid && checkRegexp( $("#docCode"), /^[0-9]\d{0,15}$/i, "Debe ingresar número de documento correcto", empleadoValidation);
		if ( $(docTypeHtml).val() == 1) //En caso DNI
			valid = valid && checkRegexp( $("#docCode"), /^[0-9]\d{7}$/i, "El DNI ingresado no es válido" , empleadoValidation);
		else if( $(docTypeHtml).val() == 2) //En caso RUC
			valid = valid && checkRegexp( $("#docCode"), /^[1-9]\d{10}$/i, "El RUC ingresado no es válido", empleadoValidation );
	    else if( $(docTypeHtml).val > 2) //En cualquier otro documento
	    	valid = valid && checkRequired($("#docCode"),"Debe ingresar el número de documento.",1, empleadoValidation);		
	}
	valid = valid && checkRequired( $("#passwordEmployee"), "Debe ingresar una contraseña.",1, empleadoValidation);
	valid = valid && checkRegexp( $("#passwordEmployee"), /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$/, "La contraseña debe contener al menos una letra minúscula, una mayúscula, un dígito. Mínimo cuatro caracteres y máximo, viente.", empleadoValidation );
	valid = valid && checkRequired( $("#confirmPasswordEmployee"), "Debe confirmar su contrase&ntilde;a.",1, empleadoValidation);
	valid = valid && checkRegexp( $("#confirmPasswordEmployee"), /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$/, "La contraseña debe contener al menos una letra minúscula, una mayúscula, un dígito. Mínimo cuatro caracteres y máximo, veinte.", empleadoValidation );
	valid = valid && checkPassword($("#passwordEmployee"), $("#confirmPasswordEmployee"), "Las contraseñas no coinciden",  empleadoValidation);	
	var statusHtml = $("#statusEmployee li a");		
	var profileHtml = $("#profileEmployee li a");		
	profileHtml = $(profileHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( profileHtml, "Debe seleccionar un perfil.",1, empleadoValidation);
	statusHtml = $(statusHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( statusHtml, "Debe seleccionar un estado.",1, empleadoValidation);
	valid = valid && checkEmail( $("#emailEmployee"), "El email ya se encuentra registrado.", empleadoValidation);
	
	if(!$("#docCode").is(':disabled')) {
		valid = valid && checkDocCode( $("#docCode"), "El número de documento ya se encuentra registrado.", empleadoValidation);
	}
	return valid;
}

function addExperience() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
	valid = valid && checkRequired( $("#nameExperience"), "Debe ingresar el nombre de la experiencia.",1, reglaValidation);
	valid = valid && checkRegexp( $("#nameExperience"), /.+/i, "El nombre de la experiencia no es válido.",  reglaValidation);	
	valid = valid && checkRegexp( $("#rechargeFraction"), /^[0-9]\d{0,3}($|\.\d{0,2}$)/i, "Debe ingresar ingresar un monto válido, no mayor de 999.99 soles y de dos decimales.", reglaValidation);	
	valid = valid && checkRegexp( $("#experienceToGive"), /^[0-9]\d{0,5}$/i, "Debe ingresar una cantidad  de puntos no mayor de 999 999, valor entero.", reglaValidation);
	var statusHtml = $("#experience_status li a");
	var regla_nivelHtml = $("#experience_nivel li a");	
	statusHtml = $(statusHtml).parents(".dropdown").find('.btn');
	regla_nivelHtml = $(regla_nivelHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( regla_nivelHtml, "Debe seleccionar un nivel.",1, reglaValidation);
	valid = valid && checkRequired( statusHtml, "Debe seleccionar un estado.",1, reglaValidation);
	
	return valid;
}


function isValidRange(startPoint, endPoint, boundLower, boundUpper){
	var valid = true;
	startPoint = parseInt(startPoint);
	endPoint = parseInt(endPoint);
	boundLower = parseInt(boundLower);
	boundUpper = parseInt(boundUpper);	
	if ( ( startPoint>= boundLower && startPoint <= boundUpper ) || ( endPoint>= boundLower && endPoint <= boundUpper  ) || (startPoint >= endPoint) ){
		return false;
	}
	if ( startPoint < boundLower && endPoint > boundUpper){
		return false;
	}
	return valid;
}

function dateSort() {
 for(i = 0 ; i < daysTarifa.length ; i++)
     for(j = i + 1 ; j < daysTarifa.length ; j++)
     {
         if(map[daysTarifa[i]] > map[daysTarifa[j]])
         {
             temp = daysTarifa[i];
             daysTarifa[i] = daysTarifa[j];
             daysTarifa[j] = temp;
         }
     }
}
function checkPassword( ps1, ps2, cad, div) {
	  if ( ps1.val() != ps2.val() ) {
	    ps1.addClass( "ui-state-error" );
	    ps2.addClass( "ui-state-error" );
	    updateTips( cad, div);
	    return false;
	  } else {
	    return true;
	  }
}

function checkEmail( email, cad, div) {
	if (email.is(':disabled')) {
		return true;
	}
	var name = trim(email.val());
	var hostname = window.location.protocol + "//" + window.location.host;
	var strUrl = hostname + "/cabin-web/usuario/search/findByName?name=" + name;
	var validEmail = 1;
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	console.log("Entro a la comprobación de email: " + name);
	    	for( var i in json){
	    		validEmail = 0;
	    	}
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
	if ( validEmail == 1 ) {
	    return true;
	} else {
		email.addClass( "ui-state-error" );
		updateTips( cad, div);
	    return false;	    
	  }
}

function checkDocCode( docCode, cad, div) {
	var code = trim(docCode.val());
	var hostname = window.location.protocol + "//" + window.location.host;
	var strUrl = hostname + "/cabin-web/empleado/search/findByDocCode?docCode=" + code;
	var validCode = 1;
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {	    	
	    	for( var i in json){
	    		validCode = 0;
	    	}
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
	if ( validCode == 1 ) {
	    return true;
	} else {
		docCode.addClass( "ui-state-error" );
		updateTips( cad, div);
	    return false;	    
	  }
}