import { useState } from "react";

export default function Logowanie() {
    const [login, setLogin] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const isButtonDisabled =
        login === "" || password1 === "" || password2 === "";

    const handleClick = () => {
        alert(
            password1 !== password2
                ? "Hasła nie są zgodne"
                : "Zalogowano poprawnie"
        );
    };

    return (
        <>
            <label htmlFor="login">Login</label>
            <input
                type="text"
                id="login"
                onChange={(e) => {
                    setLogin(e.target.value);
                }}
            />
            <label htmlFor="password1">Hasło</label>
            <input
                type="text"
                id="password1"
                onChange={(event) => setPassword1(event.target.value)}
            />
            <label htmlFor="password2">Powtórz Hasło</label>
            <input
                type="text"
                id="password2"
                onChange={(event) => setPassword2(event.target.value)}
            />
            <button disabled={isButtonDisabled} onClick={handleClick}>
                Logowanie
            </button>
        </>
    );
}
