'use strict';

var SupportController = function($scope){
    $scope.pageTitle = 'Support';
};

SupportController.$inject = ['$scope'];
angular.module('MainApp').controller('SupportController', SupportController);