'use strict';

var SupportController = function($scope, $rootScope) {
    $scope.pageTitle = 'Support';
    $rootScope.bodyClass = $scope.pageTitle.toLocaleLowerCase();
};

SupportController.$inject = ['$scope', '$rootScope'];
angular.module('Home').controller('SupportController', SupportController);