import styled, { css } from 'styled-components';

interface buttonProps {
  secondary?: boolean;
}

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  .player {
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 24px;
  }
  .roomName {
    position: absolute;
    top: 60px;
    margin-right: 20px;
  }
`;

export const P = styled.p`
  position: absolute;
  top: 0;
  left: 0;
`;

export const GameCanvas = styled.canvas`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export const Button = styled.button<buttonProps>`
  width: 120px;
  height: 40px;
  background: #912f40;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  :hover {
    filter: brightness(80%);
  }

  :disabled {
    opacity: 0.4;
  }

  ${({ secondary }) =>
    secondary &&
    css`
      background: none;
      border: 1px solid #912f40;
      color: #000;
    `}
`;

export const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  label {
    display: flex;
    flex-direction: column;
    p {
      font-size: 20px;
    }
    input {
      margin-top: 8px;
      height: 24px;
      border: none;
      border-bottom: 1px solid #000;
    }
  }
  .buttons {
    margin-top: 32px;
    display: flex;

    button:first-child {
      margin-right: 8px;
    }
  }
`;
