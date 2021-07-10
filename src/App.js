import './styles/App.css';

import { useReducer } from 'react';
import gameReducer from './reducers/gameReducer'

import GameTable from './components/GameTable'
import RollButton from './components/RollButton'
import LandingScreen from './components/LandingScreen';
import GameStart from './components/GameStart';

const initialState = {
  diceRollValue: 0,
  monster: null,
  gameState: "false"
}

// state = {
//   gameVictory: null,
//   gameLoss: null,
//   userTurn: null,
//   monster: null,
//   monsterMaxHealth: null,
//   monsterCurrentHealth: null,
//   playerCurrentHealth: null,
//   playerMaxHealth: null,
//   playerDamage: 6,
//   gameRound: 0,
//   damageReport: ''
// }

// if victory condition => launch page or game page

// while game state is true => game state

// while player turn => render player page and health bar

// while enemy turn => render enemy page and health bar

function App () {
  const [store, dispatch] = useReducer(
    gameReducer,
    initialState
  )

  let renderScreen = (value) => {
    console.log ("game state:", store.gameState)
    if (value === "false") {
      return (
        <LandingScreen store={store} dispatch={dispatch} />
      )
    } else if (value === "true") {
      return (
        <GameStart store={store} dispatch={dispatch} />
      )
    }
  }

  return (
    <div className="App">
      <GameTable store={store} dispactch={dispatch} />
      <RollButton store={store} dispatch={dispatch} />
      {renderScreen(store.gameState)}
    </div>
  );
}

export default App;
