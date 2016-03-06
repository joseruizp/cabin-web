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
  });