"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let EventLocationSchema = new Schema({
    venue: {type: String, required: true},
    address: {type: String},
    city: {type: String, required: true},
    hint: {type: String}
});

module.exports = mongoose.model('EventLocation', EventLocationSchema);