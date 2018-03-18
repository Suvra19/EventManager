const Event = require('../models/event')
const Location = require('../models/eventlocation')
const User = require('../models/user')
const Category = require('../models/categories')
const Image = require('../models/eventimage')
const Review = require('../models/eventreview')
const moment = require('moment');

//Display all events for unsigned user for the user's current location. Ordered by the creation time.
let eventListDetails = 'title subtitle status image url reviews event_start event_end location rsvp_start rsvp_end creator host';
exports.event_list = (req, res, next) => {
    let currentCity = "Christchurch";
    if (req.query.hasOwnProperty('city')) {
        currentCity = req.query.city;
    }
    Event.find({}, eventListDetails)
        .populate({path: 'image', select: 'imgUrl'})
        .populate({path: 'reviews', select: 'rating'})
        .populate('creator', 'first_name')
        .populate('host', 'first_name')
        .populate({path: 'location', match: {city: currentCity}, select: 'venue city -_id'})
        .lean()
        .exec((err, list_events) => {
            if (err) {return next(err);}
            list_events = list_events.filter(obj => obj.location !== null);
            for (let event of list_events) {
                // Calculate and set average rating for each event
                if (event.reviews && event.reviews.length > 0) {
                    let totalRating = event.reviews.map(review => review.rating).reduce((sum, rating) => sum + rating);
                    let avgRating = totalRating / event.reviews.length;
                    let numberOfReviews = event.reviews.length;
                    let review = {
                        avgRating,
                        numberOfReviews
                    }
                    event.review = review;
                }
                delete event.reviews;
                //Format the event dates for display 
                event.event_start = moment(event.event_start).format('MMM Do YYYY, h:mm:ss a');
                event.event_end = moment(event.event_end).format('MMM Do YYYY, h:mm:ss a');
                event.rsvp_start = moment(event.rsvp_start).format('MMM Do YYYY, h:mm:ss a');
                event.rsvp_end = moment(event.rsvp_end).format('MMM Do YYYY, h:mm:ss a');
            }
            res.status(200).json(list_events);
    });
}




