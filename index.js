const form = document.getElementById("signup_form");
const getByID = (id) => document.getElementById(id).value.trim();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const userName = getByID("username");
  const email = getByID("email");
  const password = getByID("password");
  const confirmPassword = getByID("confirm-password");
  const errors = validateForm(userName, email, password, confirmPassword);
  if (Object.keys(errors).length == 0) {
    this.reset();
    console.log("Form is submitted");
  } else {
    const errorClasses = document.getElementsByClassName("error_message");
    let errorElm = document.getElementById("errors");
    let errorContainer = document.getElementById("error_container");
    errorElm.innerHTML = "";
    for (const currentClass of errorClasses) {
      currentClass.textContent = "";
    }
    for (const [key, value] of Object.entries(errors)) {
      const el = document.getElementById(key);
      el.textContent = value;
      el.classList.remove("hide");
      el.classList.add("show");
      el.classList.add("red");

      const listItem = document.createElement("li");
      listItem.textContent = value;
      errorElm.appendChild(listItem);
      errorContainer.classList.remove("hide");
      errorContainer.classList.add("show");
      errorContainer.classList.add("red");
    }
  }
});

function ValidateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

function validateForm(username, email, password, confirmPassword) {
  let errors = {};
  if (!ValidateEmail(email)) errors.invalid_email_error = "Email is not valid";
  if (username.length < 5)
    errors.username_length_error = "Username should be atleast of 5 characters";
  if (password.length < 8)
    errors.password_length_error =
      "Password length should be at least 8 characters";
  if (password !== confirmPassword)
    errors.password_not_match_error =
      "Passwords do not match. Please try again.";
  return errors;
}

function themeToggle() {
  let element = document.body;
  const classes = element.classList.contains("dark");
  if (!classes) {
    element.classList.add("dark");
  } else {
    element.classList.remove("dark");
  }
}
