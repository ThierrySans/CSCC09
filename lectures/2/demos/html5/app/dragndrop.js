// This code sample is a modified version of
// http://html5demos.com/file-api

$(document).ready(function(){
    createDragNDropZone();
});

function createDragNDropZone(){
    var holder = $("#fileUploader")[0];

    holder.ondragstart = function(e){return false;};

    holder.ondragend = function(e){return false;};

    holder.ondragover = function(e){return false;};

    holder.ondragenter = function(e){return false;};

    holder.ondragleave = function(e){return false;};

    holder.ondrop = function(e) {
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            // as a CSS background
            // var img = $("#container1")[0];
            // img.style.background = 'url(' + e.target.result + ') no-repeat center';

            // as an HTML element
            $("#container1").append("<img src=\"" + e.target.result + "\"/>");
        };
        reader.readAsDataURL(file);
        return false;
    };
}