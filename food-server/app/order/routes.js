const router = require('express').Router();
const { policy_check } = require('../../middlewares');
const orderController = require('./controller');

router.post('/orders',
    policy_check('create', 'Order'),
    orderController.store);

router.get('/orders',
    policy_check('view', 'Order'),
    orderController.index);

router.put('/orders/:id',
    policy_check('update', 'Order'),
    orderController.update);

module.exports = router;