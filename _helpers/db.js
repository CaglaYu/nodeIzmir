
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');


module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    
    
    const host = process.env.host;
    const port = process.env.portdb;
    const user = process.env.user;
    const password = process.env.password;
    const database = process.env.database;
    
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);
    db.Entry = require('../entries/entry.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
}