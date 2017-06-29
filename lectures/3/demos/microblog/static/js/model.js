var model = (function(){
    "use strict";
        
    var model = {};
    
    function run(){
        setTimeout(function(e){
            model.getMessages();
            run();
        },2000);
    };
    run();
   
    
    model.createMessage = function (username, content){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            switch(this.readyState){
                case (XMLHttpRequest.DONE):
                    if (this.status === 200) {
                        // var id = this.responseText;
                        document.dispatchEvent(new CustomEvent('onMessageCreated',{detail: null}));
                    }
                    break;
            }
        };
        xhttp.open("POST", "/api/messages/", true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        var data = {content: content, author: username};
        xhttp.send(JSON.stringify(data));
    };
    
    // Read
    
    model.getMessages = function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            switch(this.readyState){
                case (XMLHttpRequest.DONE):
                    if (this.status === 200) {
                        var messages = JSON.parse(this.responseText);
                        document.dispatchEvent(new CustomEvent('onNewMessages',{detail: messages}));
                    }
                    break;
            }
        };
        xhttp.open("GET", "/api/messages/", true);
        xhttp.send();
    };
    
    return model;
    
}());