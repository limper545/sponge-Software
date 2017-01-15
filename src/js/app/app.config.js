var app = angular.module('software')

    .config(function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode({
            enabled: true
        });
        $routeProvider
            .when("/login", {
                template: "<login></login>"
            })
            .when("/registration", {
                template: "<regis></regis>"
            })
            .when('/profil', {
                template: "<profil></profil>"
            })
    });