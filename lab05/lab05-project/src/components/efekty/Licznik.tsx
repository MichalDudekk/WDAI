import { useState, useEffect } from "react";

export default function Licznik() {
    const [count, setCount] = useState(0);

    useEffect(() => console.log("Hello World"), []);

    useEffect(() => console.log(`Licznik zwiększył się do ${count}`), [count]);

    return (
        <div>
            {count}
            <button onClick={() => setCount(count + 1)}>Dodaj</button>
        </div>
    );
}
