(function(){
    var canvas;
    var ctx;

    var drawImage = function(){
        canvas = document.querySelector("#grayscale > canvas");
        ctx = canvas.getContext("2d");
        var img = document.createElement('img');
        img.crossOrigin = '';
        img.src = 'uploads/Bart_Simpson.png';
        img.onload = function(){
            ctx.drawImage(this,0,0,this.width,this.height,0,0,canvas.width,canvas.height);
        };
    };

    // This code is inspired from
    // "HTML5 Canvas Grayscale Image Colors Tutorial"
    // http://www.html5canvastutorials.com/advanced/html5-canvas-grayscale-image-colors-tutorial/
    var makeItGray = function(){
            var imageData = ctx.getImageData(0, 0, canvas.width,canvas.height);
            var data = imageData.data;
            for(var i = 0; i < data.length; i += 4) {
                var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
                data[i] = brightness;
                data[i + 1] = brightness;
                data[i + 2] = brightness;
            }
            // overwrite original image
            ctx.putImageData(imageData, 0, 0);
    };
    
   window.addEventListener('load', function(){
        drawImage();
        document.querySelector("#grayscale > #gray").onclick = makeItGray;
    });
    
})();

