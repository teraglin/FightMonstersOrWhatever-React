const gameReducer = (state, action) => {
    switch (action.type) {
        case 'diceRoll':
            return {
                ...state,
                "diceRollValue": action.data
            }

        case 'setMonster':
            console.log("monster's name: ", action.data)
            return {
                ...state,
                "monster": action.data
            }

        case 'handleMonsterMaxHealth':
            return {
                ...state,
                "monsterMaxHealth": action.data
            }

        case 'handleMonsterCurrentHealth':
            return {
                ...state,
                "monsterCurrentHealth": action.data
            }

        case 'setStartGame':
            return {
                ...state,
                "gameStart": true
            }

        default: {
            return null
        }
    }
}

export default gameReducer