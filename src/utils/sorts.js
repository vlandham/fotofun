function comparePix(data, pix1Index, pix2Index) {
  const pix1Sum =
    data[pix1Index] +
    data[pix1Index + 1] +
    data[pix1Index + 2] +
    data[pix1Index + 3];
  const pix2Sum =
    data[pix2Index] +
    data[pix2Index + 1] +
    data[pix2Index + 2] +
    data[pix2Index + 3];

  // return pix1Sum > pix2Sum ? true : false;

  // if (pix1Sum === 0) {
  //   return false;
  // }
  // if (pix2Sum === 0) {
  //   return false;
  // }
  // return pix1Sum > pix2Sum;
  return Math.random() > 0.4;
}

export function bubbleSortImageData(imageData) {
  const data = imageData.data;
  const length = data.length - 4;
  console.log("num pix:", length / 4);
  do {
    var swapped = false;
    let swapCount = 0;
    for (let i = 0; i <= length; i += 4) {
      const nextPixIndex = i + 4;
      if (comparePix(data, i, nextPixIndex)) {
        swapCount += 1;
        let temp = data[i];
        data[i] = data[nextPixIndex];
        data[nextPixIndex] = temp;

        temp = data[i + 1];
        data[i + 1] = data[nextPixIndex + 1];
        data[nextPixIndex + 1] = temp;

        temp = data[i + 2];
        data[i + 2] = data[nextPixIndex + 2];
        data[nextPixIndex + 2] = temp;

        temp = data[i + 3];
        data[i + 3] = data[nextPixIndex + 3];
        data[nextPixIndex + 3] = temp;
        // swapped = true;
      }
    }
    console.log("swaps: ", swapCount);
  } while (swapped === true);
  // console.log("sort done");
  return imageData;
}
