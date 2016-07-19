$(function() {
	
	$(document).ready(function(){
    	getComputers();
    	getConsoles();
	});
	
	function getComputers() {
		var headquarterId = $("#headquarterId").val();
		var computerUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/computersByHeadquarter";	
		console.log("Get pc" + computerUrl);
		$.ajax({
			type: "GET",
		    url: computerUrl,
		    data: {id : headquarterId},
		    dataType: "json",
		    success: function (json) {
		    	var pcs = json;
		    	
		    	$.each(pcs, function (index, value) {
				    $('#computer-multiple').append($('<option/>', { 
				        value: value.id,
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
	}
	
	function getConsoles() {
		var headquarterId = $("#headquarterId").val();
		var consoleUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/get/consolesByHeadquarter";	
		console.log("Get pc" + consoleUrl);
		$.ajax({
			type: "GET",
		    url: consoleUrl,
		    data: {id : headquarterId},
		    dataType: "json",
		    success: function (json) {
		    	var consoles = json;
		    	
		    	$.each(consoles, function (index, value) {
				    $('#console-multiple').append($('<option/>', { 
				        value: value.id,
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
	}
	
	
    function showComputerDialog(pc) {
    	$("#computerName").text(pc.name);
    	$("#computerIpAddress").text(pc.ipAddress);
    	$("#computerSeries").text(pc.serie);
    	$("#computerMac").text(pc.mac);
    	$("#computerState").text(pc.status.name);
    	$("#computerGroup").text(pc.group.name);
    	
    	$( "#computerDialog" ).dialog({
    		  width: 700
    	});
    };
    
    function showConsoleDialog(console) {
    	$("#consoleName").text(console.name);
    	$("#consoleIpAddress").text(console.ipAddress);
    	$("#consoleState").text(console.status.name);
    	$("#consoleGroup").text(console.group.name);
    	
    	$( "#consoleDialog" ).dialog({
    		  width: 700
    	}); 	
    };
  });