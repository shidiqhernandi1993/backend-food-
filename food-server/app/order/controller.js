const Cartitem = require('../cart-item/model');
const DeliveryAddress = require('../DeliveryAddress/model');
const Order = require('./model');
const OrderItem = require('../order-item/model');
const { Types } = require('mongoose');

const store = async (req, res, next) => {

    try {
        let {delivery_fee, delivery_address} = req.body;
        let items = await Cartitem.find({user: req.user._id}).populate('product');
        if(!items){
            return res.json({
                error: 1,
                message: `You cannot place an order because there are no items in your cart`
            })
        }

        let address = await DeliveryAddress.findById(delivery_address);

        let order = new Order({
            _id: new Types.ObjectId(),
            status: 'waiting_for_payment',
            delivery_fee: delivery_fee,
            delivery_address: {
                provinsi: address.provinsi,
                kabupaten: address.kabupaten,
                kecamatan: address.kecamatan,
                kelurahan: address.kelurahan,
                detail: address.detail,
            },
            user: req.user._id
        });

        let orderItems = 
        await OrderItem
        .insertMany(items.map(item => ({
            ...item,
            name: item.product.name,
            qty: parseInt(item.qty),
            price: parseInt(item.product.price),
            order: order._id,
            product: item.product._id
        })));
        
        orderItems.forEach(item => order.order_items.push(item));
        order.save();
        await Cartitem.deleteMany({user: req.user._id});
        return res.json(order);
    } catch (err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next(err);        
    }
}

const index = async (req, res, next) => {
    try {
        let {skip = 0, limit = 10} = req.query;
        let count = await Order.find({user: req.user._id}).countDocuments();
        let orders = 
            await Order
            .find({user: req.user._id})
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate('order_items')
            .sort('-createdAt');
        return res.json({
            data: orders.map(order => order.toJSON({virtuals: true})),
            count
        })

    } catch (err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next(err);        
    }
}

const update = async (req, res, next) => {
    try {
        let {id} = req.params;
        let payload = req.body;
        let order = await Order.findByIdAndUpdate(id, {...payload, status: payload.status});

        return res.json(order);
    } catch (err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next(err); 
    }
}

module.exports = {
    store,
    index,
    update
}