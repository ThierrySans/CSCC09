(function(model){
    "use strict";
    
    var showError = function(message){
        var e = document.getElementById("error");
        e.innerHTML = `<span class="alert">${(message)}</span>`;
        e.style.display = "block";
    }
    
    var updateMessages = function(){
        model.getMessages(function(err, messages){
             if (err) return showError(err);
             model.getActiveUsername(function(err, username){
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
                    if (message.username!==username){
                        deleteButton.style.visibility = "hidden";
                    }
                    e.append(deleteButton);
                    // add this element to the document
                    container.prepend(e);
                });
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
        updateMessages();
    };
    
    document.getElementById("profile_button").onclick = function (e){
        window.location = "/profile.html";
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

