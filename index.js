document.addEventListener("DOMContentLoaded", function () {
  try {
    const canvas = document.getElementById("drawingCanvas");
    const context = canvas.getContext("2d");

    if (!canvas || !context) return;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hue = 0;
    let brushSize = 10;
    let shapeSize = 50; // Default shape size
    let isEraser = false;
    let isLine = false;
    let isRectangle = false;
    let isCircle = false;
    let isEllipse = false;
    let isTriangle = false;

    function draw(e) {
      if (!isDrawing) return;

      context.strokeStyle = isEraser ? "#ffffff" : `hsl(${hue}, 100%, 50%)`;
      context.lineWidth = brushSize;
      context.lineCap = "round";

      if (isLine) {
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
      } else if (isRectangle) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeRect(lastX, lastY, e.offsetX - lastX, e.offsetY - lastY);
      } else if (isCircle) {
        const radius = shapeSize / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(lastX, lastY, radius, 0, Math.PI * 2);
        context.stroke();
      } else if (isEllipse) {
        const width = shapeSize;
        const height = shapeSize / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.ellipse(lastX, lastY, width / 2, height / 2, 0, 0, Math.PI * 2);
        context.stroke();
      } else if (isTriangle) {
        const halfSize = shapeSize / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(lastX + shapeSize, lastY);
        context.lineTo(lastX + halfSize, lastY - shapeSize);
        context.closePath();
        context.stroke();
      } else {
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
      }

      [lastX, lastY] = [e.offsetX, e.offsetY];
      hue = (hue + 1) % 360;
    }

    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("mouseup", () => (isDrawing = false));

    canvas.addEventListener("mouseout", () => (isDrawing = false));

    document
      .getElementById("colorPicker")
      .addEventListener("change", function () {
        context.strokeStyle = this.value;
      });

    document.getElementById("eraser").addEventListener("click", function () {
      isEraser = true;
      isLine = false;
      isRectangle = false;
      isCircle = false;
      isEllipse = false;
      isTriangle = false;
    });

    document.getElementById("lineTool").addEventListener("click", function () {
      isLine = true;
      isRectangle = false;
      isCircle = false;
      isEllipse = false;
      isTriangle = false;
      isEraser = false;
    });

    document
      .getElementById("rectangleTool")
      .addEventListener("click", function () {
        isRectangle = true;
        isLine = false;
        isCircle = false;
        isEllipse = false;
        isTriangle = false;
        isEraser = false;
      });

    document
      .getElementById("circleTool")
      .addEventListener("click", function () {
        isCircle = true;
        isRectangle = false;
        isLine = false;
        isEllipse = false;
        isTriangle = false;
        isEraser = false;
      });

    document
      .getElementById("ellipseTool")
      .addEventListener("click", function () {
        isEllipse = true;
        isCircle = false;
        isRectangle = false;
        isLine = false;
        isTriangle = false;
        isEraser = false;
      });

    document
      .getElementById("triangleTool")
      .addEventListener("click", function () {
        isTriangle = true;
        isEllipse = false;
        isCircle = false;
        isRectangle = false;
        isLine = false;
        isEraser = false;
      });

    document
      .getElementById("clearCanvas")
      .addEventListener("click", function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
      });

    document
      .getElementById("saveCanvas")
      .addEventListener("click", function () {
        const link = document.createElement("a");
        link.download = "drawing.png";
        link.href = canvas.toDataURL();
        link.click();
      });

    document.getElementById("brushSize").addEventListener("input", function () {
      brushSize = this.value;
    });

    document.getElementById("shapeSize").addEventListener("input", function () {
      shapeSize = this.value;
    });
  } catch (error) {
    console.error("Initialization error: ", error);
  }
});
