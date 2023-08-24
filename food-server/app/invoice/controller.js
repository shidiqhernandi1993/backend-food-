const { subject } = require('@casl/ability');
const { policyFor } = require('../../utils');
const Invoice = require('./model');

const show = async (req, res, next) => {
    try {
        let {order_id} = req.params;
        let invoice =
        await Invoice
        .findOne({order: order_id})
        .populate('order')
        .populate('user');

        let policy = policyFor(req.user);
        let subjectInvoice = subject('Invoice', {...invoice, user_id: invoice.user._id});
        if(!policy.can('read', subjectInvoice)){
            return res.json({
                error: 1,
                message: `Anda tidak memiliki akses untuk melihat invoice ini.`
            });
        }

        return res.json(invoice)
    } catch (err) {
        return res.json({
            error: 1,
            message: 'Error when getting invoice.'
        });

    }
}

const getAll = async (req, res, next) => {
    try {
        let invoice = await Invoice.find()
        .populate('order')
        .populate('user')
        .populate({
            path: 'order',
            populate:{
                path: 'order_items'
            }
        })
        
        return res.json(invoice);
    } catch (err) {
        return res.json({
            error: 1,
            message: 'Error when getting invoice.'
        });
    }
}

const index = async (req, res, next) => {
    try {
        let {id} = req.params;
        let invoice = await Invoice.find({user: id})
        .populate('order')
        .populate('user')
        .populate({
            path: 'order',
            populate:{
                path: 'order_items'
            }
        })

        return res.json(invoice);
        
    } catch (err) {
        return res.json({
            error: 1,
            message: 'Error when getting invoice.'
        });

    }
}

const update = async (req, res, next) => {
    try {
        let {id} = req.params
        let payload = req.body;
        let invoice = await Invoice.findByIdAndUpdate(id, {...payload, payment_status: payload.payment_status});

        return res.json(invoice);
    } catch (err) {
        return res.json({
            error: 1,
            message: 'Error when updating invoice.'
        });
    }
}

module.exports = {
    show,
    getAll,
    index,
    update
}
