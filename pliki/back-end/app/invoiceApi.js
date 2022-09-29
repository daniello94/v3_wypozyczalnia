const express = require("express");
const router = express.Router();
 
const invoice = require('./controlelers/invoice.controleler');

router.post('/new', function (req, res) {
    invoice.add(req.body, function (err, invoice) {
        if (err) {
            res.status(404);
            res.json({
                error: "invoice not created"
            })
        } else {
            res.json(invoice)
        }
    })
});

module.exports = router