(function(model,view){
    "use strict";
    
    document.addEventListener('onMessageSubmit', function(e){
        var message = e.detail;
        model.createMessage(message.username,message.content);
    });
    
    document.addEventListener('onNewMessage', function(e){
        var message = e.detail;
        view.insertMessage(message);
    });
    
    
}(model,view));