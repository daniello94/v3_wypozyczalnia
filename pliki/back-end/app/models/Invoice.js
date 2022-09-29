const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });

const invoice = new mongoose.Schema({
    numberInvoice: {
        type: String,
        default: ""
    },

    dataClient: {
        firstName: {
            type: String,
            default: ""
        },
        lastName: {
            type: String,
            default: ""
        },
        numberId: {
            type: String,
            default: ""
        },
        typePerson: {
            type: String,
            default: ""
        },
        nameCompany: {
            type: String,
            default: ""
        },
        numberPhone: {
            type: String,
            default: ""
        },
    },

    dataCompany: {
        firstName: {
            type: String,
            default: "Paweł"
        },
        lastName: {
            type: String,
            default: "Kowalski"
        },
        numberId: {
            type: String,
            default: "734282332"
        },

        nameCompany: {
            type: String,
            default: "Machines S*^A"
        },
        numberPhone: {
            type: String,
            default: "+48 764536221"
        },
    },

    modelMachine: {
        type: String,
        default: ""
    },

    nameMachine: {
        type: String,
        default: ""
    },

    vat: {
        type: String,
        default: ""
    },

    unitPriceService: {
        type: String,
        default: ""
    },

    sumPriceService: {
        type: String,
        default: ""
    },

    lengthLease: {
        type: String,
        default: ""
    },

});
module.exports = mongoose.model("Invoice", invoice);