'use strict';

angular.module('regis', [])
    .component('regis', {
        templateUrl: 'registration/regi.html',
        controller: function ($scope, $http, $rootScope) {

            $scope.registration = regi => {
                $scope.data = angular.copy(regi);
                if ($scope.data.passwort === $scope.data.passwortConfirm) {
                    var socket = io.connect('http://192.168.192.44:4000');
                    socket.on('connect', function (data) {
                        socket.emit('regis', $scope.data);
                    });
                    socket.on('dataOk', function (data) {
                        if(data){
                            alert("Registration erfolgreich")
                        }else {
                            alert("Registration fehlgeschlagen");
                        }
                    })
                } else {
                    console.log("Passwort falsch");
                }
            }

        }
    });