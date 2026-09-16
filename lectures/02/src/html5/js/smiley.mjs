function drawSmiley(e) {
  // get the canvas
  const canvas = document.querySelector("#smiley > canvas");

  // use getContext to use the canvas for drawing
  const ctx = canvas.getContext("2d");

  // Draw shapes
  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
  ctx.moveTo(75, 75);
  ctx.lineTo(75, 90); // Nose
  ctx.fillRect(50, 50, 20, 5); // left eyebrow
  ctx.fillRect(80, 50, 20, 5); // right eyebrow
  ctx.stroke();
  ctx.closePath();
}

document.getElementById("draw_smiley").onclick = drawSmiley;
