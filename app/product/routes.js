const router = require('express').Router();
const multer = require('multer');
const load = multer({ dest: './uploads' });
const connection = require('../../config/mysql.js');
const productController = require('./controller.js');

//url = http://localhost:3000/api/v1/product
router.get('/product', productController.index);
//url = http://localhost:3000/api/v1/product/3
router.get('/product/:id', productController.detail);
// untuk update, pake method put
router.put('/product/:id', load.single('image'), productController.update);
// untuk delete, pake method delete
router.delete('/product/:id', load.single('image'), productController.destroy);

router.post('/product', load.single('image'), productController.store);
module.exports = router;
