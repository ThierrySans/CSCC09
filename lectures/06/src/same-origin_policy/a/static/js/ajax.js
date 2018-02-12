(function(){
    
    window.onload = function(e){
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            document.getElementById("result").innerHTML = this.responseText;
        };
        // same-origin example
        // xhr.open("GET", "/", true);
        // CORS
        xhr.open("GET", "http://localhost:3001/", true);
        // CORS with credentials
        xhr.withCredentials = true;
        xhr.send();
    }
}())

