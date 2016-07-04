(function($){
	$(document).ready(function(){
		var idHeadquarter = $('#idHeadquarter').val();
		addEventsDropDowns();
		fillTariffs(idHeadquarter);
	});
	
	function fillTariffs(idHeadquarter) {
		var hostname = window.location.protocol + "//" + window.location.host;
		var strUrl = hostname + "/cabin-web/get/allTariff";
		$.ajax({
			type: "GET",
		    url:strUrl,			    
		    dataType: 'json', 
		    contentType: 'application/json',
		    success: function (data) {
		    	$.each(data, function(index, value) {
		    		var li = '<li><a href="/" onclick="return false;" value="'+value.id+'">'+value.description+'</a></li>';
		    		$("#pcDefaultUl").append(li);
		    		$("#consoleDefaultUl").append(li);
		    		$("#pcVipUl").append(li);
		    		$("#consoleVipUl").append(li);
		    		$("#pcMaintenanceUl").append(li);
		    		$("#consoleMaintenanceUl").append(li);
		    		$("#pcNewGroupUl").append(li);
		    		$("#consoleNewGroupUl").append(li);
		    	});
		    	addEventsDropDowns();
		    },
		    error: function (xhr, status) {	    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    }
		});
	}
	
	function addEventsDropDowns() {
		$(".dropdown-menu li a").click(function() {
			var value = $(this).attr("value");
			var text = $(this).text();
			var button = $(this).parents(".dropdown").find('.btn');
			button.attr("value", value);
			button.html(text + ' <span class="caret"></span>');
		});
	}
})(this.jQuery);