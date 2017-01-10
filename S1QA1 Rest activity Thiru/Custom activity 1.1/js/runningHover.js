define([
    '../vendor/postmonger'
], function(
    Postmonger
    ) {
    'use strict';

    var connection = new Postmonger.Session();

    $(window).ready(onRender);

    connection.on('initActivityRunningHover', function(payload) {
        console.log(payload);
    });

    function onRender() {
        connection.trigger('ready');
    }

});
