'use strict';
// Development specific configuration
// ==================================
module.exports = {
    server: {
        port: 9002,
        host: '0.0.0.0',
        protocol: 'http://',
        externalPort: 9002
    },
    mongo: {
        dbHost: [
            {
                host: '127.0.0.1',
                port: 27017
            }
        ],
        dbName: 'myDB',
        dbUser: '',
        dbPassword: '',
        debug: true
    }
};
