import React, { useState } from "react";
import axios from "axios";

import style from "../style/SignUpEmployee.module.scss"
import Container from "../components/Container";
import Button from "../components/Button";
import Error from "../components/Error";

const validate = (form) => {
    if (!form.photo) {
        return "Dodaj zdjęcie"
    }
    if (!form.name) {
        return "Wpisz imię pracownika"
    } else if (form.name.length < 3) {
        return "Podaj prawdziwe imię"
    };

    if (!form.lastName) {
        return "Wpisz nazwisko pracownika"
    };

    if (!form.phoneNumber) {
        return "Wpisz numer telefonu"
    } else if (form.phoneNumber.length < 9) {
        return "Podany numer jest za któtki"
    } 

    if (!form.email) {
        return "Wpisz email"
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
    };

    if (!form.repPassword) {
        return "Powtórz haslo"
    } else if (form.repPassword !== form.password) {
        return "Podane hasła nie są identyczne"
    };
};

export default function SignUpEmployee() {
    const [isActive, setActive] = useState("close")
    const [baseImage, setBaseImage] = useState('')
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        email: "",
        password: "",
        repPassword: "",
        phoneNumber: "",
        name: "",
        lastName: "",
        photo: ""
    });

    const addEmployee = (e) => {
        e.preventDefault();
        const fault = validate(form)

        if (fault) {
            setError(fault);
            return
        } else {
            const {
                email,
                password,
                repPassword,
                phoneNumber,
                name,
                lastName,
                photo
            } = form

            const formData = new FormData();
            formData.append("name", name);
            formData.append("photo", photo);
            formData.append("email", email);
            formData.append("lastName", lastName,);
            formData.append("phoneNumber", phoneNumber);
            formData.append("password", password,);
            formData.append("repPassword", repPassword);

            axios.post('http://localhost:8080/employe/signup', formData)
                .then(() => {
                    setError(
                        <Error
                            isAlternative={true}>
                            Dodałeś pracownika
                        </Error>)
                })
            setForm({
                email: "",
                password: "",
                repPassword: "",
                phoneNumber: "",
                name: "",
                lastName: "",
                photo: ""
            })
        }
    };

    const handlePhoto = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file);
        setBaseImage(base64);
        onOpen()


        setForm({
            ...form,
            photo: e.target.files[0],
        })
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                resolve(fileReader.result)
            };

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    };

    const onOpen = () => {
        setActive('open')
    };

    let stateEmployee = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    };

    const {
        email,
        password,
        repPassword,
        phoneNumber,
        name,
        lastName,
    } = form

    return (
        <Container>

            <Error>
                {error}
            </Error>

            <form
                encType="multipart/form-data"
                className={style.formConntent}>

                <label>

                    <span>
                        Dane Personalne Pracownika
                    </span>

                    <div
                        className={style[isActive]}>
                        <img
                            src={baseImage}
                            alt="Brak Zdjecia"
                        />
                    </div>

                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={handlePhoto}
                    />

                    <input
                        onChange={stateEmployee}
                        value={name}
                        type="text"
                        name="name"
                        placeholder="Podaj imie pracownika"
                    />

                    <input
                        onChange={stateEmployee}
                        value={lastName}
                        type="text"
                        name="lastName"
                        placeholder="Podaj nazwisko pracownika"
                    />

                    <input
                        onChange={stateEmployee}
                        value={phoneNumber}
                        type="text"
                        name="phoneNumber"
                        placeholder="Podaj numer telefonu pracownika"
                    />

                </label>

                <label>

                    <span>
                        Dane konta pracownika
                    </span>

                    <input
                        onChange={stateEmployee}
                        value={email}
                        type="email"
                        name="email"
                        placeholder="Podaj email"
                    />

                    <input
                        onChange={stateEmployee}
                        value={password}
                        type="password"
                        name="password"
                        placeholder="Podaj hasło"
                    />

                    <input
                        onChange={stateEmployee}
                        value={repPassword}
                        type="password"
                        name="repPassword"
                        placeholder="Powtórz hasło"
                    />

                </label>

                <Button
                    type="submit"
                    onClick={addEmployee}>
                    Zarejestruj
                </Button>

            </form>

        </Container>
    )
};