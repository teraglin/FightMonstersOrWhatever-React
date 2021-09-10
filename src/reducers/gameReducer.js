const gameReducer = (state, action) => {

    //Cooldown timer
    const countdown = (cooldown) => {
        let value = parseInt(cooldown)
        if (value === 0) {
            return 0
        } else {
            return value - 1
        }
    }

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
                "userTurn": true, // it's the users turn every time a monster gets rolled
                "gameRound": state.gameRound + 1,
                "damageReport": "What do you do?",
                "monster": action.data,
                "monsterCurrentHealth": action.data.health,
                "monsterMaxHealth": action.data.health,
                "specialCooldown": action.data.specialCooldown,
            }

        //PLAYER ATTACK LOGIC
        case 'setMonsterCurrentHealth':
            return {
                ...state,
                "userTurn": false,
                "monsterCurrentHealth": action.data.newHP,
                "damageReport": action.data.message,
                "flaskCooldown": countdown(state.flaskCooldown),
                "shieldCooldown": countdown(state.shieldCooldown)
            }

        //MONSTER ATTACK LOGIC
        case 'setDamagePlayerCurrentHealth':

            return {
                ...state,
                "userTurn": true,
                "playerCurrentHealth": action.data.newHP,
                "damageReport": action.data.message,
                "specialCooldown": countdown(state.specialCooldown)
            }

        //MULTI ATTACK

        case 'setMultiAttack':
            return {
                ...state,
                "userTurn": action.data.userTurn,
                "playerCurrentHealth": action.data.newHP,
                "damageReport": action.data.message,
                "specialCooldown": action.data.specialCooldown,
                "multiCooldown": action.data.multiCooldown
            }

        //FLASK
        case 'setHealPlayerFlask':
            let healedValue = parseInt(state.playerCurrentHealth) + parseInt(action.data)
            if (healedValue > 40) {
                healedValue = 40
            }
            return {
                ...state,
                "userTurn": false,
                "playerCurrentHealth": healedValue,
                "damageReport": "You down your healing flask and your wounds begin to stitch themselves closed. You recover " + action.data + " points of health.",
                "flaskCooldown": 3,
                "shieldCooldown": countdown(state.shieldCooldown)
            }

        //SHIELD
        case 'setPlayerShield':
            return {
                ...state,
                "userTurn": false,
                "playerShield": action.data,
                "damageReport": "You shield yourself with magic.",
                "shieldCooldown": 3,
                "flaskCooldown": countdown(state.flaskCooldown)
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