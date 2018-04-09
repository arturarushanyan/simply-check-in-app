const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    lat: {
        type: Number
    },
    long: {
        type: Number
    },
    checkInTime: {
        type: String
    }
});

const CheckedInUser = mongoose.model('checkedInUsers', UserSchema);

module.exports = CheckedInUser;

module.exports.addUser = function (newUser, callback) {
    newUser.save(callback);
};