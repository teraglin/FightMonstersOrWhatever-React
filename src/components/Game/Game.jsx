import React, { useEffect } from 'react'

import {
    handleMonster,
    handleGameStart
} from '../../utils/gameFunctions'
import CharacterSheet from './CharacterSheet/CharacterSheet'

import MonsterSheet from './MonsterSheet/MonsterSheet'
import PlayerController from './PlayerController/PlayerController'

const Game = (props) => {
    const { store, dispatch } = props

    // Initialise Game Round
    const initialiseGameRound = (event, dispatch) => {
        handleGameStart(event, dispatch)
        handleMonster(event, dispatch)
    }

    //Render HUD
    const renderHUD = (input) => {
        if (input.monster === null) {
            return (
                <p>
                    waiting for monster...
                </p>
            )
        } else {
            return (
                <div>
                    <MonsterSheet store={store} currentMonster={store.monster} />
                    <CharacterSheet store={store} currentMonster={store.monster} />
                    <PlayerController store={store} dispatch={dispatch} />
                </div>
            )
        }
    }

    // Render Start Button
    const startButton = (store) => {
        if (store.gameStart === false) {
            return (
                <div>
                    <h1>Hello Game</h1>
                    <button
                        onClick={(event) => { initialiseGameRound(event, dispatch) }}
                        value={store.gameRound}
                    >
                        Start Game
                    </button>
                </div>
            )
        } else if (store.gameStart === true) {
            return (
                renderHUD(store)
            )
        }
    }

    return (
        <div>
            {startButton(store)}
        </div>
    )
}

export default Game