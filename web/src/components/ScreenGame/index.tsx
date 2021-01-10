import { FC, useEffect, useRef, useState, MouseEvent } from 'react';
import ticTacToeStruct, { waysToWin } from '../../utils/ticTacToeStruct';
import fillValue from '../../utils/fillValue';

const ScreenGame: FC = () => {
  const [matriz, setMatriz] = useState(3);
  const [blocks, setBlocks] = useState<Array<number[]>>([]);
  const [results, setResults] = useState<Array<string>>(ticTacToeStruct);
  const [chara, setChara] = useState<'x' | 'o'>('o');
  const [win, setWin] = useState<null | boolean>(null);
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
      for (let j = 0; j < matriz; j++) {
        newBlocks.push([495 + i * 100 + 10, 170 + j * 100]);
      }
    }
    setBlocks(newBlocks);
  }, [matriz]);
  useEffect(() => {
    setChara('x');
  }, [chara]);

  function finished(text: string): void {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas?.width && context?.font) {
      context.font = '40px Georgia';
      context?.clearRect(0, 0, canvas.width, canvas.height);
      context?.fillText(text, canvas.width / 2, canvas.height / 2);
    }
  }

  useEffect(() => {
    let winAux: null | boolean = false;
    const existEmptyFields = results.find((value) => value === '0');

    waysToWin.forEach((array) => {
      if (winAux) {
        return;
      }
      const winOrLose = results.every((value, index) => {
        if (array[index] === '0') {
          return true;
        }

        return value === chara;
      });
      winAux = winOrLose || null;
      setWin(winAux);
    });

    if (!existEmptyFields && !winAux) {
      finished('empate');
    }
  }, [results, chara, win]);

  useEffect(() => {
    if (win) {
      finished('voce venceu');
    } else if (win === false) {
      finished('voce perdeu');
    }
  }, [win]);

  function clickBlock(e: MouseEvent<HTMLCanvasElement>): void {
    if (win) {
      return;
    }
    const context = canvasRef.current?.getContext('2d');
    for (let i = 0; i < matriz * matriz; i++) {
      if (
        blocks[i][0] <= e.clientX &&
        blocks[i][0] + 100 >= e.clientX &&
        blocks[i][1] <= e.clientY &&
        blocks[i][1] + 90 >= e.clientY
      ) {
        if (results[i] !== '0') {
          return;
        }
        const newResults = results.map((value, index) => {
          if (index === i) {
            return chara;
          }
          return value;
        });
        setResults(newResults);
        fillValue(blocks[i][0], blocks[i][1], context, chara);
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
