import encounterTable from './../data/encounterTable'

export const handleRoll = (event, dispatch) => {
    dispatch({
        type: 'diceRoll',
        data: event.target.value
    })
}

// export const rollMonster = (event, dispatch) => {
//     handleMonster(event, dispatch)
// }

export const handleMonster = (event, dispatch) => {
    console.log("event target value: ", event.target.value)
    const currentMonsterTable = encounterTable[event.target.value]
    console.log("currentMonsterTable: ", currentMonsterTable)
    dispatch({
        type: 'setMonster',
        data: currentMonsterTable[Math.floor(Math.random() * currentMonsterTable.length)]
    })
}

export const handleMonsterMaxHealth = (event, dispatch) => {
    dispatch({
        type: 'setMonsterMaxHealth',
        data: event.target.value
    })
}

export const handleMonsterCurrentHealth = (event, dispatch) => {
    dispatch({
        type: 'setMonsterMaxHealth',
        data: event.target.value
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
    console.log("is it false?", event.target.value)
    dispatch({
        type: 'setGameState',
        data: event.target.value
    })
}