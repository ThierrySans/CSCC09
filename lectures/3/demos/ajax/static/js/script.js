(function(){
    
    var updateView = function(){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE){
                var messages = JSON.parse(this.responseText);
                var container = document.getElementById("messages");
                container.innerHTML = "";
                messages.forEach(function(message){
                    var e = document.createElement('div');
                    e.className = "message";
                    e.innerHTML = `
                            <div class="author">${message.author}</div>
                            <div class="content">${message.content}</div>`;
                    // add this element to the document
                    container.prepend(e);
                });
            }
        };
        xhr.open("GET", "/api/messages/", true);
        xhr.send();
    };
    
    window.onload = function scheduler(e){
        setTimeout(function(e){
            updateView();
            scheduler();
        },2000);
    }
    
    document.getElementsByTagName("form")[0].onsubmit = function(e){
        e.preventDefault();
        var data = {};
        data.author = document.getElementsByTagName("input")[0].value;
        data.content = document.getElementsByTagName("textarea")[0].value;
        document.getElementsByTagName("form")[0].reset();
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE){
                var data = JSON.parse(this.responseText);
                updateView(data.id);
            }
        };
        xhr.open("POST", "/api/messages/", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    };
}())

