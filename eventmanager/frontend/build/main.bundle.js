(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllEventsForCity = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("Am here");

var container = document.querySelector('.container');

//AIzaSyDAVe8NRKi1G-mXQrxO7iw00J5KaQDjyZk
//AIzaSyAzjZveZdQZjyMzMlk5KX7O2q9_7HcWKik

var _getClientPosition = function _getClientPosition() {

    var successCb = function successCb(cb) {
        return function (position) {
            return cb(position);
        };
    };

    var errorCb = function errorCb(cb) {
        return function (err) {
            return cb('No geolocation found');
        };
    };

    return new Promise(function (resolve, reject) {
        if (localStorage.getItem('city')) {
            var currentCity = localStorage.getItem('city');
            resolve(currentCity);
        } else {
            if (window.navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successCb(resolve), errorCb(reject));
            } else {
                reject('No geolocation support');
            }
        }
    });
};

var _getCityFromGeoData = function _getCityFromGeoData(position) {
    var lat = position.coords.latitude;
    var lang = position.coords.longitude;
    return fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lang + '&result_type=street_address&key=AIzaSyAzjZveZdQZjyMzMlk5KX7O2q9_7HcWKik').then(function (response) {
        console.log('Got response from google maps ' + response.ok);
        if (response.ok) {
            var jp = response.json();
            console.log(jp);
            return jp;
        }
    }).then(function (locationData) {
        console.log(locationData.results);
        var city = locationData.results.shift().address_components.filter(function (address) {
            var types = address.types.filter(function (type) {
                return type === 'locality';
            });
            return types.length > 0;
        });
        console.log('Got ' + city[0].long_name);
        localStorage.setItem('city', city[0].long_name);
        return Promise.resolve(city[0].long_name);
    }).catch(function (err) {
        console.log(err);
    });
};

var getCurrentCity = function getCurrentCity() {
    var currentCityPromise = _getClientPosition().then(function (result) {
        console.log((typeof result === 'undefined' ? 'undefined' : _typeof(result)) == 'object');
        if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) == 'object') {
            return _getCityFromGeoData(result);
        } else {
            return Promise.resolve(result);
        }
    });
    console.log(currentCityPromise);
    return currentCityPromise;
};

var getAllEventsForCity = exports.getAllEventsForCity = function getAllEventsForCity(currentCity) {
    fetch('http://localhost:3000/catalog?city=' + currentCity).then(function (response) {
        if (response.ok) {
            return response.json();
        }
    }).then(function (data) {
        showEvents(data);
    }).catch(function (err) {
        console.log(err);
    });
};

var showEvents = function showEvents(data) {
    console.log(data);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var obj = _step.value;

            var eventContent = document.createElement('article');
            var anchor = document.createElement('a');
            console.log('/project/' + obj._id);
            //anchor.href = `http://localhost:3000/catalog/project/${obj._id}`;
            anchor.href = '/project/' + obj._id;
            var image = document.createElement('img');
            //image.src = `http://localhost:3000/catalog/image/${obj.image._id}`;
            image.src = '/image/' + obj.image._id;
            var title = document.createElement('h2');
            title.textContent = obj.title;
            var venue = document.createElement('p');
            venue.textContent = obj.location.venue + ', ' + obj.location.city;
            var timings = document.createElement('p');
            timings.textContent = obj.event_start + ' - ' + obj.event_end;
            eventContent.appendChild(anchor);
            anchor.appendChild(image);
            anchor.appendChild(title);
            anchor.appendChild(venue);
            anchor.appendChild(timings);
            if (obj.review) {
                var starPercentage = obj.review.avgRating / 5 * 100;
                var starPercentageRounded = Math.round(starPercentage / 10) * 10 + '%';
                var reviewCount = document.createElement('span');
                reviewCount.className = 'review-count';
                reviewCount.textContent = '(' + obj.review.numberOfReviews + ' reviews)';
                var outerRating = document.createElement('div');
                outerRating.className = 'stars-outer';
                var innerRating = document.createElement('div');
                innerRating.className = 'stars-inner';
                outerRating.appendChild(innerRating);
                innerRating.style.width = starPercentageRounded;
                var rating = document.createElement('span');
                rating.setAttribute('data-rating', obj.avgRating);
                anchor.appendChild(outerRating);
                anchor.appendChild(reviewCount);
                anchor.appendChild(rating);
            }

            container.appendChild(eventContent);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

getCurrentCity().then(function (city) {
    console.log(city);
    getAllEventsForCity(city);
});

},{"./router":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Router = {
    routes: [],
    mode: 'history',
    root: '/',
    config: function config(options) {
        //this.mode = options && options.mode && options.mode == 'history' && !!(history.pushState) ? 'history' : 'hash';
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
        return this;
    },
    getFragment: function getFragment() {
        var fragment = '';
        console.log(decodeURI(location.pathname + location.search));
        fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
        //fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        return this.clearSlashes(fragment);
    },
    clearSlashes: function clearSlashes(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },
    add: function add(re, handler) {
        if (typeof re === 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({ re: re, handler: handler });
        return this;
    },
    remove: function remove(param) {
        for (var i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
            if (r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    },
    flush: function flush() {
        this.routes = [];
        this.mode = 'history';
        this.root = '/';
        return this;
    },
    check: function check(f) {
        var fragment = f || this.getFragment();
        for (var i = 0; i < this.routes.length; i++) {
            var match = fragment.match(this.routes[i].re);
            if (match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }
    },
    onpopstate: function onpopstate(event) {
        console.log(event.state.url);
        this.check(event.state.url);
    },
    navigate: function navigate(path) {
        path = path ? path : '';
        console.log(path);
        history.pushState(null, null, this.root + this.clearSlashes(path));
        return this;
    }

};

Router.config({
    root: 'catalog'
}).add(/project\/(.*)/, function () {
    console.log('Project Details');
}).add(/image\/(.*)/, function () {
    console.log('Image details');
});

exports.default = Router;

},{}]},{},[1]);
