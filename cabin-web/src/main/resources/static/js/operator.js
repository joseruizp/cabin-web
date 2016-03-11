$(function() {
	var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/equipo";	
	console.log("Get pc" + strUrl);
	$.ajax({
		type: "GET",
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var pcs = json._embedded.equipo;
	    	
	    	console.log("Get pc success" + json);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    	fnOpenErrorDialog();
	    }
	});
	
	
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
  });