const Product = require('./model');
const path = require('path');
const fs = require('fs');

const lihat = async (req, res) => {
  try {
    await Product.sync();
    const result = await Product.findAll();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};
const detail = async (req, res) => {
  try {
    await Product.sync();
    const result = await Product.findOne({ where: { id: req.params.id } });
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};
const hapus = async (req, res) => {
  try {
    await Product.sync();
    const result = await Product.destroy({ where: { id: req.params.id } });
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};
const ubah = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  let result = [];

  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      result = await Product.update({ users_id, name, price, stock, status, image_url: ` http://localhost:3000/public/${image.originalname}` }, { where: { id: req.params.id } });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  } else {
    await Product.sync();
    result = await Product.update({ users_id, name, price, stock, status }, { where: { id: req.params.id } });
    res.send(result);
  }
};
const kirim = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.create({ users_id, name, price, stock, status, image_url: ` http://localhost:3000/public/${image.originalname}` });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};

module.exports = {
  detail,
  hapus,
  ubah,
  lihat,
  kirim,
};
