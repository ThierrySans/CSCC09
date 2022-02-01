(function(){
    "use strict";
        
    window.addEventListener('load', function(){
        
        function onError(err){
            console.error("[error]", err);
            let error_box = document.querySelector('#error_box');
            error_box.innerHTML = err;
            error_box.style.visibility = "visible";
        };
        
        function update(){
            api.getUsers(function(err, usernames){
                if (err) return onError(err);
                document.querySelector('#users').innerHTML = '';
                usernames.forEach(function(username){
                    let element = document.createElement('div');
                    element.className = "user";
                    element.innerHTML = `
                         <div class="username">${username}</div>
                        <img src="/api/users/${username}/profile/picture/"/>
                    `;
                    document.querySelector('#users').prepend(element);
                });
            });
        };
        
        document.querySelector('#add_user').addEventListener('submit', function(e){
            e.preventDefault();
            let username = document.querySelector('#add_user input[name="username"]').value;
            let picture = document.querySelector('#add_user input[name="picture"]').files[0];
            document.querySelector('#add_user').reset();
            api.addUser(username, picture, function(err){
                if (err) return onError(err);
                update();
            });
        });
        
        (function refresh(){
            update();
            setTimeout(refresh, 5000);
        }());
        
    });
    
}());



