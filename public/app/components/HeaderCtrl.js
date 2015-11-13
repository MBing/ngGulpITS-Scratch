/**
 * Created by Martin on 13/11/15.
 */
(function () {
    "use strict";
    angular
        .module('softits')
        .controller('HeaderCtrl', HeaderCtrl);

    /* @ngInject */
    function HeaderCtrl() {
        var vm = this;
        angular.getJSON('../../assets/menu/menu.json',function (data) {
            console.log(data);
            vm.menuItems = data;
        });
    }
})();