const express = require('express');
const router = express.Router();
const productCRUD= require('../controller/productController');
router.post('/enter', productCRUD.createProduct);
router.get('/getall',productCRUD.findProduct);
router.get('/:id',productCRUD.getById);
router.put('/:id',productCRUD.updateById);
router.delete('/:id',productCRUD.deleteById);
module.exports = router;