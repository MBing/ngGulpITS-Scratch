/**
 * Created by Martin on 13/11/15.
 */
(function () {
    "use strict";
    angular
        .module('softits')
        .service('menuService', menuService);

    /* @ngInject */
    function menuService($http) {
        console.log('menuService loaded here')
        var vm = this;
        $http.get('../assets/menu/menu.json').success(function (data) {
            console.log('de service', data);
            vm.menuItems = data;
        });
    }
})();