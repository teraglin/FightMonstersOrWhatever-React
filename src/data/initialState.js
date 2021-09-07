const initialState = {
    
    //GAME STATE
    gameStart: false, // becomes true at game start
    gameVictory: null, //set to win or lose
    userTurn: null, // alternates between true and false
    gameRound: 0,
    damageReport: '',

    //MONSTER STATE
    monster: null, // stores monster object
    monsterMaxHealth: null,
    monsterCurrentHealth: null,

    //PLAYER STATE
    playerName: "Nicholas Cage",
    playerCurrentHealth: 0,
    playerMaxHealth: 0,
    playerHitMod: 1,
    playerDamage: 6,
    playerHealing: 12,
    playerShield: false,
    playerArmour: 10
}

export default initialState