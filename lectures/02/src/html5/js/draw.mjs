// This code is inspired of
// "Create a Drawing App with HTML5 Canvas and JavaScript"
// by William Malone
// http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/

const canvas = document.querySelector("#drawing > canvas");
const context = canvas.getContext("2d");
let clickX = [];
let clickY = [];
let clickDrag = [];
let clickColor = [];
let paint = false;

const currentColor = "#000000";

function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(currentColor);
}

function redraw() {
  clearCanvas();
  context.lineJoin = "round";
  context.lineWidth = 5;
  for (let i = 0; i < clickX.length; i++) {
    if (clickDrag[i]) {
      context.beginPath();
      context.moveTo(clickX[i - 1], clickY[i - 1]);
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.strokeStyle = clickColor[i];
      context.stroke();
    }
  }
}

function redrawSlow(k) {
  setTimeout(function () {
    partialRedraw(k);
    if (k < clickX.length) redrawSlow(k + 1);
  }, 100);
}

function partialRedraw(k) {
  clearCanvas();
  context.lineJoin = "round";
  context.lineWidth = 5;
  for (let i = 0; i < clickX.length && i < k; i++) {
    if (clickDrag[i]) {
      context.beginPath();
      context.moveTo(clickX[i - 1], clickY[i - 1]);
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.strokeStyle = clickColor[i];
      context.stroke();
    }
  }
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function resetCanvas() {
  clickX = [];
  clickY = [];
  clickDrag = [];
  clearCanvas();
}

canvas.onmousedown = function (e) {
  const mouseX = e.pageX - this.offsetLeft;
  const mouseY = e.pageY - this.offsetTop;
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
  redraw();
};

canvas.onmousemove = function (e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
};

canvas.onmouseup = function (e) {
  paint = false;
};

canvas.onmouseleave = function (e) {
  paint = false;
};

document.querySelector("#drawing > #erase").onclick = resetCanvas;
document.querySelector("#drawing > #slow").onclick = function () {
  redrawSlow(0);
};
