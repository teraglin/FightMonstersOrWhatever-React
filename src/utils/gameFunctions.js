import encounterTable from './../data/encounterTable'

//MISC
export const handleRoll = (event, dispatch) => {
    dispatch({
        type: 'diceRoll',
        data: event.target.value
    })
}

//GAME INITIALISATION
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

//show buttons toggle
export const handleShowAttackButtons = (event, dispatch) => {
    const store = JSON.parse(event.target.value)

    let showButtons = true

    if (store.showAttackButtons === true) {
        showButtons = false
    }

    dispatch({
        type: 'setShowAttackButtons',
        data: showButtons
    })
}

//GAME END
export const gameEnd = (event, dispatch) => {
    dispatch({
        type: 'setGameState',
        data: event.target.value
    })
}