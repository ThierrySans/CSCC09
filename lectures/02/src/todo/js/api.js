var api = (function(){
    "use strict";
    
    var module = {};
    
    if (!localStorage.getItem('todo')){
        localStorage.setItem('todo', JSON.stringify({next: 0, items: []}));
    }
        
    /*  ******* Data types *******
        
        item objects must have at least the following attributes:
            - (String) itemId 
            - (String) content
    
    ****************************** */ 
    
    // add an item
    // return an item object
    module.addItem = function(content){
        var todo = JSON.parse(localStorage.getItem('todo'));
        var item = {id: todo.next++, content: content}
        todo.items.push(item);
        localStorage.setItem('todo', JSON.stringify(todo));
        return item;
    }
    
    // delete an item given its itemId
    module.deleteItem = function(itemId){
        var todo = JSON.parse(localStorage.getItem('todo'));
        var index = todo.items.findIndex(function(item){
            return item.id == itemId;
        });
        if (index == -1) return null;
        var item = todo.items[index];
        todo.items.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(todo));
        return item;
    }
    
    // get all items in the list
    // return an array of item objects
    module.getItems = function(){
       var todo = JSON.parse(localStorage.getItem('todo'));
       return todo.items;
    }
    
    return module;
}());