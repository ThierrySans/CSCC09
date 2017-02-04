var view = (function(){
    "use strict";
    
    // UI events
    
    document.getElementById("create_message_form").onsubmit = function(e){
        // prevent from refreshing the page on submit
        e.preventDefault();
        // read form elements
        var message = {};
        message.username = document.getElementById("create_message_name").value;
        message.content = document.getElementById("create_message_content").value;
        // clean form 
        document.getElementById("create_message_form").reset();
        // send event
        var event = new CustomEvent('onMessageSubmit',{detail: message});
        console.log(event);
        document.dispatchEvent(event);
    };
    
    // View
    
    var view = {};
    
    view.insertMessage = function(message){
        var e = document.createElement('div');
        e.className = "message";
        e.innerHTML = `
                <div class="message_header">
                    <div class="message_avatar"><img src="media/user.png" alt="${message.username}"/></div>
                    <div class="message_name">${message.username}</div>
                </div>
                <div class="message_content">${message.content}</div>
                <div class="message_vote">
                    <div class="down_button vote_button">0</div>
                    <div class="up_button vote_button">0</div>
                </div>`;
        // add this element to the document
        document.getElementById("messages").prepend(e);
    };
    
    return view;
    
}());