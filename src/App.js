import './styles/App.css';

import React, { useReducer } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import gameReducer from './reducers/gameReducer'

import Game from './components/Game/Game'
// import GameTable from './components/GameTable'
// import RollButton from './components/RollButton'
// import LandingScreen from './components/LandingScreen';
// import GameStart from './components/GameStart';

import initialState from './data/initialState'
import LandingScreen from './components/LandingScreen';
import About from './components/About';



// if victory condition => launch page or game page

// while game state is true => game state

// while player turn => render player page and health bar

// while enemy turn => render enemy page and health bar

function App() {
  const [store, dispatch] = useReducer(
    gameReducer,
    initialState
  )

  return (
    <div className="App">
      {/* <GameTable store={store} dispactch={dispatch} /> */}
      {/* <RollButton store={store} dispatch={dispatch} /> */}
      {/* {renderScreen(store.gameStart)} */}
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingScreen />
          </Route>

          <Route path="/game">
            <Game store={store} dispatch={dispatch} />
          </Route>

          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
