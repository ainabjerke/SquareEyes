const form = document.querySelector("#contactForm");
const fullName = document.querySelector("#fullName");
const fullNameError = document.querySelector("#fullNameError");
const address = document.querySelector("#address");
const addressError = document.querySelector("#addressError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const button = document.querySelector("button");
const textArea = document.querySelector("#textArea");
const textAreaError = document.querySelector("#textAreaError");

function validateForm() {
  let error = false;
  if (checkLength(fullName.value, 0) === true) {
    fullNameError.style.display = "none";
  } else {
    fullNameError.style.display = "block";
    error = true;
  }
  if (checkLength(address.value, 25) === true) {
    addressError.style.display = "none";
  } else {
    addressError.style.display = "block";
    error = true;
  }
  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
    error = true;
  }
  console.log("hello");

  if (checkLength(subject.value, 10) === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
    error = true;
  }

  if (checkLength(textArea.value, 0) === true) {
    textAreaError.style.display = "none";
  } else {
    textAreaError.style.display = "block";
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

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

function submitForm(event) {
  event.preventDefault();

  if (!validateForm()) return;

  message.innerHTML = '<div class="message">Your message has been sent</div>';

  form.reset();
}

form.addEventListener("submit", submitForm);