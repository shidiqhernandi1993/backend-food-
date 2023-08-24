const router = require('express').Router();
const invoiceController = require('./controller');

router.get('/invoice/:order_id', invoiceController.show);
router.get('/invoice', invoiceController.getAll);
router.get('/invoice/user/:id', invoiceController.index);
router.put('/invoice/:id', invoiceController.update);

module.exports = router;