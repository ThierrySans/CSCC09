(function(model,view){
    "use strict";
    
    document.addEventListener('onMessageSubmit', function(e){
        var message = e.detail;
        model.createMessage(message.username,message.content);
    });
    
    document.addEventListener('onMessageCreated', function(e){
        model.getMessages();
    });
    
    document.addEventListener('onNewMessages', function(e){
        var messages = e.detail;
        view.insertMessages(messages);
    });
    
    
}(model,view));