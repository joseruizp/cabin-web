/* Author:WebThemez
 * Author URI:http://webthemez.com
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 */
estados = [];
sedes = []; sedeIndex = -1;
tarifas = []; tarifaIndex = -1;
reglas = []; reglaIndex = -1;
niveles = []; nivelIndex = -1;
premios = []; premioIndex = -1;
sedeValidation = ""; tarifaValidation = "";
reglaValidation = ""; nivelValidation = "";
premioValidation = "";
daysTarifa = [];
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
		//Initialize validation divs
		sedeValidation = $("#sedeValidation");
		tarifaValidation = $("#tarifaValidation");
		reglaValidation = $("#reglaValidation");
		nivelValidation = $("#nivelValidation");
		premioValidation = $("#premioValidation");
		//Select
		$("#status li a").click(function(){
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
			bInfo: false,
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
		fillArraySede();
		fillArrayTarifa();
		fillArrayRegla();
		fillArrayNivel();
		fillArrayPremio();
		fillStatus();
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
		$( "#form-tarifa" ).submit(function( event ) {
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
		
		
		 $( '#daysMenu a' ).on( 'click', function( event ) {
		    var $target = $( event.currentTarget ),
		        val = $target.attr( 'data-value' ),
		        $inp = $target.find( 'input' ),
		        idx;

		    if ( ( idx = daysTarifa.indexOf( val ) ) > -1 ) {
			    daysTarifa.splice( idx, 1 );
			    setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
			} else {
			    daysTarifa.push( val );
			    setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
			}

		    $( event.target ).blur();
		    //console.log( daysTarifa );
		    return false;
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
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/sede/" + code;
	sedeIndex = index;
	$.ajax({
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
	console.log("Inside form-tarifa " + idSede);
	var sede = {}; 
	sede.name = trim( $( "#name" ).val() );
	sede.address = trim( $( "#address" ).val() );			
	$( "#name" ).val("");	$( "#address" ).val("");
	//$("#numberPcs").val(""); $("#numberConsoles").val("");
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/sede";			
	if (idSede !== "") {
		strUrl += "/" + idSede;
		sede.id = idSede;
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
	    complete: function() {
	    	if (idSede == ""){
	    		fillArraySede();
	    	}
	    }
	});	
}
function fillTarifatbl(  ){
	var size = tarifas.length;
	var j = 0; var startTime = ""; var endTime = "";
    var t = $('#tarifaTbl').DataTable();
    t.clear();
	for(i=0; i<size;i++){		
		if ( jQuery.type( tarifas[i].startTime ) === "date" ){ 
			startTime = tarifas[i].startTime.toString();
			startTime = startTime.substring(16, 21);
		}
		else{
			startTime = tarifas[i].startTime.substring(11,16);
		}
		if ( jQuery.type( tarifas[i].endTime ) === "date" ){ 
			endTime = tarifas[i].endTime.toString();
			endTime = endTime.substring(16, 21);
		}
		else{
			endTime = tarifas[i].endTime.substring(11,16);
		}
		
		t.row.add( [
                tarifas[i].id,
                tarifas[i].description,
                tarifas[i].days,
                tarifas[i].price,                
                startTime,
                endTime,
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
	console.log("Inside form-tarifa " + idTarifa);
	var tarifa = {};
	tarifa.price =  trim( $( "#price" ).val() );
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
	var description = trim( $( "#descriptionTarifa" ).val() );
	tarifa.startTime = startTime;			
	tarifa.endTime = endTime;
	tarifa.minimumFraction = trim( $( "#minFraction" ).val() );
	tarifa.description = trim( description );
	tarifa.days = days;
	$( "#price" ).val("");	$( "#startTime" ).val("");
	$( "#endTime" ).val("");	$( "#minFraction" ).val("");
	$( "#descriptionTarifa" ).val("");
	setTimeout( function() { $(".checkboxTarifa").prop( 'checked', false ) }, 0);
	daysTarifa.splice(0,length);
	//$("#numberPcs").val(""); $("#numberConsoles").val("");
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/tarifa";			
	if (idTarifa !== "") {
		strUrl += "/" + idTarifa;	
		tarifa.id = idTarifa;
		tarifas.splice(tarifaIndex, 1, tarifa);
		fillTarifatbl();
	}			
	console.log(JSON.stringify(tarifa));
	$.ajax({
		type: idTarifa === "" ? "POST" : "PATCH",
	    url:strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(tarifa), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a tarifa into DB");			    	
	    	if (idTarifa != ""){
	    		$("#btnTarifa").html("Nueva Tarifa");
	    		$("#idTarifa").attr("value", "");
	    	} 
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function() {
	    	if (idTarifa == ""){
	    		fillArrayTarifa();
	    	}
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
                niveles[i].initialPoints,
                niveles[i].finalPoints,                
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
			$( "#initialPoints" ).val(json.initialPoints);
			$( "#finalPoints" ).val(json.finalPoints);
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
	nivel.initialPoints = trim( $( "#initialPoints" ).val() );
	nivel.finalPoints = trim( $( "#finalPoints" ).val() );
	nivel.question = trim( $( "#question" ).val() );
	$( "#nameNivel" ).val("");	$( "#initialPoints" ).val("");
	$( "#finalPoints" ).val("");	$( "#question" ).val("");			
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
				sedes.push({
					id: idSede,
					name: value.name,
					address: value.address
				});
			});
	    	fillSedetbl();		    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function fillArrayTarifa(){
	var length = tarifas.length;
	tarifas.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/tarifa/";		
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json._embedded.tarifa, function(index, value) {		    		
	    		var hrefArray = value._links.self.href.split("/");
		    	var idTarifa = hrefArray[hrefArray.length -1];
				tarifas.push({
					id: idTarifa,
					price: value.price,
					startTime: value.startTime,
					endTime: value.endTime,
					days: value.days,						
					minimumFraction: value.minimumFraction,
					description: value.description,
				});
			});
	    	fillTarifatbl();		    	
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
					initialPoints: value.initialPoints,
					finalPoints: value.finalPoints,
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
	valid = valid && checkRegexp( $("#pointsReglaPunt"), /^[1-9]\d{0,5}$/i, "Debe ingresar una cantidad  de puntos no mayor de 999 999, valor entero.", reglaValidation);
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
	valid = valid && checkRegexp( $("#initialPoints"), /^[1-9]\d{0,5}$/i, "Debe ingresar una cantidad de puntos no mayor de 999 999, valor entero.", nivelValidation);
	valid = valid && checkRegexp( $("#finalPoints"), /^[1-9]\d{0,5}$/i, "Debe ingresar una cantidad de puntos no mayor de 999 999, valor entero.", nivelValidation);
	valid = valid && checkRequired( $("#question"), "Debe ingresar una pregunta.",1, nivelValidation);
	valid = valid && checkRegexp( $("#question"), /.+/i, "La pregunta ingresada para el nivel no es válida.",  nivelValidation);
	var length = niveles.length;
	var startPoint = trim( $( "#initialPoints" ).val() ); var endPoint = trim( $( "#finalPoints" ).val() );
	var idNivel = $("#idNivel").attr("value");
	for ( i = 0; i < length ; i ++){
		if ( i !== nivelIndex )
			valid = isValidRange(startPoint, endPoint, niveles[i].initialPoints, niveles[i].finalPoints);		
		if (!valid){
			$("#initialPoints").addClass( "ui-state-error" );
			$("#finalPoints").addClass( "ui-state-error" );
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