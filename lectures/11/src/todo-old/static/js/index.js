(function(){
    "use strict";
     
    function insertItem(item){
        var element = document.createElement('div');
        element.className = "item";
        element.id = item._id;
        element.innerHTML = `
            <div class="item_content">From <span class="owner">${item.owner}</span>: ${item.content}</div>
            <div class="delete-icon icon"></div>
        `;
         if (item.owner == api.getCurrentUser()){
             element.querySelector('.delete-icon').addEventListener('click', function(){
                 api.deleteItem(item._id, function(err, res){
                     if (err) console.error(err);
                     else refreshItems();
                 });
             }); 
        }else{
            element.querySelector('.delete-icon').classList.add('hidden');
        } 
        document.querySelector('#items').prepend(element);
    }
     
    function refreshItems(){
        document.querySelector('#items').innerHTML = '';
        api.getItems(function(err, res){
            if (err) console.error(err);
            else res.forEach(insertItem);
        });
    }
       
    window.addEventListener('load', function(){
        refreshItems();
        var username = api.getCurrentUser();
        if (username){
            document.querySelector('#signout').classList.remove('hidden');
            document.querySelector('#add_item').classList.remove('hidden');
        }else{
            document.querySelector('#signin').classList.remove('hidden');
            document.querySelector('#signup').classList.remove('hidden');
        }
        document.querySelector('#add_item').addEventListener('submit', function(e){
            e.preventDefault();
            var content = document.querySelector('#content_form').value;
            document.querySelector('#add_item').reset();
            api.addItem(content, function(err, res){
                if (err) console.error(err);
                else refreshItems();
            });
            
        });
    });
    
}());



