(function(){
    "use strict";
    
    function insertMessage(message){
        var elmt = document.createElement('div');
        elmt.className = "message";
        elmt.innerHTML=`
            <div class="message_user">
                <img class="message_picture" src="media/user.png" alt="${message.username}">
                <div class="message_username">${message.username}</div>
            </div>
            <div class="message_content">${message.content}</div>
        `;
        var username = api.getCurrentUser();
        if (username){
            elmt.innerHTML += `<div class="upvote-icon icon">${message.upvote}</div>
                               <div class="downvote-icon icon">${message.downvote}</div>`;
            if (username == message.username){
                elmt.innerHTML += `<div class="delete-icon icon"></div>`;
                elmt.querySelector(".delete-icon").addEventListener('click', function(){
                    api.deleteMessage(message._id, function(err, res){
                        if (err) console.log(err);
                        else refreshMessages();
                    });
                });
            }
            elmt.querySelector(".upvote-icon").addEventListener('click', function(){
                api.upvoteMessage(message._id, function(err, res){
                    if (err) console.log(err);
                    else refreshMessages();
                });
            });
            elmt.querySelector(".downvote-icon").addEventListener('click', function(){
                api.downvoteMessage(message._id, function(err, res){
                    if (err) console.log(err);
                    else refreshMessages();
                });
            });
        }
        document.querySelector("#messages").prepend(elmt);
    }
    
    function refreshMessages(){
        document.querySelector("#messages").innerHTML = "";
        api.getMessages(0, function(err, messages){
            if (err) console.log(err);
            else messages.forEach(insertMessage);
        });
    }
    
    window.addEventListener('load', function(){
        refreshMessages();
        if (!api.getCurrentUser()){
            document.querySelector('#signin_button').classList.remove('hidden');
        }else{
            document.querySelector('#signout_button').classList.remove('hidden');
            document.querySelector('form').classList.remove('hidden');
            document.querySelector('form').addEventListener('submit', function(e){
                e.preventDefault();
                var content = document.querySelector("form [name=content]").value;
                document.querySelector("form").reset();
                api.addMessage(content, function(err, message){
                    if (err) console.log(err);
                    else refreshMessages();
                });
            });
        }
    });
}())


