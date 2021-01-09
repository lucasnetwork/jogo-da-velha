import {
  FC,
  useEffect,
  useRef,
  useState,
  MouseEvent,
  SetStateAction,
} from 'react';
import ticTacToeStruct, { waysToWin } from '../../utils/ticTacToeStruct';

const ScreenGame: FC = () => {
  const [matriz, setMatriz] = useState(3);
  const [blocks, setBlocks] = useState<Array<number[]>>([]);
  const [results, setResults] = useState<SetStateAction<Array<string>>>(
    ticTacToeStruct
  );
  const [chara, setChara] = useState('x');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function fillRow(
    x: number,
    y: number,
    canvas: CanvasRenderingContext2D | null | undefined,
    type: string
  ): void {
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
  }

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    const newBlocks: Array<[number, number]> = [];
    if (context?.fillStyle) {
      context.fillStyle = '#4B4B4B';
    }
    for (let i = 0; i <= matriz - 2; i++) {
      fillRow(600 + i * 100, 170, context, 'vertical');
    }
    for (let i = 0; i <= matriz - 2; i++) {
      fillRow(495, 260 + i * 100, context, 'horizontal');
    }
    for (let i = 0; i < matriz; i++) {
      const array: string[] = [];
      for (let j = 0; j < matriz; j++) {
        newBlocks.push([495 + i * 100 + 10, 170 + j * 100]);
      }
    }
    setBlocks(newBlocks);
  }, [matriz]);

  function fillX(x: number, y: number): void {
    const context = canvasRef.current?.getContext('2d');

    context?.beginPath();
    context?.lineTo(x + 20, y + 20);
    context?.lineTo(x + 70, y + 70);

    context?.stroke();

    context?.beginPath();
    context?.moveTo(x + 70, y + 20);
    context?.lineTo(x + 20, y + 70);

    context?.stroke();
  }

  function fillCircle(x: number, y: number): void {
    const context = canvasRef.current?.getContext('2d');
    context?.moveTo(x, y);
    context?.beginPath();
    context?.arc(x + 40, y + 40, 40, 0, Math.PI * 2);

    context?.stroke();
  }

  function clickBlock(e: MouseEvent<HTMLCanvasElement>): void {
    console.log(results);
    for (let i = 0; i < matriz * matriz; i++) {
      if (
        blocks[i][0] <= e.clientX &&
        blocks[i][0] + 100 >= e.clientX &&
        blocks[i][1] <= e.clientY &&
        blocks[i][1] + 90 >= e.clientY
      ) {
        if (chara === 'x') {
          // const newResults = results.map((blocks, index) => {
          //   if (index === i) {
          //     return chara;
          //   }
          // });
          fillX(blocks[i][0], blocks[i][1]);
        } else {
          fillCircle(blocks[i][0], blocks[i][1]);
        }
      }
    }
  }

  return (
    <canvas
      onClick={(e) => clickBlock(e)}
      ref={canvasRef}
      width="1166"
      height="520"
    />
  );
};

export default ScreenGame;
