import React, { useState } from "react";
import axios from "axios";

import Container from "../components/Container";
import Error from "../components/Error";
import Button from "../components/Button";
import style from "../style/Machines.module.scss"

const validate = (form) => {
    if (!form.photo) {
        return "Dodaj zdjęcie"
    };

    if (!form.machineName) {
        return "Dodaj nazwe przedmiotu"
    };

    if (!form.quanitity) {
        return "Dodaj ilość"
    };
    if (!form.year) {
        return "Dodaj rok produkcji"
    } else if (form.year.length < 4) {
        return "Podaj poprawny rok"
    } else if (form.year.length > 4) {
        return "Podaj poprawny rok"
    };

    if (!form.model) {
        return "Dodaj model"
    };

    if(!form.unitPriceService){
        return "Podaj cene"
    }

    if (!form.category) {
        return "Dodaj katrgorie"
    };

    if (!form.descripsion) {
        return "Dodaj opis przedmiotu"
    };

};

export default function MachinesAdd() {
    const [isActive, setActive] = useState("close")
    const [baseImage, setBaseImage] = useState('')
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        machineName: "",
        quanitity: "",
        photo: "",
        year: "",
        model: "",
        category: "",
        descripsion: "",
        unitPriceService: ""
    });

    const addMachine = (e) => {
        e.preventDefault();
        const errorss = validate(form)

        if (errorss) {
            setError(errorss);
            return
        } else {
            const {
                machineName,
                quanitity,
                photo,
                year,
                model,
                mileage,
                category,
                descripsion,
                unitPriceService

            } = form

            const formData = new FormData();
            formData.append("machineName", machineName);
            formData.append("photo", photo);
            formData.append("quanitity", quanitity);
            formData.append("year", year);
            formData.append("model", model,);
            formData.append("mileage", mileage);
            formData.append("category", category);
            formData.append("descripsion", descripsion);
            formData.append("unitPriceService", unitPriceService)

            axios.post('http://localhost:8080/machines/addEquipment', formData)
                .then(() => {
                    setError(
                        <Error
                            isAlternative={true}>
                            Dodałeś przedmiot
                        </Error>)
                })
            setForm({
                machineName: "",
                quanitity: "",
                photo: "",
                year: "",
                model: "",
                category: "",
                descripsion: "",
                unitPriceService: ""

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

    let stateMchine = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    };

    const {
        machineName,
        quanitity,
        year,
        model,
        category,
        descripsion,
        unitPriceService
    } = form

    return (
        <Container>

            <Error>
                {error}
            </Error>

            <Container isAlternative={true}>
                <div
                    className={style[isActive]}>
                    <img
                        src={baseImage}
                        alt="Brak Zdjecia"
                    />
                </div>

                <form
                    encType="multipart/form-data">

                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={handlePhoto}
                    />

                    <input
                        onChange={stateMchine}
                        value={machineName}
                        type="text"
                        name="machineName"
                        placeholder="Podaj nazwe maszyny"
                    />

                    <input
                        onChange={stateMchine}
                        value={quanitity}
                        type="number"
                        name="quanitity"
                        placeholder="Podaj ilość"
                    />

                    <input
                        onChange={stateMchine}
                        value={year}
                        type="number"
                        name="year"
                        placeholder="Podaj rok"
                    />

                    <input
                        onChange={stateMchine}
                        value={model}
                        type="text"
                        name="model"
                        placeholder="Podaj model"
                    />

                    <input
                        onChange={stateMchine}
                        value={unitPriceService}
                        type="number"
                        name="unitPriceService"
                        placeholder="Cena za 24h urzytkowania w zł"
                    />

                    <label>

                        <select
                            onChange={stateMchine}
                            value={category}
                            type="text"
                            name="category">

                            <option>
                                wybierz kategorie
                            </option>

                            <option>
                                Elektryczne
                            </option>

                            <option>
                                Hydrauliczne
                            </option>

                            <option>
                                Stolarskie
                            </option>

                            <option>
                                Elektro narzedzia
                            </option>

                            <option>
                                Ciężki sprzęt
                            </option>

                        </select>
                    </label>

                    <textarea
                        onChange={stateMchine}
                        value={descripsion}
                        type="text"
                        name="descripsion"
                        placeholder="Krótki opis" />

                    <Button
                        type="submit"
                        onClick={addMachine}>
                        Dodaj
                    </Button>

                </form>
            </Container>
        </Container >
    )
};