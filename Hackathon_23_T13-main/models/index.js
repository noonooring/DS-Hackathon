import { createRequire } from "module"
const require = createRequire(import.meta.url)
require("dotenv").config()
'use strict';

//const fs = require('fs');
//const path = require('path');
const Sequelize = require('sequelize');
const User = require('./user');
const Domain = require('./domain');
const Board = require('./board');
//const process = require('process');
//const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

//let sequelize;
//if (config.use_env_variable) {
//  sequelize = new Sequelize(process.env[config.use_env_variable], config);
//} else {
//  sequelize = new Sequelize(config.database, config.username, config.password, config);
//}

//fs
//  .readdirSync(__dirname)
//  .filter(file => {
//    return (
//      file.indexOf('.') !== 0 &&
//      file !== basename &&
//      file.slice(-3) === '.js' &&
//      file.indexOf('.test.js') === -1
//    );
//  })
//  .forEach(file => {
//    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//    db[model.name] = model;
//  });

//Object.keys(db).forEach(modelName => {
//  if (db[modelName].associate) {
//    db[modelName].associate(db);
//  }
//});

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Domain = Domain;
db.Board = Board;

User.init(sequelize);
Post.init(sequelize);
Domain.init(sequelize);
Board.init(sequelize);

User.associate(db);
Post.associate(db);
Domain.associate(db);
Board.associate(db);

module.exports = db;
