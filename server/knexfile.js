const path = require('path');

module.exports = {
    client: 'mysql',
    connection: 'mysql://root:database@127.0.0.1:3306/hackatonDb',
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true
}