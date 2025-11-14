const fetchProducts = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();

        console.log(products);
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return;
    }
};

const fetchDataFromAPI = async (products, resultDiv) => {
    const tab = document.createElement("table");
    tab.border = "1";

    products.forEach((product) => {
        const row = document.createElement("tr");

        const titleCell = document.createElement("td");
        titleCell.innerText = product.title;

        const descCell = document.createElement("td");
        descCell.innerText = product.description;

        const imageCell = document.createElement("td");
        const img = document.createElement("img");
        img.src = product.image;
        img.width = 100;
        img.height = 100;
        imageCell.appendChild(img);

        row.appendChild(titleCell);
        row.appendChild(descCell);
        row.appendChild(imageCell);
        tab.appendChild(row);
    });

    resultDiv.appendChild(tab);
};

const createTableFromAPI = async () => {
    const content = document.getElementById("content");
    const tableDiv = document.createElement("div");

    const products = await fetchProducts();
    if (products) {
        await fetchDataFromAPI(products, tableDiv);
    }

    content.appendChild(tableDiv);
};

createTableFromAPI();
