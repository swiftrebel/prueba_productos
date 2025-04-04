const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATASE_URL,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};