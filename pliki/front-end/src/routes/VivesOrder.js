import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import Container from "../components/Container";
import style from "../style/VivesOrder.module.scss"
import Button from "../components/Button";

export default function VivesOrder() {
    const [status, setStatus] = useState([]);
    const [responseQuestion, setResponseQuestion] = useState('');
    const [aplicationId, setAplicationId] = useState("");
    const [oneMachinesStatus, setOneMachinesStatus] = useState({
        quanitity: "",
        aplication: []
    });

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

    function updateResponse(_id) {
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
        listMachines()
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
                                                        onClick={() => updateResponse(oneMachinesStatus._id)}>
                                                        Akceptuj
                                                    </Button>
                                                )}
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