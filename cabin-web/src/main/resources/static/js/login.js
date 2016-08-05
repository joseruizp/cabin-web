(function($){
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
		addEventLogin();
	});
	
	function addEventUserType(){
		$("#userType").change(function() {			
			var value = $(this).val();
			console.log("userType value: " + value);
			if (value === "3") {
				$("#headquarterDiv").show();
			} else {
				$("#headquarterDiv").hide();
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
	
	function addEventLogin() {
		$("#loginBtn").click(function() {
			var email = $("#email").val();
			var password = $("#password").val();
			var headquarterId = $("#headquarter").val();
			console.log("headquarterId value: " + headquarterId);
			var user = {};
			user.name = email;
			user.pass = password;
			if ($("#headquarterDiv").is(":visible")) {
				user.headquarterId = headquarterId;
			}
			
			var hostname = window.location.protocol + "//" + window.location.host;
			var strUrl = hostname + "/cabin-web/post/login";
			
			$.ajax({
				type: "POST",
			    url:strUrl,
			    contentType: 'application/json',
			    dataType: "json",
			    data: JSON.stringify(user),
			    success: function (json) {
			    	console.log(json);
			    	var idProfile = json.profile.id;
			    	console.log("id profile ::: " + idProfile);
			    	if (idProfile === 1) {
			    		console.log("go to operator page");
			    		window.location.href = hostname + "/cabin-web/operator";
			    	} else if (idProfile === 2) {
			    		console.log("go to admin page");
			    		window.location.href = hostname + "/cabin-web/home";
			    	} else if (idProfile === 3) {
			    		console.log("go to user page");
			    		window.location.href = hostname + "/cabin-web/client";
			    	} else if (idProfile === 4) {
			    		console.log("go to user page");
			    		window.location.href = hostname + "/cabin-web/incidence";
			    	}
			    },
			    error: function (xhr, status) {	    	
			    	console.log("Error, su solicitud no pudo ser atendida");
			    }
			});
		});
	}
	
	function newUser(){
		var hostname = window.location.protocol + "//" + window.location.host;	
		window.location.href = hostname + "/cabin-web/newUser";
	}

})(this.jQuery);