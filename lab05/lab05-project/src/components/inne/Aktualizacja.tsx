import { useState } from "react";

export default function Aktualizacja() {
    const [state, SetState] = useState({ name: "pomidor", cena: 50 });

    return (
        <>
            <div>
                Aktualnie {state.name} kosztuje {state.cena}
            </div>
            <button
                onClick={() => {
                    SetState((prev) => ({ ...prev, cena: 100 }));
                }}
            >
                Zmień cene
            </button>
        </>
    );
}
