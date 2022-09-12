const Equipment = require("../models/Equipment");

function equipmentAdd(data, cb) {
    let newEquipment = new Equipment(data);
    newEquipment.save(function (err, equipment) {
        if (err) {
            cb(err)
        } else {
            cb(null, equipment)
        }
    })
};

function listEquipment(cb) {
    Equipment.find().lean().exec(function (err, equipment) {
        if (err) {
            cb(err)
        } else {
            cb(null, equipment)
        }
    })
};

function equipmentOne(id, cb) {
    Equipment.findById(id).exec(function (err, equipment) {
        if (err) {
            cb(err)
        } else {
            cb(null, equipment)
        }
    })
};

function orderAdd(data, cb) {
    Equipment.updateOne(
        { _id: data[0] },
        { $push: { aplication: data[1] } },
        function (err, equipments) {
            if (err) {
                cb(err)
            } else {
                cb(null, equipments)
            }

        }
    )
};

function updateEquipment(id, data, cb) {
    Equipment.updateOne(
        { _id: id },
        data,
        function (err, equipment) {
            if (err) {
                cb(err)
            } else {
                cb(null, equipment)
            }
        })
};

function updateApplication(id, data, cb) {
    Equipment.updateOne(
        { _id: id, "aplication._id":data.aplicationId},
        { $set: { "aplication.$.oderStan": data.oderStan } },
        function (err, equipment) {
            if (err) {
                cb(err)
            } else {
                cb(null, equipment)
            }
        }
    )
};


module.exports = {
    add: equipmentAdd,
    list: listEquipment,
    one: equipmentOne,
    order: orderAdd,
    update: updateEquipment,
    application: updateApplication
}