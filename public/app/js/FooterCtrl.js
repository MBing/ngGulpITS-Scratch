/**
 * Created by Martin on 13/11/15.
 */
/**
 * Created by Martin on 13/11/15.
 */
(function () {
    "use strict";
    angular
        .module('softits')
        .controller('FooterCtrl', FooterCtrl);

    /* @ngInject */
    function FooterCtrl() {
        var vm = this;
        console.log('loaded footer');
    }
})();