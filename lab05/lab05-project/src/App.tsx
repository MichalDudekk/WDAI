import "./App.css";

function Welcome(props: { name: string; lastname?: string }) {
    return (
        <h1>
            Hello, {props.name} {props.lastname}
        </h1>
    );
}

function Goodbye(props: { name: string }) {
    type sex = "K" | "M";

    const userSex: sex = props.name[-1] === "a" ? "K" : "M";

    return (
        <h1>
            Goodbye, {props.name} {userSex === "K" ? "Kobieta" : "Mężczyzna"}{" "}
        </h1>
    );
}

function App() {
    return (
        <>
            <Welcome name="Sara" />
            <Welcome name="Cahal" lastname="O'Donnell" />
            <Goodbye name="Sara" />
        </>
    );
}

export default App;
