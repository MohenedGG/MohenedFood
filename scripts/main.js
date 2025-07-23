import { productsList } from "./APIs.js";
let products = await productsList();
console.log(products[0].category);

//object of products
function prodObj(image, name, category, price, id) {
    return `
        <div class="product">
            <img src="${image}" loading="lazy" alt="${name}" class="foodImg">
            <h3>${category}</h3>
            <p>${name}</p>
            <span>${price}$</span>
            <button class="add-to-cart" data-name="${id}">Add to Cart<img src="./imgs/icon-add-to-cart.svg" alt=""></button>
        </div>
    `;
}

//insert products
let productsContainer = document.querySelector(".allProducts");
for (let i = 0; i < products.length; i++) {
    productsContainer.innerHTML += prodObj(products[i].image.desktop, products[i].name, products[i].category, products[i].price, i)
}

//save system
let cartSave = [];
let prodNum = cartSave.length;
let cartIcon = document.querySelector(".cart");
if(JSON.parse(window.localStorage.getItem("myCart") !== null))
{
    cartSave = JSON.parse(window.localStorage.getItem("myCart"));
    prodNum = cartSave.length
}
if(prodNum > 0) {
    cartIcon.classList.add("notNull");
    cartIcon.setAttribute("data-count", prodNum);
}
//add to cart button
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        const productName = this.dataset.name;
        cartSave.push(productName);
        window.localStorage.setItem("myCart", JSON.stringify(cartSave));
        cartIcon.classList.add("notNull");
        prodNum = cartSave.length;
        cartIcon.setAttribute("data-count", prodNum);
        console.log(prodNum)
    });
});