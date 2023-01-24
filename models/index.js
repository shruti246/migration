'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize,DataTypes} = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require('./user')(sequelize, DataTypes) 
module.exports = db;


/**COMMANDS FOR MIGRATION
 *npm install --save-dev sequelize-cli
 * npm install --save-dev sequelize mysql2
 * npx sequelize-cli init
 * npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
 *  npx sequelize-cli db:migrate
 * 
 * for more detail
 * https://sequelize.org/docs/v6/other-topics/migrations/
 * https://www.youtube.com/watch?v=UFKsfnhZ7_I&list=PL-dwj4UAzfFufhrlz7aXDVv0ksLa5becs&index=30
 */