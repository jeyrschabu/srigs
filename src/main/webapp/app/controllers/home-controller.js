'use strict';

var HomeController = function($scope, $location, categoryService){
    var self = this;

    $scope.pageTitle = 'Home';

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.categories = [];

    $scope.slides = [
        { image: 'public/images/carousel_images/DSC_0550.jpg' },
        { image: 'public/images/carousel_images/DSC_0281.jpg' },
        { image: 'public/images/carousel_images/DSC_0474.jpg' }
    ];

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

