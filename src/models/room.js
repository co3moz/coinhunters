var db = require('gluon/db');

var model = db.define('room', {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'UUID'
  },

  status: {
    type: db.Sequelize.ENUM('CHALLENGER', 'OPPONENT', 'FINISHED'),
    defaultValue: 'CHALLENGER',
    allowNull: false
  },

  name: {
    type: db.Sequelize.TEXT,
    allowNull: false
  },

  ground: {
    type: db.Sequelize.TEXT('medium'),
    allowNull: false
  },

  challengerCoin: {
    type: db.Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },

  opponentCoin: {
    type: db.Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  
  moveCount: {
    type: db.Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
}, {
  freezeTableName: true,
  paranoid: true
});

var user = require('./user');

model.belongsTo(user, {foreignKey: 'challengerId', as: 'challenger'});
model.belongsTo(user, {foreignKey: 'opponentId', as: 'opponent'});

module.exports = model;