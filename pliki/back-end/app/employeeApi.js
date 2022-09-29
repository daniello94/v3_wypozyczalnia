const express = require('express');
const router = express.Router();
const employee = require('../app/controlelers/employees.controler');

const multer = require('multer');
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

let upload = multer({ storage, fileFilter })

router.post('/signup', upload.single('photo'), function (req, res) {

    const name = req.body.name;
    const photo = req.file.filename;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;

    const newEmployeeData = {
        name,
        photo,
        email,
        password,
        role,
        lastName,
        phoneNumber,
    };

    employee.addEmployee(newEmployeeData, function (err, user) {
        if (err) {
            res.status(404);
            res.json({
                error: "Employee not created"
            })
        } else {
            res.json(user)
        }
    })
});


router.post('/login', function (req, res) {
    employee.loginEmployee(req.body, function (err, loggedEmployee, token = '') {
        if (err) {
            res.status(404);
            res.json({
                error: 'Employee not logged'
            })
        } else if (token) {
            res.json({ success: true, user: loggedEmployee, jwt: token })
        } else {
            res.json({ success: false, message: 'username or password do not match' })
        }
    })
});

router.get('/:id', function (req, res) {
    employee.getEmployee(req.params.id, function (err, user) {
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
    employee.delateEmployee(req.params.id, function (err, data) {
        if (err) {
            res.status(404);
            res.json({
                error: "Employee not found"
            })
        } else {
            res.json(data)
        }
    })
});

router.post('/all', function (req, res) {
    employee.listEmployee(function (err, users) {
        if (err) {
            res.status(404);
            res.json({
                error: "Employees not found"
            });
        } else {
            res.json(users)
        }
    })
});


module.exports = router;