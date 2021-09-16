const initialState = {

    //GAME STATE
    gameStart: false, // becomes true at game start
    gameVictory: null, //set to win or lose
    userTurn: null, // alternates between true and false
    gameRound: 0,
    damageReport: '',
    attackStance: '',
    showAttackButtons: false,

    //MONSTER STATE
    monster: null, // stores monster object
    monsterMaxHealth: null,
    monsterCurrentHealth: null,

    //PLAYER STATE
    playerName: "Nicholas Cage",
    playerCurrentHealth: 0,
    playerMaxHealth: 40,
    playerHitMod: 1,
    playerDamage: 6,
    playerHealing: 12,
    playerShield: false,
    playerArmour: 10,

    //COOLDOWNS
    flaskCooldown: 0,
    shieldCooldown: 0,
    specialCooldown: 0,
    multiCooldown: 0,
    restrainedCooldown: false,
}

export default initialState