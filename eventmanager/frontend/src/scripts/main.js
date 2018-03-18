//import Router from './router';

console.log("Am here");

const myRouter = function() {
    console.log("Creating my router");
    let routes = [];
    let root = '/';
    const _clearSlashes = path => {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }
    const _getPath = () => {
        const currentPath = _clearSlashes(decodeURI(location.pathname));
        return currentPath;
    }
    const _applyHandler = (path) => {
        const currentPath = path || _getPath();
        for (let route of routes) {
            let match = currentPath.match(route.re);
            if (match) {
                match.shift();
                route.handler.apply({}, match);
            }
        }
    }
    const reset = () => {
        routes = [],
        root = '/'
    }
    const add = ({re, handler}) => {
        console.log(`Added route for ${re}`);
        if (typeof re == 'function') {
            handler = re;
            re = '';
        }
        routes.push({re, handler});
    }
    const navigate = (path) => {
        history.pushState(null, null, root + _clearSlashes(path ? path : ''));
    }
    const _handleLocationChange = (event) => {
        
    }
    const _listen = (event) => {
        window.addEventListener('popstate', _handleLocationChange(event))
        _applyHandler(event.state.url);
    }
    return {
        add,
        navigate,
        reset
    }

}();

myRouter.add(() => {
    console.log('Home page');
});

myRouter.add(/about/, () => {
    console.log('About page');
});

myRouter.add(/event\/(.*)/, (eventId) => {
    console.log('Event page' + eventId);
});

myRouter.navigate('about');


/* let container = document.querySelector('.container');

//AIzaSyDAVe8NRKi1G-mXQrxO7iw00J5KaQDjyZk
//AIzaSyAzjZveZdQZjyMzMlk5KX7O2q9_7HcWKik

const _getClientPosition = () => {
    
    const successCb = (cb) => {
        return position => cb(position);
    }

    const errorCb = (cb) => {
        return err => cb(`No geolocation found`);
    }

    return new Promise((resolve, reject) => {
        if (localStorage.getItem('city')) {
            let currentCity = localStorage.getItem('city');
            resolve(currentCity);
        } else {
            if (window.navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successCb(resolve), errorCb(reject));
            } else {
                reject('No geolocation support');
            }
        }
    });
}

const _getCityFromGeoData = (position) => {
    let lat = position.coords.latitude;
    let lang = position.coords.longitude;
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lang}&result_type=street_address&key=AIzaSyAzjZveZdQZjyMzMlk5KX7O2q9_7HcWKik`).then(response => {
        console.log('Got response from google maps ' + response.ok);
        if (response.ok) {
            let jp = response.json();
            console.log(jp);
            return jp;
        }
    }).then(locationData => {
        console.log(locationData.results);
        let city = locationData.results.shift().address_components.filter(address => {
            let types = address.types.filter(type => type === 'locality');
            return types.length > 0;
        });
        console.log('Got ' + city[0].long_name); 
        localStorage.setItem('city', city[0].long_name);
        return Promise.resolve(city[0].long_name);
    }).catch(err => {
        console.log(err);
    });
}

const getCurrentCity = () => {
    let currentCityPromise = _getClientPosition().then(result => {
        console.log(typeof result == 'object');
        if (typeof result == 'object') {
           return _getCityFromGeoData(result);
        } else {
            return Promise.resolve(result);
        }
    });
    console.log(currentCityPromise);
    return currentCityPromise;
}

export const getAllEventsForCity = currentCity => {
    fetch(`http://localhost:3000/catalog?city=${currentCity}`).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        showEvents(data);
    }).catch(err => {
        console.log(err);
    }); 
}

const showEvents = data => {
    console.log(data);
    for (let obj of data) {
        let eventContent = document.createElement('article');
        let anchor = document.createElement('a');
        console.log(`/project/${obj._id}`);
        anchor.href = `http://localhost:8000/catalog/project/${obj._id}`;
        let image = document.createElement('img');
        image.src = `http://localhost:3000/catalog/image/${obj.image._id}`;
        let title = document.createElement('h2');
        title.textContent = obj.title;
        let venue = document.createElement('p');
        venue.textContent = `${obj.location.venue}, ${obj.location.city}`;
        let timings = document.createElement('p');
        timings.textContent = `${obj.event_start} - ${obj.event_end}`;
        eventContent.appendChild(anchor);
        anchor.appendChild(image);
        anchor.appendChild(title);
        anchor.appendChild(venue);
        anchor.appendChild(timings);
        if (obj.review) {
            const starPercentage = (obj.review.avgRating / 5) * 100;
            const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
            let reviewCount = document.createElement('span');
            reviewCount.className = 'review-count';
            reviewCount.textContent = `(${obj.review.numberOfReviews} reviews)`;
            let outerRating = document.createElement('div');
            outerRating.className = 'stars-outer';
            let innerRating = document.createElement('div');
            innerRating.className = 'stars-inner';
            outerRating.appendChild(innerRating);
            innerRating.style.width = starPercentageRounded;
            let rating = document.createElement('span');
            rating.setAttribute('data-rating', obj.avgRating);
            anchor.appendChild(outerRating);
            anchor.appendChild(reviewCount);
            anchor.appendChild(rating);
        }
       
        container.appendChild(eventContent);
    }
}

getCurrentCity().then(city => {
    console.log(city);
    getAllEventsForCity(city);
}); */
