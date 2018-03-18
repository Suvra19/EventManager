#! /usr/bin/env node

//mongodb://root:secret@ds249727.mlab.com:49727/eventmanager1

console.log('This script populates the database with sample users, events, catagories, locations, faqs and reviews. Specify the database in the arguments' +
    'e.g: populatedb mongodb://your_username:your_password@your_dabase_url');

const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

const path = require('path'),
    fs = require('fs'),
    async = require('async'),
    User = require('./models/user'),
    Event = require('./models/event'),
    Category = require('./models/categories'),
    Location = require('./models/eventlocation'),
    Faq = require('./models/eventfaq'),
    Review = require('./models/eventreview'),
    Image = require('./models/eventimage')
    
const mongoose = require('mongoose'), mongoDB = userArgs[0];

const sampleDataDirectory = './config/sampledata'

let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

mongoose.connect(mongoDB, {
    useMongoClient: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

let users = [], events = [], categories = [], locations = [], faqs = [], reviews = [], images = [];

const categoryCreate = (name, cb) => {
    let category = new Category({name});
    category.save(err => {
        if (err) {
            cb(err, null);
            return
        } 
        console.log('New category: ' + category);
        categories.push(category);
        cb(null, category);
    });
}

const locationCreate = (venue, city, hint, cb) => {
    let locationDetail = {
        venue,
        city
    }

    if (hint) locationDetail.hint = hint;

    let location = new Location(locationDetail);
    location.save(err => {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New location'. location);
        locations.push(location);
        cb(null, location);
    });
}

const eventCreate = (title, subtitle, description, image, location, category, creator, host, creation_time, event_start, event_end, rsvp_start, rsvp_end, max_capacity, attendance, status, cb) => {
    let eventDetail = {
        title,
        description,
        image,
        location,
        category,
        creator,
        host,
        creation_time,
        event_start,
        event_end,
    }

    if (subtitle) eventDetail.subtitle = subtitle;
    if (rsvp_start) eventDetail.rsvp_start = rsvp_start;
    if (rsvp_end) eventDetail.rsvp_end = rsvp_end;
    if (max_capacity) eventDetail.max_capacity = max_capacity;
    if (attendance) eventDetail.attendance = attendance;
    if (status) eventDetail.status = status;

    let event = new Event(eventDetail);
    event.save(err => {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New event: ' + event);
        events.push(event);
        cb(null, event);
    });
} 

let userCreate = (first_name, last_name, username, email, password, about, city, interests, events_attending, active, cb) => {
    let userDetail = {
        first_name,
        username,
        email,
        password,
        city
    }

    if (last_name) userDetail.last_name = last_name;
    if (about) userDetail.about = about;
    if (interests) userDetail.interests = interests;
    if (events_attending) userDetail.events_attending = events_attending;
    if (typeof active !== 'undefined') userDetail.active = active;

    let user = new User(userDetail);
    user.save(err => {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New user: ' + user);
        users.push(user);
        cb(null, user);
    });
}

let faqCreate = (event, question, answer, cb) => {
    let faqDetail = {
        event,
        question,
        answer
    }

    let faq = new Faq(faqDetail);
    faq.save((err) => {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New Faq: ' + faq);
        faqs.push(faq);
        cb(null, faq);
    });
}

let reviewCreate = (event, user, rating, comment, cb) => {
    let reviewDetail = {
        event,
        user,
        rating
    }
    if (comment) reviewDetail.comment = comment;

    let review = new Review(reviewDetail);
    review.save(err => {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New review: ' + review);
        reviews.push(review);
        cb(null, review);
    });
}

let imageCreate = (image, cb) => {
    let imageData = fs.readFileSync(path.join(sampleDataDirectory, image));
    let fileExtension = path.extname(image).slice(1);
    if (fileExtension === 'jpg') fileExtension = 'jpeg';
    fileExtension = `image/${fileExtension}`;
    

    let newImage = new Image({
        image: {
            data: imageData,
            contentType: fileExtension
        }
    });

    newImage.save(err => {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New image: ' + newImage);
        images.push(newImage);
        cb(null, newImage);
    }); 
} 

let createCategoryLocation = (cb) => {
    async.parallel([
        callback => {
            categoryCreate('Art', callback);
        },
        callback => {
            categoryCreate('Causes', callback);
        },
        callback => {
            categoryCreate('Live Performance', callback);
        },
        callback => {
            categoryCreate('Hobbies & Crafts', callback);
        },
        callback => {
            categoryCreate('Dance', callback);
        },
        callback => {
            categoryCreate('Food & Drink', callback);
        },
        callback => {
            categoryCreate('Theatre & Film', callback);
        },
        callback => {
            categoryCreate('Sports & Fitness', callback);
        },
        callback => {
            categoryCreate('Games', callback);
        },
        callback => {
            categoryCreate('Photography', callback);
        },
        callback => {
            categoryCreate('Health & Wellness', callback);
        },
        callback => {
            categoryCreate('Learning', callback);
        },
        callback => {
            categoryCreate('Language & Culture', callback);
        },
        callback => {
            categoryCreate('Music', callback);
        },
        callback => {
            categoryCreate('Social', callback);
        },
        callback => {
            categoryCreate('Party', callback);
        },
        callback => {
            categoryCreate('Faith & Religion', callback);
        },
        callback => {
            categoryCreate('Shopping', callback);
        },
        callback => {
            categoryCreate('Outdoors & Adventure', callback);
        },
        callback => {
            categoryCreate('Technology', callback);
        },
        callback => {
            categoryCreate('Family', callback);
        },
        callback => {
            categoryCreate('LGBTQ', callback);
        },
        callback => {
            categoryCreate('Literature', callback);
        },
        callback => {
            categoryCreate('Pets', callback);
        },
        callback => {
            categoryCreate('Fashion & Beauty', callback);
        },
        callback => {
            categoryCreate('Career', callback);
        },
        callback => {
            categoryCreate('Business', callback);
        },
        callback => {
            locationCreate('Central Lecture Theatre - C1', 'Christchurch', 'East of the Central Library, across the lawn', callback)
        },
        callback => {
            locationCreate('Central Lecture Theatre - C2', 'Christchurch', 'East of the Central Library, across the lawn', callback)
        },
        callback => {
            locationCreate('Central Lecture Theatre - C3', 'Christchurch', 'East of the Central Library, across the lawn', callback)
        },
        callback => {
            locationCreate('Undercroft', 'Christchurch', 'Below the Central library', callback);
        },
        callback => {
            locationCreate('Career hub', 'Christchurch', 'Across the road from west door of the central lecture theatres', callback);
        },
        callback => {
            locationCreate('E6 Lecture theatre', 'Christchurch', 'Engineering core, first floor', callback);
        },
        callback => {
            locationCreate('Erskine - lab 1', 'Christchurch', 'Opposite the the car park along the Ilam road (across the road from Ilam fields)', callback);
        },
        callback => {
            locationCreate('Victoria View Point', 'Wellington', '', callback);
        },
        callback => {
            locationCreate('Sky Tower', 'Auckland', '', callback);
        },
        callback => {
            locationCreate('North Hagley Park', 'Christchurch', 'Central City', callback);
        }
    ], cb);
}

let createUsers = (cb) => {
    async.parallel([
        callback => {
            userCreate('Ned', 'Stark', 'nst01', 'nstark@got.com', 'ned123', 'Warden of the North', 'Christchurch', [categories[0], categories[1], categories[2], categories[8], categories[9], categories[10]], '', true, callback);
        },
        callback => {
            userCreate('John', 'Snow', 'jsn01', 'jsnow@got.com', 'john123', 'Lord commander and a Targaryan', 'Christchurch', [categories[1], categories[11], categories[25], categories[26]], '', true, callback);
        },
        callback => {
            userCreate('Arya', 'Stark', 'ast01', 'astark@got.com', 'arya123', 'No one. Faceless mane.', 'Welligbton', [categories[1], categories[3], categories[6], categories[7], categories[8], categories[11]], '', true, callback);
        },
        callback => {
            userCreate('Tyrion', 'Lannister', 'tla01', 'tlannister@got.com', 'tyrion123', 'Hand of the Queen. Dwarf', 'Christchurch', [categories[5], categories[16], categories[20], categories[22], categories[26]], '', true, callback);
        },
        callback => {
            userCreate('Night', 'King', 'nki01', 'nking@got.com', 'night123', 'King of the army of the dead.', 'Christchurch', [categories[2], categories[5], categories[8], categories[7], categories[25], categories[26]], '', true, callback);
        },
        callback => {
            userCreate('Daenarys', 'Targaryan', 'dta01', 'dtargaryan@got.com', 'danny123', 'Mother of Dragons. Khaleesi', 'Auckland', [categories[0], categories[1], categories[8], categories[11], categories[16], categories[20]], '', true, callback);
        },
        callback => {
            userCreate('Christchurch City Council', '', 'ccc01', 'chc@council.com', 'chc123', 'We are the Christchurch City Council', 'Christchurch', [...categories], '', true, callback);
        },
        callback => {
            userCreate('UCSA', '', 'ucsa01', 'ucsa@uc.com', 'ucsa123', 'University of Canterbury Students Association', 'Christchurch', [...categories], '', true, callback);
        },
    ], cb);
}

let createImages = (cb) => {
    async.parallel([
        callback => {
            imageCreate('398px-Alien_Balloon_Party_(3715267974).jpg', callback);      
        },
        callback => {
            imageCreate('401px-Vienna_-_A_floating_swimming_pool_in_the_river_Danube_-_6124.jpg', callback);      
        },
        callback => {
            imageCreate('640px-Bamboo_home.jpg', callback);
        },
        callback => {
            imageCreate('Neil-Armstrong-Apollo-11-spacesuit-chest.jpg', callback);      
        },
        callback => {
            imageCreate('Urban_Vertical_Farm_With_Woman_&_Child.jpg', callback);      
        },
        callback => {
            imageCreate('Lufa_Farms_Aerial_view_of_Montreal_rooftop_greenhouse.jpg', callback);      
        }
    ], cb)
}

let createEvents = (cb) => {
    async.parallel([
        callback => {
            eventCreate('How to write effective CV', 'Learn some valuable CV writing techniques', 'It is going to be a 1 hour session on how to write effective and proffesional CV', images[0], locations[4], [categories[11], categories[25]], users[0], users[0], new Date().toLocaleString(), new Date('January 22, 2018 13:00:00'),
            new Date('January 22, 2018 14:00:00'), new Date('January 21, 2018 00:00:01'), new Date('January 22, 2018 11:00:00'), 4, false, 'Created', callback);
        },
        callback => {
            eventCreate('Introduction to LinkedIn', 'Learn about LinkedIn', 'Learn how to use LinkedIn for networking', images[1], locations[4], [categories[11], categories[25]], users[0], users[1], new Date().toLocaleString(), new Date('January 24, 2018 13:00:00'),
            new Date('January 24, 2018 14:00:00'), new Date('January 23, 2018 00:00:01'), new Date('January 24, 2018 11:00:00'), 2, false, 'Created', callback);
        },
        callback => {
            eventCreate('Breakfast at Victoria lookout', '', 'Join us for a fun breakfast at the Victoria lookout', images[2], locations[7], [categories[9], categories[14], categories[18]], users[2], users[2], new Date().toLocaleString(), new Date('January 23, 2018 08:00:00'),
            new Date('January 23, 2018 10:00:00'), new Date('January 22, 2018 00:00:01'), new Date('January 22, 2018 15:00:00'), 6, false, 'Created', callback);
        },
        callback => {
            eventCreate('Welcome Lunch 2018', '', 'Free lunch as part of orientation for our new students', images[3], locations[3], [categories[5], categories[24]], users[3], users[0], new Date().toLocaleString(), new Date('January 25, 2018 13:00:00'),
            new Date('January 25, 2018 14:00:00'), new Date('January 20, 2018 00:00:01'), new Date('January 24, 2018 11:00:00'),10, false, 'Created', callback);
        },
        callback => {
            eventCreate('Fireworks at the Sky Tower', 'Legendary Sky tower firworks', 'Come join us for some epic firworks', images[4], locations[8], [categories[0], categories[2], categories[15], categories[20]], users[4], users[4], new Date().toLocaleString(), new Date('January 21, 2018 21:00:00'),
            new Date('January 21, 2018 21:30:00'), false, false, false, false, 'Open', callback);
        },
        callback => {
            eventCreate('New Year\'s Eve Celebration', 'Celebrate New Year\'s eve with us', 'Come join us for some epic fireworks', images[5], locations[9], [categories[0], categories[2], categories[15], categories[20]], users[6], users[6], new Date().toLocaleString(), new Date('December 31, 2017 18:00:00'),
            new Date('January 1, 2018 00:30:00'), false, false, false, false, 'Completed', callback);
        }
    ], cb)
}

let createReviews = (cb) => {
    async.parallel([
        callback => {
            reviewCreate(events[5], users[0], 4.5, 'It was awesome!', callback);
        },
        callback => {
            reviewCreate(events[5], users[1], 3.5, 'It was alright. Could have been better.', callback);
        },
        callback => {
            reviewCreate(events[5], users[3], 4, '', callback);
        }
    ], cb)
}

let createFaqs = (cb) => {
    async.parallel([
        callback => {
            faqCreate(events[3], 'Can all students come for the lunch ?', 'Sorry, only for new students.', callback);
        },
        callback => {
            faqCreate(events[3], 'Will there be gluton free food option ?', 'Yes, there will be.', callback);
        }
    ], cb)
}

async.series([
    createCategoryLocation,
    createUsers,
    createImages,
    createEvents,
    createReviews,
    createFaqs
], (err, result) => {
    if (err) {
        console.log('ERROR: Async parallel ' + err);
    } else {
        console.log('SUCCESS');
    }
    mongoose.connection.close();
});









