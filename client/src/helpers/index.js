// Helper Util functions

// degree to radian transformation
export const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
};

// calculating the distance between 2 geoLocation markers by latitude and longitude
export const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
        (Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))) *
        (Math.sin(dLon / 2) * Math.sin(dLon / 2));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // distance in km
    return R * c;
};

// basic form validation
export const validateInput = (value) => {
    console.log("validatevalue",value);
    return value.match(/^[a-zA-Z]{2,50}$/);
};