require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const apiClient = require('./app/clientApi');
const apiEmployee = require('./app/employeeApi');
const equipments = require('./app/equipmentApi');

const config = {
    origin: 'http://' + process.env.DB_HOST
};

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/fotoProfile", express.static("images"));
app.use("/foto", express.static("fotoEquipment"));
app.set('view engine', 'ejs');


app.use('/client', apiClient);
app.use('/employe', apiEmployee);
app.use('/machines',equipments);

app.get("/", cors(config), function (req, res) {
    res.status(219).json("Wypożyczalnia sprzetu")
});

app.listen(process.env.PORT, function () {
    console.log(`Serwer serwisu Wypożyczalnia sprzętu na porcie ${process.env.PORT} działa poprawnie`);
});
