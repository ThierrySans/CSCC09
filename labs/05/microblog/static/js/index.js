(function(){
    "use strict";
    
    function insertUsername(username){
        var elmt = document.createElement('option');
        elmt.value = username;
        elmt.innerHTML= username;
        document.querySelector("#post_username").prepend(elmt);
    }
    
    function refreshUsers(){
        document.querySelector("#post_username").innerHTML = "";
        api.getUsers(function(err, usernames){
            if (err) console.log(err);
            else{
                if (usernames.length === 0) document.querySelector("#welcome_message").classList.remove('hidden');
                else {
                    document.querySelector("#create_message_form").classList.remove('hidden');
                    usernames.forEach(insertUsername);
                }
            }
        });
    }
    
    function insertMessage(message){
        var elmt = document.createElement('div');
        elmt.className = "message";
        elmt.innerHTML=`
            <div class="message_user">
                <img class="message_picture" src="media/user.png" alt="${message.username}">
                <div class="message_username">${message.username}</div>
            </div>
            <div class="message_content">${message.content}</div>
            <div class="upvote-icon icon">${message.upvote}</div>
            <div class="downvote-icon icon">${message.downvote}</div>
            <div class="delete-icon icon"></div>
        `;
        elmt.querySelector(".delete-icon").addEventListener('click', function(){
            api.deleteMessage(message._id, function(err, message){
                if (err) console.log(err);
                else refreshMessages();
            });
        });
        elmt.querySelector(".upvote-icon").addEventListener('click', function(){
            api.upvoteMessage(message._id, function(err, message){
                if (err) console.log(err);
                else refreshMessages();
            });
        });
        elmt.querySelector(".downvote-icon").addEventListener('click', function(){
            api.downvoteMessage(message._id, function(err, message){
                if (err) console.log(err);
                else refreshMessages();
            });
        });
        document.querySelector("#messages").prepend(elmt);
    }
    
    function refreshMessages(){
        document.querySelector("#messages").innerHTML = "";
        api.getMessages(0, function(err, messages){
            if (err) console.log(err);
            else messages.reverse().forEach(insertMessage);
        });
    }
    
    window.addEventListener('load', function(){
        refreshMessages();
        refreshUsers();
        document.querySelector('#create_message_form').addEventListener('submit', function(e){        
            e.preventDefault();
            var username = document.querySelector("#post_username").value;
            var content = document.querySelector("#post_content").value;
            document.getElementById("create_message_form").reset();
            console.log(username, content);
            api.addMessage(username, content, function(err, message){
                if (err) console.log(err);
                else refreshMessages();
            });
        });    
    });
}())


