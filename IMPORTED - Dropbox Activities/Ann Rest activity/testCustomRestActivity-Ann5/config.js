define([], function(){              //Needed for AMD and JSONP support
    return {                      //Returns a well-formed JSON object
        "icon": "",//"images/icon.png", // 40x40px
        "iconSmall": "",//"images/iconSmall.png", // 15x15px
        "key": "fabcde71-f493-4595-8b65-3549bb0e8d4d", //AppExtensionId
        "partnerApiObjectTypeId": "IXN.CustomActivity.REST",
        "lang": {
            "en-US": {        //Culture name followed by object
                "name": "Thiru Custom Activity V1 Json",    // "name" is a reserved word representing the name that appears in the custom activity modal
                description: "Thiru Custom Activity V1 Json"
                // other globalization should occur in the 3rd party's custom js file
            }
            //additional supported cultures may be placed here
        },
        "category": "message", //grouping on sidebar?
        "version": "",
        "execute": {

            "uri": " http://posttestserver.com/post.php?dir=et_test_jexe",
            "verb": "POST",
            "body": "{\"Email\": \"%%emailAddr%%\", \"First Name\": \"%%FirstName%%\", \"Last Name\": \"%%LastName%%\"}",
            "header": "",
            "format": "json",
            "useJwt": false,
            "timeout": "500"

        },
        "save": {
            "uri": "http://posttestserver.com/post.php?dir=et_test_jsave",
            "verb": "POST",
            "body": "{\"Email\": \"%%emailAddr%%\", \"First Name\": \"%%FirstName%%\", \"Last Name\": \"%%LastName%%\"}",
            "header": "",
            "format": "json",
            "useJwt": false
        },
        "publish": {
            "uri": "http://posttestserver.com/post.php?dir=et_test_jPub",
            "verb": "POST",
            "body": "{\"Email\": \"%%emailAddr%%\", \"First Name\": \"%%FirstName%%\", \"Last Name\": \"%%LastName%%\"}",
            "header": "",
            "format": "json",
            "useJwt": false
        },
        "validate": {
            "uri": "http://posttestserver.com/post.php?dir=et_test_jval",
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