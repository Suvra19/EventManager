"use strict";

const async = require('async');

let categoryData = [], locationData = [], userData = [], eventData = [], resultData = [];
let getSampleCategories = (callback) => {
    categoryData = [
        {
            name: 'Art' //0
        },
        {
            name: 'Causes' //1
        },
        {
            name: 'Live performance' //2
        },
        {
            name: 'Hobbies & Crafts' //3
        },
        {
            name: 'Dance' //4
        },
        {
            name: 'Food & Drink' //5
        },
        {
            name: 'Theatre & Film' //6
        },
        {
            name: 'Sports & Fitness' //7
        },
        {
            name: 'Games' //8
        },
        {
            name: 'Photography' //9
        },
        {
            name: 'Health & Wellness' //10
        },
        {
            name: 'Learning' //11
        },
        {
            name: 'Language & Culture' //12
        },
        {
            name: 'Music' //13
        },
        {
            name: 'Social' //14
        },
        {
            name: 'Party' //15
        },
        {
            name: 'Faith & Religion' //16
        }, 
        {
            name: 'Shopping' //17
        },
        {
            name: 'Outdoors & Adventure' //18
        },
        {
            name: 'Technology' //19
        },
        {
            name: 'Family' //20
        },
        {
            name: 'LGBTQ' //21
        },
        {
            name: 'Literature' //22
        },
        {
            name: 'Pets' //23
        },
        {
            name: 'Fashion & Beauty' //24
        },
        {
            name: 'Career' //25
        },
        {
            name: 'Business' //26
        }
    ];
    callback(null, categoryData)
}

let getSampleLocations = (callback) => {
    locationData = [
        {
            address: 'Central Lecture Theatre - C1',
            city: 'Christchurch',
            hint: 'East of the Central Library across the lawn'
        },
        {
            address: 'Central Lecture Theatre - C2',
            city: 'Christchurch',
            hint: 'East of the Central Library across the lawn'
        },
        {
            address: 'Central Lecture Theatre - C3',
            city: 'Christchurch',
            hint: 'East of the Central Library across the lawn'
        },
        {
            address: 'Undercroft',
            city: 'Christchurch',
            hint: 'Below the Central Library'
        },
        {
            address: 'Career Hub',
            city: 'Christchurch',
            hint: 'Across the road from west door of the central lecture theatres'
        },
        {
            address: 'E6 Lecture Theatre',
            city: 'Christchurch',
            hint: 'Engineering Core, First Floor'
        },
        {
            address: 'Erskine - Lab 1',
            city: 'Christchurch',
            hint: 'Opposite the the car park along the Ilam road (across the road from Ilam fields)'
        },
        {
            address: 'Victoria View Point',
            city: 'Wellington',
            hint: ''
        },
        {
            address: 'Sky Tower',
            city: 'Auckland',
            hint: ''
        },
        {
            address: 'North Hagley Park',
            city: 'Christchurch',
            hint: ''
        }
    ];
    callback(null, locationData)
}

let getSampleUsers = (callback) => {
    userData = [
        {
            first_name: 'Ned',
            last_name: 'Stark',
            username: 'nst01',
            email: 'nstark@got.com',
            password: 'ned123',
            about: 'Warden of the North',
            city: 'Christchurch',
            interests: [categoryData[0], categoryData[1], categoryData[2], categoryData[8], categoryData[9], categoryData[10]],
        },
        {
            first_name: 'John',
            last_name: 'Snow',
            username: 'jsn01',
            email: 'jsnow@got.com',
            password: 'john123',
            about: 'Lord Commander and a Targaryan',
            city: 'Christchurch',
            interests: [categoryData[1], categoryData[11], categoryData[25], categoryData[26]],
        },
        {
            first_name: 'Arya',
            last_name: 'Stark',
            username: 'ast01',
            email: 'astark@got.com',
            password: 'arya123',
            about: 'No one. Faceless man.',
            city: 'Wellington',
            interests: [categoryData[1], categoryData[3], categoryData[6], categoryData[7], categoryData[8], categoryData[11]],
        },
        {
            first_name: 'Tyrion',
            last_name: 'Lannister',
            username: 'tla01',
            email: 'tlannister@got.com',
            password: 'tyrion123',
            about: 'Hand of the Queen. Dwarf.',
            city: 'Christchurch',
            interests: [categoryData[5], categoryData[16], categoryData[20], categoryData[22], categoryData[26]]
        },
        {
            first_name: 'Daenarys',
            last_name: 'Targaryan',
            username: 'dta01',
            email: 'dtargaryan@got.com',
            password: 'danny123',
            about: 'Mother of Dragons. Khaleesi.',
            city: 'Auckland',
            interests: [categoryData[0], categoryData[1], categoryData[8], categoryData[11], categoryData[16], categoryData[20]]
        },
        {
            first_name: 'Night',
            last_name: 'King',
            username: 'nki01',
            email: 'nking@got.com',
            password: 'night123',
            about: 'King of the army of the dead.',
            city: 'Christchurch',
            interests: [categoryData[2], categoryData[5], categoryData[8], categoryData[7], categoryData[25], categoryData[26]]
        },
        {
            first_name: 'Chrisrchurch City Council',
            last_name: '',
            username: 'cc01',
            email: 'chc@council.com',
            password: 'chc123',
            about: 'We are the Christchurch City Council.',
            city: 'Christchurch',
            interests: [categoryData[0], categoryData[1], categoryData[2], categoryData[3], categoryData[4], categoryData[5], categoryData[6], categoryData[7], categoryData[8], categoryData[9], categoryData[10], categoryData[11], categoryData[12], categoryData[13], categoryData[14], categoryData[15], categoryData[16], categoryData[17], categoryData[18], categoryData[19], categoryData[20], categoryData[21], categoryData[22], categoryData[23]]
        }
    ];
    callback(null, userData);
}

let getSampleEvents = (callback) => {

    eventData = [
        {
           title: 'How to write effective CV',
           subtitle: 'Learn some valuble CV writing tips',
           description: 'It is going to be a 1 hour session on how to write effective and proffesional CV',
           location: locationData[4],
           category: [categoryData[11], categoryData[25]],
           creator: userData[0],
           host: userData[0],
           event_start: new Date('January 20, 2018 13:00:00'),
           event_end: new Date('January 20, 2018 14:00:00'),
           rsvp_start: new Date('January 19, 2018 00:00:01'),
           rsvp_end: new Date('January 20, 2018 11:00:00'),
           max_capacity: 4,
           status: 'Created'
        },
        {
            title: 'LinkedIn introduction',
            subtitle: 'Introduction to LinkedIn',
            description: 'Learn how to use LinkedIn for networking',
            location: locationData[4],
            category: [categoryData[11], categoryData[25]],
            creator: userData[0],
            host: userData[1],
            event_start: new Date('January 22, 2018 13:00:00'),
            event_end: new Date('January 22, 2018 14:00:00'),
            rsvp_start: new Date('January 21, 2018 00:00:01'),
            rsvp_end: new Date('January 22, 2018 11:00:00'),
            max_capacity: 2,
            status: 'Created'
         },
         {
            title: 'Breakfast at Victoria Lookout',
            subtitle: '',
            description: 'Join us for a breakfast at the Victoria Lookout',
            location: locationData[7],
            category: [categoryData[9], categoryData[14], categoryData[18]],
            creator: userData[2],
            host: userData[2],
            event_start: new Date('January 21, 2018 08:00:00'),
            event_end: new Date('January 21, 2018 10:00:00'),
            rsvp_start: new Date('January 20, 2018 00:00:01'),
            rsvp_end: new Date('January 20, 2018 15:00:00'),
            max_capacity: 6,
            status: 'Created'
         },
         {
            title: 'Welcome Lunch 2018',
            subtitle: '',
            description: 'Free lunch as part of orientation for our new Students',
            location: locationData[3],
            category: [categoryData[5], categoryData[24]],
            creator: userData[3],
            host: userData[0],
            event_start: new Date('January 23, 2018 13:00:00'),
            event_end: new Date('January 23, 2018 14:00:00'),
            rsvp_start: new Date('January 18, 2018 00:00:01'),
            rsvp_end: new Date('January 20, 2018 11:00:00'),
            max_capacity: 10,
            status: 'Created'
         },
         {
            title: 'Fireworks at Sky Tower',
            subtitle: 'Legendary Sky Tower fireworks',
            description: 'Come join us for some epic fireworks',
            location: locationData[8],
            category: [categoryData[0], categoryData[2], categoryData[15], categoryData[20]],
            creator: userData[4],
            host: userData[4],
            event_start: new Date('January 19, 2018 21:00:00'),
            event_end: new Date('January 19, 2018 21:30:00'),
            status: 'Open'
         },
         {
            title: 'New Year\'s Eve Celebration',
            subtitle: 'Celebrate New Year\'s eve with us',
            description: 'Come join us for some epic fireworks',
            location: locationData[9],
            category: [categoryData[0], categoryData[2], categoryData[15], categoryData[20]],
            creator: userData[6],
            host: userData[6],
            event_start: new Date('December 31, 2017 18:00:00'),
            event_end: new Date('January 1, 2018 00:30:00'),
            status: 'Completed'
         }
    ];
    callback(null, eventData);
}

let reviewData = [
   {
       event: eventData[5],
       user: userData[0],
       rating: 4.5,
       comment: 'It was awesome!'
   },
   {
       event: eventData[5],
       user: userData[1],
       rating: 3.5,
       comment: 'It was alright. Could have been better.'
   },
   {
       event: eventData[5],
       user: userData[3],
       rating: 4,
   } 
];

let faqData = [
    {
        event: eventData[3],
        question: 'Can all students come for the lunch ?',
        answer: 'Sorry, only for new students.'
    },
    {
        event: eventData[3],
        question: 'Will there be gluton free food option ?',
        answer: 'Yes, there will be.'
    }
];

let imageData = [
    {
        image: '398px-Alien_Balloon_Party_(3715267974).jpg',
        event: eventData[0]
    },
    {
        image: '401px-Vienna_-_A_floating_swimming_pool_in_the_river_Danube_-_6124.jpg',
        event: eventData[1]
    },
    {
        image: '640px-Bamboo_home.jpg',
        event: eventData[2]
    },
    {
        image: 'Neil-Armstrong-Apollo-11-spacesuit-chest.jpg',
        event: eventData[3]
    },
    {
        image: 'Urban_Vertical_Farm_With_Woman_&_Child.jpg',
        event: eventData[4]
    }
];

async.series([
    getSampleCategories,
    getSampleLocations,
    getSampleUsers,
    getSampleEvents
], (err, results) => {
    if (err) {
        console.log('FUCK!');
    } else {
        resultData = results;
        console.log('YESS ' + resultData.length);
    }
});

exports.samples = resultData;