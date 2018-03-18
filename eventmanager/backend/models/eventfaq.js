"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let EventFaqSchema = new Schema({
    event: {type: Schema.ObjectId, ref: 'Event', required: true},
    question: {type: String, required: true},
    answer: {type: String, required: true}
});

module.exports = mongoose.model('EventFaq', EventFaqSchema);