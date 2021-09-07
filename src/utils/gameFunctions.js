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

    const monsterDamage = Math.ceil(Math.random() * parseInt(store.monster.damage))
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
        attackPackage.message = "You take " + monsterDamage + " from the " + store.monster.monsterName + "'s attack"
    }

    //Print Attack Package
    console.log("monster attack package :", attackPackage)

    //Send attack package to useReducer
    dispatch({
        type: 'setDamagePlayerCurrentHealth',
        data: attackPackage
    })

}

//PLAYER FUNCTIONS
export const handlePlayerAttack = (event, dispatch) => {
    //Grab data from initialState
    const store = JSON.parse(event.target.value)
    
    //Roll a value to hit (1-20) and add the player's hit modifier
    const playerHit = Math.ceil(Math.random() * 20) + parseInt(store.playerHitMod)
    
    const playerDamage = Math.ceil(Math.random() * parseInt(store.playerDamage))
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

export const handlePlayerFlask = (event, dispatch) => {
    dispatch({
        type: 'setHealPlayerCurrentHealth',
        data: event.target.value
    })
}

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