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

$("#loginBtn").click(function() {
	var email = $("#email").val();
	var password = $("#password").val();
	
	var hostname = window.location.protocol + "//" + window.location.host;
	var strUrl = hostname + "/cabin-web/usuario/search/findByNameAndPass";
	
	$.ajax({
		type: "GET",
	    url:strUrl,
	    crossDomain: true,
	    dataType: "json",
	    data: { name: email, pass: password },
	    success: function (json) {
	    	var usuario = json._embedded.usuario[0];
	    	var urlProfile = usuario._links.profile.href;
	    	console.log("urlProfile ::: " + urlProfile);
	    	$.ajax({
	    		type: "GET",
	    	    url:urlProfile,
	    	    crossDomain: true,
	    	    dataType: "json",
	    	    success: function (profile) {
	    	    	var hrefArray = profile._links.self.href.split("/");
	    	    	var idProfile = hrefArray[hrefArray.length -1];
	    	    	console.log("id profile ::: " + idProfile);
	    	    	if (idProfile === "1") {
	    	    		console.log("go to operator page");
	    	    		window.location.href = hostname + "/cabin-web/operator";
	    	    	} else if (idProfile === "2") {
	    	    		console.log("go to admin page");
	    	    		window.location.href = hostname + "/cabin-web/home";
	    	    	} else if (idProfile === "3") {
	    	    		console.log("go to user page");
	    	    		window.location.href = hostname + "/cabin-web/client";
	    	    	}
	    	    },
	    	    error: function (xhr, status) {	    	
	    	    	console.log("Error, su solicitud no pudo ser atendida");
	    	    }
	    	});
	    },
	    error: function (xhr, status) {	    	
	    	console.log("Error, su solicitud no pudo ser atendida");
	    }
	});
});