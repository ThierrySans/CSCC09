function success(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  document.querySelector("#latitude span").innerHTML = lat;
  document.querySelector("#longitude span").innerHTML = long;
}

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(success);
}

document.getElementById("getgeo").onclick = getGeolocation;
