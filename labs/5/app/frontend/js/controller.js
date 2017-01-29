(function(model, view){
    
    // scheduler
    
    (function scheduler(){
        setTimeout(function(e){
            model.getMessages();
            scheduler();
        },2000);
    }());
    
    // model events
    
    document.addEventListener('usersUpdated', function (e) {
        console.log(e);
        view.insertUsers(e.detail);
    });
    
    document.addEventListener('userUpdated', function (e) {
        console.log(e);
        model.getUsers();
    });
    
    document.addEventListener('messagesUpdated', function (e) {
        console.log(e);
        view.insertMessages(e.detail);
    });
    
    document.addEventListener('messageUpdated', function (e) {
        console.log(e);
        model.getMessages();
    });

    // views events

    document.addEventListener('documentLoaded', function (e) {
        console.log(e);
        model.init();
    });

    document.addEventListener('createUserRequest', function (e) {
         console.log(e);
         model.createUser(e.detail);
    });
    
    document.addEventListener('updateUserRequest', function (e) {
         console.log(e);
         model.updateUser(e.detail);
    });

    document.addEventListener('createMessageRequest', function (e) {
         console.log(e);
         model.createMessage(e.detail);
    });
    
    document.addEventListener('deleteMessageRequest', function (e) {
         console.log(e);
         model.deleteMessage(e.detail);
    });
    
    document.addEventListener('upvoteMessageRequest', function (e) {
         console.log(e);
         model.upvoteMessage(e.detail);
    });
    
    document.addEventListener('downvoteMessageRequest', function (e) {
         console.log(e);
         model.downvoteMessage(e.detail);
    });

}(model, view))

