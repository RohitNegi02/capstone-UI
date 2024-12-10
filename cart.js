const val = JSON.parse(localStorage.getItem("cart"));
console.log("here" + val);
const cartItems = document.querySelector(".cart-items");
console.log(cartItems);
// generateMarkuploop();
const markup = generateMarkuploop();
function generateMarkuploop() {
  const Mark = val.map((res) => generateMarkup(res)).join("");
  return Mark;
}

function generateMarkup(result) {
  return `<div class="block-post-products" id="${result.id}">
  <img class="products-img" src="${result.image}" alt="" />
  <div class="img-txt-products"><span>${result.title}</span><span> Price: ${result.price}</span><span>Quantity: ${result.quantity}</span></div>
  </div>`;
}
cartItems.insertAdjacentHTML("afterbegin", markup);
