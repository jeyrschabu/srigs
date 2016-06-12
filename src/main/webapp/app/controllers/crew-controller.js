'use strict';

var CrewController = function($scope ,$rootScope ) {
    $rootScope.bodyClass = 'crew';
    $scope.pageTitle = 'Crew';
};

CrewController.$inject = ['$scope', '$rootScope'];
angular.module('MainApp').controller('CrewController', CrewController);