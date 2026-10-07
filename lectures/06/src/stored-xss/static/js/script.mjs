function send(method, data, callback){
    const xhr = new XMLHttpRequest();
    xhr.onload = function(){
        callback(null, this.responseText);
    };
    xhr.open(method, "/api/", true);
    xhr.send((data)? data : null);
}

document.getElementById("ajaxForm").onsubmit = function(e){
    e.preventDefault();
    const data = document.getElementById("inputForm").value;
	fetch("/api/", { method: "POST", body: data })
	.then(function(response){
		return response.text();
	})
	.then(function(res){
		 document.write(res);
	})
}

