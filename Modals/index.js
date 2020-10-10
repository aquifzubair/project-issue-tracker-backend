const { Sequelize , DataTypes} = require('sequelize');
const { host, user, password, database } = require('../config');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: `mysql`
});

const db = {};

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

const forceSync = async () => {
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  await db.sequelize.sync({ force: true });
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1'); 
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.forceSync = forceSync


module.exports = db;