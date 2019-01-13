// This code is inspired of
// "Create a Drawing App with HTML5 Canvas and JavaScript"
// by William Malone
// http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/

(function(){
    "use strict";
    
    var canvas;
    var context;
    var clickX = [];
    var clickY = [];
    var clickDrag = [];
    var clickColor = [];
    var paint = false;

    var currentColor = "#000000";

    var addClick = function(x, y, dragging)
    {
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);
      clickColor.push(currentColor);
    };

    var prepareCanvas = function(){
        canvas = document.querySelector('#drawing > canvas');
        context = canvas.getContext("2d");
        // clearCanvas();
        clickX = [];
        clickY = [];
        clickDrag = [];
        clickColor = [];

          canvas.onmousedown = function(e){
              var mouseX = e.pageX - this.offsetLeft;
              var mouseY = e.pageY - this.offsetTop;

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

    var redraw = function(){
      clearCanvas();
      context.lineJoin = "round";
      context.lineWidth = 5;
      for(var i=0; i < clickX.length; i++)
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

    var redrawSlow = function(k){
        setTimeout(function(){
            partialRedraw(k);
            if (k<clickX.length) redrawSlow(k+1);
        },100);
    };

    var partialRedraw = function(k){
      clearCanvas();
      context.lineJoin = "round";
      context.lineWidth = 5;
      for(var i=0; i < clickX.length && i < k; i++)
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

    var clearCanvas = function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    var resetCanvas = function(){
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




