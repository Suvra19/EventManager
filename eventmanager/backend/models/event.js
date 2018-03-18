"use strict";
const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let EventSchema = new Schema({
    title: {type: String, require:true},
    subtitle: {type: String},
    description: {type: String, required: true},
    location: {type: Schema.ObjectId, ref: 'EventLocation', required: true},
    category: [{type: Schema.ObjectId, ref: 'Category', required: true}], 
    creator: {type: Schema.ObjectId, ref: 'User', required: true},
    host: [{type: Schema.ObjectId, ref: 'User', required: true}],
    image: {type: Schema.ObjectId, ref: 'Image'},
    creation_time: {type: Date, required: true},
    event_start: {type: Date, required: true},
    event_end: {type: Date, required: true},
    rsvp_start: {type: Date},
    rsvp_end: {type: Date},
    max_capacity: {type: Number},
    attendance: {type: Number},
    status: {type: String, default: 'Open', required: true, enum: ['Created', 'Open', 'Closed', 'Completed', 'Cancelled']}
}, {toJSON : {virtuals: true}});

EventSchema.virtual('url').get(function() {
    return `/catalog/event/${this._id}`
});

EventSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'event'
});

EventSchema.virtual('createdAt').get(function() {
   return moment(this.creation_time).format('MMM Do YYYY, h:mm:ss a');
});

EventSchema.virtual('startsAt').get(function() {
   return moment(this.event_start).format('MMM Do YYYY, h:mm:ss a');
});

EventSchema.virtual('endsAt').get(function() {
   return moment(this.event_end).format('MMM Do YYYY, h:mm:ss a');
});

module.exports = mongoose.model('Event', EventSchema);