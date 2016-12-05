'use strict';

SupportController.$inject = ['$rootScope'];
function SupportController($rootScope) {
    var supportController = this;
    supportController.pageTitle = 'Support';
    $rootScope.bodyClass = supportController.pageTitle.toLocaleLowerCase();
}