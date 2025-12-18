import { useState } from "react";

interface Student {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

export default function Dodawanie(props: {
    SetStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}) {
    const [imie, SetImie] = useState("");
    const [nazwisko, SetNazwisko] = useState("");
    const [rok, SetRok] = useState("");

    const isButtonDisabled: boolean =
        imie === "" || nazwisko === "" || rok === "";

    return (
        <>
            <label htmlFor="imie">imie</label>
            <input
                id="imie"
                type="text"
                onChange={(e) => SetImie(e.target.value)}
            />
            <label htmlFor="nazwisko">nazwisko</label>
            <input
                id="nazwisko"
                type="text"
                onChange={(e) => SetNazwisko(e.target.value)}
            />
            <label htmlFor="rok">rok</label>
            <input
                id="rok"
                type="number"
                onChange={(e) => SetRok(e.target.value)}
            />
            <button
                disabled={isButtonDisabled}
                onClick={() => {
                    props.SetStudents((prev) => [
                        ...prev,
                        {
                            imie: imie,
                            nazwisko: nazwisko,
                            rocznik: Number(rok),
                        },
                    ]);
                }}
            >
                Dodaj
            </button>
        </>
    );
}
