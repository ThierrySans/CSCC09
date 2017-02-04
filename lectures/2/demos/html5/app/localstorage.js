$(document).ready(function(){
    pullFromLocalStorage();
    $("#erase_storage").click(removeFromLocalStorage);
    $("#username").change(pushUsernameToLocalStorage);
    $("#comment").change(pushCommentToLocalStorage);
});

var pullFromLocalStorage = function(){
    var username = localStorage.getItem("username");
    var comment = localStorage.getItem("comment");
    console.log(username);
    if (username) $("#username").val(username);
    else $("#username").val("");
    if (comment) $("#comment").val(comment);
    else $("#comment").val("");
};

var pushUsernameToLocalStorage = function(e){
    var username = $("#username").val();
    localStorage.setItem("username", username);
};

var pushCommentToLocalStorage = function(e){
    var comment = $("#comment").val();
    localStorage.setItem("comment", comment);
};

var removeFromLocalStorage = function(){
   localStorage.removeItem("username");
   localStorage.removeItem("comment");
   pullFromLocalStorage();
};




