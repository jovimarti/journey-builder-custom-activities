define([
    'js/postmonger'
], function(
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();

    $(window).ready(function() {
        connection.trigger('ready');
        connection.trigger('requestEndpoints');
    })

    connection.on('requestPayload', function() {
        var payload = {};
		var o1 = $('#option1')[0].value;
		var o2 = $('#option2')[0].value;
		var o3 = $('#option3')[0].value;
		
        payload.options = {
            option1: o1,
            option2: o2,
            option3: o3
        };
		
        payload.partnerActivityId = '123456';
        payload.flowDisplayName = o1 + ' - ' + o2 + ' - ' + o3;
		
        connection.trigger('getPayload', payload);
    });
connection.on('getTokens', function(tokens) {
        console.log(tokens);
    });

    connection.on('getEndpoints', function(endpoints) {
        console.log(endpoints.restHost);
    });

    connection.on('populateFields', function(payload) {
        if (!payload) return;
        if (payload.option1) {
            $('#option1').attr('value', payload.option1);
        }
        if (payload.option2) {
            $('#option2').attr('value', payload.option2);
        }
        if (payload.option3) {
            $('#option3').attr('value', payload.option3);
        }
    });

});
