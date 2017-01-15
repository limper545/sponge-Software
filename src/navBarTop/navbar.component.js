'use strict';

angular.module('navbar', [])
    .component('navbar', {
        templateUrl: './navBarTop/navbar.html',
        controller: function ($scope, $window, $timeout, $route) {

            $scope.loading = false;


            $scope.data = {}
            $scope.login = user => {

                $scope.loading = true;
                $scope.wrongPW = false;
                console.log("USERDATA: ", user);
                $scope.data = angular.copy(user);
                var socket = io.connect('http://localhost:8555');
                socket.on('connect', function (data) {
                    socket.emit('login', $scope.data);
                });
                socket.on('dataOk', function (data) {

                    $timeout(function () {
                        if (data) {
                            document.cookie = "username=" + data.username;
                            document.cookie = "login=true";
                            $window.location.reload();
                        } else {
                            $scope.loading = false;
                            $scope.wrongPW = true;
                        }
                    }, 1000)

                })
            }


            /**  Cookie Parser Logic Start */




            function getCookie(cname) {
                $scope.loginTry = false;
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
            console.log($scope.cookieLogin);

            $scope.time = new Date();

            $scope.fullTime = $scope.time.getHours() + ":" + $scope.time.getMinutes();




            if ($scope.cookieLogin === 'true') {
                $scope.loginTry = true;
            }
            console.log("Ist SCOPE ", $scope.loginTry);




            /** Cookue Parser Logic End*/

            $scope.logout = function () {
                document.cookie = "login=; username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                $window.location.href = '/login';
            }


            $scope.spinnerConf = {
                lines: 13,
                length: 20,
                width: 10,
                radius: 35,
                scale: 0.20,
                corners: 1.0,
                opacity: 0.05,
                rotate: 48,
                speed: 1.1,
                trial: 100,
                shadow: true
            }
        }
    });