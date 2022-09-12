import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import style from "../style/SignUpClient.module.scss";
import Container from "../components/Container";
import Button from "../components/Button";
import Error from "../components/Error";

const validate = (form) => {
    if (!form.name) {
        return "Wpisz swoje imię"
    } else if (form.name.length < 3) {
        return "Podaj prawdziwe imię"
    };

    if (!form.lastName) {
        return "Wpisz swoje nazwisko"
    };

    if (!form.phoneNumber) {
        return "Wpisz swoj numer telefonu"
    } else if (form.phoneNumber.length < 9) {
        return "Podeany numer jest za któtki"
    } else if (/\D/.test(form.phoneNumber)) {
        return "Podałeś błędny znak."
    };

    if (!form.email) {
        return "Wpisz swoj email"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
        return "Podaj poprawny email"
    };

    if (!form.password) {
        return "Wpisz hasło"
    } else if (form.password.length < 6) {
        return "Hasło musi zawierać minimum 6 znaków"
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(form.password)) {
        return "Hasło musi zawierać znak specjalny np: @ ! # & % $"
    } else if (!/^[^\s]*$/.test(form.password)) {
        return "Hasło nie może zawierać pustych znaków"
    }

    if (!form.repPassword) {
        return "Powtórz haslo"
    } else if (form.repPassword !== form.password) {
        return "Podane hasła nie są identyczne"
    };
};

export default function SignUpClient() {
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        email: "",
        password: "",
        repPassword: "",
        phoneNumber: "",
        name: "",
        lastName: ""
    });

    const RejestracionClient = (e) => {
        e.preventDefault();
        const errorss = validate(form)
        if (errorss) {
            setError(errorss);
            return
        } else {
            const {
                email,
                password,
                repPassword,
                phoneNumber,
                name,
                lastName
            } = form

            axios.post('http://localhost:8080/client/signup', {
                email,
                password,
                repPassword,
                phoneNumber,
                name,
                lastName
            })
                .then(() => {
                    setError(<Error isAlternative={true}>
                        Witaj na pokładzie rejestracja przebiegła pomyśłnie <Link to="/client">Zaloguj się</Link>
                    </Error>)
                })
            setForm({
                email: "",
                password: "",
                repPassword: "",
                phoneNumber: "",
                name: "",
                lastName: ""
            })
        }
    };

    let stateClient = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const {
        email,
        password,
        repPassword,
        phoneNumber,
        name,
        lastName
    } = form
    return (
        <Container>

            <h1>
                Rejestracja Klijenta
            </h1>

            <Error>
                {error}
            </Error>

            <form className={style.formContent}>

                <input
                    onChange={stateClient}
                    value={name}
                    type="text"
                    name="name"
                    placeholder="Podaj swoje imię"
                />

                <input
                    onChange={stateClient}
                    value={lastName}
                    type="text"
                    name="lastName"
                    placeholder="Podaj swoje nazwisko"
                />

                <input
                    onChange={stateClient}
                    value={phoneNumber}
                    type="text"
                    name="phoneNumber"
                    placeholder="Podaj numer kontaktowy"
                />

                <label>

                    <span>
                        Dane konta
                    </span>

                    <input
                        onChange={stateClient}
                        value={email} type="email"
                        name="email"
                        placeholder="Podaj swoój email"
                    />

                    <input
                        onChange={stateClient}
                        value={password}
                        type="password"
                        name="password"
                        placeholder="Podaj hasło"
                    />

                    <input
                        onChange={stateClient}
                        value={repPassword}
                        type="password"
                        name="repPassword"
                        placeholder="Powtórz hasło hasło"
                    />

                </label>

                <Button
                    type="submit"
                    onClick={RejestracionClient}>
                    Zarejestruj
                </Button>

            </form>

        </Container>
    )
};