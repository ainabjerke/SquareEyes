if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// console.log("Hello World");

function ready() {
  var removeCartItemButtons = document.querySelectorAll(".btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.querySelectorAll(".cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.querySelectorAll(".premiere-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.querySelectorAll(".movie-title")[0].innerText;
  var price = shopItem.querySelectorAll(".movie-price")[0].innerText;
  var imageSrc = shopItem.querySelectorAll(".movie-image")[0].src;

  if (addItemToCart(title, price, imageSrc)) {
    updateCartTotal();
  }
}

////////////////////////////////////////////////////////////////////////////////

window.onload = function () {
  var page = location.pathname.split("/").pop();
  var hash = location.hash.substring(1);

  if (page == "pay_per_view.html") {
    var [hash, total] = hash.split("&&&");
    console.log("hash total", total);
    document.querySelector(
      ".container-pay-per-view .cart-total-price"
    ).innerHTML = `$${total}`;
  }

  var add = hash.split("|");

  add.forEach(function (movie) {
    movie = movie.split(";");

    if (movie[0]) {
      movie.forEach(function (e) {
        var [key, value] = e.split("=");
        value = decodeURI(value);
        if (key == "title") {
          title = value;
        } else if (key == "price") {
          price = value;
        } else if (key == "imageSrc") {
          imageSrc = value;
        }
      });

      if (addItemToCart(title, price, imageSrc, true)) {
        updateCartTotal();
      }
    }
  });
};

var links = document.querySelectorAll(
  "nav a, .search_input_button.purchase-btn"
);
links.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    if (this.className == "search_input_button purchase-btn") {
      var total = document
        .querySelector(".cart-total-price")
        .innerHTML.substring(1);
      hash += "&&&" + total;
    }

    location.href = this.href + hash;
  });
});

var hash = "#";

/////////////////////////////////////////////////////////////////////////////////

function addItemToCart(title, price, imageSrc, recreate) {
  var cartItems = document.querySelectorAll(".cart-items")[0];
  if (cartItems) {
    var cartItemNames = cartItems.querySelectorAll(".cart-item-title");
    for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title && !recreate) {
        alert("This item is already added to the cart");
        return false;
      }
    }
    hash += `title=${title};price=${price};imageSrc=${imageSrc}|`; //////
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    var cartRowContents = `
      <div class="cart-item cart-column">
      <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow
      .querySelectorAll(".btn-danger")[0]
      .addEventListener("click", removeCartItem);
    cartRow
      .querySelectorAll(".cart-quantity-input")[0]
      .addEventListener("change", quantityChanged);

    return true;
  }
}

function updateCartTotal() {
  var cartItemContainer = document.querySelectorAll(".cart-items")[0];
  if (cartItemContainer) {
    var cartRows = cartItemContainer.querySelectorAll(".cart-row");
    var total = 0;
    for (var i = 0; i < cartRows.length; i += 1) {
      var cartRow = cartRows[i];
      var priceElement = cartRow.querySelectorAll(".cart-price")[0];
      var quantityElement = cartRow.querySelectorAll(".cart-quantity-input")[0];
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      var quantity = quantityElement.value;
      total = total + price * quantity;
    }
    total = Math.round(total * 100) / 100;
    console.log("cart total test:", total);
    document.querySelectorAll(".cart-total-price")[0].innerText = "$" + total;
    const payPrice = document.querySelector(
      ".container-pay-per-view .cart-total-price"
    );
    if (payPrice) {
      payPrice.innerText = "$" + total;
    }
    document.getElementsByClassName("cart-quantity-icon")[0].textContent =
      i /= 1;
  }
}

// open cart modal
const cart = document.querySelector("#cart");
const cartModalOverlay = document.querySelector(".cart-modal-overlay");

cart.addEventListener("click", () => {
  console.log("style test:", cartModalOverlay.style.transform);
  if (cartModalOverlay.style.transform === "translateX(0px)") {
    console.log("negative");
    cartModalOverlay.style.transform = "translateX(-200%)";
  } else {
    cartModalOverlay.style.transform = "translateX(0px)";
  }
});
// end of open cart modal

// close cart modal
const closeBtn = document.querySelector("#close-btn");

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    cartModalOverlay.style.transform = "translateX(-200%)";
  });
}

if (cartModalOverlay) {
  cartModalOverlay.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-modal-overlay")) {
      cartModalOverlay.style.transform = "translateX(-200%)";
    }
  });
}