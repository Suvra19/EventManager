"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let EventReviewSchema = new Schema({
    event: {type: Schema.ObjectId, ref: 'Event'},
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    rating: {type: Number, required: true, min: 0, max: 5},
    comment: {type: String},
    reviewedAt: {type: Date}
});

module.exports = mongoose.model('Review', EventReviewSchema);