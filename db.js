const { Pool } = require('pg');



const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'arabam_db',
    password: '123',
    port: 5432,
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