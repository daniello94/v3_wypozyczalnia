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

    let contentHtml =

        `<html>
            <head>
                <style>
                    table{
                        border:1px solid black;
                    }
                    table thead{
                        text-align: center;
                        font-size: 20px;
                        font-weight: bold;
                        }

                    table thead tr td{
                        border:1px solid black;    
                    }

                    table tbody tr td{
                        border:1px solid black;  
                        font-size: 15px;
                        font-weight: bold;  
                    }

                    .headTbody{
                        color:red;
                    }
                </style>
            </head>
            <body>
                <h1> Otrzymałeś wiadomość od ${req.body.userName}</h1> 
                <br/>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <td colSpan="2">
                                Dane Nadawcy
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Imię
                            </td>
                            <td>
                                ${req.body.userName}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Nazwisko
                            </td>
                            <td>
                                ${req.body.userLastName}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Email
                            </td>
                            <td>
                                ${req.body.userEmail}
                            </td>
                        </tr>
                        <tr>
                            <td className="headTbody">
                                Treść wiadomości
                            </td>
                        </tr>
                        <tr>
                            <td>
                                ${req.body.textarea}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p> Załączniku zanjdują sie dalsze infoormacje</p>
            </body>
        </html>
        `

    let contentAttachments =
        `Witaj!
Urzytkownik ${req.body.userName} ${req.body.userLastName}, którego adres email to ${req.body.userEmail} napisał:
${req.body.textarea}`

    let mailOptions = {
        to: process.env.ADDRESS_EMAIL,
        from: "<wiad@op.pl>",
        subject: req.body.subject,
        html: contentHtml,
        attachments: [
            {
                filename: 'fileName.txt',
                content: contentAttachments
            }]
    };

    console.log(req.body);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.json("wysłano");
    });
});

module.exports = router;