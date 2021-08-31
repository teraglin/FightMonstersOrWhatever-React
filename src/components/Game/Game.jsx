import React from 'react'

import {
    handleMonster,
} from '../../utils/gameFunctions'

// let renderGame = () => {}

//render monsters

const Game = (props) => {
    const {store, dispatch, encounterTable} = props

    const encounter1 = encounterTable[0]

    // roll monster
    const handleGameStart = (event, dispatch) => {
        handleMonster(event, dispatch)
    }



    console.log("monster1: ", encounter1[0])

    console.log("gameRound: ", store.gameRound)

    const renderMonsterName = (input) => {
        if (input.monster === null) {
            return (
                <p>
                    waiting for monster
                </p>
            )
        } else {
            return (
                <p>
                    {store.monster.monsterName}
                </p>
            )
        }
    }

    return (
        <div>
            <h1>Hello Game</h1>
            <button
            onClick={(event) => {handleGameStart(event, dispatch)}}
            value={store.gameRound}
            >
                Start Game
            </button>
            {renderMonsterName(store)}
        </div>
    )
}

export default Game