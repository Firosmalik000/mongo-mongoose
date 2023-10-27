const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: 'uploads' });
const Product = require('./model');
const productController2 = require('./controller');
// lihat data
router.get('/product', productController2.lihat);
// lihat detail data
router.get('/product/:id', productController2.detail);
// edit
router.put('/product/:id', upload.single('image'), productController2.ubah);
// delete
router.delete('/product/:id', upload.single('image'), productController2.hapus);

router.post('/product', upload.single('image'), productController2.kirim);
module.exports = router;
