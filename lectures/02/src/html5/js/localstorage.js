(function(){
    "use strict";
    
    var pullFromLocalStorage = function(){
        var username = localStorage.getItem("username");
        var comment = localStorage.getItem("comment");
        document.getElementById("username").value = (username)? username : "";
        document.getElementById("comment").value = (comment)? comment : "";
    };

    var pushUsernameToLocalStorage = function(e){
        var username = document.getElementById("username").value;
        localStorage.setItem("username", username);
    };

    var pushCommentToLocalStorage = function(e){
        var comment = document.getElementById("comment").value;
        localStorage.setItem("comment", comment);
    };

    var removeFromLocalStorage = function(){
       localStorage.removeItem("username");
       localStorage.removeItem("comment");
       pullFromLocalStorage();
    };

    window.onload = function(){
        pullFromLocalStorage();
        document.getElementById("erase_storage").onclick = removeFromLocalStorage;
        document.getElementById("username").onchange = pushUsernameToLocalStorage;
        document.getElementById("comment").onchange = pushCommentToLocalStorage;
    }
    
})();




