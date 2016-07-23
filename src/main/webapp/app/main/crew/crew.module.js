/**
 * Created by jeyrschabu on 7/19/16.
 */

angular.module('rigs.crew', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('crew', {
                url:'/crew',
                views: {
                    'content':{
                        templateUrl: '/app/main/crew/crew.template.html',
                        controller: 'CrewController as crewController'
                    }
                }
            });

    }).controller('CrewController', CrewController);
