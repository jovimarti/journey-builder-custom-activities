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

        updateBranchList();

        connection.trigger('updateButton', { button: 'next', text: 'done' });
    });

    connection.on('clickedNext', save);

    function onRender() {
        connection.trigger('ready');

        $('#add-branch').click(addBranch);
    }

    function updateBranchList() {
        var x = 0;

        $('#branch-list').html('');

        $.each(outcomes, function(key, val) {
            var outcome = val;
            var index = x;

            $('#branch-list').append('<div><img src="images/close.png" id="' + x + '" class="delete"> ' + (x+1) + '. ' + outcome['arguments'].branchResult + '</div>');
            $('#'+x).click(function() {
                deleteBranch(index);
            });

            x++;
        });
    }

    function addBranch() {
        var exists = false;
        var error = $('#errors');
        var criteria = $('#branch-criteria').val();
        var outcome = {
            arguments: {
                "branchResult": criteria
            }
        };

        outcome.metaData = { label: 'SetFromCustomJS' };

        // Verify there is not already an outcome with this criteria key
        $.each(outcomes, function(key, val) {
            var outcome = val;

            if (outcome['arguments'].branchResult === criteria) {
                exists = true;
            }
        });

        if (exists || !criteria) {
            error.show();
        } else {
            error.hide();
            outcomes.push(outcome);
        }

        updateBranchList();

        $('#branch-criteria').val('');
    }

    function deleteBranch(index) {
        if (outcomes.length === 1) {
            return;
        }

        outcomes.splice(index, 1);

        updateBranchList();
    }

    function save() {
        toJbPayload.name = outcomes.length + ' Branches';
        toJbPayload.outcomes = outcomes;

        toJbPayload.metaData.isConfigured = true;

        connection.trigger('updateActivity', toJbPayload);
    }

});
