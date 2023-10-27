const { ObjectId } = require('mongodb');
const db = require('../../config/mongodb');
const path = require('path');
const fs = require('fs');

const index = (req, res) => {
  db.collection('products')
    .find()
    .toArray()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};
const detail = (req, res) => {
  const { id } = req.params;
  db.collection('products')
    .findOne({ _id: new ObjectId(id) })
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};
const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    //
    fs.renameSync(image.path, target);
    //
    const { id } = req.params;
    db.collection('products')
      .insertOne({ name, price, stock, status, image_url: ` http://localhost:3000/public/${image.originalname}` })
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
  }
};
const update = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;

  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    //
    fs.renameSync(image.path, target);
    //
    const { id } = req.params;
    db.collection('products')
      .updateOne({ _id: new ObjectId(id) }, { $set: { name, price, stock, status, image_url: ` http://localhost:3000/public/${image.originalname}` } })
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
  }
};
const destroy = (req, res) => {
  const image = req.file;
  const { id } = req.params;
  db.collection('products')
    .deleteOne({ _id: new ObjectId(id) })
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
