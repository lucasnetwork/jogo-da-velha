import { FC, useEffect, useRef, useState, MouseEvent } from 'react';
import ticTacToeStruct, { waysToWin } from '../../utils/ticTacToeStruct';

const ScreenGame: FC = () => {
  const [blocks, setBlocks] = useState(ticTacToeStruct);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context?.fillStyle) {
      context.fillStyle = '#4B4B4B';
    }
    context?.fillRect(
      0,
      0,
      Number(canvasRef.current?.width),
      Number(canvasRef.current?.height)
    );

    blocks.forEach((array, indexArray) => {
      array.forEach((value, index) => {
        context?.clearRect(
          (index + 1) * 200 + index * 10,
          indexArray * 200 + indexArray * 10,
          200,
          200
        );
        if (value === 'o') {
          context?.beginPath();
          context?.arc(
            (index + 1) * 200 + index * 10 + 100,
            indexArray * 200 + indexArray * 10 + 100,
            90,
            0,
            360
          );
          context?.stroke();
        }
      });
    });

    const win = blocks.every((array, indexarray) => {
      return array.every((value, index) => {
        if (waysToWin[indexarray][index] === '1') {
          return true;
        }
        return value === waysToWin[indexarray][index];
      });
    });

    if (win) {
      console.log('voce vencer');
    }
  }, [blocks]);

  function clickBlock(e: MouseEvent<HTMLCanvasElement>): void {
    const blocksAux = [...blocks];
    const newBlocks = blocksAux.map((row, indexArray) => {
      const array = row.map((value, index) => {
        if (
          (index + 1) * 200 + index * 10 < e.clientX &&
          (index + 2) * 200 + index * 10 > e.clientX &&
          (indexArray + 1) * 200 + indexArray * 10 > e.clientY &&
          indexArray * 200 + indexArray * 10 < e.clientY
        ) {
          return 'o';
        }
        return value;
      });

      return array;
    });

    setBlocks(newBlocks);
  }

  return (
    <canvas
      onClick={(e) => clickBlock(e)}
      ref={canvasRef}
      width="1366"
      height="720"
    />
  );
};

export default ScreenGame;
