clients = [];
data = [];
tickets = []; ticketIndex = -1;
recargaValidation = "";
cierreCajaValidation = "";
totalAmount = 0;
rechargeInfo = {};
var cashId = 0;

$(document).ready(function() {
				
		$('#recargaTbl').DataTable({			
			scrollY: 300,
		    paging: true,
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
		    paging: true,
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
		
		cashId = $("#cashId").val();
		
		//Initialize validation divs
		recargaValidation = $("#recargaValidation");
		cierreCajaValidation = $("#cierreCajaValidation");
		
		addRechargeEvent();
		addCloseCashEvent();
		fillArrayClients();
		fillArrayTickets();
		getComputersAndConsoles();
		showStartCashDialog();
		addEventStartCash();
		addEventExpenses();
		
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

function getComputersAndConsoles() {
	var headquarterId = $("#headquarterId").val();
	getComputers(headquarterId);
	getConsoles(headquarterId);
}

function showStartCashDialog() {
	var isFirst = $("#isFirst").val();
	if (isFirst === "true") {
		$( "#startCashDialog" ).dialog({
			closeOnEscape: false,
			  width: 700,
			  dialogClass: "noclose"
		});	
	}
}

function addEventStartCash() {
	$("#btnStartCash").click(function(e) {
		e.preventDefault();
		if (addStartCash()) {
			var startCash = {};
			startCash.amount = $("#startCashAmount").val();
			startCash.employeeId = $("#employeeId").val();
			startCash.headquarterId = $("#headquarterId").val();
			console.log("cash post: " + JSON.stringify(startCash));
			$.ajax({
				type: "POST",
				url: window.location.protocol + "//" + window.location.host + "/cabin-web/post/startCash",
				data: JSON.stringify(startCash),
				contentType: 'application/json',
				dataType: 'json', 
			    success: function (json) {
			    	cashId = json.id;
			    	console.log("Cash Id: " + cashId);
			    	$( "#startCashDialog" ).dialog( "close" )
			    },
			    error: function (xhr, status) {    	
			    	console.log("Error, su solicitud no pudo ser atendida");
			    }
			});
		}
	});
}

function fillArrayTickets(){
	var length = tickets.length;
	tickets.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allTicketsByCash";
	console.log(strUrl);
	$.ajax({
		async: false,
		type: "GET",
		url: strUrl,
		data: {id : cashId},
		dataType: "json",
	    success: function (json) {
	    	$.each(json, function(index, value) {
		    	tickets.push({
					id: value.id,
					amount: value.amount,
					date: value.date,
					client: value.client == null ? "" : value.client.name,
					employee: value.employee.name,
					rechargingType : value.rechargingType.name,
					expenseType: value.expenseType == null? "" : value.expenseType.name
				});
			});	    			    	
	    	fillTickettbl();
	    	fillCierreCajaTbl();
	    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}

function fillTickettbl(  ){
	var size = tickets.length;	
    var j = 0;
    var t = $('#recargaTbl').DataTable(); t.clear(); t.draw();
    console.log("Entro al llenado de la tabla");
	for(i=0; i<size;i++){
		if (tickets[i].client !== "") {
			t.row.add( [
	                tickets[i].id,
	                tickets[i].client,
	                parseFloat(tickets[i].amount).toFixed(2),
	                tickets[i].rechargingType,
	                tickets[i].date,
	        ] ).draw( false );
		}
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
	var size = tickets.length;	
    var j = 0;
    var t = $('#cierreCajaTbl').DataTable(); t.clear();
	for(i=0; i<size;i++){
		t.row.add( [
                tickets[i].id,
                tickets[i].client,
                parseFloat(tickets[i].amount).toFixed(2),
                tickets[i].rechargingType,
                tickets[i].expenseType,
                tickets[i].date,
        ] ).draw( false );
	};
}

function addCloseCashEvent(){
	$("#btnCierreCaja").click(function(e) {
		e.preventDefault();
		if (addCloseCash()) {
			var cashClose = {};
			cashClose.enteredAmount = $("#totalAmount").val();
			$.ajax({
				type: "PUT",
				url: window.location.protocol + "//" + window.location.host + "/cabin-web/put/closeCash/" + cashId,
				data: JSON.stringify(cashClose),
				contentType: 'application/json',
				dataType: 'json', 
			    success: function (json) {
			    	cashId = 0;
			    	$("#enteredAmount").text(json.enteredAmount);
			    	$("#justifiedAmount").text(json.justifiedAmount);
			    	$("#restAmount").text(json.rest);
			    	$("#totalAmount").prop('disabled', true);
			    	$( "#closeCashDialog" ).dialog({
						  width: 700
					});
			    },
			    error: function (xhr, status) {    	
			    	console.log("Error, su solicitud no pudo ser atendida");
			    }
			});
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
	var value = $("#rechargingAmount").val();
	if ( value == 0){
		$("#rechargingAmount").addClass( "ui-state-error" );
		updateTips( "Debe ingresar un monto mayor a 0", recargaValidation );
		return false;
	}
	valid = valid && checkRegexp( $("#rechargingAmount"), /^[0-9]\d{0,3}($|\.\d{0,1}$)/i, "Debe ingresar ingresar un monto válido, no mayor de 999.90 soles y de un decimal.", recargaValidation);	
	return valid;
}

function addStartCash() {
	var valid = true;
	valid = valid && checkRegexp( $("#startCashAmount"), /^[0-9]\d{0,3}($|\.\d{0,1}$)/i, "Debe ingresar ingresar un monto válido, no mayor de 999.90 soles y de un decimal.", recargaValidation);	
	return valid;
}

function addCloseCash() {
	var valid = true;
	valid = valid && checkRegexp( $("#totalAmount"), /^[0-9]\d{0,3}($|\.\d{0,1}$)/i, "Debe ingresar ingresar un monto válido, no mayor de 999.90 soles y de un decimal.", recargaValidation);	
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
	$("#btnCierreCaja").click(function(e) {
		e.preventDefault();
		if (addTicket()) {
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
			    },
			    error: function (xhr, status) {	    	
			    	console.log("Error, su solicitud no pudo ser atendida");
			    }
			});	
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

function addEventExpenses() {
	$("#expenseSelect").change(function(e) {
		var type = $(this).val();
		if (type === "1") {
			$("#expenseClientDiv").hide();
		} else {
			$("#expenseClientDiv").show();
			fillClients(type === "2");
		}
		
	})
}

function fillClients(anonymous) {
	var headquarterId = $("#headquarterId").val();
	$.ajax({
		type: "GET",
	    url:strUrl,			    
	    dataType: 'json', 
	    data: {headquarterId: headquarterId, anonymous: anonymous},
	    contentType: 'application/json',
	    success: function (data) {
	    	$.each(data, function (index, value) {
			    $('#expenseClientSelect').append($('<option/>', { 
			        value: value.id,
			        text : value.name
			    }));
			});
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
}