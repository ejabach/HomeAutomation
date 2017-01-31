
var menu = angular.module('menu');
console.log('extending menu module');
menu.directive('menuLink', function () {
    return {
        scope: {
            section: '='
        },
        templateUrl: '/partials/menu-link.html',
        link: function (scope, element) {
            console.log('link called');
        }
    }
});

menu.directive('menuToggle', function () {
    return {
        scope: {
            section: '='
        },
        templateUrl: '/partials/menu-toggle.html',
        link: function (scope, element) {
            console.log('link called');

            scope.toggle = function () {
                console.log('toggle menu item');
            };

            scope.isOpen = function () {
                return true;
            };
        }
    }
});
