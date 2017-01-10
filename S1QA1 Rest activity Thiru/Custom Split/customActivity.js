// Questions...
// What property bags do outcomes have?  Just arguments?

define([
    'js/postmonger'
], function(
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var toJbPayload = {};
    var outcomes = [];

    $(window).ready(onRender);

    connection.on('initActivity', function(payload) {
        if (payload) {
            toJbPayload = payload;
        }

        // We should always be receiving some outcomes from JB, which should be created as default outcomes from
        // the 'outcomes' object defined in our config.json
        if (toJbPayload.outcomes) {
            outcomes = toJbPayload.outcomes;
        }

        if (toJbPayload.arguments && toJbPayload.arguments.execute && toJbPayload.arguments.execute.inArguments && toJbPayload.arguments.execute.inArguments[0]) {
            $('#branch-criteria').val(toJbPayload.arguments.execute.inArguments[0].symbol);
        }

        connection.trigger('updateButton', { button: 'next', text: 'done' });
    });

    connection.on('clickedNext', save);

    function onRender() {
        connection.trigger('ready');
    }

    function save() {
        var input = $('#branch-criteria').val();

        toJbPayload.name = input;
        toJbPayload.arguments.execute.inArguments.push({ symbol: input });

        toJbPayload.metaData.isConfigured = true;

        connection.trigger('updateActivity', toJbPayload);
	}

});
