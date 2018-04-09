import React from 'react';

//Modal dialog content for allowing check-in
export default (props) => {
    return (
        <div>
            <h6 className="modal-header text-center">Please enter your name</h6>
            <div className="form-group">
                <label htmlFor="name">New Name:</label>

                <input
                    id="name"
                    type="text"
                    value={props.userName}
                    className="form-control"
                    placeholder="Enter your name"
                    onChange={props.handleInputChange}
                />

                {!props.isUserNameValid && (
                    <p className="text-danger">
                        User name must contain only letters and be at least 2 but not more 50 chars long
                    </p>
                )}
            </div>

            <div className="modal-button-container text-center">
                <button
                    className="btn btn-success modal-button"
                    disabled={!props.isUserNameValid}
                    onClick={props.handleCheckIn}
                >
                    Confirm
                </button>

                <button
                    className="btn btn-secondary modal-button"
                    onClick={props.handleCancelCheckIn}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}