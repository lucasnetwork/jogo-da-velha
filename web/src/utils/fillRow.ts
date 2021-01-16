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
    canvas?.moveTo(x + 6, y);
    canvas?.lineTo(x + 6, y);
    canvas?.lineTo(x + 320, y);
    canvas?.lineTo(x + 320, y + 6);
    canvas?.arc(x + 320, y + 3, 3, (3 * Math.PI) / 2, Math.PI / 2, false);
    canvas?.lineTo(x + 320, y + 6);
    canvas?.lineTo(x + 6, y + 6);
    canvas?.arc(x + 6, y + 3, 3, Math.PI, 0, false);
    canvas?.moveTo(x + 6, y);
    canvas?.closePath();
    canvas?.fill();
  } else {
    canvas?.beginPath();
    canvas?.moveTo(x, y + 6);
    canvas?.lineTo(x, y + 6);
    canvas?.lineTo(x, y + 320);
    canvas?.lineTo(x + 6, y + 320);
    canvas?.arc(x + 3, y + 320, 3, 0, Math.PI, false);
    canvas?.lineTo(x + 6, y + 320);
    canvas?.lineTo(x + 6, y + 6);
    canvas?.arc(x + 3, y + 6, 3, Math.PI, 0, false);
    canvas?.moveTo(x, y + 6);
    canvas?.closePath();
    canvas?.fill();
  }
};

export default fillRow;
