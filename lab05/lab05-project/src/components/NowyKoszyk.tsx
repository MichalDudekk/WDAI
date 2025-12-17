import Product from "./Produkt";

export default function NowyKoszyk() {
    const produkty: string[] = ["Mleko", "Chleb", "Masło", "Ser", "Jajka"];

    return (
        <div>
            {produkty.map((produkt) => (
                <Product key={produkt} name={produkt} />
            ))}
        </div>
    );
}
