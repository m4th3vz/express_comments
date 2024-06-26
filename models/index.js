// models/index.js

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite')
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  edited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false  // Por padrão, o comentário não foi editado
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

sequelize.sync();

module.exports = { sequelize, User, Comment };
