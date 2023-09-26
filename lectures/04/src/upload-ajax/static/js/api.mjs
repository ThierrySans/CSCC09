function sendFiles(method, url, data, callback) {
  const formdata = new FormData();
  Object.keys(data).forEach(function (key) {
    const value = data[key];
    formdata.append(key, value);
  });
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status !== 200)
      callback("[" + xhr.status + "]" + xhr.responseText, null);
    else callback(null, JSON.parse(xhr.responseText));
  };
  xhr.open(method, url, true);
  xhr.send(formdata);
}

function send(method, url, data, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status !== 200)
      callback("[" + xhr.status + "]" + xhr.responseText, null);
    else callback(null, JSON.parse(xhr.responseText));
  };
  xhr.open(method, url, true);
  if (!data) xhr.send();
  else {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  }
}

export function addUser(username, picture, callback) {
  sendFiles(
    "POST",
    "/api/users/",
    { username: username, picture: picture },
    function (err, res) {
      if (err) return callback(err);
      return callback(null);
    },
  );
}

export function getUsers(callback) {
  send("GET", "/api/users/", null, callback);
}
