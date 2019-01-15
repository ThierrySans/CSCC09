(function(){
    "use strict";
    
    let pullFromLocalStorage = function(){
        let username = localStorage.getItem("username");
        let comment = localStorage.getItem("comment");
        document.getElementById("username").value = (username)? username : "";
        document.getElementById("comment").value = (comment)? comment : "";
    };

    let pushUsernameToLocalStorage = function(e){
        let username = document.getElementById("username").value;
        localStorage.setItem("username", username);
    };

    let pushCommentToLocalStorage = function(e){
        let comment = document.getElementById("comment").value;
        localStorage.setItem("comment", comment);
    };

    let removeFromLocalStorage = function(){
       localStorage.removeItem("username");
       localStorage.removeItem("comment");
       pullFromLocalStorage();
    };

    window.addEventListener('load', function(){
        pullFromLocalStorage();
        document.getElementById("erase_storage").onclick = removeFromLocalStorage;
        document.getElementById("username").onchange = pushUsernameToLocalStorage;
        document.getElementById("comment").onchange = pushCommentToLocalStorage;
    });
    
})();




