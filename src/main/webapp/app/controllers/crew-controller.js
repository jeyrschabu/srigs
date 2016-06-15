'use strict';

var CrewController = function($scope ,$rootScope ) {
    $scope.pageTitle = 'Crew';
    $rootScope.bodyClass = $scope.pageTitle.toLocaleLowerCase();
};

CrewController.$inject = ['$scope', '$rootScope'];
angular.module('MainApp').controller('CrewController', CrewController);