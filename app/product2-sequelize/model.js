const sequelize = require('../../config/sequelize.js');
const { Sequilize, DataTypes } = require('sequelize');

const Product = sequelize.define('Product', {
  // model atribut are defined here
  users_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // allowNull defaults to true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.TEXT,
  },
});
module.exports = Product;
