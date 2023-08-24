const router = require('express').Router()
const { policy_check } = require('../../middlewares');
const cartController = require('./controller');

router.put('/carts',
    policy_check('update', 'Cart'),
    cartController.update);

router.get('/carts',
    policy_check('read', 'Cart'),
    cartController.index);


module.exports = router