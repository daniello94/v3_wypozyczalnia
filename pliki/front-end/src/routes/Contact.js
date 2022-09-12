import React, { useRef, useState } from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import Error from "../components/Error";
import axios from "axios";

export default function Contact(props) {
    const form = useRef()
    const [userName, setUserName] = useState(props.dataUser?.user.name);
    const [userEmail, setUserEmial] = useState(props.dataUser?.user.email);
    const [userLastName, setUserLastName] = useState(props.dataUser?.user.lastName);
    const [textarea, setTextarea] = useState("");
    const [error, setError] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        if (!userName) {
            setError(<Error>Wpisz imoię</Error>)
            return
        } else if (!userLastName) {
            setError(<Error>Wpisz nazwisko</Error>)
            return
        } else if (!userEmail) {
            setError(<Error>Podaj Email</Error>)
            return
        } else if (!textarea) {
            setError(<Error>Wpisz treść wiadomości</Error>)
            return
        } else {
            e.preventDefault();
            axios.post('http://127.0.0.1:8080/client/send-email',{
                userName,
                userEmail,
                userLastName,
                textarea
            })
                .then(() => {
                    setError(<Error isAlternative={true}>Wiadomośc została wysłana</Error>)
                })

        };
        return
    }
    return (
        <Container>
            <span>{error}</span>
            <h2> Napisz do nas</h2>
            <form ref={form} onSubmit={sendEmail}>
                <input
                    type="text"
                    name="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Wpisz swoje imię" />

                <input
                    type="text"
                    name="userLastName"
                    value={userLastName}
                    onChange={(e) => setUserLastName(e.target.value)}
                    placeholder="Wpisz swoje nazwisko" />

                <input
                    type="email"
                    name="userEmail"
                    value={userEmail}
                    onChange={(e) => setUserEmial(e.target.value)}
                    placeholder="Wpisz swó email" />
                <textarea
                    name="message"
                    value={textarea}
                    onChange={(e) => setTextarea(e.target.value)}
                    placeholder="wpisz swoja wiadość" />

                <Button
                    type="submit">
                    Wyślij
                </Button>
            </form>
        </Container>
    )
}