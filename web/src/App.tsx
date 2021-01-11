import { ReactElement } from 'react';
import ScreenGame from './components/ScreenGame';
import GlobalStyled from './theme/globalStyled';

function App(): ReactElement {
  return (
    <>
      <GlobalStyled />
      <div className="App">
        <ScreenGame />
      </div>
    </>
  );
}

export default App;
