const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });

const conclusion = new mongoose.Schema({
    oderStan: {
        type: String,
        default: "Oczekujący",
    },

    firstName: {
        type: String,
        default: "",
    },

    lastName: {
        type: String,
        default: "",
    },

    phoneNumber: {
        type: String,
        default: "",
    },

    numberId: {
        type: String,
        default: "",
    },

    typePerson: {
        type: String,
        default: ""
    },

    nameCompany: {
        type: String,
        default: ""
    },

    startDate: {
        type: String,
        default: ""
    },

    endDate: {
        type: String,
        default: ""
    },

}, {
    timestamps: true

});

const equipments = new mongoose.Schema({

    machineName: {
        type: String,
        default: ""
    },

    quanitity: {
        type: String,
        default: "",
    },

    photo: {
        type: String,
        default: ""
    },

    year: {
        type: String,
        default: ""
    },

    model: {
        type: String,
        default: ""
    },

    category: {
        type: String,
        default: ""
    },

    descripsion: {
        type: String,
        default: ""
    },
    unitPriceService: {
        type: String,
        default: ""
    },

    aplication: [conclusion]
});
module.exports = mongoose.model("Equipment", equipments);