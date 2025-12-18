import { useState, useEffect } from "react";

export default function Odliczanie() {
    const [licznik, setLicznik] = useState(15.0);
    const [isCounting, setIsCounting] = useState(false);

    const isButtonDisabled = licznik <= 0.0;

    useEffect(() => {
        if (!isCounting) return;

        const interval = setInterval(
            () =>
                setLicznik((prev) => {
                    if (prev >= 0.1) return prev - 0.1;
                    setIsCounting(false);
                    return 0;
                }),
            100
        );
        return () => clearInterval(interval);
    }, [isCounting]);

    return (
        <>
            <div>{licznik.toFixed(1)}</div>
            <button
                disabled={isButtonDisabled}
                onClick={() => setIsCounting((prev) => !prev)}
            >
                {isCounting ? "STOP" : "START"}
            </button>
        </>
    );
}
