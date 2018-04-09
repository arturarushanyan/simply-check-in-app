const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const uniqueId = require('short-unique-id');

const { CHECKIN } = require('../client/src/global-constants/api-paths');
const CheckedInUser = require('./models/checkedInUsers');

const app = express();

const port = process.env.PORT || 5000;
const generateId = new uniqueId();

const {
    USER_ERR,
    ADD_USER,
    ERR_ADD_USER,
    USER_FIND_ONE,
    CHECKED_IN_USERS,
    ERR_CHECKED_IN_USERS,
} = require('./constants');

mongoose.connect('mongodb://artur:artur@ds239029.mlab.com:39029/check-in',
    () => {
        console.log('DB was successfully connected.');
    }
);

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());

const sendData = (response, data, key) => {
    console.log(`${key} --> `, data);
    response.send(data);
};

//adding user to checked in database
app.post(CHECKIN, ({ body }, res) => {

    const newUser = new CheckedInUser({
        id: generateId.randomUUID(6),
        name: body.name,
        lat: body.lat,
        long: body.long,
        checkInTime: new Date()
    });

    CheckedInUser.findOne(
        {
            name: body.name,
        },
        (err, doc) => {
            if (err) {
                console.error(USER_FIND_ONE, err);
            }

            if (doc) {
                //updating the user if name already exists
                doc.lat = newUser.lat;
                doc.long = newUser.long;
                doc.checkInTime = new Date();

                doc.save((err) => {
                    if (err) {
                        console.error(USER_ERR, err);
                    }
                });

            } else {
                CheckedInUser.addUser(newUser, (err, user) => {
                    if (err) {
                        console.error(ERR_ADD_USER, err);
                    } else {
                        console.log(ADD_USER, user);
                    }
                });
            }
        });

    //sending users list back to client in order to be able to see near-by check-ins
    CheckedInUser.find(
        {
            name: {
                $ne: newUser.name,
            }
        },
        (err, users) => {
            if (err) {
                sendData(res, err, ERR_CHECKED_IN_USERS);
            } else {
                sendData(res, JSON.stringify(users), CHECKED_IN_USERS);
            }
        })

});

app.listen(port, () => console.log(`Listening on port ${port}`));