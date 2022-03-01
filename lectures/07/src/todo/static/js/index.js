(function(){
    "use strict";
       
    window.addEventListener('load', function(){
        
        let username = api.getCurrentUser();
        if (username){
            document.querySelector('#signout').classList.remove('hidden');
            document.querySelector('#add_item').classList.remove('hidden');
        }else{
            document.querySelector('#signin').classList.remove('hidden');
            document.querySelector('#signup').classList.remove('hidden');
        }
        
        function onError(err){
            console.error("[error]", err);
            let error_box = document.querySelector('#error_box');
            error_box.innerHTML = err;
            error_box.style.visibility = "visible";
        };
        
        function update(){
            api.getItems(function(err, items){
                if (err) return onError(err);
                document.querySelector('#items').innerHTML = '';
                items.forEach(function(item){
                    let element = document.createElement('div');
                    element.className = "item";
                    element.innerHTML = `
                        <div class="item_content">${item.content}</div>
                        <div class="delete-icon icon"></div>
                    `;
                    element.querySelector('.delete-icon').addEventListener('click', function(e){
                      api.deleteItem(item._id, function(err){
                          if (err) return onError(err);
                          update();
                      });
                  }); 
                    document.querySelector('#items').prepend(element);
                });
            });
        };
        
        document.querySelector('#add_item').addEventListener('submit', function(e){
            e.preventDefault();
            let content = document.querySelector('#content_form').value;
            document.querySelector('#add_item').reset();
            api.addItem(content, function(err){
                if (err) return onError(err);
                update();
            });
        });
        
        update();
    });
    
}());



