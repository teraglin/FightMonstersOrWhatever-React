import React from 'react'

import {
    Link
} from "react-router-dom"

import {
    handleMonster,
    handleGameStart,
    handleNameInput
} from '../../utils/gameFunctions'
import CharacterSheet from './CharacterSheet/CharacterSheet'

import MonsterSheet from './MonsterSheet/MonsterSheet'
import PlayerController from './PlayerController/PlayerController'

const Game = (props) => {
    const { store, dispatch } = props

    // Initialise Game Round
    const initialiseGameRound = (event, dispatch) => {
        handleGameStart(store.playerName, dispatch)
        handleMonster(event, dispatch)
        event.preventDefault()
    }

    const handleKeyDown = (event, dispatch) => {
        if (event.key === 'Enter') {
            // event.preventDefault()
            initialiseGameRound(event, dispatch)
        }
    }

    const refreshPage = () => {
        window.location.reload(false)
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
                <div className="play-mat-container">
                    <div className="play-mat">
                        <CharacterSheet store={store} currentMonster={store.monster} />
                        <MonsterSheet store={store} currentMonster={store.monster} />
                    </div>
                    <PlayerController store={store} dispatch={dispatch} />
                    <button onClick={() => { if (window.confirm('Are you sure you want to exit? Progress will not be saved.')) refreshPage() }}>
                        EXIT GAME
                    </button>
                </div>
            )
        }
    }


    // Render Start Button
    const startButton = (store) => {
        if (store.gameStart === false) {
            return (
                <div className="game-start-container">
                    <h1>What is your name?</h1>
                    <form>
                        <label
                            onKeyDown={(event) => { handleKeyDown(event, dispatch) }}
                        >
                            <input 
                            className="name-input" 
                            type="text" value={store.playerName} 
                            onChange={(event) => { handleNameInput(event, dispatch) }}
                            maxLength={20}
                             />
                        </label>
                    </form>
                    <div className="game-start-button-container">
                        <button
                            onClick={(event) => { initialiseGameRound(event, dispatch) }}
                            value={store.gameRound}
                        >
                            START GAME
                        </button>
                        <Link to="/">
                            <button className="game-table-button">
                                BACK
                            </button>
                        </Link>
                    </div>
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