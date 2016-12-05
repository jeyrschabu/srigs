'use strict';

HomeController.$inject = ['$rootScope'];

function HomeController($rootScope) {
    var homeController = this;
    homeController.disableSticking = false;
    homeController.pageTitle = 'Home';
    $rootScope.bodyClass = homeController.pageTitle.toLocaleLowerCase();
}


