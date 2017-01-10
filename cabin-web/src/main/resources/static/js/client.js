$(function() {
	var rechargeInfo = {};
    $(".computer-multiple").click(function() {
    	$( "#computerDialog" ).dialog({
    		  width: 700
    	});
    });
    
    $(".console-multiple").click(function() {
    	$( "#consoleDialog" ).dialog({
    		  width: 700
    	}); 	
    });
    
    $(document).ready(function(){
    	getClientInformation();
    	getRechargeInformation();
    	addRechargeEvent();
    	getComputersAndConsoles();
	});
    
    function getClientInformation() {
    	var clientId = $("#clientId").val();
    	var hostname = window.location.protocol + "//" + window.location.host;
		var strUrl = hostname + "/cabin-web/get/client";
		$.ajax({
			type: "GET",
		    url:strUrl,			    
		    dataType: 'json', 
		    data: {id : clientId},
		    contentType: 'application/json',
		    success: function (data) {
		    	$("#clientName").text(data.name);
		    	$("#level").text(data.level.name);
		    	$("#points").text(data.points);
		    	$("#balance").text(data.balance);
		    	$("#experience").text(data.experience);
		    },
		    error: function (xhr, status) {	    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    }
		});
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
		    	$("#rechargeFraction").text(data.rechargeFraction);
		    	$("#minimumRecharge").text(data.minimumFraction);
		    	$("#maximumRecharge").text(data.maximumFraction);
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
    	$("#rechargeBtn").click(function(e) {
    		e.preventDefault();
    		var clientId = $("#clientId").val();
    		var enterAmount = Number($("#enterAmount").val());
        	var amount = Number($("#rechargeAmount").val());
        	
        	if (amount < rechargeInfo.minimumFraction) {
        		$("#message").text("El monto es menor que el mínimo de recarga requerido.");
        		$( "#messageDialog" ).dialog({
		      		  width: 700
		      	}); 
        		return;
        	} else if (amount > rechargeInfo.maximumFraction) {
        		$("#message").text("El monto es mayor que el máximo de recarga requerido.");
        		$( "#messageDialog" ).dialog({
		      		  width: 700
		      	}); 
        		return;
        	}
        	
        	if ( !addTicket() )
        		return;
        	amount = (amount - (amount % rechargeInfo.rechargeFraction).toFixed(1));
        	$("#rechargeAmount").val("" + amount);
        	
        	var change = enterAmount - amount;
        	var recharge = {};
        	recharge.clientId = clientId;
        	recharge.amount = amount;
        	        	
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
    		    	$("#points").text(data.points);
    		    	$("#balance").text(data.balance);
    		    	$("#experience").text(data.experience);
    		    	$("#rechargeChange").text(change);
    		    	showMessage("Recarga realizada satisfactoriamente", "rechargeAlert");
    		    	var isAnonymous = "1" === data.user.anonymous;
    		    	if (isAnonymous) {
    		    		$("#generatedPassword").text(data.user.pass);
    		    		$( "#passwordDialog" ).dialog({
    		      		  width: 700
    		      	}); 
    		    	}
    		    },
    		    error: function (xhr, status) {	    	
    		    	console.log("Error, su solicitud no pudo ser atendida");
    		    }
    		});
    	});
    }
    
    function showMessage(text, divId) {
		var div = $('#' + divId);
		div.text(text).show(1000);
		setTimeout(function() {
			div.hide(1000);
		}, 5000);
	}
    
    function getComputersAndConsoles() {
		var headquarterId = $("#headquarterId").val();
		getComputers(headquarterId);
		getConsoles(headquarterId);
    }
    
    function addTicket() {
        var valid = true;
        $("*").removeClass( "ui-state-error");        
        var value = $("#rechargeAmount").val();
        if ( value == 0){
        	$("#message").text("Debe ingresar un monto mayor a 0.");
    		$( "#messageDialog" ).dialog({
	      		  width: 700
	      	});            
            return false;
        }
        valid = valid && checkRegexp( $("#rechargeAmount"), /^[0-9]\d{0,3}($|\.\d{0,1}$)/i);    
        if ( !valid ){
        	$("#message").text("Debe ingresar ingresar un monto válido, menor de 999.90 soles y de un solo decimal.");
			$( "#messageDialog" ).dialog({
      		  width: 700
			});
        }
        return valid;
    }

   
    function checkRegexp( o, regexp) {
        var field = o.val();
        field = trim(field);
        if ( !( regexp.test( field ) ) ) {            
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

    
});