define([
    'js/postmonger'
], function(
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var options;
    var uiPayload;
    var etPayload;

    $(window).ready(function() {
        connection.trigger('ready');
    });

    connection.on('updateStep', function(step) {
        if (step >= 1 && step <= 3) {
            $('.step').hide();
            $('#step'+step).show();
            connection.trigger('updateStep', step);
        } else if (step > 3) {
            options = { // any values that need to be repopulated in the custom trigger UI should be placed here
                countryCode: $('#select-country-code').find('option:selected').attr('value'),
                firstName: $('#select-first-name').val(),
                lastName: $('#select-last-name').val()
            };
            uiPayload = {
                options: options,
                description: 'Country Code: ' + options.countryCode + ', First Name: ' + options.firstName + ', Last Name: ' + options.lastName
            };
            etPayload = {
                filter: "<FilterDefinition Source='SubscriberAttribute'><ConditionSet Operator='AND' ConditionSetName='Grouping'><Condition ID='8415CECF-2C5A-E411-804F-0022642D9886' isParam='false' Operator='Equal' operatorEditable='0' valueEditable='1' annotation=''><Value><![CDATA[" + options.countryCode + "]]></Value></Condition><Condition ID='8515CECF-2C5A-E411-804F-0022642D9886' isParam='false' Operator='Equal' operatorEditable='0' valueEditable='1' annotation=''><Value><![CDATA[" + options.firstName + "]]></Value></Condition><Condition ID='7E15CECF-2C5A-E411-804F-0022642D9886' isParam='false' Operator='Equal' operatorEditable='0' valueEditable='1' annotation=''><Value><![CDATA[" + options.lastName + "]]></Value></Condition></ConditionSet></FilterDefinition>"
            };
            connection.trigger('save', uiPayload, etPayload);
        }
    });

    connection.on('populateFields', function(options) {
        if (options) {
            if (options.countryCode) $('#select-country-code').val(options.countryCode);
            if (options.firstName) $('#select-first-name').val(options.firstName);
            if (options.lastName) $('#select-last-name').val(options.lastName);
        }
		connection.trigger('stepsPopulated');
    });
});
