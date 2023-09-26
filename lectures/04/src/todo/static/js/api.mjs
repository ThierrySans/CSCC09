function send(method, url, data, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status !== 200)
      return callback("(" + xhr.status + ")" + xhr.responseText, null);
    return callback(null, JSON.parse(xhr.responseText));
  };
  xhr.open(method, url, true);
  if (!data) xhr.send();
  else {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  }
}

export function addItem(content, callback) {
  send("POST", "/api/items/", { content: content }, function (err, res) {
    if (err) return callback(err);
    return callback(null);
  });
}

export function deleteItem(itemId, callback) {
  send("DELETE", "/api/items/" + itemId + "/", null, function (err, res) {
    if (err) return callback(err);
    return callback(null);
  });
}

export function getItems(callback) {
  send("GET", "/api/items/", null, callback);
}
