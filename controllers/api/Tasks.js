var BaseController = require("../Base");
var Task = require('../../models/Task');

/**
 * Handles all todo tasks requests
 */
module.exports = BaseController.extend({
    /**
     * Return a list of all tasks
     * @param req
     * @param res
     */
    get: function(req, res) {
        console.log('GET todo tasks request received');
        Task.find(function(err, tasks) {
           if (!err && tasks) {
               res.json(tasks);
           } else {
               console.log('Could not fetch all tasks: %s', err);
               res.sendStatus(500);
           }
        });
    },

    /**
     * Toggle a given task
     * @param req
     * @param res
     */
    toggle: function(req, res){
        console.log('TOGGLE todo task request received\n' +
            '_id: %s', req.params.id);
        var id = req.params.id;
        Task.findOne({ _id: id }, function(err, task){
            if (!err && task) {
                console.log('Task found.');
                task.toggle(function(err){
                    if (!err) {
                        console.log('Successfully toggled task \'%s\'', task.name);
                        task.save();
                        res.json(task);
                    } else {
                        console.error(err);
                        res.sendStatus(500);
                    }
                });
            } else {
                console.error(err);
                res.sendStatus(404);
            }
        });
    },

    /**
     * Save a new todo list task
     * @param req
     * @param res
     */
    store: function(req, res){
        console.log('STORE todo task request received: ');

        var name = req.body.name;
        var done = false;

        if(name) {
            var task = new Task({
                name: name,
                done: done
            });

            task.save(function (err, task) {
                if (!err) {
                    console.log('Successfully created Socket!');
                    res.json(task);
                } else {
                    console.error(err);
                    res.sendStatus(500);
                }
            })
        } else {
            console.log('Name not set correctly: %s', name);
            res.sendStatus(500);
        }
    },

    /**
     * Deletes a task from the list
     * @param req
     * @param res
     */
    delete: function (req, res) {
        console.log('DELETE todo list task request received');
        Task.remove({
            _id: req.params.id
        }, function (err) {
            if (err) {
                res.json(err);
            } else {
                console.log('Task deleted successfully');
                res.sendStatus(200);
            }
        });
    }
});