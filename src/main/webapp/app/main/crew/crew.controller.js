'use strict';

CrewController.$inject = ['$rootScope'];

function CrewController($rootScope ) {
    var crewController = this;
    crewController.pageTitle = 'Crew';
    $rootScope.bodyClass = crewController.pageTitle.toLocaleLowerCase();
}