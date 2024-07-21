require('dotenv').config();
const env = {
    DB_URL: process.env.DB_URL,
    PORT: +process.env.PORT || 3000,
}

module.exports = env;