import encounterTable from './../data/encounterTable'

//GAME INITIALISATION
export const handleGameStart = (event, dispatch) => {

    dispatch({
        type: 'setGameStart',
        data: event
    })
}

export const handleNameInput = (event, dispatch) => {
    // event.preventDefault()
    dispatch({
        type: 'setPlayerName',
        data: event.target.value
    })
}

export const handleMonster = (event, dispatch) => {
    console.log("LOGS: ", event.target.value)

    let gameRound = parseInt(event.target.value)

    if (typeof gameRound === "string") {
        gameRound = 0
    }
    
    const currentMonsterTable = encounterTable[gameRound]

    dispatch({
        type: 'setMonster',
        data: currentMonsterTable[Math.floor(Math.random() * currentMonsterTable.length)]
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
export const handleGameRefresh = (event, dispatch) => {
    dispatch({
        type: 'setGameRefresh',
        data: event
    })
}