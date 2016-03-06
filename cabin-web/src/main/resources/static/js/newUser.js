sedeValidation = "";

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
	$('.input-group.date').datepicker('setDate',"01/01/2000");
	
	$("#gender li a").click(function(){
		$(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
		var gender = $(this).text();
		if (gender.toLowerCase() == "male" ){ $(this).parents(".dropdown").find('.btn').val("M");}
		else{ $(this).parents(".dropdown").find('.btn').val("F"); }
	});
	$( "#form-user" ).submit(function( event ) {
		event.preventDefault();
		if ( addUser() ){			
				fnOpenEditDialog();
		}
	});
});

})(this.jQuery);


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
	valid = valid && checkRequired( $("#birthDate"), "Debe ingresar su fecha de nacimiento",1, userValidation);	
	var genderHtml = $("#gender li a");		
	genderHtml = $(genderHtml).parents(".dropdown").find('.btn');	
	valid = valid && checkRequired( genderHtml, "Debe seleccionar un género.",1, userValidation);
	valid = valid && checkRequired($("#email"),"Debe ingresar un email.",1, userValidation);
	valid = valid && checkRegexp( $("#email"), /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/i , "El email ingresado no es válido.", userValidation );
	valid = valid && checkRequired( $("#password"), "Debe ingresar una contraseña.",1, userValidation);
	valid = valid && checkRegexp( $("#password"), /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$/, "La contraseña debe contener al menos una letra minúscula, una mayúscula, un dígito. Mínimo cuatro caracteres y máximo, viente.", userValidation );
	valid = valid && checkRequired( $("#confirmPassword"), "Debe confirmar su contraseña.",1, userValidation);
	valid = valid && checkRegexp( $("#confirmPassword"), /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$/, "La contraseña debe contener al menos una letra minúscula, una mayúscula, un dígito. Mínimo cuatro caracteres y máximo, veinte.", userValidation );
	valid = valid && checkPassword($("#password"), $("#confirmPassword"), "Las contraseñas no coinciden",  userValidation);
	
	
	return valid;
}

function saveCustomer(){	
	console.log("Inside form-user");
	var customer = {};
	var user = {};
	customer.name = trim( $( "#name" ).val() );
	customer.email = trim( $( "#email" ).val() );
	var birthDate = trim( $( "#birthDate" ).val() );
	var dateArray = birthDate.split("/");
	var date = new Date(); date.setDate(dateArray[1]);
	date.setMonth(dateArray[0] - 1); date.setFullYear(dateArray[2]);
	customer.birthDate = date;
	customer.balance = "0"; customer.points = "0";
	user.pass = trim( $( "#password" ).val() );
	user.name = trim( $( "#email" ).val() );
	$( "#name" ).val(""); $( "#password" ).val("");
	$( "#confirmPassword" ).val("");
	$( "#email" ).val("");	$( "#birthDate" ).val("");
	//$("#numberPcs").val(""); $("#numberConsoles").val("");
	var genderHtml = $("#gender li a");	
	var gender = $(genderHtml).parents(".dropdown").find('.btn').val();
	customer.gender = gender;
	$(genderHtml).parents(".dropdown").find('.btn').html('Seleccionar <span class="caret"></span>');
	$(genderHtml).parents(".dropdown").find('.btn').val("");
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
	var strUrlStatus = window.location.protocol + "//" + window.location.host + "/cabin-web/estado/" + 1;
	var strUrlNivel = window.location.protocol + "//" + window.location.host + "/cabin-web/nivel/" + 1;
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
	    	console.log("Se asigno estado a usuario" + idCustomer);
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
	    	    	console.log("Se asigno nivel a usuario " + idCustomer);
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
	    	    	    	console.log("Se asigno perfil a usuario " + idCustomer);
	    	    	    },
	    	    	    error: function (xhr, status) {	    	
	    	    	    	console.log("Error, su solicitud no pudo ser atendida");
	    	    	    },	    	    
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
	    	var hostname = window.location.protocol + "//" + window.location.host;	
	    	window.location.href = hostname + "/cabin-web/login";
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