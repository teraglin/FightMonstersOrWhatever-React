import encounterTable from './../data/encounterTable'

export const handleRoll = (event, dispatch) => {
    dispatch({
        type: 'diceRoll',
        data: event.target.value
    })
}

export const handleMonster = (event, dispatch) => {
    const currentMonsterTable = encounterTable[event.target.value]
    dispatch({
        type: 'setMonster',
        data: currentMonsterTable[Math.floor(Math.random() * currentMonsterTable.length)]
    })
}

export const handleMonsterCurrentHealth = (event, dispatch) => {
    dispatch({
        type: 'setMonsterMaxHealth',
        data: event
    })
}

export const handleMonsterDamage = (event, dispatch) => {
    dispatch({
        type: 'setMonsterCurrentHealth',
        data: event
    })
}

//GAME START
// export const gameStart = (event, dispatch) => {
//     createMonster(event, dispatch)

//     dispatch({
//         type: 'setGameState',
//         data: "true"
//     })
// }

//GAME END
export const gameEnd = (event, dispatch) => {
    dispatch({
        type: 'setGameState',
        data: event.target.value
    })
}