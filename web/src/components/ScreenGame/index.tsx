import { FC, useEffect, useRef, useState, MouseEvent } from 'react';
import api from '../../services/api';
import fillValue from '../../utils/fillValue';

interface gameProps {
  roomName: string | null;
  blocks: Array<number[]>;
  score: Array<string>;
  playerName: string;
  newPosition?: number | boolean;
  initGame: boolean;
  finished?: string | null;
}

const ScreenGame: FC = () => {
  const [matriz, setMatriz] = useState(3);
  const [game, setGame] = useState<gameProps>({
    roomName: '',
    blocks: [],
    score: [],
    playerName: '',
    initGame: false,
    finished: null,
  });
  const [gameName, setGameName] = useState<string>('');
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
    const blocks: Array<number[]> = [];
    const roomName = localStorage.getItem('roomName');
    if (!roomName) {
      return;
    }

    async function initialGame(): Promise<void> {
      const response = await api.post('continue', { name: roomName });
      if (response.status > 400) {
        return;
      }
      for (let i = 0; i < matriz; i++) {
        for (let j = 0; j < matriz; j++) {
          blocks.push([495 + i * 100 + 10, 170 + j * 100]);
        }
      }
      setGame({
        blocks,
        roomName,
        playerName: response.data.playerId === 1 ? 'x' : 'o',
        score: response.data.score,
        newPosition: response.data.newPosition,
        initGame: true,
      });
    }
    initialGame();
  }, [matriz]);
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
  }, [matriz, game]);

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
    if (game.newPosition === true) {
      game.blocks.forEach((value, index) => {
        if (game.score[index] !== '0') {
          fillValue(value[0], value[1], context, game.score[index]);
        }
      });
    }
  }, [game]);

  useEffect(() => {
    if (game.finished === 'venceu') {
      finished('voce venceu');
    } else if (game.finished === 'empate') {
      finished('empate');
    }
  }, [game.finished]);

  async function clickBlock(
    e: MouseEvent<HTMLCanvasElement>
  ): Promise<void | false> {
    if (game.finished) {
      return;
    }
    const context = canvasRef.current?.getContext('2d');

    game.blocks.forEach(async (value, index) => {
      if (
        value[0] <= e.clientX &&
        value[0] + 100 >= e.clientX &&
        value[1] <= e.clientY &&
        value[1] + 90 >= e.clientY
      ) {
        const response = await api.post('setValue', {
          name: game.roomName,
          position: index,
        });
        if (!response.data.score) {
          return;
        }
        setGame((props) => ({
          ...props,
          score: response.data.score,
          newPosition: response.data.newPosition,
          finished: response.data.finished,
        }));
        fillValue(value[0], value[1], context, game.playerName);
      }
    });
  }

  return (
    <>
      {game.initGame ? (
        <canvas
          onClick={(e) => clickBlock(e)}
          ref={canvasRef}
          width="1166"
          height="520"
        />
      ) : (
        <div>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          <button
            type="button"
            onClick={async () => {
              const response = await api.post('initGame', { name: gameName });
              if (!response) {
                console.log('sala já existe');
              }
              localStorage.setItem('roomName', response.data.roomName);
              setGame((props) => ({
                ...props,
                roomName: response.data.roomName,
                playerName: response.data.playerId === 1 ? 'x' : 'o',
                score: response.data.score,
                newPosition: response.data.newPosition,
                initGame: true,
              }));
            }}
          >
            entrar
          </button>
        </div>
      )}
    </>
  );
};

export default ScreenGame;
