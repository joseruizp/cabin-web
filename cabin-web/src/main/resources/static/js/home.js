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
parametros = []; parametroIndex = -1;
bonificaciones = []; bonificacionIndex = -1;
sedeValidation = ""; tarifaValidation = "";
reglaValidation = ""; nivelValidation = "";
premioValidation = ""; clienteValidation = "";
empleadoValidation = ""; parametroValidation = "" 
clienteIndex = -1;
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
		$('.input-group.date').datepicker('setDate',"");
		
		$("#genderCustomer li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var gender = $(this).text();
			if (gender.toLowerCase() == "masculino" ){ $(this).parents(".dropdown").find('.btn').val("M");}
			else{ $(this).parents(".dropdown").find('.btn').val("F"); }
		});
		$("#genderEmployee li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var gender = $(this).text();
			if (gender.toLowerCase() == "masculino" ){ $(this).parents(".dropdown").find('.btn').val("M");}
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
		parametroValidation = $("#parametroValidation");
		bonificacionValidation = $("#bonificacionValidation");
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
		$("#statusSede li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var status = $(this).text();
			if (status.toLowerCase() == estados[0].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(estados[0].id);}
			else{ $(this).parents(".dropdown").find('.btn').val(estados[1].id); }
		});
		$("#statusTarifa li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var status = $(this).text();
			if (status.toLowerCase() == estados[0].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(estados[0].id);}
			else{ $(this).parents(".dropdown").find('.btn').val(estados[1].id); }
		});
		$("#statusNivel li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var status = $(this).text();
			if (status.toLowerCase() == estados[0].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(estados[0].id);}
			else{ $(this).parents(".dropdown").find('.btn').val(estados[1].id); }
		});
		$("#statusPremio li a").click(function(){
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
		$("#statusParametro li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var status = $(this).text();
			if (status.toLowerCase() == estados[0].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(estados[0].id);}
			else{ $(this).parents(".dropdown").find('.btn').val(estados[1].id); }
		});
		$("#statusBonificacion li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var status = $(this).text();
			if (status.toLowerCase() == estados[0].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(estados[0].id);}
			else{ $(this).parents(".dropdown").find('.btn').val(estados[1].id); }
		});
		
		$('#sedeTbl').DataTable({			
			scrollY: 300,
		    paging: true,
			ordering: true,
			searching: true,
			bLengthChange: false,
			bInfo: false,
			language: {
			    search: "Buscar Sede: ",
			    zeroRecords: "No se encontró registros",			     
			    emptyTable: "No hay datos disponibles",
			    paginate: {
			        "first":      "Primero",
			        "last":       "Ultimo",
			        "next":       "Siguiente",
			        "previous":   "Anterior"
			    }
			},
		});
		$('#tarifaTbl').DataTable({
			scrollY: 300,
		    paging: true,
			ordering: true,
			searching: false,
			bLengthChange: false,
			bInfo: false,
			language: {	     
			     emptyTable: "No hay datos disponibles",
			     paginate: {
				        "first":      "Primero",
				        "last":       "Ultimo",
				        "next":       "Siguiente",
				        "previous":   "Anterior"
				    }
			},
		});
		$('#tariffDetailTbl').DataTable({
			scrollY: 300,
		    paging: true,
			ordering: true,
			searching: false,
			bLengthChange: false,
			bInfo: false,
			language: {	     
			     emptyTable: "No hay datos disponibles",
			     paginate: {
				        "first":      "Primero",
				        "last":       "Ultimo",
				        "next":       "Siguiente",
				        "previous":   "Anterior"
				    }
			},
		});
		$('#reglaTbl').DataTable({
			scrollY: 300,
		    paging: true,
			ordering: true,
			searching: false,
			bLengthChange: false,
			bInfo: false,
			language: {	     
			     emptyTable: "No hay datos disponibles",
			     paginate: {
				        "first":      "Primero",
				        "last":       "Ultimo",
				        "next":       "Siguiente",
				        "previous":   "Anterior"
				    }
			},
		});
		$('#nivelTbl').DataTable({
			scrollY: 300,
		    paging: true,
		    ordering: true,
		    searching: false,
			bLengthChange: false,
			bInfo: false,
			language: {	     
			     emptyTable: "No hay datos disponibles",
			     paginate: {
				        "first":      "Primero",
				        "last":       "Ultimo",
				        "next":       "Siguiente",
				        "previous":   "Anterior"
				    }
			},
		});
		$('#premioTbl').DataTable({
		    pscrollY: 300,
		    paging: true,
		    ordering: true,
		    searching: false,
			bLengthChange: false,
			bInfo: false,
			language: {	     
			     emptyTable: "No hay datos disponibles",
			     paginate: {
				        "first":      "Primero",
				        "last":       "Ultimo",
				        "next":       "Siguiente",
				        "previous":   "Anterior"
				    }
			},
		});
		$('#clienteTbl').DataTable({			
			scrollY: 300,
		    paging: true,
			ordering: true,
			searching: true,
			bLengthChange: false,
			bInfo: false,
			language: {
			    search: "Buscar Cliente: ",
			    zeroRecords: "No se encontró registros",			     
			    emptyTable: "No hay datos disponibles",
			    paginate: {
			        "first":      "Primero",
			        "last":       "Ultimo",
			        "next":       "Siguiente",
			        "previous":   "Anterior"
			    }
			},
		});
		$('#empleadoTbl').DataTable({			
			scrollY: 300,
		    paging: true,
			ordering: true,
			searching: true,
			bLengthChange: false,
			bInfo: false,
			language: {
			    search: "Buscar Empleado: ",
			    zeroRecords: "No se encontró registros",			     
			    emptyTable: "No hay datos disponibles",
			    paginate: {
			        "first":      "Primero",
			        "last":       "Ultimo",
			        "next":       "Siguiente",
			        "previous":   "Anterior"
			    }
			},
		});
		$('#experienceTbl').DataTable({
		    pscrollY: 300,
		    paging: true,
		    ordering: true,
		    searching: false,
			bLengthChange: false,
			bInfo: false,
			language: {	     
			    emptyTable: "No hay datos disponibles",
			    paginate: {
			        "first":      "Primero",
			        "last":       "Ultimo",
			        "next":       "Siguiente",
			        "previous":   "Anterior"
			    }
			},
		});
		$('#parametroTbl').DataTable({
		    pscrollY: 300,
		    paging: true,
		    ordering: true,
		    searching: false,
			bLengthChange: false,
			bInfo: false,
			language: {	     
			    emptyTable: "No hay datos disponibles",
			    paginate: {
			        "first":      "Primero",
			        "last":       "Ultimo",
			        "next":       "Siguiente",
			        "previous":   "Anterior"
			    }
			},
		});
		$('#bonificacionTbl').DataTable({
		    pscrollY: 300,
		    paging: true,
		    ordering: true,
		    searching: false,
			bLengthChange: false,
			bInfo: false,
			language: {	     
			    emptyTable: "No hay datos disponibles",
			    paginate: {
			        "first":      "Primero",
			        "last":       "Ultimo",
			        "next":       "Siguiente",
			        "previous":   "Anterior"
			    }
			},
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
		fillArrayParametro();
		fillArrayBonificacion();
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
		
		$( "#form-parametro" ).submit(function( event ) {
			event.preventDefault();
			if ( addParametro() ){
				var idParametro = $("#idParametro").attr("value");
				if (idParametro !== ""){
					fnOpenEditDialog(9);
				}
				else{
					saveParametro();
				}	
			}
		});
		
		$( "#form-bonificacion" ).submit(function( event ) {
			event.preventDefault();
			if ( addBonificacion() ){
				var idBonificacion = $("#idBonificacion").attr("value");
				if (idBonificacion !== ""){
					fnOpenEditDialog(10);
				}
				else{
					saveBonificacion();
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
		    
		    if (daysTarifa.length === 0) {
		    	$('#startTime').val("");
		    	$('#endTime').val("");
		    	$('#price').val("");
		    	$('#startTime').prop('disabled', true);
		    	$('#endTime').prop('disabled', true);
		    	$('#price').prop('disabled', true);
		    } else {
		    	$('#startTime').prop('disabled', false);
		    	$('#endTime').prop('disabled', false);
		    	$('#price').prop('disabled', false);
		    }
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
		/*
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
			date = ""+ day +"/"+monthStr+"/"+year;
		}
		else{
			var arrayDate = clientes[i].birthDate.substring(0, 10).split("-");
			date = ""+ arrayDate[2] +"/"+arrayDate[1]+"/"+arrayDate[0];
		} 
		*/
		t.row.add( [
                clientes[i].id,
                clientes[i].name,
                clientes[i].email,
                clientes[i].gender,
                clientes[i].birthDate,                
                clientes[i].balance,
                clientes[i].points,
                clientes[i].experience,
                clientes[i].estado,
                "",
                "",
        ] ).draw( false );
	};
	if (size > 0 ){
	    $('#clienteTbl > tbody  > tr').each(function() {
		    var edit = "<td><a onclick='editCliente("+ clientes[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
		    var remove = "<td><a onclick='fnOpenCloseDialog(6, "+ clientes[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";	    
		    j++; 
		    var tr = $(this);	    
		    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
	    });
	}
}

function fillEmpleadotbl(){
	var size = empleados.length;
	var j = 0;
    var t = $('#empleadoTbl').DataTable();
    var date;
    t.clear();
	for(i=0; i<size;i++){
		/*
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
			var arrayDate = empleados[i].birthDate.split("-");
			date = ""+ arrayDate[0] +"-"+arrayDate[1]+"-"+arrayDate[2];
		} 
		*/
		t.row.add( [
                empleados[i].id,
                empleados[i].name,
                empleados[i].email,
                empleados[i].gender,
                empleados[i].birthDate,
                empleados[i].docTypeName, 
                empleados[i].docCode,
                empleados[i].perfil,
                empleados[i].estado,
                "",
                "",
        ] ).draw( false );
	};
	if (size > 0 ){
	    $('#empleadoTbl > tbody  > tr').each(function() {
		    var edit = "<td><a onclick='editEmpleado("+ empleados[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
		    var remove = "<td><a onclick='fnOpenCloseDialog(7, "+ empleados[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";	    
		    j++; 
		    var tr = $(this);	    
		    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
	    });
	}
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
                sedes[i].estado,
                "",
        ] ).draw( false );
	};
	if (size > 0 ){
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
	
	strUrl = hostname + "/cabin-web/sede/" + code+"/status";
	var idStatus;
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	idStatus = hrefArray[hrefArray.length -1];
	    	var statusHtml = $("#statusSede li a");			
			statusHtml.parents(".dropdown").find('.btn').html( json.name +' <span class="caret"></span>');				
			statusHtml.parents(".dropdown").find('.btn').val( idStatus);
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function deleteSede( code, index ){	
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + 2;
	var strUrlSede = window.location.protocol + "//" + window.location.host + "/cabin-web/sede/"+code+"/status";
	console.log("Inside deleteSede" + code);
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlSede,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado a Sede" + code);
	    	sedes[index].estado = "Inactivo";
	    	fillSedetbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }	    
	});	
}

function saveSede(){
	var idSede = $("#idSede").attr("value");
	console.log("Inside form-Sede " + idSede);
	var sede = {};  var newSede = 1;
	sede.name = trim( $( "#name" ).val() );
	sede.address = trim( $( "#address" ).val() );			
	$( "#name" ).val("");	$( "#address" ).val("");
	var operarioHtml = $("#operario li a");	
	var idUser = $(operarioHtml).parents(".dropdown").find('.btn').val();
	$(operarioHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(operarioHtml).parents(".dropdown").find('.btn').val("");	
	//$("#numberPcs").val(""); $("#numberConsoles").val("");
	var statusHtml = $("#statusSede li a");	
	var idStatus = $(statusHtml).parents(".dropdown").find('.btn').val();
	$(statusHtml).parents(".dropdown").find('.btn').html('Activo <span class="caret"></span>');
	$(statusHtml).parents(".dropdown").find('.btn').val("1");
	
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/sede";			
	if (idSede !== "") {
		strUrl += "/" + idSede;
		sede.id = idSede;
		newSede = 0;
		var length = operarios.length;
		if( idStatus == estados[0].id){
			sede.estado = estados[0].name; }
		else{
			sede.estado = estados[1].name; }	
		for ( i = 0; i< length ; i++){
			if (idUser == operarios[i].id ){sede.employee = operarios[i].name; break;}
		}		
		sedes.splice(sedeIndex, 1, sede);
		fillSedetbl();
	}						
	$.ajax({
		async: false,
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
	    }
	});
	
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + idStatus;	
	var strUrlSede = window.location.protocol + "//" + window.location.host + "/cabin-web/sede/"+idSede+"/status";
	//Se inserta el estado en la Sede	
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlSede,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {	    	
	    	console.log("Se asigno estado a sede" + idSede);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },	
	    complete: function(xhr){
	    	associateUser(idSede, idUser, newSede);
	    }
	});	
	
}

function fillTarifatbl(  ){
	var size = tarifas.length;
	var j = 0;
    var t = $('#tarifaTbl').DataTable();
    t.clear();
	for(i=0; i<size;i++){		
		t.row.add( [
                tarifas[i].id,
                tarifas[i].description,
                tarifas[i].price,                
                tarifas[i].estado,
        ] ).draw( false );
	};
	if (size > 0 ){
	    $('#tarifaTbl > tbody  > tr').each(function() {	    
	    	var edit = "<td><a onclick='editTarifa("+ tarifas[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
		    var remove = "<td><a onclick='fnOpenCloseDialog(2,"+ tarifas[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
		    j++;
		    var tr = $(this);
		    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
	    });
	}
}

function fillTariffDetailstbl(  ){
	var size = tariffDetails.length;
	var j = 0; 
    var t = $('#tariffDetailTbl').DataTable();
    t.clear();
	for(i=0; i<size;i++){		
		t.row.add( [
                tariffDetails[i].id,
                tariffDetails[i].days,
                tariffDetails[i].price,
                tariffDetails[i].startTime,
                tariffDetails[i].endTime,
        ] ).draw( false );
	};
    $('#tariffDetailTbl > tbody  > tr').each(function() {	    
    	var edit = "<td><a onclick='editTariffDetail("+ tariffDetails[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
	    var remove = "<td><a onclick='fnOpenCloseDialog(2,"+ tariffDetails[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
	    j++;
	    var tr = $(this);
	    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
    });
}

function editTarifa( code, index ){
	tarifaIndex = index;
	$(".checkboxTarifa").prop( 'checked', false );
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/tariff";	
	$.ajax({
		async:false,
	    url:strUrl,
	    data: {id : code},
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var idTariff = json.id;
	    	$( "#priceTariff" ).val(json.price);
			$( "#descriptionTarifa" ).val(json.description);
			var statusHtml = $("#statusTarifa li a");			
			statusHtml.parents(".dropdown").find('.btn').html( json.status.name +' <span class="caret"></span>');
			statusHtml.parents(".dropdown").find('.btn').val( json.status.id);
			
			$('#startTime').prop('disabled', true);
	    	$('#endTime').prop('disabled', true);
	    	$('#price').prop('disabled', true);
			
			$("#idTarifa").val(idTariff);
			$("#btnTarifa").html("Actualizar Tarifa");
			
			if (json.tariffDetails.length > 0) {
				fillArrayTarifaDetails(idTariff);
			} else {
				fillArrayTarifa();
			}
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
}

function editTariffDetail( code, index ){
	var tariffDetailIndex = index;
	var tariffDetail = tariffDetails[tariffDetailIndex];
	
	$("#idTariffDetail").val(tariffDetail.id);
	$("#startTime").val(tariffDetail.startTime);
	$("#endTime").val(tariffDetail.endTime);
	$("#price").val(tariffDetail.price);
	
	$(".checkboxTarifa").prop( 'checked', false );
	daysTarifa.splice(0,length);
	var days = tariffDetail.days.split("-");
	for (var i = 0; i < days.length; i++) {
		$(".checkboxTarifa[value="+ days[i] +"]").prop( 'checked', true );
		daysTarifa.push(days[i]);
	}
	
	$('#startTime').prop('disabled', false);
	$('#endTime').prop('disabled', false);
	$('#price').prop('disabled', false);
}

function deleteTarifa( code, index ){	
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + 2;
	var strUrlTarifa = window.location.protocol + "//" + window.location.host + "/cabin-web/tarifa/"+code+"/status";
	console.log("Inside deleteTarifa" + code);
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlTarifa,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado a Tarifa" + code);
	    	tarifas[index].estado = "Inactivo";
	    	fillTarifatbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }	    
	});		
}

function saveTarifa() {
    var tariff = {};
    tariff.status = {};
    tariff.tariffDetails = [];

    var idTarifa = trim($("#idTarifa").val());
    var idTariffDetail = trim($("#idTariffDetail").val());
    if (idTarifa !== "") {
    	tariff.id = idTarifa;
    }
    console.log("Inside form-tarifaDetail " + idTarifa + " - " + idTariffDetail);

    var statusHtml = $("#statusSede li a");

    tariff.description = trim($("#descriptionTarifa" ).val());
    tariff.price = trim($("#priceTariff").val());
    tariff.status.id = $(statusHtml).parents(".dropdown").find('.btn').val();
    
    var hasDetails = false;

    var daysLength = daysTarifa.length;
    if (daysLength > 0) {
        dateSort(); 
        var days = "";
        for (i = 0; i < daysLength ; i++) {
            if (i == (daysLength - 1)) {
                days +=  daysTarifa[i];
                break;
            }
            days +=  daysTarifa[i] + "-";
        }

        var tariffDetail = {};
        if (idTariffDetail !== "") {
        	tariffDetail.id = idTariffDetail;
        }
        tariffDetail.startTime = trim($("#startTime").val());
        tariffDetail.endTime = $("#endTime").val();
        tariffDetail.days = days;
        tariffDetail.price =  trim($("#price").val());
        
        daysTarifa.splice(0,length);

        setTimeout(function() {
            $(".checkboxTarifa").prop( 'checked', false ) 
        }, 0);

        tariff.tariffDetails.push(tariffDetail);
        hasDetails = true;
    }

    console.log(JSON.stringify(tariff));

    var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/post/tariff";

    $.ajax({
        type: "POST",
        url:strUrl,
        dataType: 'json', 
        data: JSON.stringify(tariff), 
        contentType: 'application/json',
        success: function (data) {
            console.log("Send a tarifa into DB");
            $( "#price" ).val("");
            $( "#startTime" ).val("");
            $( "#endTime" ).val("");
            $(statusHtml).parents(".dropdown").find('.btn').html('Activo <span class="caret"></span>');
            $(statusHtml).parents(".dropdown").find('.btn').val("1");

            $('#descriptionTarifa').val("");
            $('#priceTariff').val("");
            $("#divTariffBtn").show();
            $("#divTariffDetailBtn").hide();
            fillArrayTarifa();
        },
        error: function (xhr, status) {
            console.log("Error, su solicitud no pudo ser atendida");
        },
    });
    
}

function fillBonificaciontbl(  ){
	var size = bonificaciones.length;
	var j = 0;
    var t = $('#bonificacionTbl').DataTable();
    t.clear();
	for(i=0; i<size;i++){
		t.row.add( [
                bonificaciones[i].id,
                bonificaciones[i].name,
                bonificaciones[i].experienceAmount,                
                bonificaciones[i].fractionToGive,
                bonificaciones[i].status,
        ] ).draw( false );
	};
	if (size > 0 ){
	    $('#bonificacionTbl > tbody  > tr').each(function() {	    
		    var edit = "<td><a onclick='editBonificacion("+ bonificaciones[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
		    var remove = "<td><a onclick='fnOpenCloseDialog(10,"+ bonificaciones[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
		    j++;
		    var tr = $(this);
		    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
	    });
	}
}



function fillParametrotbl(  ){
	var size = parametros.length;
	var j = 0;
    var t = $('#parametroTbl').DataTable();
    t.clear();
	for(i=0; i<size;i++){
		t.row.add( [
                parametros[i].id,
                parametros[i].name,
                parametros[i].value,                
                parametros[i].status,
        ] ).draw( false );
	};
	if (size > 0 ){
	    $('#parametroTbl > tbody  > tr').each(function() {	    
		    var edit = "<td><a onclick='editParametro("+ parametros[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
		    var remove = "<td><a onclick='fnOpenCloseDialog(9,"+ parametros[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
		    j++;
		    var tr = $(this);
		    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
	    });
	}
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
                reglas[i].level.name,
                reglas[i].status.name,
        ] ).draw( false );
	};
	if (size > 0 ){
	    $('#reglaTbl > tbody  > tr').each(function() {	    
		    var edit = "<td><a onclick='editRegla("+ reglas[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
		    var remove = "<td><a onclick='fnOpenCloseDialog(3,"+ reglas[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
		    j++;
		    var tr = $(this);
		    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
	    });
	}
}


function editParametro( code, index ){
	parametroIndex = index;
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/parametro/" + code;	
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	var idParametro = hrefArray[hrefArray.length -1];
	    	$( "#nameParametro" ).val(json.name);
			$( "#valueParametro" ).val(json.value);			
			$("#idParametro").attr('value', idParametro);
			$("#btnParametro").html("Actualizar Parametro");			
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	var strRule = window.location.protocol + "//" + window.location.host + "/cabin-web/parametro/"+code+"/status";
	$.ajax({
		async:false,
	    url:strRule,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	var idStat = hrefArray[hrefArray.length -1];
	    	var statusHtml = $("#statusParametro li a");
	    	$(statusHtml).parents(".dropdown").find('.btn').html(json.name + ' <span class="caret"></span>');
	    	$(statusHtml).parents(".dropdown").find('.btn').attr('value', idStat);
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
}

function editBonificacion( code, index ){
	bonificacionIndex = index;
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/bonificacion/" + code;	
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	var idBonificacion = hrefArray[hrefArray.length -1];
	    	$( "#nameBonificacion" ).val(json.name);
			$( "#experienceAmountBonificacion" ).val(json.experienceAmount);			
			$( "#fractionToGiveBonificacion" ).val(json.fractionToGive);
			$("#idBonificacion").attr('value', idBonificacion);
			$("#btnBonificacion").html("Actualizar Bonificacion");			
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	var strRule = window.location.protocol + "//" + window.location.host + "/cabin-web/bonificacion/"+code+"/status";
	$.ajax({
		async:false,
	    url:strRule,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	var idStat = hrefArray[hrefArray.length -1];
	    	var statusHtml = $("#statusBonificacion li a");
	    	$(statusHtml).parents(".dropdown").find('.btn').html(json.name + ' <span class="caret"></span>');
	    	$(statusHtml).parents(".dropdown").find('.btn').attr('value', idStat);
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
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

function deleteBonificacion( code, index ){		
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + 2;
	var strUrlBonificacion = window.location.protocol + "//" + window.location.host + "/cabin-web/bonificacion/"+code+"/status";
	console.log("Inside deleteBonificacion" + code);
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlBonificacion,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado a Bonificacion" + code);
	    	bonificaciones[index].status = "Inactivo";
	    	fillBonificaciontbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }	    
	});			
}



function deleteParametro( code, index ){		
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + 2;
	var strUrlParametro = window.location.protocol + "//" + window.location.host + "/cabin-web/parametro/"+code+"/status";
	console.log("Inside deleteParametro" + code);
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlParametro,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado a Parametro" + code);
	    	parametros[index].status = "Inactivo";
	    	fillParametrotbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }	    
	});			
}


function deleteRegla( code, index ){		
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + 2;
	var strUrlRegla = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_puntuacion/"+code+"/status";
	console.log("Inside deleteRegla" + code);
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlRegla,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado a Regla" + code);
	    	reglas[index].status.name = "Inactivo";
	    	fillReglatbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }	    
	});			
}


function saveBonificacion(){	
	var idBonificacion = $("#idBonificacion").attr("value");
	console.log("Inside form-bonificacion " + idBonificacion);
	var bonificacion = {};
	bonificacion.name = trim( $( "#nameBonificacion" ).val() );
	bonificacion.experienceAmount = trim( $( "#experienceAmountBonificacion" ).val() );
	bonificacion.fractionToGive = trim( $( "#fractionToGiveBonificacion" ).val() );
	$( "#nameBonificacion" ).val("");	$( "#experienceAmountBonificacion" ).val("");
	$( "#fractionToGiveBonificacion" ).val("");
	var statusHtml = $("#statusBonificacion li a");	
	var idStatus = $(statusHtml).parents(".dropdown").find('.btn').val();
	$(statusHtml).parents(".dropdown").find('.btn').html('Activo <span class="caret"></span>');
	$(statusHtml).parents(".dropdown").find('.btn').val("1");
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/post/bonus";
	
	bonificacion.status = {};
	bonificacion.status.id = idStatus;
	
	if (idBonificacion !== "") {		
		bonificacion.id = idBonificacion;		
		bonificaciones.splice(bonificacionIndex, 1, bonificacion);
		bonificacionIndex = -1;		
	}		
	console.log(JSON.stringify(bonificacion));
	$.ajax({
		type: "POST",
	    url:strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(bonificacion), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a bonificacion into DB");			    	
	    	if (idBonificacion != ""){
	    		$("#btnBonificacion").html("Nueva Bonificación");
	    		$("#idBonificacion").attr("value", "");
	    	}			    	
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },	
	    complete: function(xhr) {
	    	fillArrayBonificacion();
	    }
	});
	
}


function saveParametro(){	
	var idParametro = $("#idParametro").attr("value");
	console.log("Inside form-parametro " + idParametro);
	var parametro = {};
	parametro.name = trim( $( "#nameParametro" ).val() );
	parametro.value = trim( $( "#valueParametro" ).val() );
	$( "#nameParametro" ).val("");	$( "#valueParametro" ).val("");		
	var statusHtml = $("#statusParametro li a");	
	var idStatus = $(statusHtml).parents(".dropdown").find('.btn').val();
	$(statusHtml).parents(".dropdown").find('.btn').html('Activo <span class="caret"></span>');
	$(statusHtml).parents(".dropdown").find('.btn').val("1");
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/post/parameter";
	
	parametro.status = {};
	parametro.status.id = idStatus;
	
	if (idParametro !== "") {		
		parametro.id = idParametro;		
		parametros.splice(parametroIndex, 1, parametro);
		parametroIndex = -1;		
	}		
	console.log(JSON.stringify(parametro));
	$.ajax({
		type: "POST",
	    url:strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(parametro), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a parametro into DB");			    	
	    	if (idParametro != ""){
	    		$("#btnParametro").html("Nuevo Parametro");
	    		$("#idParametro").attr("value", "");
	    	}			    	
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },	
	    complete: function(xhr) {
	    	fillArrayParametro();
	    }
	});
	
}


function saveRegla(){
	var idRegla = $("#idRegla").attr("value");
	console.log("Inside form-regla " + idRegla);
	var regla = {}; var newRegla = 1;
	regla.status = {};
	regla.level = {};
	regla.name = trim( $( "#nameReglaPunt" ).val() );
	regla.rechargingFraction = trim( $( "#rechargingFraction" ).val() );
	regla.points = trim( $( "#pointsReglaPunt" ).val() );
	var statusHtml = $("#status li a");
	var regla_nivelHtml = $("#regla_nivel li a");
	var idStatus = $(statusHtml).parents(".dropdown").find('.btn').val();			
	var idNivel = $(regla_nivelHtml).parents(".dropdown").find('.btn').val();
	$( "#nameReglaPunt" ).val(""); $( "#status" ).val("");
	$( "#rechargingFraction" ).val("");	$( "#pointsReglaPunt" ).val("");
	$(statusHtml).parents(".dropdown").find('.btn').html('Activo <span class="caret"></span>');
	$(statusHtml).parents(".dropdown").find('.btn').val("1");	   
	$(regla_nivelHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(regla_nivelHtml).parents(".dropdown").find('.btn').val("");
	//$("#numberPcs").val(""); $("#numberConsoles").val("");
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/post/punctuation_rule";			
	if (idRegla !== "") {
		regla.id = idRegla; newRegla = 0;
		if( idStatus == estados[0].id)
			regla.status.name = idStatus;
		else
			regla.status.name = estados[1].name;				
		regla.status.id = idStatus;
		var length = niveles.length;
		for ( i = 0; i< length ; i++){
			if (idNivel == niveles[i].id ){
				regla.level.name = niveles[i].name; break
			}
		}
		regla.level.id = idNivel;
		reglas.splice(reglaIndex, 1, regla);
		fillReglatbl();
	}						 
	console.log(JSON.stringify(regla));
	$.ajax({
		async: false,
		type: "POST",
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
	    	associateStatus(data.id, idStatus, idNivel, newRegla);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
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
                niveles[i].estado,
        ] ).draw( false );
	};
	if (size > 0 ){
	    $('#nivelTbl > tbody  > tr').each(function() {	  
	    	var zoom = "<td><a onclick='openImageNivel("+niveles[j].id+","+j+")'><i class='fa fa-search-plus icons' title='Ver'></i></a></td>";
	    	var edit = "<td><a onclick='editNivel("+ niveles[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
		    var remove = "<td><a onclick='fnOpenCloseDialog(4,"+ niveles[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
		    j++;
		    var tr = $(this);
		    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
		    tr.find('td:last').after(zoom);
	    });
	}
}

function openImageNivel( code, index ){	
	return;
}

function editNivel( code, index ){
	nivelIndex = index;
	var hostname = window.location.protocol + "//" + window.location.host ; 
	var strUrl = hostname + "/cabin-web/nivel/" + code;	
	$.ajax({
		async:false,
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
	strUrl = hostname + "/cabin-web/nivel/" + code+"/status";
	var idStatus;
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	idStatus = hrefArray[hrefArray.length -1];
	    	var statusHtml = $("#statusNivel li a");			
			statusHtml.parents(".dropdown").find('.btn').html( json.name +' <span class="caret"></span>');				
			statusHtml.parents(".dropdown").find('.btn').val( idStatus);
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	
}

function deleteNivel( code, index ){		
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + 2;
	var strUrlNivel = window.location.protocol + "//" + window.location.host + "/cabin-web/nivel/"+code+"/status";
	console.log("Inside deleteSede" + code);
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlNivel,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado a Nivel" + code);
	    	niveles[index].estado = "Inactivo";
	    	fillNiveltbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
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
	var statusHtml = $("#statusNivel li a");	
	var idStatus = $(statusHtml).parents(".dropdown").find('.btn').val();
	$(statusHtml).parents(".dropdown").find('.btn').html('Activo <span class="caret"></span>');
	$(statusHtml).parents(".dropdown").find('.btn').val("1");
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/nivel";			
	if (idNivel !== "") {
		strUrl += "/" + idNivel;
		nivel.id = idNivel;
		if( idStatus == estados[0].id){
			nivel.estado = estados[0].name; console.log(nivel.estado);}
		else{
			nivel.estado = estados[1].name; }	
		niveles.splice(nivelIndex, 1, nivel);
		nivelIndex = -1;
		fillNiveltbl();
	}		
	console.log(JSON.stringify(nivel));
	$.ajax({
		async: false,
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
	    complete: function(xhr) {	    	
	    	var strLocation = xhr.getResponseHeader('Location');
	    	if(idNivel == ""){
	    		var hrefArray = strLocation.split("/");
	    		idNivel = hrefArray[hrefArray.length -1];
	    	}	    	
	    }
	});
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + idStatus;	
	var strUrlNivel = window.location.protocol + "//" + window.location.host + "/cabin-web/nivel/"+idNivel+"/status";
	//Se inserta el estado en la Sede	
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlNivel,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado a nivel" + idNivel);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },	 
	    complete: function() {
	    	fillArrayNivel();	    	
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
                premios[i].level,
                premios[i].status,
        ] ).draw( false );
	};
	if (size > 0 ){
	    $('#premioTbl > tbody  > tr').each(function() {	    
		    var edit = "<td><a onclick='editPremio("+ premios[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
		    var remove = "<td><a onclick='fnOpenCloseDialog(5,"+ premios[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
		    j++;
		    var tr = $(this);
		    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
	    });
	}
}

function editPremio( code, index ){
	premioIndex = index;
	var hostname = window.location.protocol + "//" + window.location.host ;
	var strUrl = hostname + "/cabin-web/get/prizesRule";	
	$.ajax({		
	    url:strUrl,
	    data:{id: code},
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$( "#namePrize" ).val(json.name);
			$( "#balanceFraction" ).val(json.balanceFraction);
			$( "#pointsPrize" ).val(json.points);			
			$("#idPremio").attr('value', json.id);
			var levelHtml = $("#premio_nivel li a");			
			levelHtml.parents(".dropdown").find('.btn').html( json.level.name +' <span class="caret"></span>');				
			levelHtml.parents(".dropdown").find('.btn').val( json.level.id);
			var statusHtml = $("#statusPremio li a");			
			statusHtml.parents(".dropdown").find('.btn').html( json.status.name +' <span class="caret"></span>');				
			statusHtml.parents(".dropdown").find('.btn').val( json.status.id);
			$("#btnPremio").html("Actualizar Premio");			
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function deletePremio( code, index ){
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + 2;
	var strUrlPremio = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_premio/"+code+"/status";
	console.log("Inside deletePremio" + code);
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlPremio,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado a Premio" + code);
	    	premios[index].estado = "Inactivo";
	    	fillPremiotbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }	    
	});	
}

function deleteCliente( code, index ){
	var hostname = window.location.protocol + "//" + window.location.host;
	var strUrlStatus = hostname + "/cabin-web/estado/" + 2;
	var strUrlCustomer = hostname + "/cabin-web/cliente/"+code+"/status";
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
	var levelHtml = $("#premio_nivel li a");	
	var idLevel = $(levelHtml).parents(".dropdown").find('.btn').val();
	$(levelHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(levelHtml).parents(".dropdown").find('.btn').val("");
	var statusHtml = $("#statusPremio li a");	
	var idStatus = $(statusHtml).parents(".dropdown").find('.btn').val();
	$(statusHtml).parents(".dropdown").find('.btn').html('Activo <span class="caret"></span>');
	$(statusHtml).parents(".dropdown").find('.btn').val("1");

	premio.status = {};
	premio.status.id = idStatus;
	premio.level = {};
	premio.level.id = idLevel;
	
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/post/prizesRule";			
	if (idPremio !== "") {	
		premio.id = idPremio;
		premios.splice(premioIndex, 1, premio);
	}						
	console.log(JSON.stringify(premio));
	$.ajax({
		type:"POST",
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
	    complete: function(xhr) {	    	
	    	fillArrayPremio()    	
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
	                }else if (val == "9") {
	                	deleteParametro(code, index);
	                }else if (val == "10") {
	                	deleteBonificacion(code, index);
	                }
	                
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
	                }else if (val == '9'){
	                	saveParametro();
	                }else if (val == '10'){
	                	saveBonificacion();
	                }
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
        },
        open: function() { $(".ui-dialog :button").blur(); }
    });
}



function fillRule(idRegla, name, rechargingFraction, points){
	var strRule = window.location.protocol + "//" + window.location.host + "/cabin-web/regla_puntuacion/"+idRegla+"/status";
	var status = {}; var level = {};
	$.ajax({
		async:false,
	    url:strRule,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {	
	    	//var hrefArray = json._links.self.href.split("/");
	    	//idStatus = hrefArray[hrefArray.length -1];
	    	status.name = json.name;
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
	    	level.name = json.name;
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

function fillCliente(idCliente, name, lastname, email, gender, birthDate, balance, points, experience){
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
		lastname: lastname,
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


function saveCliente(){
	var hostname = window.location.protocol + "//" + window.location.host;
	var idCustomer = $("#idCliente").attr("value");
	var idUser;	
	var customer = {};
	customer.user = {}; 
	customer.status = {};	
	customer.level = {};
	customer.docType = {};
	console.log("Inside form-cliente " + idCustomer);
	if (idCustomer !== "") {
		customer.id = idCustomer;
		var strUsuario = hostname + "/cabin-web/cliente/" + idCustomer+"/user";		
		$.ajax({
			async:false,
		    url:strUsuario,
		    crossDomain: true,
		    dataType: "json",
		    success: function (json) {
		    	var hrefArray = json._links.self.href.split("/");
		    	idUser = hrefArray[hrefArray.length -1];
		    	customer.user.id = idUser;
		    },
		    error: function (xhr, status) {    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    }
		});	
	}	
	
	var genderHtml = $("#genderCustomer li a");	
	var gender = $(genderHtml).parents(".dropdown").find('.btn').val();
	
	var statusHtml = $("#statusCustomer li a");	
	var idStatus = $(statusHtml).parents(".dropdown").find('.btn').val();
	
	var nivelCustomerHtml =  $("#nivelCustomer li a");	
	var idNivel= $(nivelCustomerHtml).parents(".dropdown").find('.btn').val();
	
	var docTypeHtml =  $("#docTypeCustomer li a");	
	var idDocType = $(docTypeHtml).parents(".dropdown").find('.btn').attr("value");	
		
	customer.name = trim( $( "#nameCustomer" ).val() );
	customer.lastname = trim( $( "#lastnameCustomer" ).val() );
	customer.email = trim( $( "#emailCustomer" ).val() );
	customer.birthDate = trim( $("#birthDateCustomer").val() ) ;
	customer.docCode =  trim( $( "#docCodeCustomer" ).val());
	customer.docType.id = idDocType;	
	customer.gender = gender;
	customer.level.id = idNivel;
	customer.status.id = idStatus;
	customer.balance = trim( $( "#balanceCustomer" ).val() );
	customer.points = trim( $( "#pointsCustomer" ).val() );;
	customer.experience = trim( $( "#experienceCustomer" ).val() );;
	customer.user.pass = trim( $( "#passwordCustomer" ).val() );
	customer.user.name = trim( $( "#emailCustomer" ).val() );
	
	$( "#nameCustomer" ).val(""); 
	$( "#passwordCustomer" ).val("");
	$( "#confirmPasswordCustomer" ).val("");
	$( "#emailCustomer" ).val("");	
	$( "#birthDateCustomer" ).val("");
	$( "#balanceCustomer" ).val("");
	$( "#pointsCustomer" ).val("");
	$( "#experienceCustomer" ).val(""); 
	$( "#lastnameCustomer" ).val("");
	$( "#docCodeCustomer" ).val("");
	
	$(genderHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(genderHtml).parents(".dropdown").find('.btn').val("");
	$(docTypeHtml).parents(".dropdown").find('.btn').html(tipo_doc[0].name +' <span class="caret"></span>');
	$(docTypeHtml).parents(".dropdown").find('.btn').val("1");
	$(statusHtml).parents(".dropdown").find('.btn').html('Activo <span class="caret"></span>');
	$(statusHtml).parents(".dropdown").find('.btn').val("1");
	$(nivelCustomerHtml).parents(".dropdown").find('.btn').html( niveles[0].name + ' <span class="caret"></span>');
	$(nivelCustomerHtml).parents(".dropdown").find('.btn').val("1");
	
	var strUrl = hostname + "/cabin-web/post/client";
	console.log(JSON.stringify(customer));
	$.ajax({
		async: true,
		type: "POST",
	    url: strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(customer), 
	    contentType: 'application/json',	    
	    success: function (data) {
	    	console.log("Send a user into DB");
	    	$('#emailCustomer').prop('disabled', false);
	    	$('#docCodeCustomer').prop('disabled', false);
	    	$('#docTypeButtonCustomer').removeClass('disabled');
	    	if (data.id != ""){
	    		$("#btnCliente").html("Nuevo Cliente");
	    		$("#idCliente").attr("value", "");
	    	}
	    	fillArrayCliente();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	
}

function saveEmpleado(){
	var hostname = window.location.protocol + "//" + window.location.host;
	var idUser;
	var employee = {};
	employee.docType = {};
	employee.status = {};
	employee.user = {};
	employee.user.profile = {};
	
	var idEmpleado = $("#idEmpleado").attr("value");
	if (idEmpleado !== "") {
		employee.id = idEmpleado;
		var strUsuario = hostname + "/cabin-web/empleado/" + idEmpleado+"/user";		
		$.ajax({
			async:false,
		    url:strUsuario,
		    crossDomain: true,
		    dataType: "json",
		    success: function (json) {
		    	var hrefArray = json._links.self.href.split("/");
		    	idUser = hrefArray[hrefArray.length -1];
		    	employee.user.id = idUser;
		    },
		    error: function (xhr, status) {    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    }
		});	
	}
	console.log("Inside form-empleado " + idEmpleado);
	
	var genderHtml = $("#genderEmployee li a");	
	var gender = $(genderHtml).parents(".dropdown").find('.btn').val();
	
	var statusHtml = $("#statusEmployee li a");	
	var idStatus = $(statusHtml).parents(".dropdown").find('.btn').val();
	
	var profileHtml = $("#profileEmployee li a");	
	var idPerfil = $(profileHtml).parents(".dropdown").find('.btn').val();
	
	var docTypeHtml =  $("#docType li a");	
	var idDocType = $(docTypeHtml).parents(".dropdown").find('.btn').attr("value");	
	
	employee.name = trim( $( "#nameEmployee" ).val());
	employee.lastname = trim( $( "#lastnameEmployee" ).val());
	employee.email = trim( $( "#emailEmployee" ).val());
	employee.docType.id = idDocType;
	employee.docCode =  trim( $( "#docCode" ).val());
	employee.birthDate = trim( $( "#birthDateEmployee" ).val());
	employee.gender = gender;
	employee.status.id = idStatus;
	employee.user.pass = trim( $( "#passwordEmployee" ).val());
	employee.user.name = trim( $( "#emailEmployee" ).val());
	employee.user.profile.id = idPerfil;
	
	$( "#nameEmployee" ).val("");
	$( "#lastnameEmployee" ).val("");
	$( "#passwordEmployee" ).val("");
	$( "#confirmPasswordEmployee" ).val("");
	$( "#emailEmployee" ).val("");
	$( "#birthDateEmployee" ).val("");
	$( "#docCode" ).val("");
	
	$(genderHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(genderHtml).parents(".dropdown").find('.btn').val("");
	$(docTypeHtml).parents(".dropdown").find('.btn').html(tipo_doc[0].name +' <span class="caret"></span>');
	$(docTypeHtml).parents(".dropdown").find('.btn').val("1");
	$(statusHtml).parents(".dropdown").find('.btn').html('Activo <span class="caret"></span>');
	$(statusHtml).parents(".dropdown").find('.btn').val("1");
	$(profileHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(profileHtml).parents(".dropdown").find('.btn').val("");
	
	var strSaveEmployee = window.location.protocol + "//" + window.location.host + "/cabin-web/post/employee";
	console.log(JSON.stringify(employee));
	
	$.ajax({
		async: true,
		type: "POST", 
	    url: strSaveEmployee,
	    dataType: 'json',
	    data: JSON.stringify(employee),
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a employee into DB");
	    	$('#emailEmployee').prop('disabled', false);
	    	$('#docCode').prop('disabled', false);
	    	$('#docTypeButton').removeClass('disabled');
	    	if (data.id != ""){
	    		$("#btnEmpleado").html("Nuevo Empleado");
	    		$("#idEmpleado").attr("value", "");
	    	}
	    	fillArrayEmpleado();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
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
	    	$( "#lastnameCustomer" ).val(json.lastname);
			$( "#emailCustomer" ).val(json.email);			
			$( "#docCodeCustomer" ).val(json.docCode);
			$( "#balanceCustomer" ).val(json.balance);
			$( "#pointsCustomer" ).val(json.points);
			$( "#experienceCustomer" ).val(json.experience);			
			$("#birthDateCustomer").val(json.birthDate);			
			$("#idCliente").attr('value', idCliente);
			$("#btnCliente").html("Actualizar Cliente");	
			var genderHtml = $("#genderCustomer li a");
			if ( json.gender == "M"){
				genderHtml.parents(".dropdown").find('.btn').html( 'Masculino <span class="caret"></span>');				
				genderHtml.parents(".dropdown").find('.btn').val("M");				
			}
			else{
				genderHtml.parents(".dropdown").find('.btn').html( 'Femenino <span class="caret"></span>');				
				genderHtml.parents(".dropdown").find('.btn').val("F");
			}
			$('#docTypeButtonCustomer').addClass('disabled');			
			$('#docCodeCustomer').prop('disabled', true);
			$( "#emailCustomer" ).prop('disabled', true);	
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
	var strDocType = hostname + "/cabin-web/cliente/" + code+"/docType";
	var idDocType;
	$.ajax({
		async:false,
	    url:strDocType,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	idDocType = hrefArray[hrefArray.length -1];
	    	var docTypeHtml = $("#docTypeCustomer li a"); 
			docTypeHtml.parents(".dropdown").find('.btn').val(idDocType);
			if ( idDocType == 1){
				docTypeHtml.parents(".dropdown").find('.btn').html( 'DNI <span class="caret"></span>');
			}else if ( idDocType == 2){
				docTypeHtml.parents(".dropdown").find('.btn').html( 'RUC <span class="caret"></span>');
		    }else if ( idDocType == 3){
				docTypeHtml.parents(".dropdown").find('.btn').html( 'PASAPORTE <span class="caret"></span>');
			}else if ( idDocType == 4){
				docTypeHtml.parents(".dropdown").find('.btn').html( 'OTROS <span class="caret"></span>');	
			}
			docTypeHtml.parents(".disabled").find('.btn').attr("value", idDocType);
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
	    	$( "#lastnameEmployee" ).val(json.lastname);
			$( "#emailEmployee" ).val(json.email);
			$( "#docCode" ).val(json.docCode);
			$("#birthDateEmployee").val(json.birthDate);			
			$("#idEmpleado").attr('value', idEmployee);
			$("#btnEmpleado").html("Actualizar Empleado");	
			var genderHtml = $("#genderEmployee li a");
			if ( json.gender == "M"){
				genderHtml.parents(".dropdown").find('.btn').html( 'Masculino <span class="caret"></span>');				
				genderHtml.parents(".dropdown").find('.btn').val("M");				
			}
			else{
				genderHtml.parents(".dropdown").find('.btn').html( 'Femenino <span class="caret"></span>');				
				genderHtml.parents(".dropdown").find('.btn').val("F");
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
	var strDocType = hostname + "/cabin-web/empleado/" + code+"/docType";
	var idDocType;
	$.ajax({
		async:false,
	    url:strDocType,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	idDocType = hrefArray[hrefArray.length -1];
	    	var docTypeHtml = $("#docType li a"); 
			docTypeHtml.parents(".dropdown").find('.btn').val(idDocType);
			if ( idDocType == 1){
				docTypeHtml.parents(".dropdown").find('.btn').html( 'DNI <span class="caret"></span>');
			}else if ( idDocType == 2){
				docTypeHtml.parents(".dropdown").find('.btn').html( 'RUC <span class="caret"></span>');
		    }else if ( idDocType == 3){
				docTypeHtml.parents(".dropdown").find('.btn').html( 'PASAPORTE <span class="caret"></span>');
			}else if ( idDocType == 4){
				docTypeHtml.parents(".dropdown").find('.btn').html( 'OTROS <span class="caret"></span>');	
			}
			docTypeHtml.parents(".disabled").find('.btn').attr("value", idDocType);
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
	var employee, email, status;
	var strUrl = hostname + "/cabin-web/sede/"+idSede+"/status";
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
	strUrl = hostname + "/cabin-web/empleado/search/findByEmail?email=" + email;
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
	sedes.push({
		id: idSede,
		name: name,
		address: address,
		employee: employee,
		estado: status,
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
	clientes.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/cliente/";
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json._embedded.cliente, function(index, value) {		    		
	    		var hrefArray = value._links.self.href.split("/");
		    	var idCliente = hrefArray[hrefArray.length -1];
		    	fillCliente(idCliente, value.name, value.lastname, value.email,  
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
	empleados.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allEmployees/";
	var docName;
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json, function(index, value) {		    		
	    		empleados.push({
	    			id: value.id,
	    			name: value.name,
	    			lastname: value.lastname,
	    			email: value.email,
	    			gender: value.gender,
	    			docTypeName: value.docType.name,	    			
	    			docCode: value.docCode,
	    			birthDate: value.birthDate,
	    			estado: value.status.name,
	    			perfil: value.user.profile.name,		 
	    		});			
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
	var length = tarifas.length;
	tarifas.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allTariff/";		
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json, function(index, value) {
	    		fillTarifa(value.id, value.description,value.price);				
			});
	    	fillTarifatbl();
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function fillTarifa(idTarifa, description, price){
	var hostname = window.location.protocol + "//" + window.location.host 
	var status;	
	var strUrl = hostname + "/cabin-web/tarifa/"+idTarifa+"/status";
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
	tarifas.push({
		id: idTarifa,
		description: description,
		price: price,
		estado: status,				 
	});
}

function fillArrayTarifaDetails(idTariff){
	$("#listaTarifasDiv").hide();
	$("#listaDetailTariffDiv").show();
	var length = tariffDetails.length;
	tariffDetails.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allTariffDetails/";		
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    data: {id : idTariff},
	    dataType: "json",
	    success: function (json) {
	    	if (json.length > 0) {
	    		$.each(json, function(index, value) {		    		
		    		tariffDetails.push({
						id: value.id,
						days: value.days,
						price: value.price,
						startTime: value.startTime,
						endTime: value.endTime,
					});
				});
	    		fillTariffDetailstbl();
	    	}
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}


function fillArrayBonificacion(){
	var length = bonificaciones.length;
	bonificaciones.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allBonus/";				
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json, function(index, value) {		    	
				bonificaciones.push({
					id: value.id,
					name: value.name,
					experienceAmount: value.experienceAmount,
					fractionToGive: value.fractionToGive,
					status: value.status.name,		
				});
			});
	    	fillBonificaciontbl();		    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function fillArrayParametro(){
	var length = parametros.length;
	parametros.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allParameters/";		
	$.ajax({		
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json, function(index, value) {		    		
	    		parametros.push({
	    			id: value.id,
	    			name: value.name,
	    			value: value.value,		
	    			status: value.status.name,		
	    		});
			});
	    	fillParametrotbl();		    	
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

function fillNivel(idNivel,	name, initialExperience, finalExperience, question){
	var status;	
	var hostname = window.location.protocol + "//" + window.location.host ;
	var strUrl = hostname + "/cabin-web/nivel/"+idNivel+"/status";
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
	niveles.push({
		id: idNivel,
		name: name,
		initialExperience: initialExperience,
		finalExperience: finalExperience,
		question: question,		
		estado: status,				 
	});
	
}

function fillArrayNivel(){
	var length = niveles.length;
	niveles.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/nivel/";
	var ulRegla = $("#regla_nivel");
	var ulExperience = $("#experience_nivel");
	var ulCustomer = $("#nivelCustomer");
	var ulPrizesRule = $("#premio_nivel");
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
		    	fillNivel(idNivel, value.name, value.initialExperience, value.finalExperience,
						value.question);				
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
	    	ulPrizesRule.html(line);
	    	var nivelCustomerHtml =  $("#nivelCustomer li a");
	    	var menorNivel = "Seleccionar";
	    	var menor = 999999999; 
	    	var idMenorNivel = 0;
	    	length = niveles.length;
	    	for ( var i = 0 ; i < length ; i++){
	    		if ( niveles[i].initialExperience < menor && niveles[i].estado == "Activo"){
	    			menor =  niveles[i].initialExperience;
	    			menorNivel = niveles[i].name;
	    			idMenorNivel = niveles[i].id;
	    		}
	    	}
	    	$(nivelCustomerHtml).parents(".dropdown").find('.btn').html( menorNivel + ' <span class="caret"></span>');
	    	$(nivelCustomerHtml).parents(".dropdown").find('.btn').val( idMenorNivel);
	    }
	});
}


function fillArrayPremio(){
	var length = premios.length;
	premios.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allPrizesRules/";			
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json, function(index, value) {		    		
	    		premios.push({
	    			id: value.id,
	    			name: value.name,
	    			balanceFraction: value.balanceFraction,
	    			points: value.points,
	    			level: value.level.name,
	    			status: value.status.name,
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
	var ulDocTypeEmployee = $("#docType");
	var ulDocTypeCustomer = $("#docTypeCustomer");
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
	    	ulDocTypeEmployee.html(line);
	    	ulDocTypeCustomer.html(line);
	    	
	    	var docTypeHtml =  $("#docType li a");	    	
	    	$(docTypeHtml).parents(".dropdown").find('.btn').html(tipo_doc[0].name +' <span class="caret"></span>');
	    	$(docTypeHtml).parents(".dropdown").find('.btn').val("1");
	    	
	    	docTypeHtml =  $("#docTypeCustomer li a");	    	
	    	$(docTypeHtml).parents(".dropdown").find('.btn').html(tipo_doc[0].name +' <span class="caret"></span>');
	    	$(docTypeHtml).parents(".dropdown").find('.btn').val("1");
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
	if (size > 0 ){
	    $('#experienceTbl > tbody  > tr').each(function() {	    
		    var edit = "<td><a onclick='editExperience("+ experiences[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
		    var remove = "<td><a onclick='fnOpenCloseDialog(8,"+ experiences[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
		    j++;
		    var tr = $(this);
		    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
	    });
	}
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
	
	$(statusHtml).parents(".dropdown").find('.btn').html('Activo <span class="caret"></span>');
	$(statusHtml).parents(".dropdown").find('.btn').val("1");	   
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
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + 2;
	var strUrlExperiencia = window.location.protocol + "//" + window.location.host + "/cabin-web/experiencia/"+code+"/status";
	console.log("Inside deleteExperiencia" + code);
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlExperiencia,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado a Experiencia" + code);
	    	experiences[index].status = "Inactivo";
	    	fillExperiencetbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
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

$(document).on("click", "#docTypeCustomer li a", function(){
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
	//Correr el arreglo para ver cual es el id y nombre del nivel
	var length = niveles.length;
	for ( i = 0; i< length ; i++){
		if (level == niveles[i].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(niveles[i].id);}
	}	
} )

$(document).on("click", "#premio_nivel li a", function(){
	console.log("Entro aqui: " + $(this).text() );
	var level = $(this).text();
	level = level.toLowerCase();
	$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	//Correr el arreglo para ver cual es el id y nombre del nivel
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
	  //Correr el arreglo para ver cual es el id y nombre del nivel
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
	valid = valid && checkRequired( $("#priceTariff"), "Debe ingresar la descripción de la tarifa.",1, tarifaValidation);
	valid = valid && checkRegexp( $("#priceTariff"), /^[0-9]\d{0,3}($|\.\d{0,2}$)/i, "Debe ingresar un monto válido, no mayor de 999.99 soles y de dos decimales.", tarifaValidation );
	
	if (daysTarifa.length > 0) {
		valid = valid && checkRequired( $("#startTime"), "Debe ingresar la hora de inicio en el formato de 24 horas, por ejemplo: 10:00.",1, tarifaValidation);
		valid = valid && checkRegexp( $("#startTime"), /([01]\d|2[0-3]):([0-5]\d)/ , "La hora de inicio ingresada no es válida, formato permitido desde 00:00 hasta 23:59.",  tarifaValidation);
		valid = valid && checkRequired( $("#endTime"), "Debe ingresar la hora de fin en el formato de 24 horas, por ejemplo: 10:00.",1, tarifaValidation);
		valid = valid && checkRegexp( $("#endTime"), /([01]\d|2[0-3]):([0-5]\d)/ , "La hora de fin no es válida, formato permitido desde 00:00 hasta 23:59.",  tarifaValidation);
		valid = valid && checkRegexp( $("#price"), /^[0-9]\d{0,3}($|\.\d{0,2}$)/i, "Debe ingresar un monto válido, no mayor de 999.99 soles y de dos decimales.", tarifaValidation );
		
		var startStr = trim( $( "#startTime" ).val());
		var endStr = trim( $( "#endTime" ).val());
		var arrayStartTime = startStr.split(':');
		var arrayEndTime = endStr.split(':'); 
		var startTime = new Date();
		startTime.setHours(arrayStartTime[0]-5);
		startTime.setMinutes(arrayStartTime[1]);
		var endTime = new Date();
		endTime.setHours(arrayEndTime[0]-5);
		endTime.setMinutes(arrayEndTime[1]);
		if ( startTime.getTime() >= endTime.getTime() ){
			$("#startTime").addClass( "ui-state-error" );
			$("#endTime").addClass( "ui-state-error" );
			updateTips( "La hora de inicio no puede ser mayor que la hora de fin", tarifaValidation );
			valid = false;
		}
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

function addParametro() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
	valid = valid && checkRequired( $("#nameParametro"), "Debe ingresar el nombre del parametro.",1, parametroValidation);
	valid = valid && checkRequired( $("#valueParametro"), "Debe ingresar el valor del parametro.",1, parametroValidation);	
	var statusHtml = $("#statusParametro li a");		
	statusHtml = $(statusHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( statusHtml, "Debe seleccionar un estado.",1, parametroValidation);	
	return valid;
}


function addBonificacion() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
	valid = valid && checkRequired( $("#nameBonificacion"), "Debe ingresar el nombre de la bonificacion.",1, bonificacionValidation);
	valid = valid && checkRequired( $("#experienceAmountBonificacion"), "Debe ingresar una cantidad de experiencia.",1, bonificacionValidation);
	valid = valid && checkRegexp( $("#experienceAmountBonificacion"), /^[0-9]\d{0,5}$/i, "Debe ingresar una cantidad de puntos no mayor de 999 999, valor entero.", bonificacionValidation);
	valid = valid && checkRequired( $("#fractionToGiveBonificacion"), "Debe ingresar el valor de la fracción a otorgar.",1, bonificacionValidation);
	valid = valid && checkRegexp( $("#fractionToGiveBonificacion"), /^[0-9]\d{0,3}($|\.\d{0,2}$)/i, "Debe ingresar ingresar un monto válido, no mayor de 999.99 soles y de dos decimales.", bonificacionValidation);
	var statusHtml = $("#statusBonificacion li a");		
	statusHtml = $(statusHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( statusHtml, "Debe seleccionar un estado.",1, bonificacionValidation);	
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
	var nivelCustomerHtml = $("#premio_nivel li a");	
	nivelCustomerHtml = $(nivelCustomerHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( nivelCustomerHtml, "Debe seleccionar un nivel.",1, premioValidation);
	var statusHtml = $("#statusPremio li a");		
	statusHtml = $(statusHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( statusHtml, "Debe seleccionar un estado.",1, premioValidation);	
	return valid;
}

function addCliente() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
	valid = valid && checkRequired( $("#nameCustomer"), "Debe ingresar el nombre del cliente.",1, clienteValidation);
	valid = valid && checkRegexp( $("#nameCustomer"), /.+/i, "El nombre ingresado no es válido.",  clienteValidation);
	valid = valid && checkRequired( $("#lastnameCustomer"), "Debe ingresar los apellidos del cliente.",1, clienteValidation);
	valid = valid && checkRegexp( $("#lastnameCustomer"), /.+/i, "Los apellidos ingresados no son válidos.",  clienteValidation);
	valid = valid && checkRequired( $("#birthDateCustomer"), "Debe ingresar la fecha de nacimiento del cliente",1, clienteValidation);
	if(!$("#docCodeCustomer").is(':disabled')) {
		var docTypeHtml = $("#docTypeCustomer li a");		
		docTypeHtml = $(docTypeHtml).parents(".dropdown").find('.btn');
		valid = valid && checkRequired( docTypeHtml, "Debe seleccionar un tipo de documento.",1, clienteValidation);
		//valid = valid && checkRegexp( $("#docCode"), /^[0-9]\d{0,15}$/i, "Debe ingresar número de documento correcto", empleadoValidation);
		if ( $(docTypeHtml).val() == 1) //En caso DNI
			valid = valid && checkRegexp( $("#docCodeCustomer"), /^[0-9]\d{7}$/i, "El DNI ingresado no es válido" , clienteValidation);
		else if( $(docTypeHtml).val() == 2) //En caso RUC
			valid = valid && checkRegexp( $("#docCodeCustomer"), /^[1-9]\d{10}$/i, "El RUC ingresado no es válido", clienteValidation );
	    else if( $(docTypeHtml).val > 2) //En cualquier otro documento
	    	valid = valid && checkRequired($("#docCodeCustomer"),"Debe ingresar el número de documento.",1, clienteValidation);		
	}
	var genderHtml = $("#genderCustomer li a");		
	genderHtml = $(genderHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( genderHtml, "Debe seleccionar un género.",1, clienteValidation);	
	valid = valid && checkRequired($("#emailCustomer"),"Debe ingresar un email.",1, clienteValidation);
	valid = valid && checkRegexp( $("#emailCustomer"), /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/i , "El email ingresado no es válido.", clienteValidation );
	valid = valid && checkRegexp( $("#pointsCustomer"), /^[0-9]\d{0,5}$/i, "Debe ingresar una cantidad de puntos no mayor de 999 999, valor entero.", clienteValidation);
	valid = valid && checkRegexp( $("#experienceCustomer"), /^[0-9]\d{0,5}$/i, "Debe ingresar una cantidad de experiencia no mayor de 999 999, valor entero.", clienteValidation);
	valid = valid && checkRegexp( $("#balanceCustomer"), /^[0-9]\d{0,3}($|\.\d{0,2}$)/i, "Debe ingresar ingresar un monto válido, no mayor de 999.99 soles y de dos decimales.", clienteValidation);
	valid = valid && checkRequired( $("#passwordCustomer"), "Debe ingresar una contraseña de al menos 6 caracteres.",6, clienteValidation);	
	valid = valid && checkRequired( $("#confirmPasswordCustomer"), "Debe confirmar su contrase&ntilde;a.",6, clienteValidation);	
	valid = valid && checkPassword($("#passwordCustomer"), $("#confirmPasswordCustomer"), "Las contraseñas no coinciden",  clienteValidation);	
	var nivelCustomerHtml = $("#nivelCustomer li a");	
	nivelCustomerHtml = $(nivelCustomerHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( nivelCustomerHtml, "Debe seleccionar un nivel.",1, clienteValidation);
	var statusHtml = $("#statusCustomer li a");		
	statusHtml = $(statusHtml).parents(".dropdown").find('.btn');
	valid = valid && checkRequired( statusHtml, "Debe seleccionar un estado.",1, clienteValidation);
	valid = valid && checkEmail( $("#emailCustomer"), "El email ya se encuentra registrado.", clienteValidation);
	if(!$("#docCodeCustomer").is(':disabled')) {
		valid = valid && checkDocCode( $("#docCodeCustomer"), "El número de documento ya se encuentra registrado.", clienteValidation);
	}
	return valid;
}

function addEmpleado() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
	valid = valid && checkRequired( $("#nameEmployee"), "Debe ingresar el nombre del empleado.",1, empleadoValidation);
	valid = valid && checkRegexp( $("#nameEmployee"), /.+/i, "El nombre ingresado no es válido.",  empleadoValidation);
	valid = valid && checkRequired( $("#lastnameEmployee"), "Debe ingresar los apellidos del empleado.",1, empleadoValidation);
	valid = valid && checkRegexp( $("#lastnameEmployee"), /.+/i, "Los apellidos ingresados no son válidos.",  empleadoValidation);
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
	valid = valid && checkRequired( $("#passwordEmployee"), "Debe ingresar una contraseña de al menos seis caracteres.",6, empleadoValidation);	
	valid = valid && checkRequired( $("#confirmPasswordEmployee"), "Debe confirmar su contrase&ntilde;a.",6, empleadoValidation);	
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