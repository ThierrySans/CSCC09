(function(){
    
    document.getElementById("ajaxForm").onsubmit = function(e){
        e.preventDefault();
        var data = document.getElementById("inputForm").value;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE){
                document.write(this.responseText);
            }
        };
        xhr.open("POST", "/api/", true);
        xhr.send(data);
    }
}())

