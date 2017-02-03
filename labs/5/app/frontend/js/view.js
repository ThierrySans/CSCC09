var view = (function(){
    "use strict";
    
    var activeUser;
    
    var navigate = function(id){
        var containers = document.getElementsByClassName("container");
        Array.prototype.forEach.call(containers, function(e){
            e.style.display = (id === e.id)? "block" : "none";
        });
    };
    
    var signin = function(username){
        activeUser = username;
        document.getElementById("post_form").style.display = "flex";
        document.getElementById("signout_button").style.display = "block";
        document.getElementById("profile_button").style.display = "block";
        document.getElementById("signin_button").style.display = "none";
        document.getElementById("signup_button").style.display = "none";
    };
    
    var signout = function(){
        activeUser = null;
        document.getElementById("post_form").style.display = "none";
        document.getElementById("signout_button").style.display = "none";
        document.getElementById("profile_button").style.display = "none";
        document.getElementById("signin_button").style.display = "block";
        document.getElementById("signup_button").style.display = "block";
        document.getElementById("signin_username").options[0].selected = true;
    };
    
    var getSelectedUsername = function(){
        var e = document.getElementById("signin_username");
        var index = e.selectedIndex;
        return (index>-1)? e.options[index].value : null;
    };
    
    window.onload = function scheduler(e){
        signout();
        navigate("main");
        document.dispatchEvent(new Event("documentLoaded"));
    };
    
    document.getElementById("title").onclick = function (e){
        navigate("main");
    };
    
    document.getElementById("signup_button").onclick = function (e){
        navigate("signup");
    };
    
    document.getElementById("signin_button").onclick = function (e){
        navigate("signin");
    };
    
    document.getElementById("signout_button").onclick = function (e){
        signout();
        navigate("main");
    };
    
    document.getElementById("profile_button").onclick = function (e){
        navigate("profile");
    };
    
    document.getElementById("signin_username").onchange = function (e){
        var index = e.target.selectedIndex;
        var username = (index>-1)? e.target.options[index].value : null;
        signin(username);
        navigate("main");
    };
    
    document.getElementById("signup_form").onsubmit = function (e){
        e.preventDefault();
        var data = {};
        data.username = document.getElementById("signup_username").value;
        if (data.username.length>0){
            e.target.reset();
            document.dispatchEvent(new CustomEvent("createUserRequest", {'detail': data}));
            signin(data.username);
            navigate("main");
        }

    };
    
    document.getElementById("profile_form").onsubmit = function (e){
        e.preventDefault();
        var data = {};
        data.username = activeUser;
        data.picture = document.getElementById("profile_picture").files[0];
        if (data.username){
            e.target.reset();
            document.dispatchEvent(new CustomEvent("updateUserRequest", {'detail': data }));
            navigate("main");
        }
    };
    
    document.getElementById("post_form").onsubmit = function (e){
        e.preventDefault();
        var data = {};
        data.username = activeUser;
        data.content = document.getElementById("post_content").value;
        if (data.username && data.content.length>0){
            e.target.reset();
            document.dispatchEvent(new CustomEvent("createMessageRequest", {'detail': data }));
            navigate("main");
        }
    };
    
    var view = {};
    
    view.insertUsers = function(users){
        var selector = document.getElementById("signin_username");
        var first = selector.options[0];
        selector.innerHTML = "";
        selector.appendChild(first);
        for(var i in users){
            var option = document.createElement("option");
            option.innerHTML = users[i].username;
            option.value = users[i].username;
            option.selected = (users[i].username === activeUser);
            selector.appendChild(option);
        }
    }
    
    view.insertMessages = function (messages){
        var container = document.getElementById("messages");
        container.innerHTML = "";
        messages.forEach(function (message){
            // create the message element
            var e = document.createElement('div');
            e.className = "message";
            e.id = message.id;
            e.innerHTML = `
                        <div class='message_user'>
                            <div class='message_picture'></div>
                            <div class='message_username'>${message.username}</div>
                        </div>
                        <div class='message_content'>${message.content}</div>
                        </div>`;
            // add image
            var imageContainer = e.querySelector(".message_picture");
            if ('picture' in message){
                var img = new Image();
        		img.src = message.picture;
                imageContainer.append(img);
            }else{
                imageContainer.className += " default_picture";
            }
            // add upvote button
            var upvoteButton = document.createElement('div');
            upvoteButton.className = "upvote-icon icon";
            upvoteButton.innerHTML = message.upvote;
            upvoteButton.onclick = function (e){
                 document.dispatchEvent(new CustomEvent("upvoteMessageRequest", {'detail': e.target.parentNode.id}));
            };
            e.append(upvoteButton);
            // add downvote button
            var downvoteButton = document.createElement('div');
            downvoteButton.innerHTML = message.downvote;
            downvoteButton.className = "downvote-icon icon";
            downvoteButton.onclick = function (e){
                 document.dispatchEvent(new CustomEvent("downvoteMessageRequest", {'detail': e.target.parentNode.id}));
            };
            e.append(downvoteButton);
            // add delete button
            var deleteButton = document.createElement('div');
            deleteButton.className = "delete-icon icon";
            deleteButton.onclick = function (e){
                 document.dispatchEvent(new CustomEvent("deleteMessageRequest", {'detail': e.target.parentNode.id}));
            };
            e.append(deleteButton);            
            // add this element to the document
            container.prepend(e);
        });
    };
    
    return view;
    
}())

