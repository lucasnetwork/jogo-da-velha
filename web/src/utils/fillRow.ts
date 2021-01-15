interface fillRowProps {
  (
    x: number,
    y: number,
    canvas: CanvasRenderingContext2D | null | undefined,
    type: string
  ): void;
}

const fillRow: fillRowProps = (
  x: number,
  y: number,
  canvas: CanvasRenderingContext2D | null | undefined,
  type: string
) => {
  if (type === 'horizontal') {
    canvas?.beginPath();
    canvas?.moveTo(x, y);
    canvas?.lineTo(x, y);
    canvas?.lineTo(x + 320, y);
    canvas?.lineTo(x + 320, y + 6);
    canvas?.arc(x + 320, y + 3, 3, (3 * Math.PI) / 2, Math.PI / 2, false);
    canvas?.lineTo(x + 320, y + 6);
    canvas?.lineTo(x, y + 6);
    canvas?.arc(x, y + 3, 3, Math.PI, 0, false);
    canvas?.moveTo(x, y);
    canvas?.closePath();
    canvas?.fill();
  } else {
    canvas?.beginPath();
    canvas?.moveTo(x, y);
    canvas?.lineTo(x, y);
    canvas?.lineTo(x, y + 300);
    canvas?.lineTo(x + 6, y + 300);
    canvas?.arc(x + 3, y + 300, 3, 0, Math.PI, false);
    canvas?.lineTo(x + 6, y + 300);
    canvas?.lineTo(x + 6, y);
    canvas?.arc(x + 3, y, 3, Math.PI, 0, false);
    canvas?.moveTo(x, y);
    canvas?.closePath();
    canvas?.fill();
  }
};

export default fillRow;
