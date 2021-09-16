//-> handle attack
//-> roll hit 
//-> roll damage 
//-> assemble package (contains hit/miss/crit logic)
//-> send package to reducer

//UTILITIES

//roll to hit
const rollToHit = (modifier) => {
    const roll = Math.ceil(Math.random() * 20)

    if (roll === 20) {
        return 2000
    } else {
        return roll + modifier
    }
}

//roll for damage
const rollForDamage = (die) => {
    return Math.ceil(Math.random() * die)
}

//PLAYERattackPackage
const assemblePlayerAttackPackage = (store, playerHit, playerDamage, attackStance) => {
    let attackPackage = {
        "hit": playerHit,
        "damage": playerDamage,
        "armour": store.monster.armour,
        "newHP": 0,
        "message": "",
        "attackStance": attackStance
    }
    if (playerHit === 2000) {
        //if player crits
        attackPackage.newHP = parseInt(store.monsterCurrentHealth) - (playerDamage * 2)
        attackPackage.message = "Critical hit!! You deal a staggering " + (playerDamage * 2) + " damage to the " + store.monster.monsterName
    } else if (playerHit >= parseInt(store.monster.armour)) {
        //If Player Hits
        attackPackage.newHP = parseInt(store.monsterCurrentHealth) - playerDamage
        attackPackage.message = "You dealt " + playerDamage + " damage to the " + store.monster.monsterName
    } else if (playerHit < parseInt(store.monster.armour)) {
        //If Player Misses
        attackPackage.newHP = parseInt(store.monsterCurrentHealth)
        attackPackage.message = "Your attack misses the " + store.monster.monsterName + "..."
    }

    return attackPackage
}

//MONSTER attack package
const assembleMonsterAttackPackage = (event, dispatch, monsterHit, monsterDamage) => {
    const store = JSON.parse(event.target.value)

    let attackPackage = {
        "hit": monsterHit,
        "damage": monsterDamage,
        "armour": store.playerArmour,
        "newHP": 0,
        "message": ""
    }


    if (store.playerShield === true) {
        //If playerShield is up
        attackPackage.newHP = parseInt(store.playerCurrentHealth)
        attackPackage.message = "You shield yourself from the " + store.monster.monsterName + "'s atack! You avoid " + monsterDamage + " points of damage!"
        handlePlayerShield(event, dispatch)
    } else if (monsterHit === 2000) {
        //if monster crits
        attackPackage.newHP = parseInt(store.playerCurrentHealth) - (monsterDamage * 2)
        attackPackage.message = "Critical Hit! You take " + monsterDamage + " damage from the " + store.monster.monsterName + "'s attack. The mighty blow leaves your ears ringing and your body aching."
    } else if (monsterHit >= parseInt(store.playerArmour)) {
        //If Monster Hits
        attackPackage.newHP = parseInt(store.playerCurrentHealth) - monsterDamage
        attackPackage.message = "The " + store.monster.monsterName + "'s attack hits you. You take " + monsterDamage + " damage from the " + store.monster.monsterName + "'s attack."
    } else {
        //If Monster Misses
        attackPackage.newHP = parseInt(store.playerCurrentHealth)
        attackPackage.message = "You evade the " + store.monster.monsterName + "'s atack!"
    }

    return attackPackage
}

//PLAYER ATTACKS

//balanced attack
export const handlePlayerBalancedAttack = (event, dispatch) => {
    //Grab data from initialState -> RENDER STORE FUNCTION
    const store = JSON.parse(event.target.value)

    //Roll a value to hit (1-20) and add the player's hit modifier -> ROLL TO HIT FUNCTION
    const playerHit = rollToHit(parseInt(store.playerHitMod))

    //Roll for player damage -> RANDOM DAMAGE FUNCTION
    const playerDamage = rollForDamage(parseInt(store.playerDamage))

    //set attack stance
    const attackStance = "balanced"

    const attackPackage = assemblePlayerAttackPackage(store, playerHit, playerDamage, attackStance)

    //Print Attack Package
    console.log("player attack package :", attackPackage)

    //Send attack package to useReducer
    dispatch({
        type: 'setMonsterCurrentHealth',
        data: attackPackage
    })
}

//reckless attack
export const handlePlayerRecklessAttack = (event, dispatch) => {
    //Grab data from initialState -> RENDER STORE FUNCTION
    const store = JSON.parse(event.target.value)

    //Roll a value to hit (1-20) and add the player's hit modifier -> ROLL TO HIT FUNCTION
    //if one roll is higher than the other, use that roll, else use second roll always.

    let playerHit = 0

    const roll1 = rollToHit(parseInt(store.playerHitMod))
    const roll2 = rollToHit(parseInt(store.playerHitMod))

    //check highest value
    if (roll1 > roll2) {
        playerHit = roll1
    } else {
        playerHit = roll2
    }

    //Roll for player damage -> RANDOM DAMAGE FUNCTION
    const playerDamage = rollForDamage(parseInt(store.playerDamage))

    //set attack stance
    const attackStance = "reckless"

    const attackPackage = assemblePlayerAttackPackage(store, playerHit, playerDamage, attackStance)

    //Print Attack Package
    console.log("roll1: ", roll1)
    console.log("roll2: ", roll2)
    console.log("player attack package :", attackPackage)

    //Send attack package to useReducer
    dispatch({
        type: 'setMonsterCurrentHealth',
        data: attackPackage
    })
}

//defensive attack
export const handlePlayerDefensiveAttack = (event, dispatch) => {
    //Grab data from initialState -> RENDER STORE FUNCTION
    const store = JSON.parse(event.target.value)

    //Roll a value to hit (1-20) and add the player's hit modifier -> ROLL TO HIT FUNCTION
    //if one roll is lower than the other, use that roll, else use second roll always.

    let playerHit = 0

    const roll1 = rollToHit(parseInt(store.playerHitMod))
    const roll2 = rollToHit(parseInt(store.playerHitMod))

    //check lowest value
    if (roll1 < roll2) {
        playerHit = roll1
    } else {
        playerHit = roll2
    }

    //Roll for player damage -> RANDOM DAMAGE FUNCTION
    const playerDamage = rollForDamage(parseInt(store.playerDamage))

    //set attack stance
    const attackStance = "defensive"

    const attackPackage = assemblePlayerAttackPackage(store, playerHit, playerDamage, attackStance)

    //Print Attack Package
    console.log("roll1: ", roll1)
    console.log("roll2: ", roll2)
    console.log("player attack package :", attackPackage)

    //Send attack package to useReducer
    dispatch({
        type: 'setMonsterCurrentHealth',
        data: attackPackage
    })
}

//MONSTER ATTACK

//monsterAttack
export const handleMonsterAttack = (event, dispatch) => {

    //Grab data from initialState
    const store = JSON.parse(event.target.value)

    //Roll a value to hit (1-20) and add the game round as the monster's hit modifier
    let monsterHit = 0

    const roll1 = rollToHit(parseInt(store.gameRound))
    const roll2 = rollToHit(parseInt(store.gameRound))

    if (store.attackStance === "reckless"){
        if (roll1 > roll2) {
            monsterHit = roll1
        } else {
            monsterHit = roll2
        }
    } else if (store.attackStance === "defensive") {
        if (roll1 < roll2) {
            monsterHit = roll1
        } else {
            monsterHit = roll2
        }
    } else {
        monsterHit = roll1
    }

    //Roll monster damage
    const monsterDamage = rollForDamage(parseInt(store.monster.damage))

    const attackPackage = assembleMonsterAttackPackage(event, dispatch, monsterHit, monsterDamage)

    //Print Attack Package
    console.log("roll1: ", roll1)
    console.log("roll2: ", roll2)
    console.log("monster attack package :", attackPackage)

    //Send attack package to useReducer
    dispatch({
        type: 'setDamagePlayerCurrentHealth',
        data: attackPackage
    })

}

//MULTIATTACK
export const handleMultiAttack = (event, dispatch) => {

    //Grab data from initialState
    const store = JSON.parse(event.target.value)

    //Roll a value to hit (1-20) and add the game round as the monster's hit modifier
    let monsterHit = 0

    const roll1 = rollToHit(parseInt(store.gameRound))
    const roll2 = rollToHit(parseInt(store.gameRound))

    if (store.attackStance === "reckless"){
        if (roll1 > roll2) {
            monsterHit = roll1
        } else {
            monsterHit = roll2
        }
    } else if (store.attackStance === "defensive") {
        if (roll1 < roll2) {
            monsterHit = roll1
        } else {
            monsterHit = roll2
        }
    } else {
        monsterHit = roll1
    }

    //Roll monster damage
    const monsterDamage = rollForDamage(parseInt(store.monster.damage))

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

    if (store.playerShield === true) {
        //If playerShield is up
        multiAttackPackage.newHP = parseInt(store.playerCurrentHealth)
        multiAttackPackage.message = multiMessage(store) + " But you shield yourself from the " + store.monster.monsterName + "'s atack! You avoid " + monsterDamage + " points of damage!"
        if (store.multiCooldown === 1) {
            handlePlayerShield(event, dispatch)
        }
    } else if (monsterHit === 2000) {
        //if monster crits
        multiAttackPackage.newHP = parseInt(store.playerCurrentHealth) - (monsterDamage * 2)
        multiAttackPackage.message = multiMessage(store) + "Critical Hit! You take " + (monsterDamage * 2) + " damage from the " + store.monster.monsterName + "'s attack. The mighty blow leaves your ears ringing and your body aching."
    } else if (monsterHit >= parseInt(store.playerArmour)) {
        //If Monster Hits
        multiAttackPackage.newHP = parseInt(store.playerCurrentHealth) - monsterDamage
        multiAttackPackage.message = multiMessage(store) + "You take " + monsterDamage + " damage from the " + store.monster.monsterName + "'s attack"
    } else {
        //If Monster Misses
        multiAttackPackage.newHP = parseInt(store.playerCurrentHealth)
        multiAttackPackage.message = multiMessage(store) + "But you evade the " + store.monster.monsterName + "'s atack!"
    }

    console.log("roll1: ", roll1)
    console.log("roll2: ", roll2)
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

    //Roll monster damage
    const monsterDamage = rollForDamage(parseInt(store.monster.damage))

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
        restrainAttackPackage.status = false
        restrainAttackPackage.specialCooldown = store.monster.specialCooldown
        restrainAttackPackage.userTurn = true
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

//BREATH
export const handleBreath = (event, dispatch) => {
    const store = JSON.parse(event.target.value)

    let monsterDamage = rollForDamage(6) + rollForDamage(6) + rollForDamage(6) + rollForDamage(6)
    console.log("BREATH: ", monsterDamage)

    if (store.attackStance === "reckless") {
        monsterDamage = monsterDamage * 2
    } else if (store.attackStance === "defensive") {
        monsterDamage = Math.floor(monsterDamage / 2)
    }

    const dynamicBreathMessage = (store) => {
        const baseMessage = "You take " + monsterDamage + " points of damage from the " + store.monster.monsterName + "'s breath attack."

        if (store.playerShield === true) {
            return "The " + store.monster.monsterName + " exhales a torrent of fire. But your magical shield protects you from the searing flames and " + monsterDamage + " points of damage."
        } else if (store.attackStance === "reckless") {
            return "Your reckless attack has left you open to the " + store.monster.monsterName + "'s breath attack, the damage is doubled. " + baseMessage
        } else if (store.attackStance === "defensive") {
            return "Your defensive attack allowed you to anticipate the " + store.monster.monsterName + "'s breath attack, the damage is halved. " + baseMessage
        } else {
            return "The " + store.monster.monsterName + " exhales a torrent of fire. " + baseMessage
        }
    }

    let breathAttackPackage = {
        "damage": monsterDamage,
        "armour": store.playerArmour,
        "newHP": 0,
        "message": "",
        "specialCooldown": store.monster.specialCooldown,
        "userTurn": true
    }

    if (store.playerShield === true) {
        breathAttackPackage.newHP = store.playerCurrentHealth
        breathAttackPackage.message = dynamicBreathMessage(store)
        handlePlayerShield(event, dispatch)
    } else {
        breathAttackPackage.newHP = store.playerCurrentHealth - monsterDamage
        breathAttackPackage.message = dynamicBreathMessage(store)
    }

    dispatch({
        type: 'setBreath',
        data: breathAttackPackage
    })
}

//PLAYER TOOLS

//flask
export const handlePlayerFlask = (event, dispatch) => {
    dispatch({
        type: 'setHealPlayerFlask',
        data: event.target.value
    })
}

//shield toggle
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