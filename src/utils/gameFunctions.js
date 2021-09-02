import encounterTable from './../data/encounterTable'

export const handleRoll = (event, dispatch) => {
    dispatch({
        type: 'diceRoll',
        data: event.target.value
    })
}

export const handleGameStart = (event, dispatch) => {
    const currentMonsterTable = encounterTable[event.target.value]
    dispatch({
        type: 'setGameStart',
        data: currentMonsterTable[Math.floor(Math.random() * currentMonsterTable.length)]
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

export const handleMonsterAttack = (event, dispatch) => {
    dispatch({
        type: 'setPlayerCurrentHealth',
        data: event.target.value
    })
}

export const handlePlayerAttack = (event, dispatch) => {
    dispatch({
        type: 'setMonsterCurrentHealth',
        data: event.target.value
    })
}

//GAME END
export const gameEnd = (event, dispatch) => {
    dispatch({
        type: 'setGameState',
        data: event.target.value
    })
}