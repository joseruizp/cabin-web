$(function() {
	var computerUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/equipo";	
	console.log("Get pc" + computerUrl);
	$.ajax({
		type: "GET",
	    url: computerUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var pcs = json._embedded.equipo;
	    	
	    	$.each(pcs, function (index, value) {
	    		var hrefArray = value._links.self.href.split("/");
	    		var id = hrefArray[hrefArray.length -1];
			    $('#computer-multiple').append($('<option/>', { 
			        value: id,
			        text : value.name,
			        'class' : 'option-multiple computer-multiple'
			    }));
			});  
	    	
	    	$('#computer-multiple').click(function(e) {
	    		e.preventDefault();
	    		var index = $(this).prop('selectedIndex');
	    		var pc = pcs[index];
	    		showComputerDialog(pc);
	    	})
	    	
	    	console.log("Get pc success" + json);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
	
	var consoleUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/consola";	
	console.log("Get pc" + consoleUrl);
	$.ajax({
		type: "GET",
	    url: consoleUrl,
	    crossDomain: true,
	    dataType: "json",
	    success: function (json) {
	    	var consoles = json._embedded.consola;
	    	
	    	$.each(consoles, function (index, value) {
	    		var hrefArray = value._links.self.href.split("/");
	    		var id = hrefArray[hrefArray.length -1];
			    $('#console-multiple').append($('<option/>', { 
			        value: id,
			        text : value.name,
			        'class' : 'option-multiple console-multiple'
			    }));
			});  
	    	
	    	$('#console-multiple').click(function(e) {
	    		e.preventDefault();
	    		var index = $(this).prop('selectedIndex');
	    		var console = consoles[index];
	    		showConsoleDialog(console);
	    	})
	    	
	    	console.log("Get pc success" + json);
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
	
	
    function showComputerDialog(pc) {
    	$("#computerName").text(pc.name);
    	$("#computerIpAddress").text(pc.ipAddress);
    	$("#computerSeries").text(pc.serie);
    	$("#computerMac").text(pc.mac);
    	
    	$.ajax({
    		type: "GET",
    	    url:pc._links.status.href,
    	    crossDomain: true,
    	    dataType: "json",
    	    success: function (json) {
    	    	$("#computerState").text(json.name);
    	    },
    	    error: function (xhr, status) {	    	
    	    	console.log("Error, su solicitud no pudo ser atendida");
    	    }
    	});
    	
    	$.ajax({
    		type: "GET",
    	    url:pc._links.group.href,
    	    crossDomain: true,
    	    dataType: "json",
    	    success: function (json) {
    	    	$("#computerGroup").text(json.name);
    	    },
    	    error: function (xhr, status) {	    	
    	    	console.log("Error, su solicitud no pudo ser atendida");
    	    }
    	});
    	
    	$( "#computerDialog" ).dialog({
    		  width: 700
    	});
    };
    
    function showConsoleDialog(console) {
    	$("#consoleName").text(console.name);
    	$("#consoleIpAddress").text(console.ipAddress);
    	
    	$.ajax({
    		type: "GET",
    	    url:console._links.status.href,
    	    crossDomain: true,
    	    dataType: "json",
    	    success: function (json) {
    	    	$("#consoleState").text(json.name);
    	    },
    	    error: function (xhr, status) {	    	
    	    	console.log("Error, su solicitud no pudo ser atendida");
    	    }
    	});
    	
    	$.ajax({
    		type: "GET",
    	    url:console._links.group.href,
    	    crossDomain: true,
    	    dataType: "json",
    	    success: function (json) {
    	    	$("#consoleGroup").text(json.name);
    	    },
    	    error: function (xhr, status) {	    	
    	    	console.log("Error, su solicitud no pudo ser atendida");
    	    }
    	});
    	
    	$( "#consoleDialog" ).dialog({
    		  width: 700
    	}); 	
    };
  });