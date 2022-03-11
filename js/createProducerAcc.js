const createProducerForm = document.querySelector("#createProducerForm");

const producerFName = document.querySelector("#producerFName");

const producerFNError = document.querySelector("#producerFNError");

const producerLName = document.querySelector("#producerLName");

const producerLNError = document.querySelector("#producerLNError");

const companyName = document.querySelector("#companyName");

const companyNameError = document.querySelector("#companyNameError");

const producerEmail = document.querySelector("#producerEmail");

const producerEmailError = document.querySelector("#producerEmailError");

const producerPassword = document.querySelector("#producerPassword");

const producerPasswordError = document.querySelector("#producerPasswordError");

const reEnterProducerPassword = document.querySelector(
  "#reEnterProducerPassword"
);

const reEnterProducerPasswordError = document.querySelector(
  "#reEnterProducerPasswordError"
);

const producerSignInButton = document.querySelector("#producerSignInButton");

function validateForm() {
  let error = false;
  if (checkLength(producerFName.value, 0) === true) {
    producerFNError.style.display = "none";
  } else {
    producerFNError.style.display = "block";
    error = true;
  }

  if (checkLength(producerLName.value, 0) === true) {
    producerLNError.style.display = "none";
  } else {
    producerLNError.style.display = "block";
    error = true;
  }

  if (checkLength(companyName.value, 0) === true) {
    companyNameError.style.display = "none";
  } else {
    companyNameError.style.display = "block";
    error = true;
  }

  if (validateEmail(producerEmail.value) === true) {
    producerEmailError.style.display = "none";
  } else {
    producerEmailError.style.display = "block";
    error = true;
  }

  if (checkLength(producerPassword.value, 4) === true) {
    producerPasswordError.style.display = "none";
  } else {
    producerPasswordError.style.display = "block";
    error = true;
  }

  return !error;
}

function validatePassword() {
  if (producerPassword.value != reEnterProducerPassword.value) {
    reEnterProducerPassword.setCustomValidity("Passwords Don't Match");
  } else {
    reEnterProducerPassword.setCustomValidity("");
  }
}

producerPassword.onchange = validatePassword;
reEnterProducerPassword.onkeyup = validatePassword;

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

function checkIfButtonIsDisabled() {
  if (
    checkLength(producerFName.value, 1) &&
    checkLength(producerLName.value, 1) &&
    checkLength(companyName.value, 1) &&
    validateEmail(producerEmail.value) &&
    checkLength(producerPassword.value, 5) &&
    checkLength(reEnterProducerPassword.value, 5)
  ) {
    producerSignInButton.disabled = false;
  } else {
    producerSignInButton.disabled = true;
  }
}

function submitForm(event) {
  event.preventDefault();

  if (!validateForm()) return;

  document.location.href = "home_page.html";
}

createProducerForm.addEventListener("submit", submitForm);