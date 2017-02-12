(function(model){
    "use strict";
    
    var showError = function(message){
        var e = document.getElementById("error");
        e.innerHTML = `<span class="alert">${(message)}</span>`;
        e.style.display = "block";
    };
        
    document.getElementById("profile").onsubmit = function (e){
        e.preventDefault();
        var data = {};
        data.picture = document.getElementById("picture").files[0];
        model.updateUser(data, function(err, user){
            if (err) return showError(err);
            e.target.reset();
            window.location = "/";
        }); 
    };
    
}(model))

