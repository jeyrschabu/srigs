/**
 * Created by jeyrschabu on 7/19/16.
 */

angular.module('rigs.support', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('support', {
                url:'/support',
                views: {
                    'content':{
                        templateUrl: '/app/main/support/support.template.html',
                        controller: 'SupportController as supportController'
                    }
                }
            })
            .state('privacy', {
                url:'/privacy',
                views: {
                    'content':{
                        templateUrl: '/app/main/support/privacy.template.html',
                        controller: 'SupportController as supportController'
                    }
                }
            })
            .state('warranty', {
                url:'/warranty',
                views: {
                    'content':{
                        templateUrl: '/app/main/support/warranty.template.html',
                        controller: 'SupportController as supportController'
                    }
                }
            })
            .state('faq', {
                url:'/faq',
                views: {
                    'content':{
                        templateUrl: '/app/main/support/faq.template.html',
                        controller: 'SupportController as supportController'
                    }
                }
            })
    })
    .controller('SupportController', SupportController);
