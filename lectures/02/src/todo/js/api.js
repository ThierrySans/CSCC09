let api = (function(){
    "use strict";
    
    let module = {};
    
    if (!localStorage.getItem('todo')){
        localStorage.setItem('todo', JSON.stringify({next: 0, items: []}));
    }
        
    /*  ******* Data types *******
        
        item objects must have at least the following attributes:
            - (String) itemId 
            - (String) content
    
    ****************************** */ 
    
    // add an item
    module.addItem = function(content){
        let todo = JSON.parse(localStorage.getItem('todo'));
        let item = {id: todo.next++, content: content}
        todo.items.push(item);
        localStorage.setItem('todo', JSON.stringify(todo));
        notifyItemListeners();
    }
    
    // delete an item given its itemId
    module.deleteItem = function(itemId){
        let todo = JSON.parse(localStorage.getItem('todo'));
        let index = todo.items.findIndex(function(item){
            return item.id == itemId;
        });
        if (index == -1) return null;
        let item = todo.items[index];
        todo.items.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(todo));
        notifyItemListeners();
    }
    
    // get all items
    module.getItems = function(){
        let todo = JSON.parse(localStorage.getItem('todo'));
        return todo.items;
    }
    
    let itemListeners = [];
    
    // notify all item listeners
    function notifyItemListeners(){
        itemListeners.forEach(function(listener){
            listener(api.getItems());
        });
    }
    
    // register an item listener
    module.onItemUpdate = function(listener){
        itemListeners.push(listener);
        listener(api.getItems());
    }
    
    return module;
}());