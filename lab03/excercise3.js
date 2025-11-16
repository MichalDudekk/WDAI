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

    const select = document.getElementById("sortSelect");
    if (select.value === "ascending") {
        products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (select.value === "descending") {
        products.sort((a, b) => b.title.localeCompare(a.title));
    }

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

const createTableFromAPI = async (tableDiv) => {
    const content = document.getElementById("content");

    const products = await fetchProducts();
    if (products) {
        await fetchDataFromAPI(products, tableDiv);
    }
};

const createSelect = () => {
    const content = document.getElementById("content");
    const select = document.createElement("select");
    select.id = "sortSelect";
    const option1 = document.createElement("option");
    option1.value = "ascending";
    option1.text = "ascending";
    const option2 = document.createElement("option");
    option2.value = "descending";
    option2.text = "descending";
    const option3 = document.createElement("option");
    option3.value = "original";
    option3.text = "original";
    select.appendChild(option3);
    select.appendChild(option1);
    select.appendChild(option2);
    content.appendChild(select);

    const tableDiv = document.createElement("div");
    content.appendChild(tableDiv);

    select.addEventListener("change", () => {
        tableDiv.innerHTML = "";
        createTableFromAPI(tableDiv);
    });

    createTableFromAPI(tableDiv);
};

createSelect();
