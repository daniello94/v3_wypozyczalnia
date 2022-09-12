const Employee = require('../models/Employees');
const bcrypt = require('bcrypt');

function employeesAdd(data, cb) {
    let newEmployee = new Employee(data);

    newEmployee.save(function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user);
        }
    })
};

function employeeLogin(data, cb) {
    Employee.findOne({ email: data.email }).exec(function (err, user) {
        if (err) {
            cb(err);
            return
        }
        if (!user) {
            cb(null, user)
            return
        };
        bcrypt.compare(data.password, user.password, function (err, logged) {
            if (err) {
                cb(err)
            } if (logged) {
                const token = user.generateAuthToken();
                cb(null, user, token);
            } else {
                cb(null, null)
            }
        })
    })
};
function employeeGet(id, cb) {
    Employee.findById(id).exec(function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

function employeesDelate(id, cb) {
    Employee.deleteOne({ _id: id }, function (err, user) {
        if (err) {
            cb(err)
        } else {
            cb(null, user)
        }
    })
};

function employeeList(cb) {
    Employee.find().lean().exec(function (err, users) {
        if (err) {
            cb(err)
        } else {
            cb(null, users)
        }
    })
};



module.exports = {
    addEmployee: employeesAdd,
    loginEmployee: employeeLogin,
    getEmployee:employeeGet,
    delateEmployee:employeesDelate,
    listEmployee:employeeList
};