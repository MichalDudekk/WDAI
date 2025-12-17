import { useState } from "react";
import Przycisk from "./Przycisk";

export default function Licznik() {
    const [count, setCount] = useState(0);
    return (
        <div>
            {count}
            <Przycisk count={count} setCount={setCount} />
        </div>
    );
}
