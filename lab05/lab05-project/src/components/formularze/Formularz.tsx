import { useState } from "react";

export default function Formularz() {
    const [text, setText] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <>
            <input type="text" onChange={handleChange} />
            <div>{text}</div>
        </>
    );
}
