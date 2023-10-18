
document.getElementById("ajaxForm").onsubmit = function(e){
    e.preventDefault();
    const data = document.getElementById("inputForm").value;
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        document.write(this.responseText);
    };
    xhr.open("POST", "/api/", true);
    xhr.send(data);
}

