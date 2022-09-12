import React, { useEffect, useState } from "react";
import axios from "axios";

import style from "../style/ListData.module.scss"
import Container from "../components/Container";
import Button from "../components/Button";

export default function ListData() {
    const [client, setClient] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [view, setView] = useState("");

    function viewDelate(_id) {
        setView(_id)
    };

    function viveClient() {
        axios.post('http://127.0.0.1:8080/client/clientAll')
            .then((res) => {
                setClient(res.data)
            })
    };

    function viveEmployee() {
        axios.post('http://127.0.0.1:8080/employe/all')
            .then((res) => {
                setEmployee(res.data)
            })
    };

    function delateClient(_id) {
        axios.delete('http://127.0.0.1:8080/client/delate/' + _id)
            .then(() => {
                viveClient()
            })
    };

    function delateEmployee(_id){
        axios.delete('http://127.0.0.1:8080/employe/delate/' + _id)
        .then(() => {
            viveEmployee();
        })
    };

    useEffect(() => {
        viveClient();
        viveEmployee();
    }, []);

    return (
        <Container>
            <h1>
                Użytkownicy serwisu
            </h1>
            <table>
                <thead>
                    <tr>
                        <td colSpan="5">
                            Lista Klientów
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr className={style.tbodyHead}>
                        <td>
                            Imię
                        </td>
                        <td>
                            Nazwisko
                        </td>
                        <td>
                            Email
                        </td>
                        <td>
                            Numer Telefonu
                        </td>
                        <td>
                            Akcje
                        </td>
                    </tr>
                    {client.map((clients => {
                        if (view === clients._id) {
                            return (
                                <tr key={clients._id}>
                                    <td>
                                        {clients.name}
                                    </td>
                                    <td>
                                        {clients.lastName}
                                    </td>
                                    <td>
                                        {clients.email}
                                    </td>
                                    <td>
                                        {clients.phoneNumber}
                                    </td>
                                    <td className={style.viewQuestionDelate}>
                                        <span>
                                            Jesteś pewien?
                                        </span>
                                        <div>
                                            <Button onClick={() => delateClient(clients._id)}>
                                                Tak
                                            </Button>
                                            <Button onClick={(() => setView(""))}>
                                                Nie
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        return (
                            <tr key={clients._id}>
                                <td>
                                    {clients.name}
                                </td>
                                <td>
                                    {clients.lastName}
                                </td>
                                <td>
                                    {clients.email}
                                </td>
                                <td>
                                    {clients.phoneNumber}
                                </td>
                                <td>
                                    <Button onClick={(() => viewDelate(clients._id))}>
                                        Usuń
                                    </Button>
                                </td>
                            </tr>
                        )
                    }))}
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <td colSpan='5'>
                            Lista Pracowników
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr className={style.tbodyHead}>
                        <td>
                            Imię
                        </td>
                        <td>
                            Nazwisko
                        </td>
                        <td>
                            Email
                        </td>
                        <td>
                            Numer Telefonu
                        </td>
                        <td>
                            Akcje
                        </td>
                    </tr>
                    {employee.map((employees => {
                        if (view === employees._id) {
                            return (
                                <tr key={employees._id}>
                                    <td>
                                        {employees.name}
                                    </td>
                                    <td>
                                        {employees.lastName}
                                    </td>
                                    <td>
                                        {employees.email}
                                    </td>
                                    <td>
                                        {employees.phoneNumber}
                                    </td>
                                    <td className={style.viewQuestionDelate}>
                                        <span>
                                            Jesteś pewien?
                                        </span>
                                        <div>
                                            <Button onClick={() => delateEmployee(employees._id)}>
                                                Tak
                                            </Button>

                                            <Button onClick={(() => setView(""))}>
                                                Nie
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        return (
                            <tr key={employees._id}>
                                <td>
                                    {employees.name}
                                </td>
                                <td>
                                    {employees.lastName}
                                </td>
                                <td>
                                    {employees.email}
                                </td>
                                <td>
                                    {employees.phoneNumber}
                                </td>
                                <td>
                                    <Button onClick={(() => viewDelate(employees._id))}>
                                        Usuń
                                    </Button>
                                </td>
                            </tr>
                        )
                    }))}
                </tbody>
            </table>
        </Container >
    )
};