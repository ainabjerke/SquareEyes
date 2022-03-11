const createWatcherForm = document.querySelector("#createWatcherForm");

const watcherFName = document.querySelector("#watcherFName");

const watcherFNError = document.querySelector("#watcherFNError");

const watcherLName = document.querySelector("#watcherLName");

const watcherLNError = document.querySelector("#watcherLNError");

const watcherEmail = document.querySelector("#watcherEmail");

const watcherEmailError = document.querySelector("#watcherEmailError");

const watcherPassword = document.querySelector("#watcherPassword");

const watcherPasswordError = document.querySelector("#watcherPasswordError");

const reEnterWatcherPassword = document.querySelector(
  "#reEnterWatcherPassword"
);

const reEnterWatcherPasswordError = document.querySelector(
  "#reEnterWatcherPasswordError"
);

const watcherSignInButton = document.querySelector("#watcherSignInButton");

function validateForm() {
  let error = false;
  if (checkLength(watcherFName.value, 0) === true) {
    watcherFNError.style.display = "none";
  } else {
    watcherFNError.style.display = "block";
    error = true;
  }

  if (checkLength(watcherLName.value, 0) === true) {
    watcherLNError.style.display = "none";
  } else {
    watcherLNError.style.display = "block";
    error = true;
  }

  if (validateEmail(watcherEmail.value) === true) {
    watcherEmailError.style.display = "none";
  } else {
    watcherEmailError.style.display = "block";
    error = true;
  }

  if (checkLength(watcherPassword.value, 4) === true) {
    watcherPasswordError.style.display = "none";
  } else {
    watcherPasswordError.style.display = "block";
    error = true;
  }

  return !error;
}

function validatePassword() {
  if (watcherPassword.value != reEnterWatcherPassword.value) {
    reEnterWatcherPassword.setCustomValidity("Passwords Don't Match");
  } else {
    reEnterWatcherPassword.setCustomValidity("");
  }
}

watcherPassword.onchange = validatePassword;
reEnterWatcherPassword.onkeyup = validatePassword;

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
    checkLength(watcherFName.value, 1) &&
    checkLength(watcherLName.value, 1) &&
    validateEmail(watcherEmail.value)
  ) {
    watcherSignInButton.disabled = false;
  } else {
    watcherSignInButton.disabled = true;
  }
}

function submitForm(event) {
  event.preventDefault();

  if (!validateForm()) return;

  document.location.href = "home_page.html";
}

createWatcherForm.addEventListener("submit", submitForm);