export default function Przycisk(props: {
    count: number;
    setCount: (count: number) => void;
}) {
    return (
        <button onClick={() => props.setCount(props.count + 1)}>
            Click me
        </button>
    );
}
