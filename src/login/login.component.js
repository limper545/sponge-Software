'use strict';

angular.module('login', [])
    .component('login', {
        templateUrl: 'login/login.html',
        controller: function ($scope, $http, $rootScope) {

            $scope.data = {}
            $scope.login = user => {
                $scope.data = angular.copy(user);
                var socket = io.connect('http://localhost:8555');
                socket.on('connect', function (data) {
                    socket.emit('login', $scope.data);
                });
                socket.on('dataOk', function (data) {
                    if (data) {
                        alert("Login Gut");
                    } else if(!data){
                        alert('Login Schlecht');
                    }
                })
            }
        }
    });