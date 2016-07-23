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
    })
    .controller('SupportController', SupportController);
