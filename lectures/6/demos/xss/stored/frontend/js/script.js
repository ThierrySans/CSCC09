(function(){
    
    var doAjax = function(method, data, callback){
        var data = document.getElementById("inputForm").value;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (this.readyState === XMLHttpRequest.DONE){
                callback(null, this.responseText);
            };
        };
        xhr.open(method, "/api/", true);
        xhr.send((data)? data : null);
    }
    
    document.getElementById("ajaxForm").onsubmit = function(e){
        e.preventDefault();
        var data = document.getElementById("inputForm").value;
        doAjax("POST", data, function(err, data) {
                doAjax("GET", null, function(err, data){
                    document.write(data);
                });
        });
        
    }
}())

