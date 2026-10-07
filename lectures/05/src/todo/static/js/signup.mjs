import { signup } from "./api.mjs";

function onError(err) {
  console.error("[error]", err);
  const error_box = document.querySelector("#error_box");
  error_box.innerHTML = err.message;
  error_box.style.visibility = "visible";
}

document.querySelector("#signup").addEventListener("submit", function (e) {
  e.preventDefault();
  if (document.querySelector("form").checkValidity()) {
    const username = document.querySelector("form [name=username]").value;
    const password = document.querySelector("form [name=password]").value;
    signup(username, password, onError, function (username) {
      window.location.href = "/";
    });
  }
});
