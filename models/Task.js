/**
 * Created by Jan on 05.01.2017.
 */
var BaseModel = require("./Base");
var db = BaseModel.db;

var taskSchema = db.Schema({
    name: String,
    done: Boolean
});

taskSchema.methods.toggle = function (callback) {
    this.done = !this.done;
    callback();
};

var Task = db.connection.model('Task', taskSchema);

module.exports = Task;