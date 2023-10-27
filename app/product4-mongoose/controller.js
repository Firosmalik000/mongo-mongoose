const path = require('path');
const product = require('./model');
const fs = require('fs');

const index = (req, res) => {
  product
    .find()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};
const detail = (req, res) => {
  const { id } = req.params;
  product
    .findOne({ _id: req.params.id })
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};
const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    product
      .create({ name, price, stock, status, image_url: ` http://localhost:3000/public/${image.originalname}` })
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
  }
};

const update = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    product
      .updateOne({ name, price, stock, status, image_url: ` http://localhost:3000/public/${image.originalname}` })
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
  }
};
const destroy = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  product
    .deleteOne({ _id: req.params.id })
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

module.exports = {
  index,
  detail,
  store,
  update,
  destroy,
};
