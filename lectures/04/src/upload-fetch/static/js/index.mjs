import { addUser, getUsers } from "./api.mjs";

function onError(err) {
  console.error("[error]", err);
  const error_box = document.querySelector("#error_box");
  error_box.innerHTML = err.message;
  error_box.style.visibility = "visible";
}

function update() {
  getUsers(onError, function (usernames) {
    document.querySelector("#users").innerHTML = "";
    usernames.forEach(function (username) {
      let element = document.createElement("div");
      element.className = "user";
      element.innerHTML = `
                 <div class="username">${username}</div>
                <img src="/api/users/${username}/profile/picture/"/>
            `;
      document.querySelector("#users").prepend(element);
    });
  });
}

document.querySelector("#add_user").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.querySelector(
    '#add_user input[name="username"]',
  ).value;
  const picture = document.querySelector('#add_user input[name="picture"]')
    .files[0];
  document.querySelector("#add_user").reset();
  addUser(username, picture, onError, update);
});

(function refresh() {
  update();
  setTimeout(refresh, 5000);
})();
