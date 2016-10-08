clients = [];
data = [];
tickets = []; ticketIndex = -1;
ticketsCierreCaja = [];
recargaValidation = "";
cierreCajaValidation = "";
totalAmount = 0;
rechargeInfo = {};

$(document).ready(function() {
				
		$('#recargaTbl').DataTable({			
			scrollY: 300,
		    paging: false,
			ordering: true,
			searching: true,
			bLengthChange: false,
			bInfo: false,
	        language: {
				 search: "Buscar Ticket: ",
				 zeroRecords: "No se encontró registros",			     
			     emptyTable: "No hay datos disponibles",
	        },    
		});
		
		$('#cierreCajaTbl').DataTable({			
			scrollY: 300,
		    paging: false,
			ordering: true,
			searching: true,
			bLengthChange: false,
			bInfo: false,		
	        language: {
					 search: "Buscar Ticket: ",
					 zeroRecords: "No se encontró registros",			     
				     emptyTable: "No hay datos disponibles",
			},
		});
		
		$( "#form-recarga" ).submit(function( event ) {
			event.preventDefault();
			if ( addTicket() ){				
				addRechargeEvent();
			}
		});
		
		$( "#form-cierreCaja" ).submit(function( event ) {
			event.preventDefault();
			//if ( addTicket() ){				
				saveCierreCaja();
			//}
		});
		
		//Initialize validation divs
		recargaValidation = $("#recargaValidation");
		cierreCajaValidation = $("#cierreCajaValidation");
		
		fillArrayClients();
		fillArrayTickets();
		//getComputersAndConsoles();
		
		//Carga la información de los parámetros de recarga
		getRechargeInformation();
			
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
					balance: value.balance,
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

/*
function getComputersAndConsoles() {
	var headquarterId = $("#headquarterId").val();
	getComputers(headquarterId);
	getConsoles(headquarterId);
}
*/

function fillArrayTicketsCierreCaja( idCierreCaja){
	var length = ticketsCierreCaja.length;
	ticketsCierreCaja.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allTicketsByCashClosing";	
	console.log(strUrl);
	$.ajax({
		type: "GET",
		url: strUrl,
		data: {id : idCierreCaja},
		dataType: "json",
	    success: function (json) {
	    	$.each(json, function(index, value) {
		    	ticketsCierreCaja.push({
					id: value.id,
					rechargingAmount: value.rechargingAmount,
					date: value.date,
					cashClosingFlag: value.cashClosingFlag,
					client: value.client.name,
					employee: value.employee.name,
					rechargingType : value.rechargingType.name,
					status: value.status.name
				});		
		    	if ( value.status.id == 3)		    	
		    		totalAmount = totalAmount + value.rechargingAmount;	
			});	    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function(){
	    	//fillCierreCajaTbl();	
	    	//clearTickets();
	    	//fillTickettbl();
	    	$( "#totalAmount" ).val("" + totalAmount);
	    	totalAmount = 0;
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
		async: false,
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
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function () {
	    	//fillTickettbl();
	    }
	});	
}

function fillTickettbl(  ){
	var size = tickets.length;	
    var j = 0;
    var t = $('#recargaTbl').DataTable(); t.clear(); t.draw();
    console.log("Entro al llenado de la tabla");
	for(i=0; i<size;i++){
		t.row.add( [
                tickets[i].id,
                tickets[i].client,
                parseFloat(tickets[i].rechargingAmount).toFixed(2),
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

function fillCierreCajaTbl(  ){
	var size = ticketsCierreCaja.length;	
    var j = 0;
    var t = $('#cierreCajaTbl').DataTable(); t.clear();
	for(i=0; i<size;i++){
		t.row.add( [
                ticketsCierreCaja[i].id,
                ticketsCierreCaja[i].client,
                parseFloat(ticketsCierreCaja[i].rechargingAmount).toFixed(2),
                ticketsCierreCaja[i].rechargingType,
                ticketsCierreCaja[i].date,
                ticketsCierreCaja[i].status,                
        ] ).draw( false );
	};
}


function saveTicket(){
	var idTicket = $("#idRecarga").attr("value");
	console.log("Inside form-ticket " + idTicket);
	var ticket = {};
	var idClient = $("#clientSelect").val();
	var idEmpleado = $("#employeeId").val();
	
	ticket.rechargingAmount = trim( $( "#rechargingAmount" ).val() ); 
	$( "#rechargingAmount" ).val("");
	$("#clientSelect").val(null).trigger("change");
	$( "#balance" ).val("");	
	//ticket.date = new Date();
	ticket.client = {};
	ticket.client.id = idClient; 
	ticket.cashClosingFlag = 0; 	
	ticket.status = {};
	ticket.status.id = 3;
	ticket.employee = {};
	ticket.employee.id = idEmpleado; 
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
			fillArrayTickets();			
		}
	});
}

function saveCierreCaja(){	
	console.log("Inside form-cierreCaja");
	var length = tickets.length;
	var idCierreCaja;
	//$( "#ticketsAmount" ).val("" + length);		
	//ticket.date = new Date();
	var cierreCaja = {};
	//cierreCaja.ticketsAmount = length;
	cierreCaja.totalAmount = totalAmount;
	cierreCaja.employee = {};
	cierreCaja.employee.id = 4; //Por ahora el id empleado en bruto
	var cashClosingFlag = 1; // Para cambiar el flag
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/post/cashClosing";			
						
	console.log(JSON.stringify(cierreCaja));
	$.ajax({
		async: false,
		type:"POST",
	    url:strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(cierreCaja), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a ticket into DB");
	    	idCierreCaja = data.id;
	    	console.log("idCierreCaja: " + idCierreCaja);
	    	console.log(data);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	});
	for ( var i = 0; i < length ; i++){		
		tickets[i].cashClosing = {};
		tickets[i].cashClosing.id = idCierreCaja;
		tickets[i].cashClosingFlag = cashClosingFlag;
		tickets[i].status = {};
		tickets[i].client = {};
		tickets[i].employee = {};
		tickets[i].rechargingType = {};		
		strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/post/ticket";
		console.log(JSON.stringify(tickets[i]));
		$.ajax({
			async: false,
			type:"POST",
		    url:strUrl,			    
		    dataType: 'json', 
		    data: JSON.stringify(tickets[i]), 
		    contentType: 'application/json',
		    success: function (data) {
		    	console.log("Send a ticket into DB");
		    },
		    error: function (xhr, status) {	    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    },		    
		});
	}
	fillArrayTicketsCierreCaja( idCierreCaja );	
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
	var value = $("#rechargingAmount").val();
	if ( value == 0){
		$("#rechargingAmount").addClass( "ui-state-error" );
		updateTips( "Debe ingresar un monto mayor a 0", recargaValidation );
		return false;
	}
	valid = valid && checkRegexp( $("#rechargingAmount"), /^[0-9]\d{0,3}($|\.\d{0,1}$)/i, "Debe ingresar ingresar un monto válido, no mayor de 999.90 soles y de un decimal.", recargaValidation);	
	return valid;
}

function clearTickets() {
	console.log("Limpio el arreglo");
	while (tickets.length > 0) {
	    tickets.pop();
	} 
	console.log("Tamaño del arreglo" + tickets.length);
}


function getRechargeInformation() {
	var hostname = window.location.protocol + "//" + window.location.host;
	var strUrl = hostname + "/cabin-web/get/parametersRecharge";
	$.ajax({
		type: "GET",
	    url:strUrl,			    
	    dataType: 'json', 
	    contentType: 'application/json',
	    success: function (data) {	    	
	    	rechargeInfo.rechargeFraction = Number(data.rechargeFraction);
	    	rechargeInfo.minimumFraction = Number(data.minimumFraction);
	    	rechargeInfo.maximumFraction = Number(data.maximumFraction);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
}



function addRechargeEvent() {	
		var idClient = $("#clientSelect").val();
		var enterAmount = Number($("#enterAmount").val());
    	var amount = Number($("#rechargingAmount").val());
    	
    	if (amount < rechargeInfo.minimumFraction) {    		
    		updateTips("El monto es menor que el mínimo de recarga requerido.", recargaValidation); 
    		return;
    	} else if (amount > rechargeInfo.maximumFraction) {    		
    		updateTips("El monto es mayor que el mínimo de recarga requerido..", recargaValidation);
    		return;
    	}
    	
    	amount = (amount - (amount % rechargeInfo.rechargeFraction).toFixed(1));
    	
    	$("#rechargingAmount").val("");
    	$("#enterAmount").val("");
    	
    	var change = enterAmount - amount;
    	var recharge = {};
    	recharge.clientId = idClient;
    	recharge.amount = amount;
    	
    	console.log("rechargeInfo: " + rechargeInfo);
    	
    	var hostname = window.location.protocol + "//" + window.location.host;
		var strUrl = hostname + "/cabin-web/post/recharge";
		
    	$.ajax({
			type: "POST",
		    url:strUrl,			    
		    dataType: 'json', 
		    data: JSON.stringify(recharge),
		    contentType: 'application/json',
		    success: function (data) {
		    	console.log("recharge is done");
		    	updateTips("Recarga realizada satisfactoriamente.", recargaValidation);		    	
		    	saveTicket();
		    	fillArrayClients();
		    },
		    error: function (xhr, status) {	    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    }
		});	
}



$(document).on("change", "#clientSelect", function(){
	console.log( "Entro a la seleccion de cliente");
	var idClient = $("#clientSelect").val();
	var length = clients.length;
	var i;
	for (i = 0 ; i< length; i++){
		if (idClient == clients[i].id){
			console.log( "El cliente es " + clients[i].name + " y su saldo es: " + clients[i].balance + " el id es " + clients[i].id);
			$("#balance").val(clients[i].balance);
			return;
		}
	}	
	$("#balance").val("");
})
