(function($){
	var PC = 'P';
	var CONSOLE = 'C';
	
	var DEFAULT = 1;
	var VIP = 2;
	var MAINTENANCE = 3;
	
	var ID_BY_GROUP = {}
	ID_BY_GROUP[DEFAULT] = "#default-equipos";
	ID_BY_GROUP[VIP] = "#vip-equipos";
	ID_BY_GROUP[MAINTENANCE] = "#mantenimiento-equipos";
	

	var idHeadquarter;
	
	$(document).ready(function(){
		addEventDragAndDrop();
		idHeadquarter = $('#idHeadquarter').val();
		fillComputers(idHeadquarter)
		addEventSaveTariff();
		fillTariffs(idHeadquarter);
		getOperators(idHeadquarter);
	});
	
	function addEventDragAndDrop() {
		$( "#default-equipos, #vip-equipos, #mantenimiento-equipos, #nuevo-grupo-equipos" ).sortable({
	      connectWith: ".connectedSortable",
	      cancel: ".equipo-activo",
	      receive: function( event, ui ) {
	    	  var computerId = $(ui.item).attr('computerId');
	    	  var groupId = $(event.target).attr('groupId');
	    	  updateGroupComputer(computerId, groupId);
	      }
	    }).disableSelection();
		
		$( "#default-consolas, #vip-consolas, #mantenimiento-consolas, #nuevo-grupo-consolas" ).sortable({
	      connectWith: ".connectedSortable",
	      receive: function( event, ui ) {
	    	  console.log("in receive");
	      }
	    }).disableSelection();
	}
	
	function updateGroupComputer(computerId, groupId) {
		var computerGroup = {};
		computerGroup.computerId = computerId;
		computerGroup.groupId = groupId;
		
		console.log(JSON.stringify(computerGroup));
		
		var hostname = window.location.protocol + "//" + window.location.host;
		var strUrl = hostname + "/cabin-web/post/updateComputerGroup";
		$.ajax({
			async: false,
			type: "POST",
		    url:strUrl,			    
		    data: JSON.stringify(computerGroup),
		    dataType: 'json', 
		    contentType: 'application/json',
		    success: function (data) {
		    },
		    error: function (xhr, status) {	    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    }
		});
	}
	
	function fillComputers(idHeadquarter) {
		var hostname = window.location.protocol + "//" + window.location.host;
		var strUrl = hostname + "/cabin-web/get/computersByHeadquarter";
		$.ajax({
			type: "GET",
		    url:strUrl,			    
		    data: {id: idHeadquarter},
		    dataType: 'json', 
		    contentType: 'application/json',
		    success: function (data) {
		    	$.each(data, function(index, value) {
		    		var classLi = ((value.rented) ? "equipo-activo" : "ui-state-default");
		    		var li = '<li class="' +classLi + '" computerId="' + value.id + '">' + value.name + '</li>';
		    		$(ID_BY_GROUP[value.group.id]).append(li);
		    	});
		    },
		    error: function (xhr, status) {	    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    }
		});
	}
	
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
		    	showMessage("Tarifas actualizadas satisfactoriamente", "tariffAlert");
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
		    	fillDropDowns(idHeadquarter);
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
	
	function fillDropDowns(idHeadquarter) {
		var hostname = window.location.protocol + "//" + window.location.host;
		var strUrl = hostname + "/cabin-web/get/tariffByHeadquarter";
		$.ajax({
			type: "GET",
		    url:strUrl,			    
		    dataType: 'json', 
		    data: {id: idHeadquarter},
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
	
	function getOperators(idHeadquarter) {
		var hostname = window.location.protocol + "//" + window.location.host;
		var strUrl = hostname + "/cabin-web/get/operators";
		var operators = "";
		var ulOperator = $("#operatorsList");
		var line = "";
		var name = "", lastname = "";
		$.ajax({
			type: "GET",
		    url:strUrl,
		    dataType: 'json', 
		    data: {id: idHeadquarter},
		    contentType: 'application/json',
		    success: function (data) {
		    	$.each(data, function(index, value) {		    		
		    		name = value.name;
		    		lastname = value.lastname;
	    			line += "<li><a href='/' onclick='return false;'>"+ lastname + ", " + name + "</a></li>";	    			
		    	});
		    	ulOperator.html(line);		    	
		    	var opeatorHtml =  $("#operatorsList li a");	    	
    	    	$(opeatorHtml).parents(".dropdown").find('.btn').html(lastname + ", " + name +' <span class="caret"></span>');
		    },
		    error: function (xhr, status) {	    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    }
		});
	}
	
	function showMessage(text, divId) {
		var div = $('#' + divId);
		div.text(text).show(1000);
		setTimeout(function() {
			div.hide(1000);
		}, 5000);
	}
})(this.jQuery);