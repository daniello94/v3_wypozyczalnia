const Client = require('../models/Client');
const bcrypt = require('bcrypt');

function clientAdd(data, cb) {
    let newClient = new Client(data);

    newClient.save(function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user);
        }
    })
};

function clientLogin(data, cb) {
    Client.findOne({ email: data.email }).exec(function (err, user) {
        if (err) {
            cb(err);
            return
        }
        if (!user) {
            cb(null, user)
            return
        };
        bcrypt.compare(data.password, user.password, function (err, logged) {
            if (err) {
                cb(err)
            } if (logged) {
                const token = user.generateAuthToken();
                cb(null, user, token);
            } else {
                cb(null, null)
            }
        })
    })
};

function clientDelate(id, cb) {
    Client.deleteOne({ _id: id }, function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

function clientGet(id, cb) {
    Client.findById(id).exec(function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

function clientList(cb) {
    Client.find().lean().exec(function (err, users) {
        if (err) {
            cb(err)
        } else {
            cb(null, users)
        }
    })
};

module.exports = {
    addClient: clientAdd,
    loginClient: clientLogin,
    getClient: clientGet,
    deleteClient: clientDelate,
    listClient: clientList
}