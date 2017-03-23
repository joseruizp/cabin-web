(function($){
	var errors = {};
	errors['E001'] = 'Usuario no existe.';
	errors['E002'] = 'Usuario no existe.';
	errors['E003'] = 'Usuario inactivo.';
	errors['E004'] = 'Se ha excedido el maximo número de operadores en la sede.';
	
	$(".input").focusin(function() {
		$(this).find("span").animate({
			"opacity" : "0"
		}, 200);
	});
	
	$(".input").focusout(function() {
		$(this).find("span").animate({
			"opacity" : "1"
		}, 300);
	});
	
	$(".login").submit(function() {
		$(this).find(".submit i").removeAttr('class').addClass("fa fa-check").css({
			"color" : "#fff"
		});
		$(".submit").css({
			"background" : "#2ecc71",
			"border-color" : "#2ecc71"
		});
		$(".feedback").show().animate({
			"opacity" : "1",
			"bottom" : "-80px"
		}, 400);
		$("input").css({
			"border-color" : "#2ecc71"
		});
		
		
		
		return false;
	});
	
	$(document).ready(function(){
		addEventUserType();
		getHeadquarters();
		addEventAnonymous();
		showFailureLoginMessage();
	});
	
	function showMessage(text, divId) {
		var div = $('#' + divId);
		div.text(text).show(1000);
		setTimeout(function() {
			div.hide(1000);
		}, 5000);
	}
	
	function addEventUserType(){
		$("#userType").change(function() {			
			var value = $(this).val();
			console.log("userType value: " + value);
			if (value === "1" || value === "3") {
				$("#headquarterDiv").show();
				if (value === "3") {
					$("#anonymousDiv").show();	
				} else {
					$("#anonymousDiv").hide();
				}
			} else {
				$("#headquarterDiv").hide();
				$("#anonymousDiv").hide();
			}
		});
	}
	
	function getHeadquarters() {
		var hostname = window.location.protocol + "//" + window.location.host;
		var strUrl = hostname + "/cabin-web/get/allHeadquarters";
		$.ajax({
			type: "GET",
		    url:strUrl,			    
		    dataType: 'json', 
		    contentType: 'application/json',
		    success: function (data) {
		    	$.each(data, function(index, value) {
		    		var option = '<option value=' + value.id +'>' + value.name + '</option>';
		    		$("#headquarter").append(option);
		    	});
		    },
		    error: function (xhr, status) {	    	
		    	console.log("Error, su solicitud no pudo ser atendida");
		    }
		});
	}
	
	function newUser(){
		var hostname = window.location.protocol + "//" + window.location.host;	
		window.location.href = hostname + "/cabin-web/newUser";
	}
	
	function addEventAnonymous() {
		$("#anonymousBtn").click(function() {
			var headquarterId = $("#headquarter").val();
			console.log("headquarterId value: " + headquarterId);
			var user = {};
			user.headquarterId = headquarterId;
			
			var hostname = window.location.protocol + "//" + window.location.host;
			var strUrl = hostname + "/get/anonymous";
			
			$.ajax({
				type: "GET",
			    url:strUrl,
			    contentType: 'application/json',
			    dataType: "json",
			    success: function (json) {
		    		console.log("go to user page");
		    		var inputEmail = $("<input>")
		               .attr("type", "hidden")
		               .attr("name", "email").val(json.name);
		    		var inputPassword = $("<input>")
		               .attr("type", "hidden")
		               .attr("name", "password").val(json.pass);
		    		var inputProfile = $("<input>")
		               .attr("type", "hidden")
		               .attr("name", "profileId").val(json.profile.id);
		    		var inputHeadquarter = $("<input>")
		               .attr("type", "hidden")
		               .attr("name", "headquarterId").val($("#headquarter").val());
		    		$('#anonymousForm').append($(inputEmail));
		    		$('#anonymousForm').append($(inputPassword));
		    		$('#anonymousForm').append($(inputProfile));
		    		$('#anonymousForm').append($(inputHeadquarter));
		    		document.getElementById("anonymousForm").submit();
			    },
			    error: function (xhr, status) {	    	
			    	console.log("Error, su solicitud no pudo ser atendida");
			    }
			});
		});
	}
	
	function showFailureLoginMessage() {
	    var url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + "error" + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (results != null) {
    		var errorCode = decodeURIComponent(results[2].replace(/\+/g, " "));
    		var message = errors[errorCode];
    		showMessage(message, 'errorAlert');
	    }
	}

})(this.jQuery);