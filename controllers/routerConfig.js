app.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('app', {
            abstract: true,
            url: "",
            views: {
                'menu': {
                    templateUrl: 'views/menu.html',
                },
                'header': {
                    templateUrl: 'views/header.html',
                },
                'root': {
                    template: '<ng-view ui-view="view"></ng-view>',
                    controller: 'main'
                }
            }
        })
        .state('app.home', {
            url: "/home",
            views: {
                'view': {
                    templateUrl: 'views/home.html',
                    controller: 'home'
                }
            }
        });

});
