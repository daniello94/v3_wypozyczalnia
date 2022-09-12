import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import Container from "../components/Container";
import Button from "../components/Button";
import style from "../style/LoginClient.module.scss";
import Error from "../components/Error";

const validateLogin = (form) => {
    if (!form.email) {
        return "wpisz login";
    }
};

const validatePassword = (form) => {
    if (!form.password) {
        return "wpisz hasło";
    }
};

const validate = (form) => {

    if (form.email !== form.data) {
        return "Hasło bądź nazwa urzytkownika są nieprawidłowe";
    }
};

export default function LoginEmployee(props) {
    const [error, setError] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const userSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/employe/login", {
                email: email,
                password: password,
            })
            .then((req) => {
                if (!req.data.success) {
                    const errorss = validate(form);
                    const errorLogin = validateLogin(form);
                    const errorPassword = validatePassword(form);
                    if (errorss) {
                        setErrorLogin(errorLogin);
                        setErrorPassword(errorPassword);
                        setError(errorss);
                        e.preventDefault();
                        return;
                    }
                } else {
                    props.setUser(req.data);
                    localStorage.setItem("user", JSON.stringify(req.data));
                }
            });
    };

    let stateLogin = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const { email, password } = form;
    return (
        <Container>
            {props.userData && <Navigate to={`/myData/${props.userData.user._id}`} />}
            <h1>
                Strefa logowania pracownika
            </h1>
            <Error>
                {error}
            </Error>

            <form className={style.form} onSubmit={userSubmit}>
                <input
                    type="text"
                    value={email}
                    onChange={stateLogin}
                    name="email"
                    placeholder="Podaj Login"
                />
                <Error>{errorLogin}</Error>

                <input
                    type="password"
                    value={password}
                    name="password"
                    onChange={stateLogin}
                    placeholder="Podaj Hasło"
                />
                <Error>
                    {errorPassword}
                </Error>
                <Button type="submit">Zaloguj</Button>
            </form>
        </Container>
    );
};