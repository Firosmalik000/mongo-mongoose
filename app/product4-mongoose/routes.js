const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const product = require('./model');
const fs = require('fs');
const path = require('path');
const db = require('../../config/mongodb');
const productController = require('./controller');

// post
router.post('/product', upload.single('image'), productController.store);
// edit
router.put('/product/:id', upload.single('image'), productController.update);
// delete
router.delete('/product/:id', upload.single('image'), productController.destroy);
// liat
router.get('/product', productController.index);
// detail
router.get('/product/:id', productController.detail);

module.exports = router;
