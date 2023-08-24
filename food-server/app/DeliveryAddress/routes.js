const router = require('express').Router();
const { policy_check } = require('../../middlewares');
const daController = require('./controller');

router.get('/delivery-addresses', 
    policy_check('view', 'DeliveryAddress'),
    daController.index);

router.post('/delivery-addresses',
    policy_check('create', 'DeliveryAddress'),
    daController.store );

router.put('/delivery-addresses/:id', daController.update);

router.delete('/delivery-addresses/:id', daController.destroy);


module.exports = router;