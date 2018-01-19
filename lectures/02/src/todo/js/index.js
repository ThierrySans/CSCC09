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
            api.deleteItem(item.id);
            element.parentNode.removeChild(element);
        }); 
        document.querySelector('#items').prepend(element);
    }
        
    window.addEventListener('load', function(){
        api.getItems().forEach(insertItem);
        document.querySelector('#add_item').addEventListener('submit', function(e){
            e.preventDefault();
            var content = document.querySelector('#content_form').value;
            var item = api.addItem(content);
            insertItem(item);
        });
    });
    
}());



