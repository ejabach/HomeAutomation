/**
 * Created by Jan on 05.01.2017.
 */
var homeAutomation = angular.module('homeAutomation', ['ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages']);

console.log('script opened');

homeAutomation.controller('mainController', ['$scope', '$http', function ($scope, $http) {
    $scope.formData = {};
    console.log('mainController called');

    // Get all tasks
    $http.get('/api/tasks')
        .then(function success(response){
           $scope.tasks = response.data;
           console.log(response);
        }, function error(err) {
            console.error(err);
        });

    // Create a task
    $scope.createTask = function() {
        $http.post('/api/tasks', $scope.formData)
            .then(function success(response) {
                $scope.formData = {};
                $scope.tasks    = response.data;
                console.log(response);
            }, function error(err) {
                console.error(err);
            })
    };

    $scope.toggleTask = function (task) {
        $http.get('/api/tasks/' + task._id + '/toggle')
            .then(function success(response) {
                task.done = !task.done;
                console.log(response);
            }, function error(err) {
                console.error(err);
            });
    };

    // Remove a task
    $scope.deleteTask = function (id) {
        $http.delete('/api/tasks/' + id)
            .then(function success (response) {
                $scope.tasks = response.data;
                console.log(response);
            }, function error (error) {
                console.error(error);
            })
    }
}
]);

homeAutomation.controller('navBarController', ['$scope', '$http', function ($scope, $http) {
    function getUserName() {
        return 'Jan';
    }

    $scope.sections = [
        {
            name: 'Dashboard',
            type: 'link'
        }, {
            name: 'Rooms',
            type: 'toggle',
            children: [
                {
                    name: 'Living Room',
                    state: 'home.living-room',
                    type: 'link'
                }, {
                    name: 'Kitchen',
                    type: 'link'
                }
            ]
        }, {
            name: getUserName(),
            type: 'link',
            icon: 'person'
        }, {
            name: 'Settings',
            type: 'link',
            icon: 'settings'
        }
    ];
    console.log('navBarController called');
    $scope.showDashboard = function () {
        console.log('Show Dashboard');
    };
    
    $scope.close = function () {
        console.log("Close Navigation Drawer");
    }
}]);