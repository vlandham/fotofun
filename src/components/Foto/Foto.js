import React, { useRef, useEffect, useState } from "react";
import useWindowSize from "../../hooks/use-window-size";
import { useHotkeys } from "react-hotkeys-hook";

import "./Foto.scss";

// const getPixelRatio = context => {
//   const backingStore =
//     context.backingStorePixelRatio ||
//     context.webkitBackingStorePixelRatio ||
//     context.mozBackingStorePixelRatio ||
//     context.msBackingStorePixelRatio ||
//     context.oBackingStorePixelRatio ||
//     context.backingStorePixelRatio ||
//     1;

//   return (window.devicePixelRatio || 1) / backingStore;
// };

// function drawLoadedImage(context, image, width, height) {
//   const imageWidth = image.naturalWidth;
//   const imageHeight = image.naturalHeight;
//   const widthRatio = width / imageWidth;
//   const heightRatio = height / imageHeight;
//   let ratio = widthRatio;
//   if (widthRatio * imageHeight > height) {
//     ratio = heightRatio;
//   }
//   const leftMargin = (width - imageWidth * ratio) / 2;
//   const topMargin = (height - imageHeight * ratio) / 2;
//   context.clearRect(0, 0, width, height);
//   context.drawImage(
//     this,
//     leftMargin,
//     topMargin,
//     imageWidth * ratio,
//     imageHeight * ratio
//   );
// }

function loadImage(context, imageUrl, width, height) {
  function loadDraw() {
    const imageWidth = this.naturalWidth;
    const imageHeight = this.naturalHeight;
    const widthRatio = width / imageWidth;
    const heightRatio = height / imageHeight;
    let ratio = widthRatio;
    if (widthRatio * imageHeight > height) {
      ratio = heightRatio;
    }
    const leftMargin = (width - imageWidth * ratio) / 2;
    const topMargin = (height - imageHeight * ratio) / 2;
    context.clearRect(0, 0, width, height);
    context.drawImage(
      this,
      leftMargin,
      topMargin,
      imageWidth * ratio,
      imageHeight * ratio
    );
  }

  const image = new Image(width, height); // Using optional size for image
  image.onload = loadDraw; // Draw when image has loaded

  image.src = imageUrl;
  return image;
}

const Foto = ({ slide, mode }) => {
  const size = useWindowSize();
  const canvasRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  const [image, setImage] = useState(null);

  // initially load image
  useEffect(() => {
    console.log("effect");
    if (!image) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const loadedImage = loadImage(context, slide, size.width, size.height);
      setImage(loadedImage);
    }
  }, [slide, size, image]);

  // clear/reset image
  useHotkeys(
    "c",
    () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      loadImage(context, slide, size.width, size.height);
    },
    [image, size, slide]
  );

  // mouse down
  const handleMouseDown = e => {
    if (mode === "draw") {
      setIsDrawing(true);
    }
  };
  // mouse up
  const handleMouseUp = e => {
    if (mode === "draw") {
      setIsDrawing(false);
    }
  };

  // mouse move - for drawing.
  const handleMouseMove = e => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const drawX = e.clientX;
      const drawY = e.clientY;
      context.fillStyle = "black";
      context.fillRect(drawX, drawY, 5, 5);
    }
  };

  return (
    <div className="Foto">
      <canvas
        ref={canvasRef}
        width={size.width}
        height={size.height}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

export default Foto;
