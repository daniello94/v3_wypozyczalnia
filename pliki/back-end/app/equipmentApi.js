const express = require("express");
const router = express.Router();
const equipment = require("./controlelers/equipments.controler");

const multer = require('multer');
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'fotoEquipment')
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

router.post('/addEquipment', upload.single('photo'), function (req, res) {

    const machineName = req.body.machineName;
    const photo = req.file.filename;
    const quanitity = req.body.quanitity;
    const year = req.body.year;
    const model = req.body.model;
    const mileage = req.body.mileage;
    const category = req.body.category;
    const descripsion = req.body.descripsion;
    const unitPriceService = req.body.unitPriceService

    const newEqupimentData = {
        machineName,
        photo,
        quanitity,
        year,
        model,
        mileage,
        category,
        descripsion,
        unitPriceService

    };

    equipment.add(newEqupimentData, function (err, files) {
        if (err) {
            res.status(404);
            res.json({
                error: "Not created"
            })
        } else {
            res.json(files)
        }
    })
});

router.get("/all", function (req, res) {
    equipment.list(function (err, equipments) {
        if (err) {
            res.status(404);
            res.json({
                error: "Not found"
            });
        } else {
            res.json(equipments)
        }
    })
});

router.get('/:id', function (req, res) {
    equipment.one(req.params.id, function (err, equipment) {
        if (err) {
            res.status(404);
            res.json({
                error: "Order not found"
            })
        } else {
            res.json(equipment)
        }
    })
});

router.get('/response/:id', function (req, res) {
    equipment.response(req.params.id, function (err, equipment) {
        if (err) {
            res.status(404);
            res.json({
                error: "Order not found"
            })
        } else {
            res.json(equipment)
        }
    })
});

router.put('/addOrder/:id', function (req, res) {
    equipment.order([req.params.id, req.body], function (err, equipments) {
        if (err) res.send(err)
        res.json(equipments)
    })
});

router.put('/update/:id', function (req, res) {
    equipment.update(req.params.id, req.body, function (err, data) {
        if (err) {
            res.status(404);
            res.json({
                error: "not found"
            })
        } else {
            res.json(data)
        }
    })
});

router.put('/updateApplication/:id', function (req, res) {
    equipment.application(req.params.id, req.body, function (err, data) {
        if (err) {
            res.status(404);
            res.json({
                error: "not found"
            })
        } else {
            res.json(data)
        }
    })
});

module.exports = router;