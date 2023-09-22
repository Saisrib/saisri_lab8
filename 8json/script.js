const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

let products = [];

// Function to fetch and parse JSON data
function fetchProducts() {
    fetch("products.json")
        .then((response) => response.json())
        .then((data) => {
            products = data;
            displayFilteredProducts();
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

// Function to display filtered products based on user input
function displayFilteredProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    });

    productList.innerHTML = "";

    if (filteredProducts.length === 0) {
        productList.textContent = "No products found.";
        return;
    }

    filteredProducts.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.name;
        productDiv.appendChild(productImage);

        const productName = document.createElement("h2");
        productName.textContent = product.name;
        productDiv.appendChild(productName);

        const productDescription = document.createElement("p");
        productDescription.textContent = product.description;
        productDiv.appendChild(productDescription);

        const productPrice = document.createElement("p");
        productPrice.textContent = product.price;
        productDiv.appendChild(productPrice);

        productList.appendChild(productDiv);
    });
}

// Event listener for the search button
searchButton.addEventListener("click", () => {
    fetchProducts();
});

// Initially hide the product list
productList.style.display = "none";

// Initial display when the page loads
document.addEventListener("DOMContentLoaded", () => {
    // You can fetch products on page load if needed
    // fetchProducts();
});
