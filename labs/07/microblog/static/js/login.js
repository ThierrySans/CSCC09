(function(){
    "use strict";
    
    window.addEventListener('load', function(){
        
        function submit(){
            console.log(document.querySelector("form").checkValidity());
            if (document.querySelector("form").checkValidity()){
                var username = document.querySelector("form [name=username]").value;
                var password =document.querySelector("form [name=password]").value;
                var action =document.querySelector("form [name=action]").value;
                api[action](username, password, function(err, res){
                    if (err) document.querySelector('.alert').innerHTML = err;
                    else window.location = '/';
                });
            }
        }
        
        document.querySelector('#signin').addEventListener('click', function(e){
            document.querySelector("form [name=action]").value = 'signin';
            submit();
        });
        
        document.querySelector('#signup').addEventListener('click', function(e){
            document.querySelector("form [name=action]").value = 'signup';
            submit();
        });
        
        document.querySelector('form').addEventListener('submit', function(e){
            e.preventDefault();
        });
    });
}())


