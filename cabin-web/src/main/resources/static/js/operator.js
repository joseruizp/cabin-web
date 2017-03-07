clients = []; niveles = [];
estados = []; tipo_doc = [];
clientes = []; clienteIndex = -1;
tickets = []; ticketIndex = -1;
recargaValidation = "";
clienteValidation = ""; 
cierreCajaValidation = "";
totalAmount = 0;
rechargeInfo = {};
var cashId = 0; 
var LOGOUT_BUTTON = 0; 
var INACTIVE = 2;

$(document).ready(function() {
        cashId = $("#cashId").val();
        
        $(".input-group.date").datepicker({
		    format: "dd/mm/yyyy",
		    startDate: "01/01/1900", 
		    language: "es",
		    autoclose: true,
		    todayHighlight: true
		 });	
		$('.input-group.date').datepicker('setDate',"");
        
        //Initialize validation divs
        recargaValidation = $("#recargaValidation");
        cierreCajaValidation = $("#cierreCajaValidation");
        clienteValidation = $("#clienteValidation");
        
        fillArrayNivel();
        fillStatus();
		fillDocTypes();
		fillArrayCliente();
        addRechargeEvent();
        addCloseCashEvent();
        fillArrayClients();
        getComputersAndConsoles();
        showStartCashDialog();
        addEventStartCash();
        addEventExpenses();
        
        //Carga la información de los parámetros de recarga
        getRechargeInformation();
        
        //Género para clientes
        $("#genderCustomer li a").click(function(){
        	console.log("Entro al sexo: " +  $(this).text() );
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var gender = $(this).text();
			if (gender.toLowerCase() == "masculino" ){ $(this).parents(".dropdown").find('.btn').val("M");}
			else{ $(this).parents(".dropdown").find('.btn').val("F"); }
		});
        
        //Estado para clientes
        $("#statusCustomer li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var status = $(this).text();
			if (status.toLowerCase() == estados[0].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(estados[0].id);}
			else{ $(this).parents(".dropdown").find('.btn').val(estados[1].id); }
		});  
        
        $("#expenseSelect li a").click(function(){
			$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
			var expenseSelect = $(this).text();
			if (expenseSelect.toLowerCase() == "alimentación" ){
				$("#expenseClientDiv").hide();
				$(this).parents(".dropdown").find('.btn').val("1");
			}
			else if (expenseSelect.toLowerCase() == "devolución usuario anónimo" ) { 
				$(this).parents(".dropdown").find('.btn').val("2");
				$("#expenseClientDiv").show();
				fillClients(true);
			}
			else {
				$(this).parents(".dropdown").find('.btn').val("3");
				$("#expenseClientDiv").show();
				fillClients(false);
			}			
			
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
            
        
      //Cliente save - update
		$( "#form-cliente" ).submit(function( event ) {
			event.preventDefault();
			if ( addCliente() ){
				var idCliente = $("#idCliente").attr("value");
				if (idCliente !== ""){
					fnOpenEditDialog(1);
				}
				else{
					saveCliente();
				}
			}
		});
		
		
});

function format(item) { return item.tag; }

function fillArrayClients(){
    var length = clients.length;
    clients.splice(0, length);
    var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allClientsAndAnonymous/";
    var data = [];
    $.ajax({
        url:strUrl,
        crossDomain: true,
        dataType: "json",
        success: function (json) {
            $.each(json, function(index, value) {
            	if ( (value.user.anonymous && value.user.status.id == 2 && value.balance == 0) || (value.user.anonymous == 0 && value.status.id == 1) ){
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
            	}
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
                          width: 700,
                          resizable: false,
                          buttons:{ 
	    		      			"1":
	    		      			{ text: "Aceptar", click: function () {                	
	    			                $(this).dialog('close');
	    			                LOGOUT_BUTTON = 1;
	    			                window.location = ($("#logout").attr('href'));   
	    		      				}, "class":"btn btn-default"
	    		      			}
	    		      	   },
                    	   open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).hide(); }
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
        },
        error: function (xhr, status) {
            console.log("Error, su solicitud no pudo ser atendida");
        }        
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
    valid = valid && checkRegexp( $("#startCashAmount"), /^[0-9]\d{0,3}($|\.\d{0,1}$)/i, "Debe ingresar ingresar un monto válido, no mayor de 999.90 soles y de un decimal.", $("#startCashValidation"));    
    return valid;
}

function addCloseCash() {
    var valid = true;
    valid = valid && checkRegexp( $("#totalAmount"), /^[0-9]\d{0,3}($|\.\d{0,1}$)/i, "Debe ingresar ingresar un monto válido, no mayor de 999.90 soles y de un decimal.", $("#cierreCajaValidation"));    
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
    $("#btnRecarga").click(function(e) {
        e.preventDefault();
        if (addTicket()) {
            var idClient = $("#clientSelect").val();
            var enterAmount = Number($("#enterAmount").val());
            var amount = Number($("#rechargingAmount").val());
            
            if (amount < rechargeInfo.minimumFraction) {
                updateTips("El monto es menor que el mínimo de recarga requerido: " + rechargeInfo.minimumFraction + " Soles.", recargaValidation); 
                return;
            } else if (amount > rechargeInfo.maximumFraction) {
                updateTips("El monto es mayor que el máximo de recarga requerido: " + rechargeInfo.maximumFraction + " Soles.", recargaValidation);
                return;
            }
            
            amount = (amount - (amount % rechargeInfo.rechargeFraction).toFixed(1)).toFixed(1);
            
            var change = (enterAmount - amount).toFixed(1);
            
            $("#rechargingAmount").val("");
            $("#enterAmount").val("");
            
            var recharge = {};
            recharge.clientId = idClient;
            recharge.amount = amount;
            recharge.cashId = cashId;
            recharge.employeeId = $("#employeeId").val();
            
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
                    updateClientBalanceArray(data.id, data.balance);
                    $("#rechargeChange").text(change);
                    updateTips("Recarga realizada satisfactoriamente.", recargaValidation);
                    var isAnonymous = "1" === data.user.anonymous;
    		    	if (isAnonymous) {
    		    		$("#generatedEmail").text(data.user.name);
    		    		$("#generatedPassword").text(data.user.pass);
    		    		$( "#passwordDialog" ).dialog({
    		      		  	width: 700,
	    		      		buttons:{ 
	    		      			"1":
	    		      			{ text: "Aceptar", click: function () {                	
	    			                $(this).dialog('close');                
	    		      				}, "class":"btn btn-default"
	    		      			}
	    		      		}
    		    		}); 
    		    	}
    		    	fillArrayCliente();
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

function updateClientBalanceArray(clientId, balance) {
	for (i = 0 ; i< clients.length; i++){
        if (clientId == clients[i].id){
            clients[i].balance = balance;
            $("#balance").val(balance);
            return;
        }
    }    
}

function addEventExpenses() {   
    
    $("#btnExpenses").click(function(e) {
        e.preventDefault();
        if (addExpenses()) {
            var expenses = {};
            expenses.cashId = cashId;
            
            var expenseSelectHtml = $("#expenseSelect li a");	
        	var expenseSelect = $(expenseSelectHtml).parents(".dropdown").find('.btn').val();
            
            expenses.expenseTypeId = expenseSelect;            
            expenses.amount = $("#expenseAmount").val();
            expenses.employeeId = $("#employeeId").val();
            if ($("#expenseClientDiv").is(":visible")) {
                expenses.clientId = $("#expenseClientSelect").val();
            }
            
            $(expenseSelectHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
        	$(expenseSelectHtml).parents(".dropdown").find('.btn').val("");
        	$("#expenseClientDiv").hide();
            $("#expenseAmount").val("");
            
        	console.log("expenses: " + JSON.stringify(expenses));
            
            $.ajax({
                type: "POST",
                url: window.location.protocol + "//" + window.location.host + "/cabin-web/post/expenses",
                dataType: 'json',
                data: JSON.stringify(expenses),
                contentType: 'application/json',
                success: function (data) {
                    console.log("expenses is done");
                    updateTips("Justificacion de gastos realizada satisfactoriamente.", $("#gastosValidation"));
    		    	fillArrayCliente();
                },
                error: function (xhr, status) {
                    console.log("Error, su solicitud no pudo ser atendida");
                }
            });
        }
    });
}

function addExpenses() {
    var valid = true;
    valid = valid && checkRegexp( $("#expenseAmount"), /^[0-9]\d{0,3}($|\.\d{0,1}$)/i, "Debe ingresar ingresar un monto válido, no mayor de 999.90 soles y de un decimal.", $("#gastosValidation"));    
    return valid;
}

function fillClients(anonymous) {
    var headquarterId = $("#headquarterId").val();
    var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/allActiveUsersByHeadquarter";
    var dataClients = [];    
    $.ajax({
        type: "GET",
        url:strUrl,
        dataType: 'json', 
        data: {headquarterId: headquarterId, anonymous: anonymous},
        contentType: 'application/json',
        success: function (data) {
            $.each(data, function (index, value) {            	
            	dataClients.push({ 
                    id: value.id,
                    text: value.name + " - " + value.email,
                });            	
            });            
        },
        complete: function(){
            var placeholder = "<i class='fa fa-search'></i>  " + "Seleccione un cliente";
            $("#expenseClientSelect").select2({
                width: "100%",
                data: dataClients,
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


function fillClientetbl(){
	var size = clientes.length;
	var j = 0;
    var t = $('#clienteTbl').DataTable();
    var date;
    t.clear();
	for(i=0; i<size;i++){
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
        ] ).draw( false );
	};
	/*
	if (size > 0 ){
	    $('#clienteTbl > tbody  > tr').each(function() {
		    var edit = "<td><a onclick='editCliente("+ clientes[j].id +","+ j+")'><i class='fa fa-pencil icons' title='Editar'></i></a></td>";
		    var remove = "<td><a onclick='fnOpenCloseDialog(1, "+ clientes[j].id +","+ j+")'><i class='fa fa-trash icons' title='Eliminar'></i></a></td>";	    
		    j++; 
		    var tr = $(this);	    
		    tr.find('td:last').after(edit); tr.find('td:last').after(remove);
	    });
	}
	*/
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


function fillArrayCliente(){
	var length = clientes.length;
	clientes.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/cliente/?size=10000";
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
	                if (val == '1')
	                	deleteCliente(code, index);
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
	                if (val == '1')
	                	saveCliente();	                
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

function fillArrayNivel(){
	var length = niveles.length;
	niveles.splice(0, length);
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/nivel/";	
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
		    	fillNivel(idNivel, value.name, value.initialExperience, value.finalExperience,
						value.question);				
			});	    			    	
	    },
	    error: function (xhr, status) {    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function (){	    	
	    	ulCustomer.html(line);	    	
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
	    	ulDocTypeCustomer.html(line);
	    	
	    	docTypeHtml =  $("#docTypeCustomer li a");	    	
	    	$(docTypeHtml).parents(".dropdown").find('.btn').html(tipo_doc[0].name +' <span class="caret"></span>');
	    	$(docTypeHtml).parents(".dropdown").find('.btn').val("1");
	    }
	});	
	
	
}



function saveCliente(){
	var hostname = window.location.protocol + "//" + window.location.host;
	var idCustomer = $("#idCliente").attr("value");
	var idUser;	
	var customer = {};
	customer.user = {}; 
	customer.user.status = {};
	customer.status = {};	
	customer.level = {};
	customer.docType = {};
	customer.change_level = "0";
	customer.bonus = "0";
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
		    	updateTips("Cliente creado satisfactoriamente.", clienteValidation);
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
	customer.user.status.id = INACTIVE;
	
	$( "#nameCustomer" ).val(""); 
	$( "#passwordCustomer" ).val("");
	$( "#confirmPasswordCustomer" ).val("");
	$( "#emailCustomer" ).val("");	
	$( "#birthDateCustomer" ).val("");	 
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
	    	fillArrayClients();
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});	
	
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

$(document).ready(function()
{
	$('#logout2').on("click",function(){
		LOGOUT_BUTTON = 1;
		window.location = ($("#logout").attr('href'));		    	
	});
		
    $(window).bind("beforeunload", function() {    	
    	//window.location = ($("#logout").attr('href'));
    	var hostname = window.location.protocol + "//" + window.location.host;
    	var strUrl = hostname + $("#logout").attr('href');
    	console.log("URL: " + strUrl);
    	if ( LOGOUT_BUTTON == 0) {
	    	$.ajax({
	    		async:false,
	    		type: "POST",
	    	    url: strUrl,
	    	    crossDomain: true,
	    	    dataType: "json",
	    	    success: function (json) {	    	
	    	    	
	    	    },
	    	    error: function (xhr, status) {    	
	    	    	console.log("Error, su solicitud no pudo ser atendida");
	    	    }
	    	});
    	}
    	
    });
});

