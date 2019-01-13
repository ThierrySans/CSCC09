// This code sample is a modified version of
// http://html5demos.com/file-api

(function(){
    "use strict";
    
    function createDragNDropZone(){
        var holder = document.getElementById("fileUploader");

        holder.ondragstart = function(e){return false;};

        holder.ondragend = function(e){return false;};

        holder.ondragover = function(e){return false;};

        holder.ondragenter = function(e){return false;};

        holder.ondragleave = function(e){return false;};

        holder.ondrop = function(e) {
            e.preventDefault();
            let file = e.dataTransfer.files[0];
            let reader = new FileReader();
            reader.onload = function (e) {
                // as a CSS background
                // var img = $("#container1")[0];
                // img.style.background = 'url(' + e.target.result + ') no-repeat center';

                // as an HTML element
                let img = document.createElement('img');
                img.src = e.target.result;
                document.getElementById("container1").appendChild(img);
            };
            reader.readAsDataURL(file);
            return false;
        };
    }
    
    window.addEventListener('load', createDragNDropZone);
    
})();

