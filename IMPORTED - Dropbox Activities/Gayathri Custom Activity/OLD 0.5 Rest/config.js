define([], function(){              //Needed for AMD and JSONP support
    return {                      //Returns a well-formed JSON object 
        "icon": "images/icon.png", // 40x40px
        "iconSmall": "",//"images/iconSmall.png", // 15x15px
        "key": "83F0075B-8010-4919-94B5-2040B67BEC33", //AppExtensionId
        "partnerApiObjectTypeId": "IXN.CustomActivity.REST",
        "lang": {
            "en-US": {        //Culture name followed by object
                "name": "RestActivityV0.5",    // "name" is a reserved word representing the name that appears in the custom activity modal
                description: "RestActivityV0.5"
                // other globalization should occur in the 3rd party's custom js file
            }
            //additional supported cultures may be placed here
        },
        "category": "message", //grouping on sidebar?
        "version": "",
        "execute": {

            "uri": "https://posttestserver.com/post.php?dir=et_test_gmjexe&status_code=200",
            "verb": "POST",
            "body": "{\"Email\": \"%%emailAddr%%\", \"First Name\": \"%%FirstName%%\", \"Last Name\": \"%%LastName%%\"}",
            "header": "",
            "format": "json",
            "useJwt": false,
	    "timeout": 10000            
        },
        "save": {
            "uri": "https://posttestserver.com/post.php?sleep=30&dir=et_test_gmjsave",
            "verb": "POST",
            "body": "{\"Email\": \"%%emailAddr%%\", \"First Name\": \"%%FirstName%%\", \"Last Name\": \"%%LastName%%\"}",
            "header": "",
            "format": "json",
            "useJwt": false
        },
        "publish": {
            "uri": "https://posttestserver.com/post.php?sleep=30&dir=et_test_gmjPub&status_code=200",
            "verb": "POST",
            "body": "{\"Email\": \"%%emailAddr%%\", \"First Name\": \"%%FirstName%%\", \"Last Name\": \"%%LastName%%\"}",
            "header": "",
            "format": "json",
            "useJwt": false
        },      
        "validate": {
            "uri": "https://posttestserver.com/post.php?sleep=30&dir=et_test_gmjval&status_code=200",
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