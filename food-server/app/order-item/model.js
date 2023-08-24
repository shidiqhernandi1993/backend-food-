const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const orderItemSchema = Schema({

    name: {
        type: String,
        require: [true, 'Nama item harus diisi'],
        minLength: [5, 'Panjang nama item minimal 5 karakter']
    },

    price: {
        type: Number,
        require: [true, 'Harga item harus diisi']
    },

    qty: {
        type: Number,
        require: [true, 'Kuantiti harus diisi'],
        min: [1, 'Minimal kuantiti adalah 1']
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

module.exports = model('OrderItem', orderItemSchema);