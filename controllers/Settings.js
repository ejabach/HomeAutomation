var BaseController = require("./Base");
var View = require("../views/Base");

module.exports = BaseController.extend({
    name: 'Settings',
    show: function(req, res){
        console.log('Show settings');
        var v = new View(res, 'settings');
        v.render();
    }
});
/**
 * Created by Jan on 06.10.2016.
 */
