define([
    'js/postmonger'
], function(
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var payload = {};

    $(window).ready(onRender);

    connection.on('initActivity', initialize);

    connection.on('clickedNext', onClickedNext);

    function onRender() {
        connection.trigger('ready'); // JB will respond the first time 'ready' is called with 'initActivity'

        console.log(window.SFMC);
    }

    function initialize (data) {
        if (data) {
            payload = data;
        }

         connection.trigger('updateButton', { button: 'back', visible: false });
    }

    function onClickedNext () {
        save();
    }

    function save() {
        payload['metaData'].isConfigured = true;

        connection.trigger('updateActivity', payload);
    }

});
