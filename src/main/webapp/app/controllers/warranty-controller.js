'use strict';

var WarrantyController = function($scope){
    $scope.pageTitle = 'Warranty';
    //TODO: homepage content coming soon
};

WarrantyController.$inject = ['$scope'];
angular.module('MainApp').controller('WarrantyController', WarrantyController);