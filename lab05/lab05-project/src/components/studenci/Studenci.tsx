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

const students: Student[] = [student1, student2];

export default function Studenci() {
    return (
        <>
            <table>
                {students.map((student) => (
                    <tr>
                        <td>{student.imie}</td>
                        <td>{student.nazwisko}</td>
                        <td>{student.rocznik}</td>
                    </tr>
                ))}
            </table>
        </>
    );
}
