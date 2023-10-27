// panggil mongoose gapake import
require('./config/mongoose');
const express = require('express');
const app = express();
const path = require('path');
// const productRouter = require('./app/product/routes.js');
// const productRouter_2 = require('./app/product2-sequelize/routes.js');
const productRouter3 = require('./app/products3-Mongodb/routes.js');
const productRouter4 = require('./app/product4-mongoose/routes.js');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));

// app.use('/api/v1', productRouter);
// app.use('/api/v2', productRouter_2);
app.use('/api/v3', productRouter3);
app.use('/api/v4', productRouter4);

app.use((req, res) => {
  res.status(404);
  res.send({
    status: 'failed',
    message: `${req.originalUrl} not found`,
  });
});
// untuk buka local host

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
