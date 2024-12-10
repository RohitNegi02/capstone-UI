const parentEl = document.querySelector(".parent-div-products");
const pagEl = document.querySelector(".numList");
const sibs = [];
let stateProd = {
  pageid: "",
};
let num = 0;
const getProducts = async function () {
  const products = await fetch("https://fakestoreapi.com/products");
  const result = await products.json();
  num = result.length;
  renderMarkup(result, true);
  pagination();
};
var url = window.location.pathname;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get("category");
console.log(category);
const renderMarkup = function (result, value) {
  const markup = generateMarkuploop();
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
  function generateMarkuploop() {
    const Mark = result.map((res) => generateMarkup(res, value)).join("");

    return Mark;
  }
  function generateMarkup(result, value) {
    var display = "dis";
    if (value) {
      display = "";
    }

    return ` <div class="block-post-products ${display}" id="${result.id}">
<img class="products-img" src="${result.image}" alt="" />
<div class="img-txt-products"><span>${result.title}</span></div>
</div>`;
  }
  return markup;
};

const getCategoryProduct = async function (category, value) {
  console.log(category);
  const products = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const result = await products.json();
  let val = renderMarkup(result, value);
  return val;
};
const categoryProduct = function (e) {
  let strr = "";
  if (e.target.classList.contains("prod")) {
    let checkedArr = getAllCheckedSiblings(e.target);
    if (!checkedArr.length == 0) {
      //arr returned is of promise object
      const arr = checkedArr.map(async function (elem) {
        result = await getCategoryProduct(elem.getAttribute("name"), false);
        return result;
      });
      let promises = [];
      for (let i = 0; i < arr.length; i++) {
        promises.push(arr[i]);
      }
      Promise.all(promises).then(function (results) {
        // all promises done here
        parentEl.innerHTML = "";
        let markup = results.join("");
        parentEl.insertAdjacentHTML("afterbegin", markup);
        pagination();
      });
    } else {
      getProducts();
    }
  }
};

function getAllCheckedSiblings(elem) {
  if (elem.checked) {
    sibs.push(elem);
  } else {
    for (let i = 0; i < sibs.length; i++) {
      if (sibs[i] === elem) {
        let spliced = sibs.splice(i, 1);
        console.log("Removed element: " + spliced);
        console.log("Remaining elements: " + sibs);
      }
    }
  }

  return sibs;
}
// here used the bubbling effect
const facets = document.querySelector(".filter");
facets.addEventListener("click", categoryProduct);

//////////////////pagination////////////////////////

function pagination() {
  const productsList = document.querySelectorAll(".block-post-products");
  let num1 = productsList.length;
  let onepage = Math.ceil(num1 / 6);
  pagEl.innerHTML = "";
  for (let i = onepage; i > 0; i--) {
    pagEl.insertAdjacentHTML("afterbegin", `<span class="pageNum">${i}</span>`);
  }
  const pagBtn = document.querySelectorAll(".pageNum");

  for (let j = 0; j < 6; j++) {
    if (productsList[j] != null && productsList[j].classList.contains("dis")) {
      productsList[j].classList.remove("dis");
    }
  }
  pagBtn.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      currentval = Number(btn.textContent);
      for (let i = 0; i < productsList.length; i++) {
        productsList[i].classList.add("dis");
      }
      for (
        let j = 0 + (currentval - 1) * 6;
        j < 6 * (currentval - 1 + 1);
        j++
      ) {
        if (
          productsList[j] != null &&
          productsList[j].classList.contains("dis")
        ) {
          productsList[j].classList.remove("dis");
        }
      }
    });
  });
}
const prodContainer = document.querySelector(".parent-div-products");
prodContainer.addEventListener("click", function (e) {
  const id = e.target.closest(".block-post-products").getAttribute("id");
  window.location.href = `product.html?product=${id}`;
});
if (category == null) {
  getProducts();
} else {
  getCategoryProduct(category, true);
}
function togglefilter() {
  var filter = document.querySelector(".filter");
  filter.classList.toggle("show");
}
