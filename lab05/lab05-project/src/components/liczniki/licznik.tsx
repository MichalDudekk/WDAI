import { useState } from "react";

export default function Licznik() {
    const [count, setCount] = useState(0);
    return (
        <div>
            {count}
            <button onClick={() => setCount(count + 1)}>Dodaj</button>
        </div>
    );
}
