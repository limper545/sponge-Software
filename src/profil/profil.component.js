'use strict';

angular.module('profil', [])
    .component('profil', {
        templateUrl: './profil/profil.html',
        controller: function ($scope, $timeout) {
            $scope.loading = false;
            var socket = io.connect('http://localhost:8555');
            $scope.socketData;
            $scope.postMessage = function (message) {};
            $scope.tests = [];

            $scope.login = false;

            function getCookie(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            }
            $scope.cookieLogin = getCookie("login");
            $scope.cookieName = getCookie("username");

            var getFullDate = date => {
                var weekday = new Array(7);
                weekday[0] = "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";
                var n = weekday[date.getDay()];
                console.log(n);
                return n;
            }

            socket.on('connect', function (data) {
                console.log($scope.id2);
                socket.emit('profil', $scope.cookieName);
            });
            socket.on('dataOk', function (data) {
                console.log(data);
                $timeout(
                    function () {
                        console.log(data.ID);
                        $scope.id2 = data.ID;
                        $scope.email = data.email;
                        $scope.name = data.name;
                        $scope.loading = true;
                         $scope.mitglied = data.mitgliedSince;
                    }, 800)
            })


        }
    });