define([
    '../vendor/postmonger'
], function(
    Postmonger
) {
    'use strict';

    console.log('asdfasdf');
    var connection = new Postmonger.Session();
    var toJbPayload = {};
    var step = 1;

    $(window).ready(onRender);

    connection.on('initActivity', function(payload) {
        console.log('init');
        var message;

        if (payload) {
            toJbPayload = payload;
        }

        message = toJbPayload['arguments'].execute.inArguments.message;

        // If there is no message selected, disable the next button
        if (!message) {
            step = 1;
            gotoStep(step);
            connection.trigger('updateButton', { button: 'next', enabled: false });
        // If there is a message, skip to the summary step
        } else {
            step = 3;
            $('#select1').find('option[value='+ message +']').attr('selected', 'selected');
            $('#message').html(message);
            gotoStep(step);
        }


    });

    connection.on('requestedTokens', function(tokens) {
        // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
        // console.log(tokens);
    });

    connection.on('requestedTokens', function(endpoints) {
        // Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
        // console.log(endpoints);
    });

    connection.on('clickedNext', function() {
        step++;
        gotoStep(step);
        connection.trigger('ready');
    });

    connection.on('clickedBack', function() {
        step--;
        gotoStep(step);
        connection.trigger('ready');
    });

    function onRender() {
        console.log('ready');
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

        // Disable the next button if a value isn't selected
        $('#select1').change(function() {
            var message = getMessage();
            connection.trigger('updateButton', { button: 'next', enabled: Boolean(message) });

            $('#message').html(message);
        });

        connection.trigger('ready');    

    }

    function gotoStep(step) {
        $('.step').hide();
        switch(step) {
            case 1:
                $('#step1').show();
                connection.trigger('updateButton', { button: 'next', enabled: Boolean(getMessage()) });
                connection.trigger('updateButton', { button: 'back', visible: false });
                break;
            case 2:
                $('#step2').show();
                connection.trigger('updateButton', { button: 'back', visible: true });
                connection.trigger('updateButton', { button: 'next', text: 'next', visible: true });
                break;
            case 3:
                $('#step3').show();
                connection.trigger('updateButton', { button: 'back', visible: true });
                connection.trigger('updateButton', { button: 'next', text: 'done', visible: true });
                break;
            case 4: // Only 3 steps, so the equivalent of 'done' - send off the payload
                save();
                break;
        }
    }

    function getMessage() {
        return $('#select1').find('option:selected').attr('value').trim();
    }

    function save() {
        var name = $('#select1').find('option:selected').html();
        var value = getMessage();

        // toJbPayload is initialized on populateFields above.  Journey Builder sends an initial payload with defaults
        // set by this activity's config.json file.  Any property may be overridden as desired.
        toJbPayload.name = name;

        toJbPayload['arguments'].execute.inArguments.message = value;
        toJbPayload['arguments'].execute.inArguments.myInArgument = 'inArgument coming from iframe';

        toJbPayload['metaData'].things = 'stuff';
        toJbPayload['metaData'].icon = 'path/to/icon/set/from/iframe/icon.png';

        toJbPayload['configurationArguments'].version = '1.1'; // optional - for 3rd party to track their customActivity.js version
        toJbPayload['configurationArguments'].partnerActivityId = '49198498';
        toJbPayload['configurationArguments'].myConfiguration = 'configuration coming from iframe';

        connection.trigger('updateActivity', toJbPayload);
    }

});
