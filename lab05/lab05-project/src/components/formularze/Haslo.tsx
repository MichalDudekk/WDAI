import { useState } from "react";

export default function Haslo() {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const message: string =
        password1 === "" && password2 === ""
            ? "Proszę wprowadzić hasło"
            : password1 !== password2
            ? "Hasła nie są zgodne"
            : "";

    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword1(event.target.value);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword2(event.target.value);
    };

    return (
        <>
            <label htmlFor="password1">Hasło</label>
            <input type="text" id="password1" onChange={handleChange1} />
            <label htmlFor="password2">Powtórz Hasło</label>
            <input type="text" id="password2" onChange={handleChange2} />
            <div>{message}</div>
        </>
    );
}
