(function($){
	var PC = 'P';
	var CONSOLE = 'C';
	
	$(document).ready(function(){
		addEventSaveTariff();
		fillTariffs(idHeadquarter);
	});
	
	function addEventSaveTariff() {
		var headquarterId = $('#idHeadquarter').val();
		var tariffByGroups = [];
		$("#saveTariffBtn").click(function(e) {
			e.preventDefault();
			$(".tariffPcDropdown").each(function() {
				var groupId = $(this).attr("group-id");
				var tariffId = $(this).attr("value");
				var tariffByGroup = newTariffByGroup(headquarterId, groupId, tariffId, PC);
				tariffByGroups.push(tariffByGroup);
			});
            $(".tariffConsoleDropdown").each(function() {
            	var groupId = $(this).attr("group-id");
				var tariffId = $(this).attr("value");
				var tariffByGroup = newTariffByGroup(headquarterId, groupId, tariffId, CONSOLE);
				tariffByGroups.push(tariffByGroup);
			});
            saveTariffs(tariffByGroups);
		});
	}
	
	function newTariffByGroup(headquarterId, groupId, tariffId, pcConsoleFlag) {
		var tariffByGroup = {};
		tariffByGroup.headquarter = {};
		tariffByGroup.headquarter.id = headquarterId;
		tariffByGroup.group = {};
		tariffByGroup.group.id = groupId;
		tariffByGroup.tariff = {};
		tariffByGroup.tariff.id = tariffId;
		tariffByGroup.pcConsoleFlag = pcConsoleFlag;
		return tariffByGroup;
	}
	
	function saveTariffs(tariffByGroups) {
		var dataTariffs = JSON.stringify(tariffByGroups);
		console.log("saveTariffs, data: " + dataTariffs);
		var hostname = window.location.protocol + "//" + window.location.host;
		var strUrl = hostname + "/cabin-web/post/saveTariffByGroup";
		$.ajax({
			type: "POST",
		    url:strUrl,			    
		    dataType: 'json', 
		    data: dataTariffs,
		    contentType: 'application/json',
		    success: function (data) {
		    	console.log("tariffs saved : " + data);
		    },
		    error: function (xhr, status) {	    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    }
		});
	}
	
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
		    	});
		    	addEventsDropDowns();
		    	fillDropDowns();
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
	
	function fillDropDowns() {
		var hostname = window.location.protocol + "//" + window.location.host;
		var strUrl = hostname + "/cabin-web/get/tariffByHeadquarter";
		$.ajax({
			type: "GET",
		    url:strUrl,			    
		    dataType: 'json', 
		    contentType: 'application/json',
		    success: function (data) {
		    	$.each(data, function(index, value) {
		    		var button = null;
		    		if (PC === value.pcConsoleFlag) {
		    			var button = $(".tariffPcDropdown[group-id='" + value.group.id + "']");
		    		}
		    		if (CONSOLE === value.pcConsoleFlag) {
		    			var button = $(".tariffConsoleDropdown[group-id='" + value.group.id + "']");
		    		}
		    		button.attr("value", value.tariff.id);
	    			button.html(value.tariff.description + ' <span class="caret"></span>');
		    	});
		    },
		    error: function (xhr, status) {	    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    }
		});
	}
})(this.jQuery);