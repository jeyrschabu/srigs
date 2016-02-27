'use strict';

var ContactController = function($scope){
    $scope.pageTitle = 'Contact';

};

ContactController.$inject = ['$scope'];
angular.module('MainApp').controller('ContactController', ContactController);

