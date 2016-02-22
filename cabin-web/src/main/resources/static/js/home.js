/* Author:WebThemez
 * Author URI:http://webthemez.com
 * License: Creative Commons Attribution 3.0 License (https://creativecommons.org/licenses/by/3.0/)
 */
sedes = [];
(function($){
	$(document).ready(function(){
		var tarifa = 1;
		//Llenar tabla de sedes
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
		
		$( "#form-tarifa" ).submit(function( event ) {
			event.preventDefault();

			var idSede = $("#idSede").val();
			console.log("Inside form-tarifa " + idSede);
			var sede = {};
			sede.name = $( "#name" ).val(),
			sede.address = $( "#address" ).val(),
			sedes.push(sede);
			$( "#name" ).val("");	$( "#address" ).val("");
			$("#numberPcs").val(""); $("#numberConsoles").val("");
			var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/sede";
			
			if (idSede !== "") {
				strUrl += "/" + idSede;
			}
			
			$.ajax({
				type: idSede === "" ? "POST" : "PATCH",
			    url:strUrl,			    
			    dataType: 'json', 
			    data: JSON.stringify(sede), 
			    contentType: 'application/json',
			    success: function (data) {
			    	console.log("Send a sede into DB");
			    },
			    error: function (xhr, status) {	    	
			    	console.log("Error, su solicitud no pudo ser atendida");
			    }
			});	
		});

				
	}); // End document ready
})(this.jQuery);

function fillSedetbl(  ){
	var size = sedes.length;
	var tabla = $("#listaSedesDiv");   var body = tabla.children("tbody");
    var tr_ini = "<tr>"; var tr_fin= "</tr>"; var conjunto = "";  var linea = "";
	for(i=0; i<size;i++){	
	    var tblCode = "<td>" + sedes[i].id + "</td>";      
	    var tblName = "<td>" + sedes[i].name + "</td>";
	    var tblAddress = "<td>" + sedes[i].address + "</td>";
	    var tblNumberPcs = "<td>" + sedes[i].numberPcs + "</td>";
	    var tblNumberConsoles = "<td>" + sedes[i].numberConsoles + "</td>";
	    var edit = "<td><a onclick='editSede("+ code +")'><i class='fa fa-pencil' title='Editar'></i></a></td>";
	    var remove = "<td><a onclick='deleteSede("+ code +")'><i class='fa fa-trash' title='Eliminar'></i></a></td>";
	    linea = tblCode + tblName + tblAddress + tblNumberPcs + tblNumberConsoles + edit + remove; 
	    conjunto += tr_ini + linea + tr_fin ;
	}
  	$("#listaSedesDiv tbody").html(conjunto);
}

function editSede( code ){
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/sede/" + code;	
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var hrefArray = json._links.self.href.split("/");
	    	var idSede = hrefArray[hrefArray.length -1];
	    	$( "#name" ).val(json.name);
			$( "#address" ).val(json.address);
			$("#numberPcs").val(json.numberPcs);
			$("#numberConsoles").val(json.numberConsoles);			    	
			$("#idSede").val(idSede);
			$("#btnSede").html("Actualizar Sede");
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});			
}

function deleteSede( code ){
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/sede/" + code;	
	$.ajax({
		type: "DELETE",
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});			
}
