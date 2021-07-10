const gameReducer = (state, action) => {
    switch (action.type) {
        case 'diceRoll':
            return {
                ...state,
                "diceRollValue": action.data
            }

        case 'setMonster':
            return {
                ...state,
                "monster": action.data
            }

        case 'setGameState':
            return {
                ...state,
                "gameState": action.data
            }

        default: {
            return null
        }
    }
}

export default gameReducer