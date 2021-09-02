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
                "monsterMaxHealth": action.data.health,
                "userTurn": true, // it's the users turn every time a monster gets rolled
                "gameRound": state.gameRound + 1
            }

        case 'setMonsterCurrentHealth':
            return {
                ...state,
                "monsterCurrentHealth": state.monsterCurrentHealth - action.data,
                "userTurn": false,
                "damageReport": "You dealt " + action.data + " damage to the " + state.monster.monsterName
            }

        case 'setPlayerCurrentHealth':
            return {
                ...state,
                "playerCurrentHealth": state.playerCurrentHealth - action.data,
                "userTurn": true,
                "damageReport": "You took " + action.data + " damage from the " + state.monster.monsterName
            }

        case 'setGameStart':
            return {
                ...state,
                "gameStart": true,
                "playerCurrentHealth": 40,
                "playerMaxHealth": 40,
                "damageReport": "What do you do?"
            }


        //DEFAULT
        default: {
            return null
        }
    }
}

export default gameReducer