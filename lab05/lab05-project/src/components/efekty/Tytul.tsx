import { useState, useEffect } from "react";

export default function Tytul() {
    const [title, setTitle] = useState("");

    useEffect(() => {
        document.title = title;
    }, [title]);

    return <input type="text" onChange={(e) => setTitle(e.target.value)} />;
}
