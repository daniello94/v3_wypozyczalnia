const Invoice = require('../models/Invoice');

function invoiceAdd(data, cb) {
    let newInvoice = new Invoice(data);
    newInvoice.save(function (err, equipment) {
        if (err) {
            cb(err)
        } else {
            cb(null, equipment)
        }
    })
};

module.exports={
    add:invoiceAdd
}