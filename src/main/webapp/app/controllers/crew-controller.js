'use strict';

var CrewController = function($scope){
    $scope.pageTitle = 'Crew';
};

CrewController.$inject = ['$scope'];
angular.module('MainApp').controller('CrewController', CrewController);