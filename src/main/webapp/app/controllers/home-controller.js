'use strict';

var HomeController = function($scope, $location, categoryService){
    var self = this;

    $scope.disableSticking = false;

    $scope.pageTitle = 'Home';
    $scope.categories = [];

    function currentTab(path) {
        return $location.path() === path;
    }

    HomeController.prototype.setCategories = function(categories) {
        $scope.categories = categories.data;
    };

    HomeController.prototype.getCategories = function() {
        categoryService.list().then(self.setCategories);
    };

    self.getCategories();

    /** expose functions on scope **/
    $scope.currentTab = currentTab;
};

HomeController.$inject = ['$scope', '$location', 'categoryService'];
angular.module('MainApp').controller('HomeController', HomeController);

