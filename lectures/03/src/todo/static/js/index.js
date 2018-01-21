(function(){
    "use strict";
        
    function insertItem(item){
        var element = document.createElement('div');
        element.className = "item";
        element.innerHTML = `
            <div class="item_content">${item.content}</div>
            <div class="delete-icon icon"></div>
        `;
          element.querySelector('.delete-icon').addEventListener('click', function(){
            api.deleteItem(item.id, function(err, res){
                if (err) console.error(err);
                else element.parentNode.removeChild(element);
            });
        }); 
        document.querySelector('#items').prepend(element);
    }
        
    window.addEventListener('load', function(){
        api.getItems(function(err, res){
            if (err) console.error(err);
            else res.forEach(insertItem);
        });
        document.querySelector('#add_item').addEventListener('submit', function(e){
            e.preventDefault();
            var content = document.querySelector('#content_form').value;
            document.querySelector('#add_item').reset();
            api.addItem(content, function(err, res){
                if (err) console.error(err);
                else insertItem(res);
            });
        });
    });
    
}());



