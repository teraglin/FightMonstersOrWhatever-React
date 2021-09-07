const gameReducer = (state, action) => {
    
    switch (action.type) {
        // case 'diceRoll':
        //     return {
        //         ...state,
        //         "diceRollValue": action.data
        //     }
        
        //STORE RANDOM MONSTER
        case 'setMonster':
            return {
                ...state,
                "monster": action.data,
                "monsterCurrentHealth": action.data.health,
                "monsterMaxHealth": action.data.health,
                "userTurn": true, // it's the users turn every time a monster gets rolled
                "gameRound": state.gameRound + 1
            }
        
        //PLAYER ATTACK LOGIC
        case 'setMonsterCurrentHealth':
            
            return {
                ...state,
                "monsterCurrentHealth": action.data.newHP,
                "userTurn": false,
                "damageReport": action.data.message
            }
        
        //MONSTER ATTACK LOGIC
        case 'setDamagePlayerCurrentHealth':

            return {
                ...state,
                "playerCurrentHealth": action.data.newHP,
                "userTurn": true,
                "damageReport": action.data.message
            }
        
        //FLASK
        case 'setHealPlayerCurrentHealth':
            let healedValue = parseInt(state.playerCurrentHealth) + parseInt(action.data)
            if (healedValue > 40) {
                healedValue = 40
            }
            return {
                ...state,
                "playerCurrentHealth": healedValue,
                "userTurn": false,
                "damageReport": "You down your healing flask and your wounds begin to stitch themselves closed. You recover " + action.data + " points of health."
            }
        
        //INITIALISE GAME
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