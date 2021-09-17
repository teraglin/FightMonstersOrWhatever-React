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
                "showAttackButtons": false
            }

        //PLAYER ATTACK LOGIC
        case 'setMonsterCurrentHealth':
            return {
                ...state,
                "userTurn": false,
                "monsterCurrentHealth": action.data.newHP,
                "damageReport": action.data.message,
                "attackStance": action.data.attackStance,
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
                "showAttackButtons": false,
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
                "multiCooldown": action.data.multiCooldown,
                "showAttackButtons": false
            }

        //RESTRAIN
        case 'setRestrain':
            return {
                ...state,
                "userTurn": action.data.userTurn,
                "playerCurrentHealth": action.data.newHP,
                "damageReport": action.data.message,
                "specialCooldown": action.data.specialCooldown,
                "restrainCooldown": action.data.status,
                "showAttackButtons": false

            }

        //BREATH
        case 'setBreath':
            return {
                ...state,
                "userTurn": action.data.userTurn,
                "playerCurrentHealth": action.data.newHP,
                "damageReport": action.data.message,
                "specialCooldown": action.data.specialCooldown,
                "showAttackButtons": false
            }
        //FLASK
        case 'setHealPlayerFlask':
            let healedValue = parseInt(state.playerCurrentHealth) + parseInt(action.data)
            if (healedValue > state.playerMaxHealth) {
                healedValue = state.playerMaxHealth
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
                "playerCurrentHealth": state.playerMaxHealth,
                "playerMaxHealth": state.playerMaxHealth,
                "damageReport": "What do you do?",
                "playerName": action.data
            }

        case 'setGameRefresh':
            return {
                "gameStart": false, 
                "gameVictory": null,
                "userTurn": null,
                "gameRound": 0,
                "damageReport": '',
                "attackStance": '',
                "showAttackButtons": false,

                //MONSTER STATE
                "monster": null,
                "monsterMaxHealth": null,
                "monsterCurrentHealth": null,

                //PLAYER STATE
                "playerName": "Nicholas Cage",
                "playerCurrentHealth": 0,
                "playerMaxHealth": 100,
                "playerHitMod": 1,
                "playerDamage": 6,
                "playerHealing": 12,
                "playerShield": false,
                "playerArmour": 10,

                //COOLDOWNS
                "flaskCooldown": 0,
                "shieldCooldown": 0,
                "specialCooldown": 0,
                "multiCooldown": 0,
                "restrainedCooldown": false,
            }
        
        case 'setPlayerName':
            return {
                ...state,
                "playerName": action.data
            }

        case 'setShowAttackButtons':
            return {
                ...state,
                "showAttackButtons": action.data
            }


        //DEFAULT
        default: {
            return null
        }
    }
}

export default gameReducer