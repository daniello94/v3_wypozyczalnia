import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import Container from "../components/Container";
import style from "../style/VivesOrder.module.scss"
import Button from "../components/Button";

export default function VivesOrder() {
    const [nameMachine, setNameMachine] = useState('');
    const [modelMachine, setModelMachine] = useState('');
    const [typePerson, setTypePerson] = useState("");
    const [lengthLease, setLengthLease] = useState('');
    const [unitPriceService, setUnitPriceService] = useState('');
    const [sumPriceService, setSumPriceService] = useState('');
    const [vat, setVat] = useState(valueVat2())
    const [status, setStatus] = useState([]);
    const [responseQuestion, setResponseQuestion] = useState('');
    const [aplicationId, setAplicationId] = useState("");
    const [oneMachinesStatus, setOneMachinesStatus] = useState({
        quanitity: "",
        aplication: []
    });
    console.log(lengthLease);

    function valueVat() {
        if (typePerson === "Firma") {
            return "0.08"
        } else if (typePerson === "Osoba prywatna") {
            return "0.23"
        }
    }

    function valueVat2() {
        if (valueVat() === "0.08") {
            return "8%"
        } else if (valueVat() === "0.23") {
            return "23%"
        }
    }

    function sumPriseAll() {
        let num1 = unitPriceService.toString()
        let num2 = lengthLease.toString()
        let sum = num1 * num2
        let newSum = sum * valueVat()
        let sumPriseAll = (sum += newSum).toString()
        return sumPriseAll.toString()
    }

    function viveResponseQuestion(_id) {
        setResponseQuestion(_id)
    };

    function oneMachines(_id) {
        axios.get('http://127.0.0.1:8080/machines/' + _id)
            .then((res) => {
                setOneMachinesStatus(res.data)
            })
    };

    function listMachines() {
        axios.get('http://localhost:8080/machines/all')
            .then((res) => {
                setStatus(res.data)
            })
    };

    function updateResponse(_id, dataInvoice, timeDifferenceInDays) {
        setLengthLease(timeDifferenceInDays)
        setVat(valueVat2())
        setSumPriceService(sumPriseAll())
        if (oneMachinesStatus.quanitity < 1) {
            return alert("Brak dostępnych maszyn")
        } else if (oneMachinesStatus.quanitity > 0) {

            const quanitity = (oneMachinesStatus.quanitity - 1).toString()


            axios.put('http://127.0.0.1:8080/machines/update/' + _id, {
                quanitity
            })
                .then(() => {
                    listMachines()
                    oneMachines(_id)
                })
            const oderStan = "Aktywny"
            axios.put('http://127.0.0.1:8080/machines/updateApplication/' + _id, {
                aplicationId,
                oderStan
            })
                .then(() => {
                    listMachines()
                    oneMachines(_id)

                })
          
            axios.post('http://127.0.0.1:8080/invoice/new', {
                dataClient: { ...dataInvoice },
                lengthLease,
                sumPriceService,
                unitPriceService,
                nameMachine,
                modelMachine,
                vat
            })
            console.log('wysłano fakture');
            return
        }

    };

    function updateResponseFinish(_id) {
        const newQaunity = Number(oneMachinesStatus.quanitity)
        const quanitity = (newQaunity + 1).toString()

        axios.put('http://127.0.0.1:8080/machines/update/' + _id, {
            quanitity
        })
            .then(() => {
                listMachines()
                oneMachines(_id)
            })
        const oderStan = "Zakończony"
        axios.put('http://127.0.0.1:8080/machines/updateApplication/' + _id, {
            aplicationId,
            oderStan
        })
            .then(() => {
                listMachines()
                oneMachines(_id)

            })
    };

    function updateResponseReject(_id) {
        const oderStan = "Odzrucony"
        axios.put('http://127.0.0.1:8080/machines/updateApplication/' + _id, {
            aplicationId,
            oderStan
        })
            .then(() => {
                listMachines()
                oneMachines(_id)

            })
    };

    function idObjectArray(_id) {
        setAplicationId(_id)
    };

    useEffect(() => {
        listMachines();
    }, []);


    if (responseQuestion === status._id) {
        return (

            <Container>

                <div className={style.contentVivesOrder} key={oneMachinesStatus._id}>
                    <h3>
                        {oneMachinesStatus.machineName}
                    </h3>
                    <table>
                        <thead>
                            <tr>
                                <td
                                    colSpan="9">
                                    Dane maszyny
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={style.heder}>
                                <td colSpan="3">
                                    Nazwa
                                </td>
                                <td colSpan="3">
                                    Model
                                </td>
                                <td colSpan="3">
                                    Dostępność
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="3">
                                    {oneMachinesStatus.machineName}
                                </td>
                                <td colSpan="3">
                                    {oneMachinesStatus.model}
                                </td>
                                <td colSpan="3">
                                    {oneMachinesStatus.quanitity} szt.
                                </td>

                            </tr>
                            <tr className={style.hederTwo}>
                                <td colSpan="9" >
                                    Aplikacje
                                </td>
                            </tr>
                            <tr className={style.heder}>
                                <td>
                                    Imię
                                </td>
                                <td>
                                    Nazwisko
                                </td>
                                <td>
                                    Numer Pesel
                                </td>
                                <td>
                                    Numer kontaktowy
                                </td>
                                <td>
                                    Data rozpoczęcia wynajmu
                                </td>
                                <td>
                                    Data zakończenia wynajmu
                                </td>
                                <td>
                                    Status
                                </td>
                                <td>
                                    Akcje
                                </td>
                            </tr>

                            {oneMachinesStatus.aplication.map((order) => {
                                if (order._id === aplicationId) {

                                    let date1 = moment(order.startDate).format('YYYY ,MM ,DD')
                                    let date2 = moment(order.endDate).format('YYYY,MM,DD')

                                    date1 = date1.split(',');
                                    date2 = date2.split(',');

                                    date1 = new Date(date1[0], date1[1], date1[2]);
                                    date2 = new Date(date2[0], date2[1], date2[2]);

                                    const date1_unixtime = parseInt(date1.getTime() / 1000);
                                    const date2_unixtime = parseInt(date2.getTime() / 1000);

                                    var timeDifference = date2_unixtime - date1_unixtime;

                                    var timeDifferenceInHours = timeDifference / 60 / 60;

                                    var timeDifferenceInDays = timeDifferenceInHours / 24;

                                    const dataInvoice = {
                                        firstName: order.firstName,
                                        lastName: order.lastName,
                                        numberId: order.numberId,
                                        numberPhone: order.phoneNumber,
                                        typePerson: order.typePerson,

                                    }

                                    return (
                                        <tr key={order._id}>
                                            <td>
                                                {order.firstName}
                                            </td>
                                            <td>
                                                {order.lastName}
                                            </td>
                                            <td>
                                                {order.numberId}
                                            </td>
                                            <td>
                                                {order.phoneNumber}
                                            </td>
                                            <td>
                                                {moment(order.startDate).format('DD/MM/YYYY')}
                                            </td>
                                            <td>
                                                {moment(order.endDate).format('DD/MM/YYYY')}
                                            </td>
                                            <td
                                                className={order.oderStan === "Aktywny" ? style.active : "" || order.oderStan === "Zakończony" ? style.finish : "" || order.oderStan === "Odzrucony" ? style.reject : "" || order.oderStan === "Oczekujący" ? style.pending : ""}>
                                                {order.oderStan}
                                            </td>
                                            <td
                                                className={style.updateResponse}>
                                                {order.oderStan !== 'Aktywny' && order.oderStan !== 'Zakończony' && (
                                                    <Button
                                                        onClick={() => updateResponse(oneMachinesStatus._id, dataInvoice)}>
                                                        Akceptuj
                                                    </Button>
                                                )}

                                                <Button
                                                    onClick={() => {
                                                        updateResponse(oneMachinesStatus._id, dataInvoice, timeDifferenceInDays)

                                                    }}>
                                                    Przycisk testowy linia 281
                                                </Button>

                                                {order.oderStan !== 'Zakończony' && order.oderStan !== 'Odzrucony' && order.oderStan !== 'Oczekujący' && (
                                                    <Button
                                                        onClick={() => updateResponseFinish(oneMachinesStatus._id)}>
                                                        Zakończ
                                                    </Button>
                                                )}

                                                {order.oderStan === 'Oczekujący' && (
                                                    <Button
                                                        onClick={() => updateResponseReject(oneMachinesStatus._id)}>
                                                        Odrzuć
                                                    </Button>
                                                )}

                                            </td>
                                        </tr>

                                    )
                                }

                            })}

                        </tbody>
                    </table>

                    <Button
                        onClick={() => setResponseQuestion('')}>
                        Wróć
                    </Button>
                </div>

            </Container>
        )
    }
    return (
        <Container>
            {status.map(machine => {
                console.log(machine);
                return (
                    <div className={style.contentVivesOrder} key={machine._id}>
                        <h3>
                            {machine.machineName}
                        </h3>
                        <table >
                            <thead>
                                <tr>
                                    <td
                                        colSpan="9">
                                        Dane maszyny
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={style.heder}>
                                    <td colSpan="3">
                                        Nazwa
                                    </td>
                                    <td colSpan="3">
                                        Model
                                    </td>
                                    <td colSpan="3">
                                        Dostępność
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan="3">
                                        {machine.machineName}
                                    </td>
                                    <td colSpan="3">
                                        {machine.model}
                                    </td>
                                    <td colSpan="3">
                                        {machine.quanitity} szt.
                                    </td>

                                </tr>
                                <tr className={style.hederTwo}>
                                    <td colSpan="9" >
                                        Aplikacje
                                    </td>
                                </tr>
                                <tr className={style.heder}>
                                    <td>
                                        Imię
                                    </td>
                                    <td>
                                        Nazwisko
                                    </td>
                                    <td>
                                        Numer Pesel
                                    </td>
                                    <td>
                                        Numer kontaktowy
                                    </td>
                                    <td>
                                        Data rozpoczęcia wynajmu
                                    </td>
                                    <td>
                                        Data zakończenia wynajmu
                                    </td>
                                    <td>
                                        Status
                                    </td>
                                    <td>
                                        Akcje
                                    </td>
                                </tr>
                                {machine.aplication.map((order) => {

                                    return (
                                        <tr key={order._id}>
                                            <td>
                                                {order.firstName}
                                            </td>
                                            <td>
                                                {order.lastName}
                                            </td>
                                            <td>
                                                {order.numberId}
                                            </td>
                                            <td>
                                                {order.phoneNumber}
                                            </td>
                                            <td>
                                                {moment(order.startDate).format('DD/MM/YYYY')}
                                            </td>
                                            <td>
                                                {moment(order.endDate).format('DD/MM/YYYY')}
                                            </td>

                                            <td className={order.oderStan === "Aktywny" ? style.active : "" || order.oderStan === "Zakończony" ? style.finish : "" || order.oderStan === "Odzrucony" ? style.reject : "" || order.oderStan === "Oczekujący" ? style.pending : ""} >
                                                {order.oderStan}
                                            </td>
                                            <td>
                                                <Button onClick={() => {
                                                    idObjectArray(order._id)
                                                    viveResponseQuestion(status._id)
                                                    oneMachines(machine._id)
                                                    setTypePerson(order.typePerson)
                                                    setUnitPriceService(machine.unitPriceService)
                                                    setModelMachine(machine.model)
                                                    setNameMachine(machine.machineName)
                                                }}>Odpowiedz</Button>
                                            </td>
                                        </tr>

                                    )
                                })}

                            </tbody>

                        </table>

                    </div>
                )
            })}
        </Container>
    )
};