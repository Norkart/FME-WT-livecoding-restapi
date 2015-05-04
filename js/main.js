//making a global namespace
var Norkart = {};

$(document).ready(function() {

    /** JQuery.js */
    Norkart.url = "https://wt-demo-norkart.fmecloud.com/fmerest/repositories/samples/austinDownload/parameters.json";
    Norkart.runJQueryGet = function(url) {
        $.get(url, function(responsedata) {
            Norkart.response = responsedata;
            console.log(responsedata);
            $("#jqueryresponse").html(JSON.stringify(responsedata, null, '\t'));
        }).fail(function(jqXHR) {
            console.log("ERROR");
            console.log(jqXHR);
            throw new Error(jqXHR);
        });
    };

    /** FMEServer.js */
    Norkart.fmeserver = {};
    Norkart.fmeserver.init = false;
    Norkart.fmeserver.token = "b2da6e4ebf9b855f19cfbd5a9a9869baf287321a";//should not hardcode this in .js - hide it server-side

    Norkart.initFME = function() {
    	//check if FMEServer lib is initialized - if not: init.
		if(Norkart.fmeserver.init === false) {
    		FMEServer.init({
	            server: "https://wt-demo-norkart.fmecloud.com/",
	            token: Norkart.fmeserver.token//retrieved manually from token service
	        });
	        Norkart.fmeserver.init = true;
    	}
    } 
    //custom generate token based on username+password
    Norkart.getToken = function() {
    	Norkart.initFME();
        FMEServer.generateToken('superuser', "BxuDyg8wkzh3ZKfR43D2", '7', 'days', function(responsedata) {
            Norkart.response = responsedata;
            console.log(responsedata);
            $("#fmeserverresponse").html(JSON.stringify(responsedata, null, '\t'));
        });
    } 

    Norkart.getParams = function () {
    	Norkart.initFME();
    	FMEServer.getWorkspaceParameters( "Samples", "austinDownload.fmw", function(responsedata) {
    		Norkart.response = responsedata;
            console.log(responsedata);
            $("#fmeserverresponse").html(JSON.stringify(responsedata, null, '\t'));
    	});
    }

    Norkart.buildForm = function() {
    	Norkart.initFME();

    	console.log("fetching params")
    	FMEServer.getWorkspaceParameters( "Samples", "austinDownload.fmw", function(responsedata) {
            console.log(responsedata);
            $("#fmeserverresponse").html(JSON.stringify(responsedata, null, '\t'));

            console.log("finished fetching parameters - building form");
            FMEServer.generateFormItems("fmeplayground",responsedata);
    	});    	
    	
    }

    Norkart.download = function() {
    	Norkart.initFME();
    	var parameters = {
    		"COORDSYS": "LL84",
    		"FORMAT_GENERIC": "PDF2D",
    		"opt_requesteremail": "alexanno@gmail.com",
    		"opt_servicemode": "sync"//sync vs async
    	};
    	var queryString = $.param(parameters);//serialize to querystring
    	FMEServer.runDataDownload( "Samples", "austinDownload.fmw", queryString, function(responsedata) {
    		Norkart.response = responsedata;
            console.log(responsedata);
            $("#fmeserverresponse").html(JSON.stringify(responsedata, null, '\t'));
    	});
    }

    //data streaming with response JSON to use FME as a web service for business logic
    Norkart.stream = function() {
    	Norkart.initFME();

    	var parameters = {};
    	var queryString = $.param(parameters);//serialize to querystring

    	FMEServer.runDataStreaming( "Samples", "json_output.fmw", queryString, function(responsedata) {
    		Norkart.response = responsedata;
            console.log(responsedata);

            alert(Norkart.response[0].statustext);

            $("#fmeserverresponse").html(JSON.stringify(responsedata, null, '\t'));
    	});
    }

	Norkart.clear = function() {
		$("#jqueryresponse").html("");
		$("#fmeserverresponse").html("");
		$("#fmeplayground").html("");
	}

})