const { Pool } = require('pg');



const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database:  process.env.DB_NAME,
    password:  process.env.DB_PASSWORD,
    port:  process.env.DB_PORT,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,
});


pool.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
    } else {
        console.log('Database connected successfully!');
    }
});

module.exports = pool;