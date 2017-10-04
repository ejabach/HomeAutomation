var config = require('../../config/config');
var Socket = require('../../models/Socket');

/**
 * Handles all sockets requests
 */
var sockets = {
  sockets: {},
  init: function (mqtt) {
    // Refresh status of active
    mqtt.subscribe(config.mqtt.channel.subscribe.sockets.status.response, function (socket) {
      super.sockets[socket.id] = {
        name: socket.name,
        status: socket.status,
        code: socket.code
      };
    });

    // Ask for all active sockets
    mqtt.publish(config.mqtt.channel.publish.sockets.status.request, '');
  },
  get: function (req, res) {
    console.log('GET request received: ', req.params);
    if (!(req.params.id || req.params.name)) {
      res.json(super.sockets);
    } else {
      if (req.params.id) {
        console.log('Show a specific Socket by id');
        var id = req.params.id;
        res.json(super.sockets[id]);
      } else {
        console.log('Show a specific Socket by name');
        var name = req.params.name;
        var sockets = [];
        super.sockets.forEach(function (id, socket)
        {
          if (socket.name === name)
          {
            sockets.push(socket);
          }
        });
        res.json(sockets);
      }
    }
  },
  toggle: function (req, res) {
    console.log('GET request received: ', req.params);
    console.log('Switch status of socket ', req.params.id);
    var socket = super.sockets[req.params.id];

    if (socket)
    {
      console.log('Found socket with given id\nPublishing toggle command');
      mqtt.publish(config.mqtt.channel.publish.sockets.toggle, JSON.stringify(socket));
      res.sendStatus(200);
    }
    else
    {
      console.log('Couldn\'t find socket');
      res.sendStatus(404);
    }
  },
  store: function (req, res) {
    console.log('POST request received: ', req.body);
    console.log('Store socket with given data.');
    var name = req.body.name;
    var numbering = req.body.numbering;
    var status = false;

    if (name && numbering) {
      var socket = new Socket({name: name, numbering: numbering, status: status});

      socket.save(function (err, socket) {
        if (!err) {
          console.log('Successfully created Socket!');
          res.json(socket);
        } else {
          console.error(err);
          res.sendStatus(500);
        }
      })
    } else {
      console.log('name or numbering not set correctly:\n\tname: %s,\n\tnumbering: %s', name, numbering);
      res.sendStatus(500);
    }
  },
  update: function (req, res) {
    console.log('PUT request received: ', req.body);
    console.log('For Socket ID: ', req.params.id);
    var socket = new Socket({
      name: req.params.name,
      status: false,
      numbering: req.params.numbering
    });
    Socket.findOneAndUpdate({id: req.params.id}, socket, {upsert: true}, function (err, doc) {
      if (!err) {
        console.log('Socket update successfully!');
        res.json(socket);
      } else {
        console.log('Error occurred: %s', doc);
        res.json({error: true, hint: doc});
      }
    });
  }
};
module.exports = sockets;
