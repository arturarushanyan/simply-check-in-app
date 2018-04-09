import React from 'react';

//Modal dialog content for allowing geoLocation
export default (props) => {
    return (
        <div>
            <h6 className="modal-header text-center">Please allow access to use your location</h6>
            <div className="modal-button-container text-center">

                <button
                    className="btn btn-success modal-button"
                    onClick={props.handleAllowGeoLocation}
                >
                    Allow
                </button>

                <button
                    className="btn btn-default modal-button"
                    onClick={props.handleRejectGeoLocation}
                >
                    Reject
                </button>
            </div>
        </div>
    )
}