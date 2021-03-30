var api = require('./api.js');

(function(){
    "use strict";

    function setDeleteButton (element){
        var owner = element.querySelector('.owner').innerHTML;
        if (owner == api.getCurrentUser()){
            element.querySelector('.delete-icon').addEventListener('click', function(){
                api.deleteItem(element.id, function(err, res){
                    if (err) console.error(err);
                });
            });
        }else{
            element.querySelector('.delete-icon').classList.add('hidden');
        } 
    }
     
    function insertItem (item){
        var element = document.createElement('div');
        element.className = "item";
        element.id = item._id;
        element.innerHTML = `
            <div class="item_content">From <span class="owner">${item.owner}</span>: ${item.content}</div>
            <div class="delete-icon icon"></div>
        `;
        setDeleteButton(element);
        document.querySelector('#items').prepend(element);
    }
     
    function refreshItems (){
        api.getItems(function(err, res){
            document.querySelector('#items').innerHTML = '';
            if (err) console.error(err);
            else res.reverse().forEach(insertItem);
            refreshItems()
        });
    };
       
    window.addEventListener('load', function(){
        var elements = document.querySelectorAll('.item > .delete-icon');
        [].forEach.call(elements, function (element){
            setDeleteButton(element.parentNode);
        });
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
            });
            
        });
        refreshItems();
    });
    
}());



