var api = (function(){
    "use strict";
    
    var module = {};
    
    if (!localStorage.getItem('microblog')){
        localStorage.setItem('microblog', JSON.stringify({next: 0, messages: []}));
    }
    
    /*  ******* Data types *******
        message objects must have at least the following attributes:
            - (String) messageId 
            - (String) author
            - (String) content
            - (Int) upvote
            - (Int) downvote 
    
    ****************************** */ 
    
    module.addMessage = function(author, content){
        var data = JSON.parse(localStorage.getItem('microblog'));
        var message = {id: data.next++, author: author, content: content, upvote: 0, downvote: 0};
        data.messages.unshift(message);
        localStorage.setItem('microblog', JSON.stringify(data));
        return message;
    }
    
    module.deleteMessage = function(messageId){
        var data = JSON.parse(localStorage.getItem('microblog'));
        var index = data.messages.findIndex(function(message){
            return message.id == messageId;
        });
        if (index == -1) return null;
        var message = data.messages[index];
        data.messages.splice(index, 1);
        localStorage.setItem('microblog', JSON.stringify(data));
        return message;
    }
    
    module.upvoteMessage = function(messageId){
        var data = JSON.parse(localStorage.getItem('microblog'));
        var message = data.messages.find(function(message){
            return message.id == messageId;
        });
        message.upvote+=1;
        localStorage.setItem('microblog', JSON.stringify(data));
        return message;
    }
    
    module.downvoteMessage = function(messageId){
        var data = JSON.parse(localStorage.getItem('microblog'));
        var message = data.messages.find(function(message){
            return message.id == messageId;
        });
        message.downvote+=1;
        localStorage.setItem('microblog', JSON.stringify(data));
        return message;
    }
    
    module.getMessages = function(offset=0){
        var data = JSON.parse(localStorage.getItem('microblog'));
        return data.messages.slice(offset, offset+5);
    }
    
    return module;
})();