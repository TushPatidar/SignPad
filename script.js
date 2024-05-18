document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("signatureCanvas");
  const context = canvas.getContext("2d");

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let penThickness = 2;

  function resizeCanvas() {
    const container = document.querySelector(".container");
    canvas.width = container.clientWidth;
    canvas.height = container.clientWidth * 0.5; // Maintain aspect ratio 2:1
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  canvas.addEventListener("touchstart", startDrawingTouch);
  canvas.addEventListener("touchmove", drawTouch);
  canvas.addEventListener("touchend", stopDrawing);

  document.getElementById("clearButton").addEventListener("click", clearCanvas);
  document.getElementById("downloadButton").addEventListener("click", downloadCanvas);

  document.getElementById("penThickness").addEventListener("change", function (e) {
    penThickness = parseInt(e.target.value);
  });

  function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  function draw(e) {
    if (!isDrawing) return;

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = "#000";
    context.lineWidth = penThickness;
    context.lineCap = "round";
    context.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  function startDrawingTouch(e) {
    isDrawing = true;
    [lastX, lastY] = [e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop];
    e.preventDefault();
  }

  function drawTouch(e) {
    if (!isDrawing) return;

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
    context.strokeStyle = "#000";
    context.lineWidth = penThickness;
    context.lineCap = "round";
    context.stroke();

    [lastX, lastY] = [e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop];
    e.preventDefault();
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function downloadCanvas() {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "signature.png";
    link.click();
  }
});
