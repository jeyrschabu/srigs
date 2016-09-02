'use strict';


angular
    .module('Rigs', [
        'ui.router',
        'ngAnimate',
        'sticky',
        'jkuri.gallery',
        'ngLodash',
        'ngCart',
        'braintree-angular',
        'rigs.common',
        'rigs.home',
        'rigs.products',
        'rigs.crew',
        'rigs.support',
        'rigs.customize'

    ])
    .constant('API_PREFIX', '/api/v1')
    .config( function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('rigs', {
                url: '',
                abstract: true
            });

        $urlRouterProvider.otherwise('/');
    });