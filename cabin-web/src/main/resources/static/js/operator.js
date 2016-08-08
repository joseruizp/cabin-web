$(document).ready(function() { 
		var strUrl = window.location.protocol + "//" + window.location.host + "/cabin-web/cliente/search/findByName";
		$("#e1").select2({
			width: "100%",
		    placeholder: "Seleccione un cliente",
			allowClear: true,
		    ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
		        url: strUrl,
		        type: "GET",
		        dataType: 'json',
		        crossDomain: true,
		        quietMillis: 250,
		        data: function (term, page) {
		            return {
		                name: term, // search term
		            };
		        },
		        results: function (data) { // parse the results into the format expected by Select2.
		            // since we are using custom formatting functions we do not need to alter the remote JSON data
		        	var results = [];		            
		            $.each(data._embedded.cliente, function (index, value) {
		            		var hrefArray = value._links.self.href.split("/");
		    		    	var id = hrefArray[hrefArray.length -1];
		    		    	results.push ({
		    		    		id: id,
		                        text: value.name		                        
		                    });
		            });		            
		            return {
		            	results: results
		            };
		        },
		        cache: true
		    },
		    /*
		    initSelection: function(element, callback) {
		        // the input tag has a value attribute preloaded that points to a preselected repository's id
		        // this function resolves that id attribute to an object that select2 can render
		        // using its formatResult renderer - that way the repository name is shown preselected
		        var id = $(element).val();
		        if (id !== "") {
		            $.ajax(window.location.protocol + "//" + window.location.host + "/cabin-web/get/client/" + id, {
		                dataType: "json"
		            }).done(function(data) { callback(data); });
		        }
		    },
		    */
		    formatResult: repoFormatResult, // omitted for brevity, see the source of this page
		    //formatSelection: repoFormatSelection,  // omitted for brevity, see the source of this page
		    //dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
		    escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
		}); 
});

function repoFormatResult(data) {
    return datal;
}