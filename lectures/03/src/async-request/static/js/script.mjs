function ajaxURIEncoded(content, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status !== 200) { callback("[" + xhr.status + "]" + xhr.responseText, null); }
    else { callback(null, xhr.responseText); }
  };
  xhr.open("POST", "/uri", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(encodeURI("content=" + content));
}

function ajaxJSONEncoded(content, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status !== 200) { callback("[" + xhr.status + "]" + xhr.responseText, null); }
    else { callback(null, JSON.parse(xhr.responseText)); }
  };
  xhr.open("POST", "/json", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ content: content }));
}

function fetchJson(content, success, failure){
	fetch("/json", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({ content: content }),
	})
	.then(function(response){
		if (response.status != 200) { throw new Error("Status: " + reponse.status); }
		else { return response.json(); }
	})
	.then(success)
	.catch(failure)
}

document
  .querySelector("#with-ajax-uri")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const content = document.querySelector(
      "#with-ajax-uri input[name='content']",
    ).value;
    ajaxURIEncoded(content, function (err, res) {
      if (err) console.error(err);
      else document.querySelector("#content").innerHTML = res;
    });
  });

document
  .querySelector("#with-ajax-json")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const content = document.querySelector(
      "#with-ajax-json input[name='content']",
    ).value;
    ajaxJSONEncoded(content, function (err, res) {
      if (err) console.error(err);
      else document.querySelector("#content").innerHTML = res;
    });
  });
  
document
  .querySelector("#with-fetch-json")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const content = document.querySelector(
      "#with-fetch-json input[name='content']",
    ).value;
    fetchJson(content, function success(res){
    	document.querySelector("#content").innerHTML = res;
    }, function failure(error) {
      console.error(error);
    });
  });
