(function(){
    
     window.onload = function(e){
         var data = document.location.href.substring(document.location.href.indexOf("default=")+8);
         document.write(data);
     };
}())

