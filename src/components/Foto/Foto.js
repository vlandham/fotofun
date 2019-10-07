import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import useWindowSize from "../../hooks/use-window-size";
import { useHotkeys } from "react-hotkeys-hook";
import { useCompare } from "../../hooks/use-compare";

import { bubbleSortImageData } from "../../utils/sorts";

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

function getDrawBox(image, width, height) {
  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;
  const widthRatio = width / imageWidth;
  const heightRatio = height / imageHeight;
  let ratio = widthRatio;
  if (widthRatio * imageHeight > height) {
    ratio = heightRatio;
  }
  const leftMargin = (width - imageWidth * ratio) / 2;
  const topMargin = (height - imageHeight * ratio) / 2;

  return {
    x: leftMargin,
    y: topMargin,
    width: imageWidth * ratio,
    height: imageHeight * ratio
  };
}

function drawLoadedImage(context, image, width, height) {
  const box = getDrawBox(image, width, height);
  context.clearRect(0, 0, width, height);
  context.drawImage(image, box.x, box.y, box.width, box.height);
}

function loadImage(context, imageUrl, width, height) {
  function loadDraw() {
    drawLoadedImage(context, this, width, height);
  }

  const image = new Image(width, height); // Using optional size for image
  image.onload = loadDraw; // Draw when image has loaded

  image.src = imageUrl;
  return image;
}

function zoomImage(context, image, zoomTransform, width, height) {
  const pixRatio = 1.0;
  context.save();
  context.translate(zoomTransform.x * pixRatio, zoomTransform.y * pixRatio);
  context.scale(zoomTransform.k, zoomTransform.k);
  drawLoadedImage(context, image, width, height);
  context.restore();
}

function invertImage(context, image, width, height) {
  console.log("pixels");
  const box = getDrawBox(image, width, height);
  const imageData = context.getImageData(box.x, box.y, box.width, box.height);
  const data = imageData.data;
  console.log(data);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i] ^ 255; // Invert Red
    data[i + 1] = data[i + 1] ^ 255; // Invert Green
    data[i + 2] = data[i + 2] ^ 255; // Invert Blue
  }
  context.putImageData(imageData, box.x, box.y);
}

function pixelSort(context, image, width, height) {
  const box = getDrawBox(image, width, height);
  console.log("width: ", box.width);
  console.log("height: ", box.height);
  const imageData = context.getImageData(box.x, box.y, box.width, box.height);
  const newImageData = bubbleSortImageData(imageData, context);
  context.putImageData(newImageData, box.x, box.y);
}

const Foto = ({ slide, mode, drawColor }) => {
  const size = useWindowSize();
  const canvasRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  const [image, setImage] = useState(null);

  const slideChange = useCompare(slide);
  const sizeChange = useCompare(size);

  // const position = useMousePosition();

  // initially load image
  useEffect(() => {
    console.log("effect");
    if (!image || slideChange || sizeChange) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const loadedImage = loadImage(context, slide, size.width, size.height);
      console.log("image", loadedImage);
      setImage(loadedImage);
    }
  }, [slide, size, image, slideChange, sizeChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (mode === "zoom") {
      function zoomed() {
        const newZoomTransform = d3.event.transform;
        // console.log("zoomed", newZoomTransform);
        zoomImage(context, image, newZoomTransform, size.width, size.height);
      }

      const zoom = d3
        .zoom()
        .scaleExtent([0.8, 8])
        .on("zoom", zoomed);
      d3.select(canvas).call(zoom);
    } else {
      d3.select(canvas).on(".zoom", null);
    }
  }, [mode, image, size]);

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

  // invert
  useHotkeys(
    "i",
    () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      invertImage(context, image, size.width, size.height);
    },
    [image, size, slide]
  );

  // pixel sort
  useHotkeys(
    "p",
    () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      pixelSort(context, image, size.width, size.height);
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
      context.fillStyle = drawColor;
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
