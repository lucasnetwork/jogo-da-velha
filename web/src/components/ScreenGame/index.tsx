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
  const [row, setRow] = useState([4]);
  const [blocks, setBlocks] = useState<Array<number[]>>([[0, 0]]);
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
    if (context?.fillStyle) {
      context.fillStyle = '#4B4B4B';
    }
    for (let i = 0; i <= matriz - 2; i++) {
      fillRow(600 + i * 100, 170, context, 'vertical');
    }
    for (let i = 0; i <= matriz - 2; i++) {
      fillRow(495, 260 + i * 100, context, 'horizontal');
    }
    for (let i = 0; i <= matriz * matriz; i++) {
      setBlocks((props) => [...props, [495 + i * 100, 170 * i * 100]]);
    }
  }, []);

  // useEffect(() => {
  //   const context = canvasRef.current?.getContext('2d');
  //   if (context?.fillStyle) {
  //     context.fillStyle = '#4B4B4B';
  //   }
  //   context?.fillRect(
  //     0,
  //     0,
  //     Number(canvasRef.current?.width),
  //     Number(canvasRef.current?.height)
  //   );

  //   matriz.forEach((array, indexArray) => {
  //     array.forEach((value, index) => {
  //       context?.clearRect(
  //         (index + 1) * 200 + index * 10,
  //         indexArray * 200 + indexArray * 10,
  //         200,
  //         200
  //       );
  //       if (value === 'o') {
  //         context?.beginPath();
  //         context?.arc(
  //           (index + 1) * 200 + index * 10 + 100,
  //           indexArray * 200 + indexArray * 10 + 100,
  //           90,
  //           0,
  //           360
  //         );
  //         context?.stroke();
  //       } else if (value === 'x') {
  //         context?.beginPath();
  //         context?.lineTo(
  //           (index + 1) * 200 + (index + 1) * 10,
  //           indexArray * 200 + indexArray * 10 + 10
  //         );
  //         context?.lineTo(
  //           (index + 2) * 200 - (index + 1) * 10,
  //           (indexArray + 1) * 200 - (indexArray + 1 * 10)
  //         );

  //         context?.stroke();

  //         context?.beginPath();
  //         context?.moveTo(
  //           (index + 2) * 200 - (index + 1) * 10,
  //           indexArray * 200 + indexArray * 10 + 10
  //         );
  //         // context?.lineTo(
  //         //   (index + 1) * 200 + (index + 1) * 10,
  //         //   indexArray * 200 + indexArray * 10 + 10
  //         // );
  //         // context?.lineTo(
  //         //   (index + 1) * 200 + (index + 1) * 10,
  //         //   indexArray * 200 + indexArray * 10 + 10
  //         // );
  //         context?.lineTo(
  //           (index + 1) * 200 + (index + 1) * 10,
  //           (indexArray + 1) * 200 - (indexArray + 1 * 10)
  //         );

  //         context?.stroke();
  //       }
  //     });
  //   });

  //   const win = matriz.every((array, indexarray) => {
  //     return array.every((value, index) => {
  //       if (waysToWin[indexarray][index] === '1') {
  //         return true;
  //       }
  //       return value === waysToWin[indexarray][index];
  //     });
  //   });

  //   if (win) {
  //     console.log('voce vencer');
  //   }
  // }, [matriz]);

  function clickBlock(e: MouseEvent<HTMLCanvasElement>): void {
    // const blocksAux = [...matriz];
    // const newBlocks = blocksAux.map((row, indexArray) => {
    //   const array = row.map((value, index) => {
    //     if (
    //       (index + 1) * 200 + index * 10 < e.clientX &&
    //       (index + 2) * 200 + index * 10 > e.clientX &&
    //       (indexArray + 1) * 200 + indexArray * 10 > e.clientY &&
    //       indexArray * 200 + indexArray * 10 < e.clientY
    //     ) {
    //       return chara;
    //     }
    //     return value;
    //   });

    //   return array;
    // });

    // setBlocks(newBlocks);
    console.log('oi');
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
