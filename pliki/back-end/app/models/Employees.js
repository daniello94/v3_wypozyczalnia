const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });

const schema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    },

    role: {
        type: String,
        trim: true,
        default: 'employe',
        enum: ['employe', 'admin']
    },

    phoneNumber: {
        type: String,
        default: ''
    },

    name: {
        type: String,
        deflaut: ''
    },

    lastName: {
        type: String,
        default: ''
    },
    photo:{
        type:String,
        default:''
    }
});

schema.plugin(uniqueValidator);

schema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(Number(process.env.SALT), function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next()
        })

    })
});

schema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
    return token
};

module.exports = mongoose.model('Employess', schema);