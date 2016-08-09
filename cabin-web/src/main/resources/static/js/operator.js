clients = [];
data = [];
tickets = []; ticketIndex = -1;
recargaValidation = ""; 
$(document).ready(function() {
		
		$('#recargaTbl').DataTable({			
			scrollY: 300,
		    paging: false,
			ordering: true,
			searching: false,
			bLengthChange: false,
			bInfo: false,
		});
		
		
		$( "#form-recarga" ).submit(function( event ) {
			event.preventDefault();
			if ( addTicket() ){				
					saveTicket();
			}
		});
		
		//Initialize validation divs
		recargaValidation = $("#recargaValidation");
		
		fillArrayClients();	
		fillArrayTickets();
});

function format(item) { return item.tag; }

function fillArrayClients(){
	var length = clients.length;
	clients.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allClients/";		
	$.ajax({
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	$.each(json, function(index, value) {		    		
		    	clients.push({
					id: value.id,
					name: value.name,
					email: value.email,					
				});
		    	data.push({ 
					id: value.id,
					text: value.name + " - " + value.email,
				});
			});
	    },
	    complete: function(){	    	
	    	var placeholder = "<i class='fa fa-search'></i>  " + "Seleccione un cliente";
	    	$("#clientSelect").select2({
				width: "100%",	
				data: data,
			    formatSelection: format,
			    formatResult: format,
			    placeholder: placeholder,
				allowClear: true,
				escapeMarkup: function(m) { 
				       return m; 
				},
				language: {
				       "noResults": function(){
				           return "No se encontraron resultados";
				       }
				},
			});
	    },	    
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function fillArrayTickets(){
	var length = tickets.length;
	tickets.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allTicketsByOperator";
	var employeeId = 4; //Se pone en bruto porq no guarda la sesion
	var cashClosingFlag = 0; //Aquellos que aun no se han cerrado caja
	console.log(strUrl);
	$.ajax({
		type: "GET",
		url: strUrl,
		data: {id : employeeId, cashClosingFlag : cashClosingFlag},
		dataType: "json",
	    success: function (json) {
	    	$.each(json, function(index, value) {		    		
		    	tickets.push({
					id: value.id,
					rechargingAmount: value.rechargingAmount,
					date: value.date,
					cashClosingFlag: value.cashClosingFlag,
					client: value.client.name,
					employee: value.employee.name,
					rechargingType : value.rechargingType.name,
					status: value.status.name
				});
			});
	    	fillTickettbl();		    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function fillTickettbl(  ){
	var size = tickets.length;	
    var j = 0;
    var t = $('#recargaTbl').DataTable(); t.clear();
	for(i=0; i<size;i++){
		t.row.add( [
                tickets[i].id,
                tickets[i].client,
                tickets[i].rechargingAmount,
                tickets[i].rechargingType,
                tickets[i].date,
                tickets[i].status,                
        ] ).draw( false );
	};
	if (size > 0 ){
	    $('#recargaTbl > tbody  > tr').each(function() {
		    var remove = "<td><a onclick='fnOpenCloseDialog(1,"+ tickets[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";
		    j++;
		    var tr = $(this);
		    tr.find('td:last').after(remove);
	    });
	}
}

function saveTicket(){
	var idTicket = $("#idRecarga").attr("value");
	console.log("Inside form-ticket " + idTicket);
	var ticket = {};
	var idClient = $("#clientSelect").val();
	ticket.rechargingAmount = trim( $( "#rechargingAmount" ).val() ); 
	$( "#rechargingAmount" ).val("");
	$("#clientSelect").val(null).trigger("change");
	//ticket.date = new Date();
	ticket.client = {};
	ticket.client.id = idClient; 
	ticket.cashClosingFlag = 0; 	
	ticket.status = {};
	ticket.status.id = 3;
	ticket.employee = {};
	ticket.employee.id = 4; //Por ahora el id empleado en bruto
	ticket.rechargingType = {};
	ticket.rechargingType.id = 2;
	//ticket.cashClosing = {};
	
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/post/ticket";			
						
	console.log(JSON.stringify(ticket));
	$.ajax({
		type:"POST",
	    url:strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(ticket), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a ticket into DB");
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function(){
			fillArrayTickets()		    	
		}
	});
}



function deleteTicket( code, index ){
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + 4;
	var strUrlTicket = window.location.protocol + "//" + window.location.host + "/cabin-web/ticket/"+ code + "/status";
	console.log("Inside deleteTicket" + code);
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlTicket,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado a Ticket " + code);
	    	tickets[index].status = "Anulado";
	    	fillTickettbl();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }	    
	});	
}



function fnOpenCloseDialog(val, code, index) {
    $("#dialog-confirm").html("¿Está seguro que desea anular este registro?");
    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Anular Registro",
        height: 200,
        width: 400,
        dialogClass: 'ui-dialog',
        buttons: {
        	 "1": 
	         { 	text:"Sí", click: function () {
	        	 	$(this).dialog('close');
	                if (val == '1'){
	                	deleteTicket(code, index);
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


function addTicket() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
	valid = valid && checkRequired( $("#clientSelect"), "Debe seleccionar un cliente.",1, recargaValidation);		
	valid = valid && checkRegexp( $("#rechargingAmount"), /^[0-9]\d{0,3}($|\.\d{0,1}$)/i, "Debe ingresar ingresar un monto válido, no mayor de 999.90 soles y de un decimal.", recargaValidation);	
	return valid;
}
