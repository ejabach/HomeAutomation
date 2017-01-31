
var menu = angular.module('menu', []);
console.log('initialising menu module');
menu.controller('MenuController', ['$scope', function ($scope) {
    function getUserName() {
        return 'Jan';
    }

    $scope.sections = [
        {
            name: 'Dashboard',
            icon: 'assessment',
            type: 'link',
            ref: 'home.dashboard'
        }, {
            name: 'Rooms',
            type: 'toggle',
            icon: 'home',
            children: [
                {
                    name: 'Living Room',
                    type: 'link'
                }, {
                    name: 'Kitchen',
                    type: 'link'
                }
            ]
        }, {
            name: 'Devices',
            type: 'link',
            children: [
                {
                    name: 'Sockets',
                    type: 'link'
                }, {
                    name: 'Sensors',
                    type: 'link'
                }
            ]
        }, {
            name: getUserName(),
            icon: 'account_circle',
            type: 'link'
        }, {
            name: 'Settings',
            icon: 'settings',
            type: 'link'
        }
    ];

    $scope.close = function () {
        console.log('close side nav');
    }
}]);
