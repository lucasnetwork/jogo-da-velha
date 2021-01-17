import { FC, useEffect, useRef, useState, MouseEvent } from 'react';
import { io } from 'socket.io-client';
import fillValue from '../../utils/fillValue';
import fillRow from '../../utils/fillRow';
import Container, { Button, ContainerInputs } from './styles';

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
        blocks.push([
          100 * i + (6 * (i + 1)) / (i + 1),
          j * 100 + (6 * (j + 1)) / (j + 1),
        ]);
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
      fillRow(100 + i * 100, 0, context, 'vertical');
    }
    for (let i = 0; i <= matriz - 2; i++) {
      fillRow(0, 100 + i * 100, context, 'horizontal');
    }
  }, [matriz, game.initGame]);

  function finished(text: string): void {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas?.width && context?.font) {
      context.font = '40px Georgia';
      context?.clearRect(0, 0, canvas.width, canvas.height);
      context?.fillText(text, 0, canvas.height / 2);
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
    if (!canvasRef.current?.offsetLeft && !canvasRef.current?.offsetTop) {
      return;
    }
    const pageX = e.clientX - canvasRef.current?.offsetLeft;
    const pageY = e.clientY - canvasRef.current?.offsetTop;

    game.blocks.forEach(async (value, index) => {
      if (
        value[0] <= pageX &&
        value[0] + 100 >= pageX &&
        value[1] <= pageY &&
        value[1] + 90 >= pageY
      ) {
        socket.emit('setValue', game.roomName, index, game.playerName);
      }
    });
  }

  return (
    <Container>
      {game.initGame ? (
        <>
          <p className="player">
            <strong> Player:</strong>
            {game.playerName}
          </p>
          <h1 className="roomName">
            Sala:
            {game.roomName}
          </h1>
          <canvas
            onClick={(e) => clickBlock(e)}
            ref={canvasRef}
            width="330"
            height="330"
          />
        </>
      ) : (
        <ContainerInputs>
          <label htmlFor="gameName">
            <p>Digite o nome da sala para entrar</p>
            <input
              id="gameName"
              type="text"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            />
          </label>
          <div className="buttons">
            <Button
              type="button"
              onClick={() => {
                const roomName = parseInt(String(Math.random() * 10000), 10);
                socket.emit('initGame', roomName);
              }}
            >
              Criar Sala
            </Button>
            <Button
              secondary
              disabled={gameName === ''}
              type="button"
              onClick={() => {
                socket.emit('continueGame', gameName);
              }}
            >
              open
            </Button>
          </div>
        </ContainerInputs>
      )}
    </Container>
  );
};

export default ScreenGame;
