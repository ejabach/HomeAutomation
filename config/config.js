var config = {
	local: {
        mode: 'local',
        port: 3000,
        mongo:{
          host: '192.168.1.98',
          db: 'api',
          username: 'homeautomation_api',
          password: 'AS:KLfj;ioJEO#*u89@#P(*:F#H(fP'
        },
        secret: 'supersecret',
        mqtt: {
          connection: {

          },
          channel : {
            subscribe: {
              general: '/emoh/control/api',
              sockets: {
                status: 'emoh/bedroom/sockets/+/status/response'
              }
            },
            publish: {
              sockets : {
                turnOn: '/emoh/bedroom/sockets/on',
                turnOff: '/emoh/bedroom/sockets/off',
                toggle: '/emoh/bedroom/sockets/toggle',
                status: 'emoh/bedroom/sockets/+/status/request'
              }
            }
          }

        }
    },
    staging: {
        mode: 'staging',
        port: 4000,
        mongo:{
            host: 'localhost'
        },
        secret: 'supersecret'
    },
    production: {
        mode: 'production',
        port: 5000,
        mongo:{
            host: 'localhost'
        },
        secret: 'supersecret'
    }
};

module.exports = function(mode){
	return config[mode || process.argv[2] || 'local'] || config.local;
};
