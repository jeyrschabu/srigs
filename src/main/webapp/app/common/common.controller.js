/**
 * Created by jeyrschabu on 7/19/16.
 */

CommonController.$inject = ['$location'];

function CommonController($location) {
    var commonController = this;

    commonController.menuItems = [
        { name:'home',      link: '/'},
        { name:'the crew',  link: '/crew'},
        { name:'support',   link: '/support'}
    ];

    commonController.pageTitle = 'Shadow Rigs';

    function currentTab(path) {
        return $location.path() === path;
    }

    commonController.currentTab = currentTab;
    commonController.currentYear = new Date().getFullYear();
}
