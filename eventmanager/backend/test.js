console.log('This script populates the database with sample users, events, catagories, locations, faqs and reviews. Specify the database in the arguments' +
    'e.g: populatedb mongodb://your_username:your_password@your_dabase_url');

const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

const Test = require('./models/testModel');
    
const mongoose = require('mongoose'), mongoDB = userArgs[0];


mongoose.connect(mongoDB, {
    useMongoClient: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const testCreate = (today, tomorrow, yesterday) => {
   console.log(`${today} ${tomorrow} ${yesterday}`);
   let test = new Test({today, tomorrow, yesterday});
    test.save(err => {
        if (err) {
            cb(err, null);
            return
        } 
        console.log('New date: ' + test);
    });
}

/* let createTest = () => {
    callback => {
        
    };
} */

(() => {
    let today = new Date();
    //console.log(newDate.toLocaleString());
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    //console.log(tomm.toLocaleString());
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    testCreate(today.toLocaleString(), tomorrow.toLocaleString(), yesterday.toLocaleString());
    /* //console.log(new Date().toLocaleString());
    let today = new Date();
    console.log(today.toLocaleString());
    today.setDate(today.getDate() + 1);
    console.log(today.toLocaleString()); */
})();

