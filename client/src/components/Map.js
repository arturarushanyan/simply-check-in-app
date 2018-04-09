import React from 'react';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
} from 'react-google-maps';

// Google map component. Giving it default center and marger for better user experience.
// Otherwise just gray background will be visible
export const MapComponent = withScriptjs(withGoogleMap((props) => {
        const latLong = { lat: props.lat, lng: props.long };

        return (
            <GoogleMap
                defaultZoom={18}
                defaultCenter={latLong}
                center={latLong}
            >
                {props.isMarkerShown && (
                    <Marker position={latLong}/>
                )}
            </GoogleMap>
        )
    }
));