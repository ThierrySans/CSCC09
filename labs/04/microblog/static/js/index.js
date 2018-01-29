(function(){
    "use strict";
    
    function insertMessage(message){
        var elmt = document.createElement('div');
        elmt.className = "message";
        elmt.innerHTML=`
            <div class="message_user">
                <img class="message_picture" src="media/user.png" alt="${message.auhtor}">
                <div class="message_username">${message.author}</div>
            </div>
            <div class="message_content">${message.content}</div>
            <div class="upvote-icon icon">${message.upvote}</div>
            <div class="downvote-icon icon">${message.downvote}</div>
            <div class="delete-icon icon"></div>
        `;
        elmt.querySelector(".delete-icon").addEventListener('click', function(){
            api.deleteMessage(message.id);
            refreshMessages();
        });
        elmt.querySelector(".upvote-icon").addEventListener('click', function(){
            api.upvoteMessage(message.id);
            refreshMessages();
        });
        elmt.querySelector(".downvote-icon").addEventListener('click', function(){
            api.downvoteMessage(message.id);
            refreshMessages();
        });
        document.querySelector("#messages").prepend(elmt);
    }
    
    function refreshMessages(){
        document.querySelector("#messages").innerHTML = "";
        api.getMessages().reverse().forEach(insertMessage);
    }
    
    window.addEventListener('load', function(){
        refreshMessages();
        document.querySelector('#create_message_form').addEventListener('submit', function(e){        
            e.preventDefault();
            var author = document.getElementById("post_name").value;
            var content = document.getElementById("post_content").value;
            document.getElementById("create_message_form").reset();
            api.addMessage(author, content);
            refreshMessages();
        });    
    });
}())


