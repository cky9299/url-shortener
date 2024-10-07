// src/db.js
const mysql = require('mysql2/promise');





async function initDBConnection() {

    connection = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 100,  // Adjust pool size as needed
        queueLimit: 10
    });
return connection;
}


dbReadyPromise = initDBConnection();

module.exports = { dbReadyPromise };



