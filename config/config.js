var config = {
	local: {
        mode: 'local',
        port: 3000,
        mongo:{
            host: 'localhost'
        }
    },
    staging: {
        mode: 'staging',
        port: 4000,
        mongo:{
            host: 'localhost'
        }
    },
    production: {
        mode: 'production',
        port: 5000,
        mongo:{
            host: 'localhost'
        }
    }
}

module.exports = function(mode){
	return config[mode || process.argv[2] || 'local'] || config.local;
};