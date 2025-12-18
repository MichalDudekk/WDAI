import { useState } from "react";
import Dodawanie from "./Dodawanie";

interface Student {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

const student1: Student = {
    imie: "Mariusz",
    nazwisko: "Mieszka",
    rocznik: 1939,
};

const student2: Student = {
    imie: "Piotr",
    nazwisko: "Palisz",
    rocznik: 1985,
};

export default function StudentManager() {
    const [students, SetStudents] = useState([student1, student2]);
    let id = 0;

    return (
        <>
            <table>
                <tbody>
                    {students.map((student) => (
                        <tr key={id++}>
                            <td>{student.imie}</td>
                            <td>{student.nazwisko}</td>
                            <td>{student.rocznik}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dodawanie SetStudents={SetStudents} />
        </>
    );
}
