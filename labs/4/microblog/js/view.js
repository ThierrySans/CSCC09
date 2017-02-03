var view = (function(){
    "use strict";
    
    window.onload = function scheduler(e){
        document.dispatchEvent(new Event("documentLoaded"));
    };
    
    document.getElementsByTagName("form")[0].onsubmit = function (e){
        e.preventDefault();
        var data = {};
        data.author = document.getElementsByTagName("input")[0].value;
        data.content = document.getElementsByTagName("textarea")[0].value;
        if (data.author.length>0 && data.content.length>0){
            document.getElementsByTagName("form")[0].reset();
            document.dispatchEvent(new CustomEvent("formSubmitted", {'detail': data }));
        }
    };

    var deleteHandler = function(e){
        console.log(e.target);
    }
    
    var view = {};
    
    view.insertMessages = function (messages){
        var container = document.getElementById("messages");
        container.innerHTML = "";
        messages.forEach(function (message){
            // create the message element
            var e = document.createElement('div');
            e.className = "message";
            e.id = message.id;
            e.innerHTML = `
                    <div class="author">${message.author}</div>
                    <div class="content">${message.content}</div>`;
            // add upvote button
            var upvoteButton = document.createElement('div');
            upvoteButton.className = "upvote-icon icon";
            upvoteButton.innerHTML = message.upvote;
            upvoteButton.onclick = function (e){
                 document.dispatchEvent(new CustomEvent("upvoteClicked", {'detail': parseInt(e.target.parentNode.id)}));
            };
            e.append(upvoteButton);
            // add downvote button
            var downvoteButton = document.createElement('div');
            downvoteButton.innerHTML = message.downvote;
            downvoteButton.className = "downvote-icon icon";
            downvoteButton.onclick = function (e){
                 document.dispatchEvent(new CustomEvent("downvoteClicked", {'detail': parseInt(e.target.parentNode.id)}));
            };
            e.append(downvoteButton);
            // add delete button
            var deleteButton = document.createElement('div');
            deleteButton.className = "delete-icon icon";
            deleteButton.onclick = function (e){
                 document.dispatchEvent(new CustomEvent("deleteClicked", {'detail': parseInt(e.target.parentNode.id)}));
            };
            e.append(deleteButton);            
            // add this element to the document
            container.prepend(e);
        });
    };
    
    return view;
    
}())

