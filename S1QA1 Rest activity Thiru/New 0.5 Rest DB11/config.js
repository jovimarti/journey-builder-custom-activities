define([], function(){              //Needed for AMD and JSONP support
    return {                      //Returns a well-formed JSON object 
        "icon": "images/icon.png", // 40x40px
        "iconSmall": "",//"images/iconSmall.png", // 15x15px
        "key": "rest_db11", //AppExtensionId
        "partnerApiObjectTypeId": "IXN.CustomActivity.REST",
        "lang": {
            "en-US": {        //Culture name followed by object
                "name": "Thiru Custom Activity New V0.5",    // "name" is a reserved word representing the name that appears in the custom activity modal
                description: "Thiru Custom Activity V1 Json fabcde71-f493-4595-8b65-3549bb0e8d4d"
                // other globalization should occur in the 3rd party's custom js file
            }
            //additional supported cultures may be placed here
        },
        "category": "message", //grouping on sidebar?
        "version": "",
        "execute": {

            "uri": "https://posttestserver.com/post.php?dir=et_test_jexe&status_code=200",
            "verb": "POST",
            "body": "{\"Email\": \"%%emailAddr%%\", \"First Name\": \"%%FirstName%%\", \"Last Name\": \"%%LastName%%\"}",
	    "header": "",
            "format": "json",
            "useJwt": false,
	    "timeout": 10000            
        },
        "save": {
            "uri": "https://posttestserver.com/post.php?dir=et_test_jsave",
            "verb": "POST",
            "body": "{\"Email\": \"%%emailAddr%%\", \"First Name\": \"%%FirstName%%\", \"Last Name\": \"%%LastName%%\"}",
            "header": "",
	    "format": "json",
            "useJwt": false
        },
        "publish": {
            "uri": "https://posttestserver.com/post.php?dir=et_test_jPub&status_code=200",
            "verb": "POST",
            "body": "{\"Email\": \"%%emailAddr%%\", \"First Name\": \"%%FirstName%%\", \"Last Name\": \"%%LastName%%\"}",
            "header": "",
	    "format": "json",
            "useJwt": false
        },      
        "validate": {
            "uri": "https://posttestserver.com/post.php?dir=et_test_jval&status_code=200",
            "verb": "POST",
            "body": "{\"Email\": \"%%emailAddr%%\", \"First Name\": \"%%FirstName%%\", \"Last Name\": \"%%LastName%%\"}",
            "header": "",
	    "format": "json",
            "useJwt": false
        },
        "edit": {
            "uri": "",
            "height": 300,
            "width": 500
        }
    };
});