import { FC, useEffect, useRef, useState, MouseEvent } from 'react';
import { io } from 'socket.io-client';
import fillValue from '../../utils/fillValue';
import { P } from './styles';

interface gameProps {
  roomName: string | null;
  playerName: string;
  score: Array<string>;
  newPosition: number;
  initGame: boolean;
  winner: string;
  turn: string;
  blocks: Array<number[]>;
}

interface responseProps {
  roomName: string;
  playerName: string;
  score: Array<string>;
  newPosition: number;
  initGame: true;
  winner: string;
  turn: string;
}

const ScreenGame: FC = () => {
  const [matriz] = useState(3);
  const [game, setGame] = useState<gameProps>({
    roomName: '',
    blocks: [],
    score: [],
    newPosition: -1,
    playerName: '',
    initGame: false,
    winner: '0',
    turn: '',
  });
  const [gameName, setGameName] = useState<string>('');
  const [socket] = useState(() => io('http://localhost:3333'));
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
    socket.on('valueGame', (response: responseProps) => {
      if (!response) {
        return;
      }

      setGame((props) => {
        const playerName =
          props.playerName === '' ? response.playerName : props.playerName;
        return {
          ...props,
          roomName: response.roomName,
          playerName,
          score: response.score,
          newPosition: response.newPosition,
          initGame: true,
          winner: response.winner,
          turn: response.turn,
        };
      });
    });
  }, [socket]);

  useEffect(() => {
    const blocks: Array<number[]> = [];
    for (let i = 0; i < matriz; i++) {
      for (let j = 0; j < matriz; j++) {
        blocks.push([495 + i * 100 + 10, 170 + j * 100]);
      }
    }
    setGame((props) => ({
      ...props,
      blocks,
    }));
  }, [matriz]);

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
  }, [matriz, game.initGame]);

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
    const context = canvasRef.current?.getContext('2d');

    if (game.score.length === 0) {
      return;
    }
    if (game.newPosition !== -2) {
      game.blocks.forEach((value, index) => {
        if (game.score[index] !== '0') {
          fillValue(
            game.blocks[index][0],
            game.blocks[index][1],
            context,
            game.score[index]
          );
        }
      });
    }
  }, [game]);

  useEffect(() => {
    if (game.winner === '0') {
      return;
    }
    if (game.winner === game.playerName) {
      finished('voce venceu');
    } else if (game.winner === 'empate') {
      finished('empate');
    } else {
      finished('voce perdeu');
    }
  }, [game.winner, game.playerName]);

  async function clickBlock(
    e: MouseEvent<HTMLCanvasElement>
  ): Promise<void | false> {
    if (game.winner !== '0' || game.turn !== game.playerName) {
      return;
    }

    game.blocks.forEach(async (value, index) => {
      if (
        value[0] <= e.clientX &&
        value[0] + 100 >= e.clientX &&
        value[1] <= e.clientY &&
        value[1] + 90 >= e.clientY
      ) {
        socket.emit('setValue', game.roomName, index, game.playerName);
      }
    });
  }

  return (
    <>
      {game.initGame ? (
        <>
          <P>
            player:
            {game.playerName}
          </P>
          <canvas
            onClick={(e) => clickBlock(e)}
            ref={canvasRef}
            width="1166"
            height="520"
          />
        </>
      ) : (
        <div>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              socket.emit('initGame', gameName);
            }}
          >
            entrar
          </button>
          <button
            type="button"
            onClick={() => {
              socket.emit('continueGame', gameName);
            }}
          >
            open
          </button>
        </div>
      )}
    </>
  );
};

export default ScreenGame;
