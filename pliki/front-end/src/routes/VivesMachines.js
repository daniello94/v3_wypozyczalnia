import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicer from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import style from "../style/VivesMachine.module.scss"
import Container from "../components/Container";
import Button from "../components/Button";
import Error from "../components/Error";


export default function VivesMachines(props) {
    const [status, setStatus] = useState([]);
console.log(status);
    const [oneMachine, setOneMachine] = useState({
        machineName: "",
        model: "",
        year: "",
        unitPriceService:"",
        aplication: []
    })

    function machineResponse(_id) {
        setOrder(_id)
    };

    const [order, setOrder] = useState("")
    const [error, setError] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [firstName, setFirstName] = useState(props.dataUser?.user.name);
    const [lastName, setLastName] = useState(props.dataUser?.user.lastName);
    const [phoneNumber, setPhoneNumber] = useState(props.dataUser?.user.phoneNumber);
    const [numberId, setNumberId] = useState("");
    const [typePerson, setTypePerson] = useState("");
    const [nameCompany, setNameCompany] = useState("");



    function listMachines() {
        axios.get('http://localhost:8080/machines/all')
            .then((res) => {
                setStatus(res.data)
            })
    };
    function vivesSendOrder(_id) {
        machineResponse()
        axios.get('http://localhost:8080/machines/' + _id)
            .then((res) => {
                setOneMachine(res.data)
            })
    };

    function viveOneMachine(_id) {
        if (!props.dataUser) {
            return alert("Musisz być zalogowany aby przjśc dalej :)")
        } else if (props.dataUser) {
            return vivesSendOrder(_id)
        }
    };

    function questionOrder(_id) {

        if (!firstName) {
            setError("wpisz imię")
            return
        } else if (!lastName) {
            setError("wpisz nazwisko")
            return

        } else if (!numberId) {
            setError("wpisz swój pesel")
            return

        } else if (numberId.length < 11) {
            setError("Podany numer pesel jest za krótki")
            return

        } else if (numberId.length > 11) {
            setError("Podany nuner Pesel jest zbyt długi")
            return

        } else if (/\D/.test(numberId)) {
            setError("Podałeś błędny znak")
            return

        } else if (!phoneNumber) {
            setError("Podaj numer kontaktowy")
            return
        } else {
            axios.put('http://localhost:8080/machines/addOrder/' + _id, {
                firstName,
                lastName,
                phoneNumber,
                numberId,
                startDate,
                endDate,
                nameCompany,
                typePerson
            })
                .then(() => {
                    setError(
                        <Error
                            isAlternative={true}>
                            Zgloszenie zostało wysąłane pomyśłnie
                        </Error>
                    )
                });
        }

    };

    useEffect(() => {
        listMachines()
    }, [])

    if (order === status._id) {

        return (
            <Container>
                <h3>
                    Zapytanie o wynajem {oneMachine.machineName} {oneMachine.model}
                </h3>
                <Error>{error}</Error>

                <form>
                    <label>
                        <span>
                            Moje Dane
                        </span>

                        <input
                            type="text"
                            placeholder="Imię"
                            name="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />

                        <input
                            type="text"
                            placeholder="Nazwisko"
                            name="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />

                        <input
                            type="text"
                            placeholder="Pesel"
                            name="numberId"
                            onChange={(e) => setNumberId(e.target.value)}
                            value={numberId}
                        />

                        <input
                            type="text"
                            placeholder="Wpisz numer kontaktowy"
                            name="phoneNumber"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                        />
                        <label>
                            <span>Rodaj faktury</span>
                            <select
                                type="text"
                                name="typePerson"
                                onChange={(e) => setTypePerson(e.target.value)}
                                value={typePerson}
                            >
                                <option>wybierz</option>
                                <option>Firma</option>
                                <option>Osoba prywatna</option>
                            </select>

                            {typePerson === "Firma" && (
                                <input
                                    type="text"
                                    placeholder="Podaj Nazwe Firmy"
                                    name="nameCompany"
                                    onChange={(e) => setNameCompany(e.target.value)}
                                    value={nameCompany}
                                />
                            )}
                        </label>
                    </label>

                    <label>
                        <span>
                            Czas wynajmu
                        </span>
                        <div>
                            <DatePicer
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </div>

                        <div>
                            <DatePicer
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                            />
                        </div>
                    </label>

                    <Button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault()
                            questionOrder(oneMachine._id)
                        }}>
                        Wyslij zapytanie
                    </Button>
                </form>

            </Container>
        )
    }
    return (

        <Container>

            {status.map(machine => {
                return (
                    <div className={style.machineContent} key={machine._id}>
                        <h3>
                            {machine.machineName}
                        </h3>
                        <img
                            src={'http://localhost:8080/foto/' + machine.photo}
                            alt="Fotomaszyna" />

                        <table className={style.vivesForm}>
                            <thead>
                                <tr>
                                    <td
                                        colSpan="2">
                                        Informacje
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Nazwa
                                    </td>
                                    <td>
                                        {machine.machineName}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Model
                                    </td>
                                    <td>
                                        {machine.model}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Dostępność
                                    </td>
                                    <td>
                                        {machine.quanitity} szt.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Cena za  24 h najmu
                                    </td>
                                    <td>
                                        {machine.unitPriceService} zł 
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Rok produkcji
                                    </td>
                                    <td>
                                        {machine.year}
                                    </td>
                                </tr>

                                <tr>
                                    <td
                                        className={style.theadContent}
                                        colSpan="2">
                                        Opis
                                    </td>

                                </tr>
                                <tr>
                                    <td
                                        colSpan="2">
                                        {machine.descripsion}
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                        <Button
                            onClick={() => viveOneMachine(machine._id)}>
                            Wynajmij
                        </Button>

                    </div>
                )
            })}

        </Container>
    )
};