'use strict';

angular.module('sidebar', [])
    .component('sidebar', {
        templateUrl: './navBarSide/navbarSide.html',
        controller: function ($scope, $window, $timeout, $route, $location) {

            $scope.routing = function (rout) {
                $location.url(rout)
            }
        }
    });