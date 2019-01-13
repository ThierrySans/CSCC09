(function(){
    "use strict";
    
    function getGeolocation(){
        navigator.geolocation.getCurrentPosition(success);
    }

    function success(position) {
         let lat = position.coords.latitude;
         let long = position.coords.longitude;
         document.querySelector('#latitude span').innerHTML = lat;
         document.querySelector('#longitude span').innerHTML = long;
    }
    
    window.addEventListener('load', function(){
        document.getElementById('getgeo').onclick = getGeolocation;
    });
        
})();


