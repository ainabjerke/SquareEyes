const signInForm = document.querySelector("#signInForm");

const signInEmail = document.querySelector("#signInEmail");

const signInEmailError = document.querySelector("#signInEmailError");

const signInPassword = document.querySelector("#signInPassword");

const signInPasswordError = document.querySelector("#signInPasswordError");

const signInButton = document.querySelector("#signInButton");

function validateForm() {
  let error = false;

  if (validateEmail(signInEmail.value) === true) {
    signInEmailError.style.display = "none";
  } else {
    signInEmailError.style.display = "block";
    error = true;
  }

  if (checkLength(signInPassword.value, 4) === true) {
    signInPasswordError.style.display = "none";
  } else {
    signInPasswordError.style.display = "block";
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

function validateEmail(signInEmail) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(signInEmail);
  return patternMatches;
}

function checkIfButtonIsDisabled() {
  if (
    validateEmail(signInEmail.value) &&
    checkLength(signInPassword.value, 5)
  ) {
    signInButton.disabled = false;
  } else {
    signInButton.disabled = true;
  }
}

function submitForm(event) {
  event.preventDefault();

  if (!validateForm()) return;

  document.location.href = "home_page.html";
}

signInForm.addEventListener("submit", submitForm);