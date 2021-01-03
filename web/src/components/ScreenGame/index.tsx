import { FC, useEffect, useRef } from 'react';

const ScreenGame: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    context?.fillRect(100, 50, 100, 100);
  }, []);
  return <canvas ref={canvasRef} width="1366" height="720" />;
};

export default ScreenGame;
