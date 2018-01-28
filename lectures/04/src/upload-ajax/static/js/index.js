(function(){
    "use strict";
        
    function insert(username){
        var element = document.createElement('div');
        element.className = "user";
        element.innerHTML = `
             <div class="username">${username}</div>
            <img src="/api/users/${username}/profile/picture/"/>
        `;
        document.querySelector('#users').prepend(element);
    }
        
    window.addEventListener('load', function(){
        api.getUsers(function(err, users){
            if (err) console.log(err);
            else users.forEach(insert);
        });
        
        document.querySelector('#add_user').addEventListener('submit', function(e){
            e.preventDefault();
            var username = document.querySelector('#add_user input[name="username"]').value;
            var picture = document.querySelector('#add_user input[name="picture"]').files[0];
            api.addUser(username, picture, function(err, username){
                if (err) console.log(err);
                else insert(username);
            });
        });
    });
    
}());



