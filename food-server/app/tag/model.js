const mongoose = require('mongoose');
const {model, Schema} = mongoose;


let tagSchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang tag minimal 3 karakter'],
        maxlength: [20, 'Panjang tag maksimal 20 karakter'],
        required: [true, 'Nama tag harus diisi !']
    }
});

module.exports = model('Tag', tagSchema);