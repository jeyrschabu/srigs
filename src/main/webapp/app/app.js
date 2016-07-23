'use strict';


angular
    .module('Rigs', [
        'ui.router',
        'ngAnimate',
        'sticky',
        'jkuri.gallery',
        'ngLodash',
        'rigs.common',
        'rigs.home',
        'rigs.products',
        'rigs.crew',
        'rigs.support',
        'rigs.customize'
    ])
    .config( function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('rigs', {
                url: '',
                abstract: true
            });

        $urlRouterProvider.otherwise('/');
    });