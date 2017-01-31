/**
 * Created by Jan on 05.01.2017.
 */
var homeAutomation = angular.module('homeAutomation', [
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'menu']);

console.log('script opened');

homeAutomation.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.formData = {};
    console.log('mainController called');

    // Get all tasks
    $http.get('/api/tasks')
        .then(function success(response) {
            $scope.tasks = response.data;
            console.log(response);
        }, function error(err) {
            console.error(err);
        });

    // Create a task
    $scope.createTask = function () {
        $http.post('/api/tasks', $scope.formData)
            .then(function success(response) {
                $scope.formData = {};
                $scope.tasks = response.data;
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
            .then(function success(response) {
                $scope.tasks = response.data;
                console.log(response);
            }, function error(error) {
                console.error(error);
            })
    }
}
]);