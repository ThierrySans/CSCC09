function pullFromLocalStorage() {
  const username = localStorage.getItem("username");
  const comment = localStorage.getItem("comment");
  document.getElementById("username").value = username ? username : "";
  document.getElementById("comment").value = comment ? comment : "";
}

function pushUsernameToLocalStorage(e) {
  const username = document.getElementById("username").value;
  localStorage.setItem("username", username);
}

function pushCommentToLocalStorage(e) {
  const comment = document.getElementById("comment").value;
  localStorage.setItem("comment", comment);
}

function removeFromLocalStorage() {
  localStorage.removeItem("username");
  localStorage.removeItem("comment");
  pullFromLocalStorage();
}

pullFromLocalStorage();
document.getElementById("erase_storage").onclick = removeFromLocalStorage;
document.getElementById("username").onchange = pushUsernameToLocalStorage;
document.getElementById("comment").onchange = pushCommentToLocalStorage;
