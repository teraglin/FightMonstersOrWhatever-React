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
                "monster": action.data,
                "monsterCurrentHealth": action.data.health,
                "monsterMaxHealth": action.data.health
            }

        case 'setMonsterCurrentHealth':
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