$(function() {
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
    	addRechargeEvent();
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
        	var amount = $("#rechargeAmount").val();
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
    		    	showMessage("Recarga realizada satisfactoriamente", "rechargeAlert");
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
});