/**
 * Created by ejabach on 7/15/2017.
 */
var mqtt = require('mqtt');
var config = require('../../config/config')();

var mqttController =
{
  /**
   * Members
   */
  // Saves the client object
  client: {},
  // Maps topic subscription to callback function
  subscriptions: {},

  /**
   * Functions
   */
  // Init function to connect to the broker
  connect: function ()
  {
    console.log('Connecting to MQTT Broker...');

    this.client = mqtt.connect(config.mqtt.connection);

    // Call callback functions whenever a message is received
    this.client.on('message', function (topic, message) {
      if (super.subscriptions[topic])
      {
        super.subscriptions[topic].forEach(function (callback) {
          callback(message);
        });
      }
    })
  },

  // Subscribes to a new topic
  subscribe: function (topic, callback) {
    this.client.subscribe(topic);

    // Add a new array if topic is unknown
    if (!this.subscriptions[topic])
    {
      this.subscriptions[topic] = [callback];
    }
    // Simply push the callback otherwise
    else
    {
      this.subscriptions[topic].push(callback);
    }
  },

  // Publish a message to the specified topic
  publish: function(topic, message)
  {
    this.client.publish(topic, message);
  }
};
module.exports = function (req, res, next) {
  if (!mqttController.client)
  {
    mqttController.connect();
  }
  res.mqtt = mqttController;
  next();
};
