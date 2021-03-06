// ==UserScript==
// @name         Full Page Ad Diagnostics
// @namespace    http://mobile.fandango.com
// @version      1.07
// @description  Check diagnostics
// @author       Victor Chen
// @match        http*://mobile.fandango.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Helper Function
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

	// Define some variables   
    var isFullpage = mpscall["field[fullpage]"]; // check for the fullpage trigger
    var isAdInterstitial = getCookie("AdInterstitial"); // check for cookie
    var adCookieExpires = moment(isAdInterstitial,"MM/DD/YYYY HH:mm:ss A"); // parse the time
    var adExpireMsg = (isAdInterstitial === "Expired") ? "Expired":adCookieExpires.format("MM/DD/YYYY HH:mm:ss A");
    var offset = moment().utcOffset(); // get the current offset
	var now = moment(); // get the current time
	var duration = (isAdInterstitial === "Expired") ? 0:moment(adCookieExpires).diff(now,'minutes')+offset; // calculate duration remaining
    var nowInGMT = now.subtract(offset,"minutes").format("MM/DD/YYYY HH:mm:ss A"); // GMT conversion
    var isFullPageString,
    	isAdInterstitialString;

    if (isFullpage === undefined) {
    	if (window.console) {
    		window.console.log("[DIAGNOSE - FULL PAGE AD] MPS Fullpage Property  : Doesn't exist");
    	}
    	isFullPageString = "MPS Fullpage Property doesn't exist";
    } else {
    	if (window.console) {
    		window.console.log("[DIAGNOSE - FULL PAGE AD] MPS Fullpage Property  : "+isFullpage);
    	}
    	isFullPageString = "MPS Fullpage is: "+isFullpage;
    }

    if (isAdInterstitial === null) {
    	if (window.console) {
    		window.console.log("[DIAGNOSE - FULL PAGE AD] AdInterstitial cookie  : Doesn't exist");
    	}
    	isAdInterstitialString = "AdInterstitial cookie doesn't exist";
    } else {
    	if (window.console) {
    		window.console.log("[DIAGNOSE - FULL PAGE AD] Parse Ad Expire (GMT)  : "+adExpireMsg);
    		window.console.log("[DIAGNOSE - FULL PAGE AD] Current Date/Time (GMT): "+nowInGMT);
	  		window.console.log("[DIAGNOSE - FULL PAGE AD] Frequency Cap Ends in  : "+duration+" minutes");
    	}
    	isAdInterstitialString = "AdInterstitial is: "+isAdInterstitial;
    }

    if (isAdInterstitial === "Expired") {
    	if (window.console) {
    		window.console.log("[DIAGNOSE - FULL PAGE AD] Full Page Ad Interstitial will display on the next screen");
    	}
    } else if (isAdInterstitial && isFullpage === 1) {
    	if (window.console) {
    		window.console.log("[DIAGNOSE - FULL PAGE AD] Full Page Ad Interstitial is displayed");
    	}
    } else {
    	if (window.console) {
    		window.console.log("[DIAGNOSE - FULL PAGE AD] Full Page Ad Interstitial is not displayed");
    	}
    }

    // add styles
    /*
    var css = document.createElement('style');
	css.type = 'text/css';

	var styles = '.fandango-ad-diag { position:fixed;padding:10px;right:10px;bottom: 10px;background:chartreuse;font-size:1.2em;z-index:2200000000;box-shadow:0 0 5px rgba(0,0,0,0.25);}';
	
	if (css.styleSheet) css.styleSheet.cssText = styles;
	else css.appendChild(document.createTextNode(styles));

	document.getElementsByTagName("head")[0].appendChild(css);

	
    setTimeout(function() {
    	document.body.innerHTML += "<div class='fandango-ad-diag'><div class='fandango-ad-fp'>"+isFullPageString+"</div><div class='fandango-ad-adinterstitial'>"+isAdInterstitial+"</div></div>";
    }, 1000);
    
    */
})();