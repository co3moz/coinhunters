var db = require('gluon/db');

var model = db.define('user', {
  id: {
    type: db.Sequelize.DataTypes.UUID,
    defaultValue: db.Sequelize.DataTypes.UUIDV4,
    primaryKey: true,
    comment: 'UUID'
  },

  email: {
    type: db.Sequelize.STRING(128),
    allowNull: false
  },

  password: {
    type: db.Sequelize.STRING(32)
  },

  name: {
    type: db.Sequelize.STRING(128)
  },

  online: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
    freezeTableName: true,
    paranoid: true,
    indexes: [{
      fields: ['email']
    }]
  });


module.exports = model;