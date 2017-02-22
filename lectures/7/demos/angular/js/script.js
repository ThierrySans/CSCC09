var microblog = (function(){
    "use strict";
    
    var microblog = angular.module("microblog", []);

    microblog.controller("myController", function(){
            // console.log("Hello controller");
            this.messages = [{'username': 'John Doe', 'content':'Who am I?'}, 
                             {'username': 'Homer Simpson', 'content':'Doh!'}];
       
            this.addMessage = function (e){
                 // console.log(this.username);
                 // console.log(this.content);
                 this.messages.push({username:this.username, content:this.content});
                 this.content = "";
            };
    
            this.showForm = false;
    
            this.toggle = function (e){
                // console.log("Button clicked");
                this.showForm = !this.showForm;
            }
    
    });
    
    return microblog;
    
})();
