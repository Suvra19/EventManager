"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name: {type: String, required: true},
    weight: {type: Number, default: 1}
});

module.exports = mongoose.model('Category', CategorySchema);