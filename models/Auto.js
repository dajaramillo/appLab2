const mongoose = require('mongoose');
const { Schema } = mongoose;

const AutoSchema = new Schema({
    marca: { type: String, required: true },
    modelo: { type: Number, required: true },
    kilometraje: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Auto', AutoSchema);