import ScreenGame from './components/ScreenGame';
import GlobalStyled from './theme/globalStyled';

function App(): any {
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
