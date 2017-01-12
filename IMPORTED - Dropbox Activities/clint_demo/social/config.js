define([], function(){              //Needed for AMD and JSONP support
    return {                      //Returns a well-formed JSON object
        "icon": "images/social.png",//"images/icon.png", // 40x40px
        "iconSmall": "images/socialSmall.png",//"images/iconSmall.png", // 15x15px
        "key": "ec378789-65d4-432d-8112-3a473cd287be", //AppExtensionId
        "partnerApiObjectTypeId": 100108,
        "lang": {
            "en-US": {        //Culture name followed by object
                "name": "Social",    // "name" is a reserved word representing the name that appears in the custom activity modal
                description: ""
                // other globalization should occur in the 3rd party's custom js file
            }
            //additional supported cultures may be placed here
        },
        "category": "message", //grouping on sidebar?
        "version": "",
        "execute": {
            "uri": " http://posttestserver.com/post.php?dir=et_test_exe",
            "verb": "POST",
            "body": "{\"Email\": \"%%emailAddr%%\", \"First Name\": \"%%FirstName%%\", \"Last Name\": \"%%LastName%%\"}",
            "header": "{\"Authorization\": \"OAuth oauth_token=%%OauthToken%%\"}",
            "format": "json",
            "useJwt": false,
            "timeout": "500"

        },
        "save": {
            "uri": "",
            "verb": "POST",
            "body": "",
            "header": "",
            "format": "",
            "useJwt": false
        },
        "publish": {
            "uri": "",
            "verb": "POST",
            "body": "",
            "header": "",
            "format": "",
            "useJwt": false
        },
        "validate": {
            "uri": "",
            "verb": "POST",
            "body": "",
            "header": "",
            "format": "",
            "useJwt": false
        },
        "edit": {
            "uri": "",
            "height": 100,
            "width": 300
        }
    };
});