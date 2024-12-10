window.addEventListener(
  "load",
  () => {
    console.log("The hash has changed!");
    var url = window.location.pathname;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get("product");
    console.log(product);
    getProduct(product);
  },
  false
);
let cart = [];
const getProduct = async function (id) {
  const products = await fetch(`https://fakestoreapi.com/products/${id}`);
  const result = await products.json();

  console.log(result);
  renderMarkup(result);
  const btnAdd = document.querySelector(".btnCart");

  btnAdd.addEventListener("click", function () {
    console.log(document.getElementById("quantity").value);
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    const productobj = {
      id: result.id,
      title: result.title,
      price: result.price,
      image: result.image,
      quantity: document.getElementById("quantity").value,
    };
    cart.push(productobj);

    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  });
  console.log(cart);
};
const renderMarkup = function (result) {
  const parentEl = document.querySelector(".product-outside-container");
  const markup = generateMarkup();
  parentEl.insertAdjacentHTML("afterbegin", markup);

  function generateMarkup() {
    return `<div class="product-inside-container">
      <img class="prod-img"src="${result.image}" alt="" />
      <div class="text-div">
        <h1>${result.title}</h1>
        <div>$${result.price}</div>
        <div>ratings</div>
        <div class="des1">
        ${result.description}
        </div>
        <label>Quantity</label>
        <div><div class="number">
        <span class="minus">-</span>
        <input type="text" id="quantity" value="1"/>
        <span class="plus">+</span>
    </div></div>
        <button class="btnCart">ADD TO CART</button>
        <div><span><img class="share-img" src="heart.png" alt="">save</span> <span><img  class="share-img" src="share.png" alt=""> share</span></div>
      </div></div><div>
      <div class="text-div">
        <h1>${result.title}</h1>
        <div class="Description">
        Description
        </div>
        <div class="des">
        ${result.description}
        </div>
      </div>
    </div>`;
  }
  return markup;
};
