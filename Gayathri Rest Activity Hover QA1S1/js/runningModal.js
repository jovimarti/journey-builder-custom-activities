define([
    '../vendor/postmonger'
], function(
    Postmonger
    ) {
    'use strict';

    var connection = new Postmonger.Session();

    $(window).ready(onRender);

    connection.on('initActivityRunningModal', function(payload) {
        console.log(payload);
    });

    function onRender() {
        connection.trigger('ready');
    }

});
