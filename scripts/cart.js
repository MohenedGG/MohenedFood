import { productsList } from "./APIs.js";
let products = await productsList();

let totalPrice = 0;
let price;
//insert products and empty cart
let cartSave = JSON.parse(window.localStorage.getItem("myCart"));
let prodViwer = document.querySelector(".cartItems")
let emptyObj = `
    <div class="emptyCart">
        <img src="../imgs/illustration-empty-cart.svg" alt="">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <a href="../index.html" class="shopNow">Shop Now</a>
    </div>
`;
function cartItemObj(image, name, category, price, id) {
    return `
        <div class="cartItem">
            <img src="${image}" loading="lazy" alt="${name}">
            <div class="productDetails">
                <h2>${name}</h2>
                <p>Category: ${category}</p>
                <p>Price: $${price}</p>
            </div>
            <button class="removeButton" data-count="${id}">Remove</button>
        </div>
    `;
}
function confirmObj(totalPrice) {
    return `
        <div class="confirm">
            <h2>Confirm Your Order</h2>
            <p>Total: <span class="totalPrice">$${totalPrice.toFixed(2)}</span></p>
            <a href="./confirm.html" class="confirmOrder">Confirm Order</a>
        </div>
    `;
}
if(cartSave === null || cartSave.length === 0) {
    prodViwer.innerHTML = emptyObj;
} else {
    for(let i = 0; i < cartSave.length; i++) {
        prodViwer.innerHTML += cartItemObj(products[cartSave[i]].image.thumbnail, products[cartSave[i]].name, products[cartSave[i]].category, products[cartSave[i]].price, i);
        totalPrice += products[cartSave[i]].price;
    }
    prodViwer.innerHTML += confirmObj(totalPrice);
    price = document.querySelector(".totalPrice");
}

//remove button
let buttons = Array.from(document.querySelectorAll(".removeButton"));
function countEdit(index) {
    buttons.map((button, i) => {
        if(i > index) {
            button.dataset.count -= 1;
        }
    });
}
buttons.forEach(button => {
    button.addEventListener("click", function () {
        let index = this.getAttribute("data-count");
        totalPrice -= products[cartSave[index]].price;
        price.innerText = `$${totalPrice.toFixed(2)}`;
        cartSave.splice(index, 1);
        countEdit(index);
        button.parentElement.remove();
        window.localStorage.setItem("myCart", JSON.stringify(cartSave));
        if(cartSave === null || cartSave.length === 0) {
            prodViwer.innerHTML = emptyObj;
        }
    });
});