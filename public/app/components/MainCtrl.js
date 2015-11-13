/**
 * Created by Martin on 13/11/15.
 */
(function () {
    "use strict";
    angular
        .module('softits')
        .controller('MainCtrl', MainCtrl);

    /* @ngInject */
    function MainCtrl() {
        var vm = this;
        vm.test = "content hier";
    }
})();