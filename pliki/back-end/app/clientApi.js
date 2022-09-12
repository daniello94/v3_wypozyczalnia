const express = require('express');
const router = express.Router();
const client = require('../app/controlelers/client.controleler');
path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');


router.post('/signup', function (req, res) {

    client.addClient(req.body, function (err, user) {
        if (err) {
            res.status(404);
            res.json({
                error: "cilient not created"
            })
        } else {
            res.json(user)
        }
    })
});

router.post('/login', function (req, res) {
    client.loginClient(req.body, function (err, loggedClient, token = '') {
        if (err) {
            res.status(404);
            res.json({
                error: 'Client not logged'
            })
        } else if (token) {
            res.json({ success: true, user: loggedClient, jwt: token })
        } else {
            res.json({ success: false, message: 'username or password do not match' })
        }
    })
});

router.get('/:id', function (req, res) {
    client.getClient(req.params.id, function (err, user) {
        if (err) {
            res.status(404);
            res.json({
                error: 'User not found'
            })
        } else {
            res.json(user)
        }
    })
});

router.delete('/delate/:id', function (req, res) {
    client.deleteClient(req.params.id, function (err, data) {
        if (err) {
            res.status(404);
            res.json({
                error: "Client not found"
            })
        } else {
            res.json(data)
        }
    })
});

router.post('/clientAll', function (req, res) {
    client.listClient(function (err, users) {
        if (err) {
            res.status(404);
            res.json({
                error: "Clients not found"
            });
        } else {
            res.json(users)
        }
    })
});

router.post('/send-email', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.ADDRESS_EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
    let mailOptions = {
        from: process.env.ADDRESS_EMAIL,
        userName: req.body.userName,
        userLastName: req.body.userLastName,
        userEmail:req.body.userEmail,
        message: req.body.message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
    });
});

module.exports = router;