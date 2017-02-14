(function(){
    
    document.getElementById("form").onsubmit = function(e){
        e.preventDefault();
        var data = {};
        data.username = document.getElementById("username").value;
        data.password = document.getElementById("password").value;
        var url = document.getElementById("url").value;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE){
                if (this.status === 200) window.location = "/";
                else document.getElementById("message").innerHTML = "Wrong Password";
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(data));
    }
}())

