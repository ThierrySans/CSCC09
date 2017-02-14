(function(){
    
    window.onload = function(e){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE){
                document.getElementById("result").innerHTML = this.responseText;
            }
        };
        // same-origin example
        // xhr.open("GET", "/api/", true);
        // cross origin example
        // xhr.open("GET", "http://localhost:3001/api/", true);
        // xhr.open("GET", "http://localhost:3001/api/", true);
        xhr.send();
    }
}())

