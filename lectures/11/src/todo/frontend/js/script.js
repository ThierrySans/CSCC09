(function(api){
    "use strict";
    
    var updateMessages = function(messages){
        var ul = document.querySelector("#messages ul");
        ul.innerHTML = messages.reduce(function(content, message){
            content += `<li><span class='username'>${message.username}</span>${message.content}</li>`;
            return content;
        }, "");
    };
    
    // scheduler
    
    // (function scheduler(){
    //     api.getMessages(function(err, data){
    //         if (err) return console.err(err);
    //         updateMessages(data);
    //         setTimeout( scheduler, 3000);
    //     });
    // })();
      
    // event handlers
    document.getElementById("message_form").addEventListener("submit", function(e){
        e.preventDefault();
        var message = {};
        message.username = document.getElementById("username_input").value;
        message.content = document.getElementById("content_input").value;
        e.target.reset();
        api.addMessage(message, function(err, data){
            if (err) return console.err(err);
            updateMessages(data);
        });
    }); 

    document.getElementById("toggle_button").addEventListener("click", function(){
        var f1 = document.getElementById("username_form").style;
        f1.display = (f1.display === "") ? "flex" : "";
        var f2 = document.getElementById("message_form").style;
        f2.display = (f2.display === "") ? "flex" : "";
    }); 
    
})(api);
