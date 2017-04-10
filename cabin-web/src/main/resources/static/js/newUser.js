sedeValidation = "";
tipo_doc = [];
STATUS = 1;
LEVEL = 1;
PROFILE = 3;
INACTIVE = 2;
(function($){

$(document).ready(function(){	
	userValidation = $("#userValidation");
	$(".input-group.date").datepicker({
	    format: "dd/mm/yyyy",
	    startDate: "01/01/1900", 
	    language: "es",
	    autoclose: true,
	    todayHighlight: true
	 });	
	$('.input-group.date').datepicker('setDate',"");
	
	$("#gender li a").click(function(){
		$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
		var gender = $(this).text();
		if (gender.toLowerCase() == "masculino" ){ $(this).parents(".dropdown").find('.btn').val("M");}
		else{ $(this).parents(".dropdown").find('.btn').val("F"); }
	});
	$( "#form-user" ).submit(function( event ) {
		event.preventDefault();
		if ( addUser() ){			
				fnOpenEditDialog();
		}
	});	
	fillDocTypes();
});

})(this.jQuery);


$(document).on("click", "#docType li a", function(){
	console.log("Entro aqui: " + $(this).text() );
	var docType = $(this).text();
	docType = docType.toLowerCase();
	$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
	/*Correr el arreglo para ver cual es el id y nombre del tipo documento*/
	var length = tipo_doc.length;
	for ( i = 0; i< length ; i++){
		if (docType == tipo_doc[i].name.toLowerCase() ){ $(this).parents(".dropdown").find('.btn').val(tipo_doc[i].id); break;}
	}	
} )

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
	var hostname = window.location.protocol + "//" + window.location.host;
	var name = trim(email.val());
	var strUrl = hostname + "/cabin-web/usuario/search/findByName?name=" + name;
	var validEmail = 1;
	$.ajax({
		async:false,
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
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

function addUser() {
	var valid = true;
	$("*").removeClass( "ui-state-error");
	valid = valid && checkRequired( $("#name"), "Debe ingresar su nombre.",1, userValidation);
	valid = valid && checkRegexp( $("#name"), /.+/i, "Su nombre ingresado no es válido.",  userValidation);
	valid = valid && checkRequired( $("#lastname"), "Debe ingresar sus apellidos.",1, userValidation);
	valid = valid && checkRegexp( $("#lastname"), /.+/i, "Sus apellidos ingresados no son válidos.",  userValidation);
	valid = valid && checkRequired($("#email"),"Debe ingresar un email.",1, userValidation);
	valid = valid && checkRegexp( $("#email"), /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/i , "El email ingresado no es válido.", userValidation );
	valid = valid && checkEmail( $("#email"), "El email ya se encuentra registrado.", userValidation);
	valid = valid && checkRequired( $("#birthDate"), "Debe ingresar su fecha de nacimiento",1, userValidation);
	var docTypeHtml = $("#docType li a");		
	docTypeHtml = $(docTypeHtml).parents(".dropdown").find('.btn');	
	valid = valid && checkRequired( docTypeHtml, "Debe seleccionar un tipo de documento.",1, userValidation);
	if ( $(docTypeHtml).val() == tipo_doc[0].id) //En caso DNI
		valid = valid && checkRegexp( $("#docCode"), /^[0-9]\d{7}$/i, "El DNI ingresado no es válido" , userValidation);
	else if( $(docTypeHtml).val() == tipo_doc[1].id) //En caso RUC
		valid = valid && checkRegexp( $("#docCode"), /^[1-9]\d{10}$/i, "El RUC ingresado no es válido", userValidation );
    else if( $(docTypeHtml).val > tipo_doc[2].id) //En cualquier otro documento
    	valid = valid && checkRequired($("#docCode"),"Debe ingresar el número de documento.",1, userValidation);	
	
	valid = valid && checkRequired( $("#password"), "Debe ingresar una contrase&ntilde;a de al menos 6 caracteres.",6, userValidation);
	//valid = valid && checkRegexp( $("#password"), /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$/, "Debe ingresar una contraseña de al menos 6 caracteres.", userValidation );
	valid = valid && checkRequired( $("#confirmPassword"), "Debe confirmar su contrase&ntilde;a.",1, userValidation);
	//valid = valid && checkRegexp( $("#confirmPassword"), /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$/, "Debe ingresar una contraseña de al menos 6 caracteres.", userValidation );
	valid = valid && checkPassword($("#password"), $("#confirmPassword"), "Las contrase&ntilde;as no coinciden",  userValidation);	
	var genderHtml = $("#gender li a");		
	genderHtml = $(genderHtml).parents(".dropdown").find('.btn');	
	valid = valid && checkRequired( genderHtml, "Debe seleccionar un género.",1, userValidation);
	
	return valid;
}

function saveCustomer(){	
	console.log("Inside form-user");
	var customer = {};
	var user = {};
	customer.name = trim( $( "#name" ).val() );
	customer.lastname = trim( $( "#lastname" ).val() );
	customer.email = trim( $( "#email" ).val() );		
	customer.birthDate = trim( $( "#birthDate" ).val() );
	customer.docCode = trim( $( "#docCode" ).val() );
	customer.balance = "0"; customer.points = "0";
	customer.change_level = "0";
	customer.bonus = "0";
	customer.experience = "0";
	user.pass = trim( $( "#password" ).val() );
	user.name = trim( $( "#email" ).val() );
	user.anonymous = "0";
		
	var genderHtml = $("#gender li a");	
	var gender = $(genderHtml).parents(".dropdown").find('.btn').val();
	customer.gender = gender;
	
	$(genderHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(genderHtml).parents(".dropdown").find('.btn').val("");
	
	var docTypeHtml =  $("#docType li a");	
	var idDocType = $(docTypeHtml).parents(".dropdown").find('.btn').attr("value");	
	
	$( "#name" ).val(""); $( "#password" ).val("");
	$( "#lastname" ).val(""); $( "#docCode" ).val("");
	$( "#confirmPassword" ).val("");
	$( "#email" ).val("");	$( "#birthDate" ).val("");
	
	
	$(docTypeHtml).parents(".dropdown").find('.btn').html(tipo_doc[0].name +' <span class="caret"></span>');
	$(docTypeHtml).parents(".dropdown").find('.btn').val("1");
	
	
	var idUser, idCustomer;
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/usuario";
	console.log(JSON.stringify(user));
	$.ajax({
		async: false,
		type: "POST", 
	    url: strUrl,			    
	    dataType: 'json', 
	    data: JSON.stringify(user), 
	    contentType: 'application/json',
	    success: function (data) {
	    	console.log("Send a user into DB");
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },	 
	    complete: function(xhr) {
	    	var strLocation = xhr.getResponseHeader('Location');	    	
	    	var hrefArray = strLocation.split("/");
	    	idUser = hrefArray[hrefArray.length -1];	    	    	
	    }
	});		
	strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/cliente";	
	console.log(JSON.stringify(customer));
	$.ajax({
		async: false,
		type: "POST", 
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
	    	var strLocation = xhr.getResponseHeader('Location');	    	
	    	var hrefArray = strLocation.split("/");
	    	idCustomer = hrefArray[hrefArray.length -1];
	    		    	
	    }
	});	
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + STATUS;
	var strUrlNivel = window.location.protocol + "//" + window.location.host + "/cabin-web/nivel/" + LEVEL;
	var strUrlPerfil = window.location.protocol + "//" + window.location.host + "/cabin-web/perfil/" + PROFILE;	
	var strUrlUser = window.location.protocol + "//" + window.location.host + "/cabin-web/usuario/"+idUser;
	var strUrlDocType = window.location.protocol + "//" + window.location.host + "/cabin-web/tipo_documento/" + idDocType;
	var strUrlCustomer = window.location.protocol + "//" + window.location.host + "/cabin-web/cliente/"+idCustomer+"/status";
	//Solo para cliente
	
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlCustomer,			
	    data: strUrlStatus, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno estado al cliente" + idCustomer);
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
	    	    	console.log("Se asigno nivel al cliente " + idCustomer);
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
	    	    	    	console.log("Se asigno perfil al cliente " + idCustomer);
	    	    	    },
	    	    	    error: function (xhr, status) {	    	
	    	    	    	console.log("Error, su solicitud no pudo ser atendida");
	    	    	    },
	    	    	    complete: function(xhr){
	    	    	    	strUrlCustomer = window.location.protocol + "//" + window.location.host + "/cabin-web/cliente/"+idCustomer+"/docType";
	    	    	    	$.ajax({
	    	    	    		async: false,
	    	    	    		type: "PUT",
	    	    	    	    url:strUrlCustomer,			
	    	    	    	    data: strUrlDocType, 
	    	    	    	    contentType: 'text/uri-list',
	    	    	    	    success: function (data) {
	    	    	    	    	console.log("Se asigno el tipo de documento " + idDocType + " al cliente");
	    	    	    	    },
	    	    	    	    error: function (xhr, status) {	    	
	    	    	    	    	console.log("Error, su solicitud no pudo ser atendida");
	    	    	    	    }
	    	    	    	});
	    	    	    }
	    	    	});
	    	    }
	    	});
	    }
	});	
	//Para usuario	
	strUrlUser = window.location.protocol + "//" + window.location.host + "/cabin-web/usuario/"+idUser+"/profile";	
	strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + INACTIVE;
	$.ajax({
		async: false,
		type: "PUT",
	    url:strUrlUser,			
	    data: strUrlPerfil, 
	    contentType: 'text/uri-list',
	    success: function (data) {
	    	console.log("Se asigno perfil al usuario " + idUser);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    },
	    complete: function(xhr){
	    	strUrlUser = window.location.protocol + "//" + window.location.host + "/cabin-web/usuario/"+idUser+"/status";
	    	$.ajax({
	    		async: false,
	    		type: "PUT",
	    	    url:strUrlUser,			
	    	    data: strUrlStatus, 
	    	    contentType: 'text/uri-list',
	    	    success: function (data) {
	    	    	console.log("Se asigno el estado al usuario " + idUser);
	    	    },
	    	    error: function (xhr, status) {	    	
	    	    	console.log("Error, su solicitud no pudo ser atendida");
	    	    },
	    	    complete: function(xhr){    	    	
	    	    	updateTips( "!Felicitaciones eres un nuevo usuario!", userValidation);
	    	    }
	    	});	    	
	    }
	});
	
}


function fnOpenEditDialog() {
    $("#dialog-confirm").html("¿Está seguro que desea enviar la información?");
    // Define the Dialog and its properties.
    $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        title: "Nuevo Cliente",
        height: 200,
        width: 400,
        //dialogClass: 'ui-dialog ui-dialog-content',
        dialogClass: "ui-dialog",
        buttons: {
	         "1": 
	         { text:"Sí", click: function () {
	            	$(this).dialog('close'); 
	            	saveCustomer();	                               
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

function fillDocTypes( ){
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/tipo_documento/";	
	var ulDocTypeCustomer = $("#docType");
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
	    	
	    	docTypeHtml =  $("#docType li a");	    	
	    	$(docTypeHtml).parents(".dropdown").find('.btn').html(tipo_doc[0].name +' <span class="caret"></span>');
	    	$(docTypeHtml).parents(".dropdown").find('.btn').val("1");
	    }
	});	
	
	
}
