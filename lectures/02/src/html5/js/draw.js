// This code is inspired of
// "Create a Drawing App with HTML5 Canvas and JavaScript"
// by William Malone
// http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/

(function(){
    "use strict";
    
    let canvas;
    let context;
    let clickX = [];
    let clickY = [];
    let clickDrag = [];
    let clickColor = [];
    let paint = false;

    let currentColor = "#000000";

    let addClick = function(x, y, dragging)
    {
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);
      clickColor.push(currentColor);
    };

    let prepareCanvas = function(){
        canvas = document.querySelector('#drawing > canvas');
        context = canvas.getContext("2d");
        // clearCanvas();
        clickX = [];
        clickY = [];
        clickDrag = [];
        clickColor = [];

          canvas.onmousedown = function(e){
              let mouseX = e.pageX - this.offsetLeft;
              let mouseY = e.pageY - this.offsetTop;

              paint = true;
              addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop,false);
              redraw();
        };

        canvas.onmousemove = function(e){
          if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
          }
        };

        canvas.onmouseup = function(e){
          paint = false;
        };

        canvas.onmouseleave = function(e){
          paint = false;
        };
    };

    let redraw = function(){
      clearCanvas();
      context.lineJoin = "round";
      context.lineWidth = 5;
      for(let i=0; i < clickX.length; i++)
          {
            if(clickDrag[i]){
                      context.beginPath();
                      context.moveTo(clickX[i-1], clickY[i-1]);
                      context.lineTo(clickX[i], clickY[i]);
                      context.closePath();
                      context.strokeStyle = clickColor[i];
                      context.stroke();
            }
          }
    };

    let redrawSlow = function(k){
        setTimeout(function(){
            partialRedraw(k);
            if (k<clickX.length) redrawSlow(k+1);
        },100);
    };

    let partialRedraw = function(k){
      clearCanvas();
      context.lineJoin = "round";
      context.lineWidth = 5;
      for(let i=0; i < clickX.length && i < k; i++)
          {
            if(clickDrag[i]){
                      context.beginPath();
                      context.moveTo(clickX[i-1], clickY[i-1]);
                      context.lineTo(clickX[i], clickY[i]);
                      context.closePath();
                      context.strokeStyle = clickColor[i];
                      context.stroke();
            }
          }
    };

    let clearCanvas = function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    let resetCanvas = function(){
        clickX=[];
        clickY=[];
        clickDrag=[];
        clearCanvas();
    };

    window.addEventListener('load', function(){
        prepareCanvas();
        document.querySelector("#drawing > #erase").onclick = resetCanvas;
        document.querySelector("#drawing > #slow").onclick = function(){redrawSlow(0);};
    });
    
})();




