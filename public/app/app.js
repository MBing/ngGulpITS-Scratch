/**
 * Created by Martin on 13/11/15.
 */
(function () {
    "use strict";
    angular.module('softits', [
        'ui.router',
        'ngMarkdown'
    ]).config(config);
    console.log("app loaded and ready to go");
    /* @ngInject */
    function config($stateProvider, $httpProvider) {
        var main = {
            name: 'main',
            url: '',
            views: {
                "header": {
                    templateUrl: 'views/header.html',
                    controller: 'HeaderCtrl',
                    controllerAs: 'header'
                },
                "content": {
                    templateUrl: 'views/content.html',
                    controller: 'MainCtrl',
                    controllerAs: 'main'
                },
                "footer": {
                    templateUrl: 'views/footer.html',
                    controller: 'FooterCtrl',
                    controllerAs: 'footer'
                }
            }
        };

        $stateProvider
            .state(main);
    }
})();