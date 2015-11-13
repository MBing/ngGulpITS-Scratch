/**
 * Created by Martin on 13/11/15.
 */
(function () {
    "use strict";
    angular
        .module('softits')
        .controller('HeaderCtrl', HeaderCtrl);
    console.log('loaded header hier')
    /* @ngInject */
    function HeaderCtrl(menuService) {
        var vm = this;
        vm.menuItems = menuService.menuItems;
        console.log('de header', vm.menuItems);
    }
})();