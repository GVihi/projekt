const mysql = require('mysql2');

const config = require('../config/database.json');

const con = mysql.createPool({
    host: config.host,
    user: config.user,
    port: config.port,
    password: config.password,
    database: config.database
});

module.exports = con.promise();