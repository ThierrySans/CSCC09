(function(model){
    "use strict";
        
    var navigate = function(id){
        var containers = document.getElementsByClassName("container");
        Array.prototype.forEach.call(containers, function(e){
            e.style.display = (id === e.id)? "block" : "none";
        });
        if (id === "main"){
            updateMessages();
        }
    };
    
    var showError = function(message){
        var e = document.getElementById("error");
        e.innerHTML = `<span class="alert">${(message)}</span>`;
        e.style.display = "block";
    }
    
    var updateMessages = function(){
        model.getMessages(function(err, messages){
            if (err) return showError(err);
            var container = document.getElementById("messages");
            container.innerHTML = "";
            messages.forEach(function (message){
                // create the message element
                var e = document.createElement('div');
                e.className = "message";
                e.id = message._id;
                e.innerHTML = `
                            <div class='message_user'>
                 <object class="message_picture" data='${message.picture}' type='${message.mimetype}'>
                    <img src='/media/user.png'/>
                  </object>
                                <div class='message_username'>${message.username}</div>
                            </div>
                            <div class='message_content'>${message.content}</div>
                </div>`;
                // add upvote button
                var upvoteButton = document.createElement('div');
                upvoteButton.className = "upvote-icon icon";
                upvoteButton.innerHTML = message.upvote;
                upvoteButton.onclick = function (e){
                     model.upvoteMessage(e.target.parentNode.id, function(err){
                         if (err) return showError(err);
                         updateMessages();
                     });
                };
                e.append(upvoteButton);
                // add downvote button
                var downvoteButton = document.createElement('div');
                downvoteButton.innerHTML = message.downvote;
                downvoteButton.className = "downvote-icon icon";
                downvoteButton.onclick = function (e){
                    model.downvoteMessage(e.target.parentNode.id, function(err){
                        if (err) return showError(err);
                        updateMessages();
                    });
                };
                e.append(downvoteButton);
                // add delete button
                var deleteButton = document.createElement('div');
                deleteButton.className = "delete-icon icon";
                deleteButton.onclick = function (e){
                    model.deleteMessage(e.target.parentNode.id, function(err){
                        if (err) return showError(err);
                        updateMessages();
                    });
                };
                e.append(deleteButton);
                // add this element to the document
                container.prepend(e);
            });
        });
    };
    
    (function scheduler(){
        setTimeout(function(e){
            updateMessages
            scheduler();
        },2000);
    }());
    
    window.onload = function scheduler(e){
        document.getElementById("signin_button").style.display = "block";
        document.getElementById("signup_button").style.display = "block";
        navigate("main");
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
        model.signOut(function(err){
            if (err) return showError(err);
            document.getElementById("post_form").style.display = "none";
            document.getElementById("signout_button").style.display = "none";
            document.getElementById("profile_button").style.display = "none";
            document.getElementById("signin_button").style.display = "block";
            document.getElementById("signup_button").style.display = "block";
            navigate("main");
        })
    };
    
    document.getElementById("profile_button").onclick = function (e){
        navigate("profile");
    };
    
    document.getElementById("signup_form").onsubmit = function (e){
        e.preventDefault();
        var data = {};
        data.username = document.getElementById("signup_username").value;
        data.password = document.getElementById("signup_password").value;
        if (data.username.length>0 && data.password.length>0){
            model.signUp(data,function(err,user){
                if (err) return showError(err);
                e.target.reset();
                navigate("main");
            });
        }
    };
    
    document.getElementById("signin_form").onsubmit = function (e){
        e.preventDefault();
        var data = {};
        data.username = document.getElementById("signin_username").value;
        data.password = document.getElementById("signin_password").value;
        if (data.username.length>0 && data.password.length>0){
            model.signIn(data,function(err, user){
                if (err) return showError(err);
                e.target.reset();
                document.getElementById("post_form").style.display = "flex";
                document.getElementById("signout_button").style.display = "block";
                document.getElementById("profile_button").style.display = "block";
                document.getElementById("signin_button").style.display = "none";
                document.getElementById("signup_button").style.display = "none";
                navigate("main");
            });
        }
    };
    
    document.getElementById("profile_form").onsubmit = function (e){
        e.preventDefault();
        var data = {};
        data.picture = document.getElementById("profile_picture").files[0];
        model.updateUser(data, function(err, user){
            if (err) return showError(err);
            e.target.reset();
            navigate("main");
        }); 
    };
    
    document.getElementById("post_form").onsubmit = function (e){
        e.preventDefault();
        var data = {};
        data.content = document.getElementById("post_content").value;
        if (data.content.length>0){
            model.createMessage(data, function(err){
                 if (err) return showError(err);
                 e.target.reset();
                 updateMessages();
            });
        }
    };
    
}(model))

