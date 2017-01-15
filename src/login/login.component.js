'use strict';

angular.module('login', [])
    .component('login', {
        templateUrl: 'login/login.html',
        controller: function ($scope, $rootScope, $window) {
            $scope.data = {}
            $scope.login = user => {
                $scope.data = angular.copy(user);
                var socket = io.connect('http://localhost:8555');
                socket.on('connect', function (data) {
                    socket.emit('login', $scope.data);
                });
                socket.on('dataOk', function (data) {
                    if (data) {
                        document.cookie = "username=" + data.username;
                        document.cookie = "login=true";
                        $window.location.href = '/';
                    }
                })
            }
        }
    });