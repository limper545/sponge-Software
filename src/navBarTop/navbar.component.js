'use strict';

angular.module('navbar', [])
    .component('navbar', {
        templateUrl: './navBarTop/navbar.html',
        controller: function ($scope) {
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
            
            $scope.time = new Date();

            console.log($scope.time.getHours() + ":" + $scope.time.getMinutes() + ":" + $scope.time.getSeconds());
            $scope.fullTime = $scope.time.getHours() + ":" + $scope.time.getMinutes();

            if($scope.cookieLogin === 'true'){
                $scope.login = true;
            }
        }
    });