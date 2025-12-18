export default function Ternary() {
    const a: boolean = true;
    const b: boolean = false;

    return (
        <>
            <div>
                {a
                    ? "Stwierdzenie a jest prawdziwe"
                    : "Stwierdzenie a jest fałszywe"}
            </div>
            <div>
                {b
                    ? "Stwierdzenie b jest prawdziwe"
                    : "Stwierdzenie b jest fałszywe"}
            </div>
        </>
    );
}
