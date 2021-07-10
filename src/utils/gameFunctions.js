export const handleRoll = (event, dispatch) => {
    dispatch({
        type: 'diceRoll',
        data: event.target.value
    })
}

export const createMonster = (event, dispatch) => {
    dispatch({
        type: 'setMonster',
        data: event.target.value
    })
}

//GAME START
export const gameStart = (event, dispatch) => {
    createMonster(event, dispatch)

    dispatch({
        type: 'setGameState',
        data: "true"
    })
}

//GAME END
export const gameEnd = (event, dispatch) => {
    console.log("is it false?", event.target.value)
    dispatch({
        type: 'setGameState',
        data: event.target.value
    })
}