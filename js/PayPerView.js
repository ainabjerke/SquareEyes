const paymentForm = document.querySelector("#paymentForm");
const cName = document.querySelector("#cName");
const cNameError = document.querySelector("#cNameError");
const ccNum = document.querySelector("#ccNum");
const ccNumError = document.querySelector("#ccNumError");
const expYear = document.querySelector("#expYear");
const expYearError = document.querySelector("#expYearError");
const cvv = document.querySelector("#cvv");
const cvvError = document.querySelector("#cvvError");

const buttonPayPerView = document.querySelector("#buttonPayPerView");

function validateForm() {
  let error = false;
  if (checkLength(cName.value, 0) === true) {
    cNameError.style.display = "none";
  } else {
    cNameError.style.display = "block";
    error = true;
  }
  if (checkLength(ccNum.value, 15) === true) {
    ccNumError.style.display = "none";
  } else {
    ccNumError.style.display = "block";
    error = true;
  }

  console.log("hello");

  if (checkLength(expYear.value, 3) === true) {
    expYearError.style.display = "none";
  } else {
    expYearError.style.display = "block";
    error = true;
  }

  if (checkLength(cvv.value, 2) === true) {
    cvvError.style.display = "none";
  } else {
    cvvError.style.display = "block";
    error = true;
  }

  return !error;
}

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function checkIfButtonIsDisabled() {
  if (
    checkLength(cName.value, 0) &&
    checkLength(ccNum.value, 15) &&
    checkLength(expYear.value, 3) &&
    checkLength(cvv.value, 2)
  ) {
    buttonPayPerView.disabled = false;
  } else {
    buttonPayPerView.disabled = true;
  }
}

function submitForm(event) {
  event.preventDefault();

  if (!validateForm()) return;

  paymentForm.reset();
  alert("Thank you for your purchase");
  location.hash = "";
  hash = "";

  cartModalOverlay.style.transform = "translateX(-200%)";
  var cartItems = document.querySelectorAll(".cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

buttonPayPerView.addEventListener("click", submitForm);

console.log("hello");