interface fillProps {
  (
    x: number,
    y: number,
    canvas: CanvasRenderingContext2D | null | undefined
  ): void;
}

interface fillValueProps {
  (
    x: number,
    y: number,
    canvas: CanvasRenderingContext2D | null | undefined,
    type: 'x' | 'o'
  ): void;
}

const fillX: fillProps = (x, y, canvas) => {
  canvas?.beginPath();
  canvas?.lineTo(x + 20, y + 20);
  canvas?.lineTo(x + 70, y + 70);

  canvas?.stroke();

  canvas?.beginPath();
  canvas?.moveTo(x + 70, y + 20);
  canvas?.lineTo(x + 20, y + 70);

  canvas?.stroke();
};

const fillCircle: fillProps = (x, y, canvas) => {
  canvas?.moveTo(x, y);
  canvas?.beginPath();
  canvas?.arc(x + 40, y + 40, 40, 0, Math.PI * 2);

  canvas?.stroke();
};
const fillValue: fillValueProps = (x, y, canvas, type) => {
  if (type === 'x') {
    fillX(x, y, canvas);
  } else {
    fillCircle(x, y, canvas);
  }
};

export default fillValue;
