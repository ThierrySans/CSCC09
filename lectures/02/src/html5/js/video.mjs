// This code is inspired from
// "Chroma Key Video Effects Using JavaScript and the HTML5 Canvas Element"
// http://tech.pro/tutorial/1281/chroma-key-video-effects-using-javascript-and-the-html5-canvas-element

let sourceVideo;
let hiddenCanvas;
let displayCanvas;
let hiddenContext;
let displayContext;

function runAnalysis() {
  if (sourceVideo.paused || sourceVideo.ended) {
    return;
  }
  frameConversion();
  if (window.requestAnimationFrame) {
    requestAnimationFrame(runAnalysis);
  } else {
    setTimeout(runAnalysis, 0);
  }
}

function frameConversion() {
  hiddenContext.drawImage(
    sourceVideo,
    0,
    0,
    sourceVideo.videoWidth,
    sourceVideo.videoHeight,
  );
  const frame = hiddenContext.getImageData(
    0,
    0,
    sourceVideo.videoWidth,
    sourceVideo.videoHeight,
  );
  const length = frame.data.length;
  for (let i = 0; i < length; i++) {
    const r = frame.data[i * 4 + 0];
    const g = frame.data[i * 4 + 1];
    const b = frame.data[i * 4 + 2];
    if (g > 150 && r < 130) {
      frame.data[i * 4 + 3] = 0;
    }
  }
  displayContext.putImageData(frame, 0, 0);
}

function setGreenScreen() {
  sourceVideo = document.getElementById("sourceVideo");
  sourceVideo.crossOrigin = "";
  hiddenCanvas = document.getElementById("hiddenCanvas");
  displayCanvas = document.getElementById("displayCanvas");
  hiddenContext = hiddenCanvas.getContext("2d", { willReadFrequently: true });
  displayContext = displayCanvas.getContext("2d");
  sourceVideo.addEventListener("play", function () {
    hiddenCanvas.width = sourceVideo.videoWidth;
    hiddenCanvas.height = sourceVideo.videoHeight;
    displayCanvas.width = sourceVideo.videoWidth;
    displayCanvas.height = sourceVideo.videoHeight;
    runAnalysis();
  });
}

window.addEventListener("load", setGreenScreen);
