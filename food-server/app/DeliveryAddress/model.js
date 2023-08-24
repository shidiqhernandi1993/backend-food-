const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const deliveryAddressSchema = Schema({
    name: {
        type: String,
        require: [true, 'Nama alamat harus diisi'],
        maxLength: [255, 'Panjang maksimal nama alamat adalah 255 karakter']
    },

    kelurahan: {
        type: String,
        require: [true, 'Nama kelurahan harus diisi'],
        maxLength: [255, 'Panjang maksimal nama kelurahan adalah 255 karakter']
    },

    kecamatan: {
        type: String,
        require: [true, 'Nama kecamatan harus diisi'],
        maxLength: [255, 'Panjang maksimal nama kecamatan adalah 255 karakter']
    },

    kabupaten: {
        type: String,
        require: [true, 'Nama kabupaten harus diisi'],
        maxLength: [255, 'Panjang maksimal nama kabupaten adalah 255 karakter']
    },

    provinsi: {
        type: String,
        require: [true, 'Nama provinsi harus diisi'],
        maxLength: [255, 'Panjang maksimal nama provinsi adalah 255 karakter']
    },

    detail: {
        type: String,
        require: [true, 'Nama detail harus diisi'],
        maxLength: [1000, 'Panjang maksimal nama detail adalah 1000 karakter']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = model('DeliveryAddress', deliveryAddressSchema);