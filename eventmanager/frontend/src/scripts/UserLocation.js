let UserLocation = function() => {
    console.log('Inside find location');
    navigator.geolocation.getCurrentPosition(function(position) {
        if (position) {
            return {
                position
            }
        }
    });
}
