import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import style from "../style/MyData.module.scss";
import Container from "../components/Container";

export default function MyData(props, _id) {

    const [status, setStatus] = useState({
        name: "",
        lastName: "",
        classNr: "",
        email: "",
        role: "",
        photo: "",
        phoneNumber: ""
    });

    let { id } = useParams();

    function userState() {
        if (props.userData.user.role === "client") {
            return "client"
        } else if (props.userData.user.role === "employe") {
            return "employe"
        } else if (props.userData.user.role === "admin") {
            return "employe"
        }
    };

    function oneUser(id) {
        axios.get(`http://localhost:8080/${userState()}/` + id)
            .then((res) => {
                setStatus(res.data)
            })
    };

    function fotoView() {
        if (props.userData.user.role === "client") {
            return "employe"
        } else if (props.userData.user.role === "employe") {
            return "employe"
        } else if (props.userData.user.role === "admin") {
            return "admin"
        }

    };

    useEffect(() => {
        oneUser(id)
    }, [id]);

    return (
        <Container>

            <h1>
                Witaj {status.name} na pokładzie
            </h1>

            <Container isAlternative={true}>

                {props.userData.user.role === fotoView() && status.photo && (
                    <div className={style.fotoMyData}>
                        <img
                            src={'http://localhost:8080/fotoProfile/' + status.photo}
                            alt="foto profil" />
                    </div>
                )}

                <table className={style.myDataTable} >

                    <thead>
                        <tr>
                            <td colSpan="2">
                                Dane personalne
                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td
                                className={style.designation}>
                                Imię
                            </td>
                            <td>
                                {status.name}
                            </td>
                        </tr>

                        <tr>
                            <td
                                className={style.designation}>
                                Nazwisko
                            </td>
                            <td>
                                {status.lastName}
                            </td>
                        </tr>

                        <tr>
                            <td
                                className={style.designation}>
                                Email
                            </td>
                            <td>
                                {status.email}
                            </td>
                        </tr>

                        <tr>
                            <td
                                className={style.designation}>
                                Numer Telefonu
                            </td>
                            <td>
                              {status.phoneNumber}
                            </td>
                        </tr>

                    </tbody>

                </table>

            </Container>

        </Container>
    )
};