(function(model, view){
    
    // model events
    
    document.addEventListener('messageUpdated', function (e) {
        view.insertMessages(e.detail);
    });

    // views events

    document.addEventListener('documentLoaded', function (e) {
        model.init();
    });

    document.addEventListener('formSubmitted', function (e) {
         model.createMessage(e.detail);
    });
    
    document.addEventListener('deleteClicked', function (e) {
         model.deleteMessage(e.detail);
    });
    
    document.addEventListener('upvoteClicked', function (e) {
         model.upvoteMessage(e.detail);
    });
    
    document.addEventListener('downvoteClicked', function (e) {
         model.downvoteMessage(e.detail);
    });

}(model, view))

