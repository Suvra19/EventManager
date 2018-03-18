"use strict";

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    first_name: {type: String, required: true, trim: true},
    last_name: {type: String, trim: true},
    username: {type: String, required: true, unique: true, trim: true, minlength: [5, 'Username is too short']},
    email: {type: String, required: true, unique: true, trim: true, validate: {
        validator: function (v) {
               return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
        }, message: '{VALUE} is not a valid email address!'}},
    password: {type: String, required: true},
    about: {type: String},
    city: {type: String, required: true},
    interests: [{type: Schema.ObjectId, ref: 'Category'}],
    events_attending: [{type: Schema.ObjectId, ref: 'Event'}],
    active: {type: Boolean, default: true}
});

UserSchema.virtual('name').get(function () {
    return this.first_name + ' ' + this.last_name;
});

UserSchema.virtual('url').get(function() {
    return `/catalog/user/${this._id}`; 
});

// Hashing password before saving to DB
UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10).then(function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    })
});

module.exports = mongoose.model('User', UserSchema);
