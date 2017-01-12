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

    connection.on('updateStep', save);

    connection.on('populateFields', function(payload) {
		$('#select1').find('option[value='+payload.message+']').attr('selected', 'selected');
    });

    connection.on('getTokens', function(tokens) {
        // console.log(tokens);
    });

    connection.on('getEndpoints', function(endpoints) {
        // console.log(endpoints);
    });
	
	function save() {
        var payload = {};
		var name = $('#select1').find('option:selected').html();
		var value = $('#select1').find('option:selected').attr('value');
		
        payload.options = {
            message: value
        };
		
        payload.partnerActivityId = '123456';
        payload.flowDisplayName = name;
		
		connection.trigger('save', payload);
	}

});
