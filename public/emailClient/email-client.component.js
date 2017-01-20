'use strict';

angular.module('email', [])
    .component('email', {
        templateUrl: './emailClient/email-client.html',
        controller: function ($scope) {
            $scope.tableLeftData = [
                'Inbox',
                'Sent Mail',
                'Important',
                'Draft',
                'Spam',
                'Trash'
            ]
        }
    });