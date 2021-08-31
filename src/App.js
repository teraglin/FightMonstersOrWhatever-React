import './styles/App.css';

import { useReducer } from 'react';
import gameReducer from './reducers/gameReducer'

import Game from './components/Game/Game'
// import GameTable from './components/GameTable'
// import RollButton from './components/RollButton'
// import LandingScreen from './components/LandingScreen';
// import GameStart from './components/GameStart';

import initialState from './data/initialState'
import encounterTable from './data/encounterTable'


// if victory condition => launch page or game page

// while game state is true => game state

// while player turn => render player page and health bar

// while enemy turn => render enemy page and health bar

function App () {
  const [store, dispatch] = useReducer(
    gameReducer,
    initialState
  )

  // let renderScreen = (value) => {
  //   console.log ("game state:", store.gameState)
  //   if (value === "false") {
  //     return (
  //       <LandingScreen store={store} dispatch={dispatch} />
  //     )
  //   } else if (value === "true") {
  //     return (
  //       <GameStart store={store} dispatch={dispatch} />
  //     )
  //   }
  // }

  // const startGame = () => {
  
  // }

  return (
    <div className="App">
      {/* <GameTable store={store} dispactch={dispatch} /> */}
      {/* <RollButton store={store} dispatch={dispatch} /> */}
      {/* {renderScreen(store.gameStart)} */}
      <Game store={store} dispatch={dispatch} encounterTable={encounterTable} />
    </div>
  );
}

export default App;
