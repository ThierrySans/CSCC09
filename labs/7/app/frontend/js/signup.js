(function(model){
    "use strict";
    
    var showError = function(message){
        var e = document.getElementById("error");
        e.innerHTML = `<span class="alert">${(message)}</span>`;
        e.style.display = "block";
    };
    
    document.getElementById("signup").onsubmit = function (e){
        e.preventDefault();
        var data = {};
        data.username = document.getElementById("username").value;
        data.password = document.getElementById("password").value;
        if (data.username.length>0 && data.password.length>0){
            model.createUser(data,function(err,user){
                if (err) return showError(err);
                e.target.reset();
                window.location = '/signin.html';
            });
        }
    };
    
}(model))

