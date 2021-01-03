import { FC, useEffect, useRef } from 'react';
import ticTacToeStruct from '../../utils/ticTacToeStruct';

const ScreenGame: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    ticTacToeStruct.forEach((array, indexArray) => {
      array.forEach((value, index) => {
        context?.fillRect(
          (index + 1) * 200 + index * 10,
          indexArray * 200 + indexArray * 10,
          200,
          200
        );
      });
    });
  }, []);
  return (
    <canvas
      onClick={(e) => console.log(e)}
      ref={canvasRef}
      width="1366"
      height="720"
    />
  );
};

export default ScreenGame;
