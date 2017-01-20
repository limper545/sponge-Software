var app = angular.module('software')

    .config(function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode({
            enabled: true
        });
        $routeProvider
        .when('/home', {
            template: "<home></home>"
        })
            .when("/registration", {
                template: "<regis></regis>"
            })
            .when('/profil', {
                template: "<profil></profil>"
            })
    });