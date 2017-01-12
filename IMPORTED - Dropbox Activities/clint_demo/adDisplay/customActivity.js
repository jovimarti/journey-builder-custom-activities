define([
    'js/postmonger'
], function(
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();

    $(window).ready(function() {
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
    });

    connection.on('requestPayload', function() {
        var payload = {};
		var name = $('#select1').find('option:selected').html();
		var value = $('#select1').find('option:selected').attr('value');
		
        payload.options = {
            message: value
        };
		
        payload.partnerActivityId = '123456';
        payload.flowDisplayName = name;
		
        connection.trigger('getPayload', payload);
    });

    connection.on('populateFields', function(payload) {
    });

    connection.on('getTokens', function(tokens) {
        console.log(tokens);
    });

    connection.on('getEndpoints', function(endpoints) {
        console.log(endpoints);
    });

});
