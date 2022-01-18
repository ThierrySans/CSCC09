(function(){
    "use strict";
    
    // This code is inspired from
    // "Chroma Key Video Effects Using JavaScript and the HTML5 Canvas Element"
    // http://tech.pro/tutorial/1281/chroma-key-video-effects-using-javascript-and-the-html5-canvas-element

    let sourceVideo;
    let hiddenCanvas;
    let displayCanvas;
    let hiddenContext;
    let displayContext;

    let runAnalysis = function(){
        if(sourceVideo.paused || sourceVideo.ended){return;}
        frameConversion();
        if(window.requestAnimationFrame){
            requestAnimationFrame(runAnalysis);
        }
        else{
            setTimeout(runAnalysis,0);
        }
    };

    let frameConversion = function(){
        hiddenContext.drawImage(sourceVideo,0,0,sourceVideo.videoWidth, sourceVideo.videoHeight);
        let frame = hiddenContext.getImageData(0,0,sourceVideo.videoWidth, sourceVideo.videoHeight);
        let length = frame.data.length;
        for (let i =0; i <length; i++){
            let r = frame.data [i*4+ 0];
            let g = frame.data [i*4 + 1];
            let b = frame.data [i*4 + 2];
            if (g > 150 && r < 130){
                frame.data[i*4+ 3] = 0;
            }
        }
        displayContext.putImageData(frame, 0, 0);
        return;
    };

    let setGreenScreen = function(){
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
