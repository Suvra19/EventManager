"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let TestSchema = new Schema({
   today: {type: Date},
   tomorrow: {type: Date},
   yesterday: {type: Date}
});

module.exports = mongoose.model('Test', TestSchema);