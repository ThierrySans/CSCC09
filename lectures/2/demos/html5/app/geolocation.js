$(document).ready(function(){
    $('#getgeo').click(getGeolocation);
});


function getGeolocation(){
    navigator.geolocation.getCurrentPosition(success);
}

function success(position) {
     var lat = position.coords.latitude;
     var long = position.coords.longitude;
     $('#latitude span').html(lat);
     $('#longitude span').html(long);
}