import React, { Component } from 'react';
import Modal from 'react-modal';
import geolocation from 'geolocation';

import AllowGeolocationModal from './modals/AllowGeolocationModal';
import CheckInModalContent from './modals/CheckInModalContent';
import CheckInList from './CheckInList';

import { MapComponent } from './Map';

import Config from '../config';

import API from '../api';

import {
    CHECKIN,
} from '../global-constants/api-paths';

import {
    getDistance,
    validateInput,
} from '../helpers';

import '../styles/bootstrap.css';
import '../styles/styles.css';

const rootElement = document.getElementById('root');

const createUserData = (userName) => {
    console.log('LOG -->  userName', userName);
    console.log("LOG -->  localStorage.getItem('userName')", localStorage.getItem('userName'));
    const newUserData = {
        name: userName || localStorage.getItem('userName') || '',
    };

    console.log('LOG -->  newUserData.name', newUserData.name);
    console.log('LOG -->  validateInput(newUserData.name)', validateInput(newUserData.name));
    return {
        ...newUserData,
        isUserNameValid: !!validateInput(newUserData.name),
    };
};

export default class App extends Component {
    constructor(props) {
        super(props);


        this.state = {
            isUserCheckedIn: false,
            loadingLocation: false,
            isCheckInModalOpen: false,
            isMarkerShown: false,
            isAllowGeoLocationModalOpen: true,
            user: {
                ...createUserData(),
                currentPosition: {
                    lat: 40.1792,
                    long: 44.4991,
                }
            },
            checkInData: [],
        }
    }

    componentWillUnmount(){
        localStorage.removeItem('userName');
    }

    // method for getting user position
    getUsersPosition = (err, position) => {
        if (err) {
            console.error('SOMETHING WENT WRONG. PLEASE TRY AGAIN.', err);
            return;
        }

        const { coords } = position;

        this.setState({
            loadingLocation: false,
            user: {
                ...this.state.user,
                currentPosition: {
                    ...this.state.currentPosition,
                    lat: coords.latitude,
                    long: coords.longitude,
                },
            },
            isMarkerShown: true
        });
    };

    //method for allowing geoLocation
    handleAllowGeoLocation = () => {

        this.setState({
            loadingLocation: true,
            isAllowGeoLocationModalOpen: false,
        });

        if (geolocation) {
            geolocation.getCurrentPosition(this.getUsersPosition);
        } else {
            alert('Please enable location services on your browser');
        }
    };

    //method for opening check-in modal
    openCheckInModal = () => {
        this.setState({
            isCheckInModalOpen: true,
        });
    };

    //method for checking in user
    handleCheckIn = () => {
        const { user } = this.state;

        // storing the username to local storage
        localStorage.setItem('userName', user.userName);

        const newData = {
            name: user.userName,
            lat: user.currentPosition.lat,
            long: user.currentPosition.long
        };

        API.post(CHECKIN, newData)
            .then(res => {
                if (res) {

                    const {
                        lat,
                        long,
                    } = this.state.user.currentPosition;

                    // calculating the distance between current user and others
                    const filteredAndSortedData = res.map((newUser) => {
                        newUser.distanceFromCurrentUser = getDistance(lat, long, newUser.lat, newUser.long);
                        return newUser;
                    })
                        .filter((u) => u.distanceFromCurrentUser <= 1) // filtering marks near 1km
                        .sort((next, prev) => next.distanceFromCurrentUser - prev.distanceFromCurrentUser); //sorting to see closer check-ins first

                    this.setState({
                        checkInData: filteredAndSortedData,
                        isUserCheckedIn: true,
                    });
                }
            });

        this.closePopups();
    };

    closePopups = () => {
        this.setState({
            isAllowGeoLocationModalOpen: false,
            isCheckInModalOpen: false,
            isUserCheckedIn: false,
        });
    };

    // method for handling input change in check-in modal
    handleInputChange = ({ target }) => {
        console.log('LOG -->  target.value', target.value);
        this.setState({
            user: {
                ...this.state.user,
                ...createUserData(target.value),
            }
        });
    };

    render() {
        const {
            user,
            isCheckInModalOpen,
            isAllowGeoLocationModalOpen,
        } = this.state;

        return (
            <div className="app-root">
                <h1 className="text-center">Check-In Yourself</h1>

                {
                    this.state.loadingLocation && (
                        <p className="text-center text-info col-12">
                            Getting your location data. Please wait...
                        </p>
                    )
                }

                <MapComponent
                    loadingElement={<div className="loadingElement"/>}
                    containerElement={<div className="containerElement"/>}
                    mapElement={<div className="mapElement"/>}
                    googleMapURL={Config.googleMapURL}
                    long={user.currentPosition.long}
                    lat={user.currentPosition.lat}
                    isMarkerShown={this.state.isMarkerShown}
                />

                <div className="text-center separator-container">
                    <button
                        className="btn btn-success check-in-button"
                        onClick={this.openCheckInModal}
                    >
                        Check In
                    </button>
                </div>

                {
                    this.state.isUserCheckedIn
                        ? <CheckInList data={this.state.checkInData}/>
                        : <p>Please check-in to be able to see nearby check-ins</p>
                }

                <Modal
                    isOpen={isAllowGeoLocationModalOpen}
                    style={Config.customModalStyles}
                    contentLabel="GeoLocation Modal"
                    appElement={rootElement}
                >
                    {
                        isAllowGeoLocationModalOpen && (
                            <AllowGeolocationModal
                                handleAllowGeoLocation={this.handleAllowGeoLocation}
                                handleRejectGeoLocation={this.closePopups}
                            />
                        )
                    }
                </Modal>

                <Modal
                    isOpen={isCheckInModalOpen}
                    style={Config.customModalStyles}
                    contentLabel="CheckIn Modal"
                    appElement={rootElement}
                >
                    {isCheckInModalOpen && (
                        <CheckInModalContent
                            userName={user.userName}
                            handleCheckIn={this.handleCheckIn}
                            handleCancelCheckIn={this.closePopups}
                            isUserNameValid={user.isUserNameValid}
                            handleInputChange={this.handleInputChange}
                        />
                    )
                    }
                </Modal>
            </div>
        )
    }
}