// This code sample is a modified version of
// http://html5demos.com/file-api

let holder = document.getElementById("fileUploader");

holder.ondragstart = function (e) {
  return false;
};

holder.ondragend = function (e) {
  return false;
};

holder.ondragover = function (e) {
  return false;
};

holder.ondragenter = function (e) {
  return false;
};

holder.ondragleave = function (e) {
  return false;
};

holder.ondrop = function (e) {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    // as a CSS background
    // let img = $("#container1")[0];
    // img.style.background = 'url(' + e.target.result + ') no-repeat center';

    // as an HTML element
    const img = document.createElement("img");
    img.src = e.target.result;
    document.getElementById("container1").appendChild(img);
  };
  reader.readAsDataURL(file);
  return false;
};
