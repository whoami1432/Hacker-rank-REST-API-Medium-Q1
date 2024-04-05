const router = require('express').Router();
const controller = require('../controllers/products');

router.post('/products', controller.createProducts);
router.get('/products', controller.getAllProducts);
router.delete('/products/:id', controller.common);
router.put('/products/:id', controller.common);
router.patch('/products/:id', controller.updateProducts);

module.exports = router;
