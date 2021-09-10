import encounterTable from './../data/encounterTable'

//MISC
export const handleRoll = (event, dispatch) => {
    dispatch({
        type: 'diceRoll',
        data: event.target.value
    })
}

//GAME INITIALISATION
export const handleGameStart = (event, dispatch) => {
    const currentMonsterTable = encounterTable[event.target.value]
    dispatch({
        type: 'setGameStart',
        data: currentMonsterTable[Math.floor(Math.random() * currentMonsterTable.length)]
    })
}

export const handleMonster = (event, dispatch) => {
    const currentMonsterTable = encounterTable[event.target.value]
    dispatch({
        type: 'setMonster',
        data: currentMonsterTable[Math.floor(Math.random() * currentMonsterTable.length)]
    })
}

export const handleMonsterCurrentHealth = (event, dispatch) => {
    dispatch({
        type: 'setMonsterMaxHealth',
        data: event
    })
}

//MONSTER FUNCTIONS
export const handleMonsterAttack = (event, dispatch) => {

    //Grab data from initialState
    const store = JSON.parse(event.target.value)

    //Roll a value to hit (1-20) and add the game round as the monster's hit modifier
    const monsterHit = Math.ceil(Math.random() * 20) + parseInt(store.gameRound)

    //Roll monster damage
    const monsterDamage = Math.ceil(Math.random() * parseInt(store.monster.damage))

    //Attack Package object
    let attackPackage = {
        "hit": monsterHit,
        "damage": monsterDamage,
        "armour": store.playerArmour,
        "newHP": 0,
        "message": ""
    }

    //If playerShield is up
    if (store.playerShield === true) {
        attackPackage.newHP = parseInt(store.playerCurrentHealth)
        attackPackage.message = "You shield yourself from the " + store.monster.monsterName + "'s atack! You avoid " + monsterDamage + " points of damage!"
        handlePlayerShield(event, dispatch)
        //If Monster Misses
    } else if (monsterHit < parseInt(store.playerArmour)) {
        attackPackage.newHP = parseInt(store.playerCurrentHealth)
        attackPackage.message = "You evade the " + store.monster.monsterName + "'s atack!"
        //If Monster Hits
    } else if (monsterHit >= parseInt(store.playerArmour)) {
        attackPackage.newHP = parseInt(store.playerCurrentHealth) - monsterDamage
        attackPackage.message = "You take " + monsterDamage + " damage from the " + store.monster.monsterName + "'s attack"
    }

    //Print Attack Package
    console.log("monster attack package :", attackPackage)

    //Send attack package to useReducer
    dispatch({
        type: 'setDamagePlayerCurrentHealth',
        data: attackPackage
    })

}

//SPECIAL ATTACKS

//MULTIATTACK
export const handleMultiAttack = (event, dispatch) => {

    //Grab data from initialState
    const store = JSON.parse(event.target.value)

    //Roll a value to hit (1-20) and add the game round as the monster's hit modifier
    const monsterHit = Math.ceil(Math.random() * 20) + parseInt(store.gameRound)

    //Roll monster damage
    const monsterDamage = Math.ceil(Math.random() * parseInt(store.monster.damage))

    //multiCooldown
    const multiCooldown = (store) => {
        const multiCooldownValue = parseInt(store.multiCooldown)
        if (multiCooldownValue === 0) {
            return 2
        } else {
            return multiCooldownValue - 1
        }
    }

    const specialCooldown = (store) => {
        if (store.multiCooldown === 1) {
            return store.monster.specialCooldown
        } else {
            return 0
        }
    }

    // determine the message at the start of the damageReport
    const multiMessage = (store) => {
        if (parseInt(store.multiCooldown) === 0) {
            return "The " + store.monster.monsterName + " flies into a frenzy. "
        } else if (parseInt(store.multiCooldown) === 1) {
            return "The " + store.monster.monsterName + " comes in for a final attack. "
        } else {
            return "The " + store.monster.monsterName + " attacks again. "
        }
    }

    //determine when the multi attack ends
    const multiKillSwitch = (multiCooldown) => {
        if (multiCooldown === 1) {
            return true
        } else {
            return false
        }
    }

    let multiAttackPackage = {
        "hit": monsterHit,
        "damage": monsterDamage,
        "armour": store.playerArmour,
        "newHP": 0,
        "message": "",
        "specialCooldown": specialCooldown(store),
        "multiCooldown": multiCooldown(store),
        "userTurn": multiKillSwitch(store.multiCooldown)
    }

    //If playerShield is up
    if (store.playerShield === true) {
        multiAttackPackage.newHP = parseInt(store.playerCurrentHealth)
        multiAttackPackage.message = multiMessage(store) + " But you shield yourself from the " + store.monster.monsterName + "'s atack! You avoid " + monsterDamage + " points of damage!"
        if (store.multiCooldown === 1) {
            handlePlayerShield(event, dispatch)
        }
        //If Monster Misses
    } else if (monsterHit < parseInt(store.playerArmour)) {
        multiAttackPackage.newHP = parseInt(store.playerCurrentHealth)
        multiAttackPackage.message = multiMessage(store) + "But you evade the " + store.monster.monsterName + "'s atack!"
        //If Monster Hits
    } else if (monsterHit >= parseInt(store.playerArmour)) {
        multiAttackPackage.newHP = parseInt(store.playerCurrentHealth) - monsterDamage
        multiAttackPackage.message = multiMessage(store) + "You take " + monsterDamage + " damage from the " + store.monster.monsterName + "'s attack"
    }

    console.log("multiAttackPackage: ", multiAttackPackage)

    dispatch({
        type: 'setMultiAttack',
        data: multiAttackPackage
    })
}

//RESTRAIN
export const handleRestrain = (event, dispatch) => {

    //Grab data from initialState
    const store = JSON.parse(event.target.value)

    console.log(store)

    //Roll monster damage
    const monsterDamage = Math.ceil(Math.random() * parseInt(store.monster.damage))

    //Attack Package object
    let restrainAttackPackage = {
        "damage": monsterDamage,
        "armour": store.playerArmour,
        "newHP": 0,
        "message": "",
        "status": true,
        "specialCooldown": 0,
        "userTurn": false
    }

    const dynamicRestrainMessage = (restrainCooldown) => {
        if (restrainCooldown === true) {
            return ""
        } else {
            return " The attack has left you restrained."
        }
    }

    //If playerShield is up
    if (store.playerShield === true) {
        restrainAttackPackage.newHP = parseInt(store.playerCurrentHealth)
        restrainAttackPackage.message = "The monster attempts to attack you with a mighty blow. But you shield yourself from the " + store.monster.monsterName + "'s atack!"
        handlePlayerShield(event, dispatch)
        //If Monster Misses
    } else {
        restrainAttackPackage.newHP = parseInt(store.playerCurrentHealth) - monsterDamage
        restrainAttackPackage.message = "You take " + monsterDamage + " damage from the " + store.monster.monsterName + "'s attack." + dynamicRestrainMessage(store.restrainCooldown)
    }

    //check restrain cooldown
    if (store.restrainCooldown === true) {
        restrainAttackPackage.status = false
        restrainAttackPackage.specialCooldown = store.monster.specialCooldown
        restrainAttackPackage.userTurn = true
    }

    console.log("restrain attack package: ", restrainAttackPackage)

    dispatch({
        type: 'setRestrain',
        data: restrainAttackPackage
    })
}


//PLAYER FUNCTIONS
export const handlePlayerAttack = (event, dispatch) => {
    //Grab data from initialState
    const store = JSON.parse(event.target.value)

    //Roll a value to hit (1-20) and add the player's hit modifier
    const playerHit = Math.ceil(Math.random() * 20) + parseInt(store.playerHitMod)

    //Roll for player damage
    const playerDamage = Math.ceil(Math.random() * parseInt(store.playerDamage))

    //Attack Package object
    let attackPackage = {
        "hit": playerHit,
        "damage": playerDamage,
        "armour": store.monster.armour,
        "newHP": 0,
        "message": ""
    }
    //If Player Misses
    if (playerHit < parseInt(store.monster.armour)) {
        attackPackage.newHP = parseInt(store.monsterCurrentHealth)
        attackPackage.message = "Your attack misses the " + store.monster.monsterName + "..."
        //If Player Hits
    } else if (playerHit >= parseInt(store.monster.armour)) {
        attackPackage.newHP = parseInt(store.monsterCurrentHealth) - playerDamage
        attackPackage.message = "You dealt " + playerDamage + " damage to the " + store.monster.monsterName
    }

    //Print Attack Package
    console.log("player attack package :", attackPackage)

    //Send attack package to useReducer
    dispatch({
        type: 'setMonsterCurrentHealth',
        data: attackPackage
    })
}

//flask
export const handlePlayerFlask = (event, dispatch) => {
    dispatch({
        type: 'setHealPlayerFlask',
        data: event.target.value
    })
}

//shield
export const handlePlayerShield = (event, dispatch) => {
    const store = JSON.parse(event.target.value)

    let shieldValue = true

    if (store.playerShield === true) {
        shieldValue = false
    }

    dispatch({
        type: 'setPlayerShield',
        data: shieldValue
    })
}

//GAME END
export const gameEnd = (event, dispatch) => {
    dispatch({
        type: 'setGameState',
        data: event.target.value
    })
}