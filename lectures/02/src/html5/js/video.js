(function(){
    "use strict";
    
    // This code is inspired from
    // "Chroma Key Video Effects Using JavaScript and the HTML5 Canvas Element"
    // http://tech.pro/tutorial/1281/chroma-key-video-effects-using-javascript-and-the-html5-canvas-element

    var sourceVideo;
    var hiddenCanvas;
    var displayCanvas;
    var hiddenContext;
    var displayContext;

    var runAnalysis = function(){
        if(sourceVideo.paused || sourceVideo.ended){return;}
        frameConversion();
        if(window.requestAnimationFrame){
            requestAnimationFrame(runAnalysis);
        }
        else{
            setTimeout(runAnalysis,0);
        }
    };

    var frameConversion = function(){
        hiddenContext.drawImage(sourceVideo,0,0,sourceVideo.videoWidth, sourceVideo.videoHeight);
        var frame = hiddenContext.getImageData(0,0,sourceVideo.videoWidth, sourceVideo.videoHeight);
        var length = frame.data.length;
        for (var i =0; i <length; i++){
            var r = frame.data [i*4+ 0];
            var g = frame.data [i*4 + 1];
            var b = frame.data [i*4 + 2];
            if (g > 110 && g < 200 && r > 100 && r < 190 && b > 110 && b < 200){
                frame.data[i*4+ 3] = 0;
            }
        }
        displayContext.putImageData(frame, 0, 0);
        return;
    };

    var setGreenScreen = function(){
        sourceVideo = document.getElementById("sourceVideo");
        sourceVideo.crossOrigin = '';
        hiddenCanvas = document.getElementById("hiddenCanvas");
        displayCanvas = document.getElementById("displayCanvas");
        hiddenContext = hiddenCanvas.getContext("2d");
        displayContext = displayCanvas.getContext("2d");
        sourceVideo.addEventListener('play', function(){
                hiddenCanvas.width = sourceVideo.videoWidth;
                hiddenCanvas.height = sourceVideo.videoHeight;
                displayCanvas.width = sourceVideo.videoWidth;
                displayCanvas.height = sourceVideo.videoHeight;
                runAnalysis();
        });
    };

    window.addEventListener('load', setGreenScreen);
    
})();
