"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let EventImageSchema = new Schema({
    image: {data: Buffer, contentType: String}
}, {toJSON : {virtuals: true}});

EventImageSchema.virtual('imgUrl').get(function() {
    return `/catalog/image/${this._id}`;
});

module.exports = mongoose.model('Image', EventImageSchema);