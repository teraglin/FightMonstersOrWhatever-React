import React from 'react'

import {
    handleMonster,
    handleMonsterDamage
} from '../../utils/gameFunctions'
import MonsterSheet from './MonsterSheet/MonsterSheet'

const Game = (props) => {
    const { store, dispatch } = props

    // roll monster
    const initialiseGameRound = (event, dispatch) => {
        handleMonster(event, dispatch)
    }

    const handlePlayerAttack = () => {
        const newHealth = store.monsterCurrentHealth - 4
        handleMonsterDamage(newHealth, dispatch)
    }

    const renderMonsterName = (input) => {
        if (input.monster === null) {
            return (
                <p>
                    waiting for monster
                </p>
            )
        } else {
            return (
                <div>
                    <MonsterSheet store={store} currentMonster={store.monster} />
                    <button
                    onClick={handlePlayerAttack}
                    >
                        Hurt Monster
                    </button>
                </div>

            )
        }
    }

    return (
        <div>
            <h1>Hello Game</h1>
            <button
                onClick={(event) => { initialiseGameRound(event, dispatch) }}
                value={store.gameRound}
            >
                Start Game
            </button>
            {renderMonsterName(store)}
        </div>
    )
}

export default Game