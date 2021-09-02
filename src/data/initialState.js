const initialState = {
    gameStart: false, // becomes true at game start
    gameVictory: null, //set to win or lose
    userTurn: null, // alternates between true and false
    monster: null, // stores monster object
    monsterMaxHealth: null,
    monsterCurrentHealth: null,
    playerName: "Nicholas Cage",
    playerCurrentHealth: 0,
    playerMaxHealth: 0,
    playerDamage: 6,
    playerArmour: 10,
    gameRound: 0,
    damageReport: ''
}

export default initialState