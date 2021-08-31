import { encounterTable } from "../data/encounterTable"
import React, { Component } from 'react'
import HealthBar from "./HealthBar"

//MONSTER STAT CONTAINER TABLE
let monsterContainer = (event, monsterCurrentHealth, monsterMaxHealth) => {

    return (
        <div className='monster-container'>
            <h1>You are fighting:</h1>
            <table>
                <tr>
                    <th>NAME</th>
                    <td>{event.monsterName}</td>
                </tr>
                <tr>
                    <th>HEALTH</th>
                    <td>{monsterCurrentHealth} / {monsterMaxHealth}</td>
                </tr>
                <tr>
                    <th>ARMOUR</th>
                    <td>{event.armour}</td>
                </tr>
                <tr>
                    <th>DAMAGE</th>
                    <td>{event.damage}</td>
                </tr>
                <tr>
                    <th>SPECIAL MOVE</th>
                    <td>{event.specialMove}</td>
                </tr>
                <tr>
                    <th>SPECIAL COOLDOWN</th>
                    <td>{event.specialCooldown}</td>
                </tr>
            </table>
        </div>
    )
}

//USER CONTAINER LOG LOGIC
const userContainer = (gameVictory, gameLoss, damageReport, monsterCurrentHealth, gameRound, event, userTurn) => {
    console.log("user:", userTurn)
    if (gameVictory) {
        return (
            <div className='user-container'>
                <h1 className="user-text-background">You are victorious!!</h1>
            </div>
        )
    } else if (gameLoss) {
        return (
            <div className='user-container'>
                <h3 className="user-text-background">{damageReport}</h3>
                <h1 className="user-text-background">The monster was too much for you...</h1>
            </div>
        )
    } else if (monsterCurrentHealth <= 0) {
        if (gameRound === 3) {
            return (
                <div className="user-container">
                    <h3 className="user-text-background">{damageReport}</h3>
                    <h2 className="user-text-background">You have defeated the {event.monsterName}.</h2>
                </div>
            )
        } else {
            return (
                <div className="user-container">
                    <h3 className="user-text-background">{damageReport}</h3>
                    <h2 className="user-text-background">You have defeated the {event.monsterName}.</h2>
                    <h4 className="user-text-background">The gate opens and a new foe emerges...</h4>
                </div>
            )
        }
    } else if (userTurn === 'monster') {
            console.log(userTurn)
            return (
                <div className='user-container'>
                    <h3 className="user-text-background">{damageReport}</h3>
                    <h4 className="user-text-background">Now the {event.monsterName} will attack</h4>
                </div>
            )
    } else if (userTurn === 'player'){
        return (
            <div className='user-container'>
                <h3 className="user-text-background">{damageReport}</h3>
            </div>
        )
    
    }
}

//ROLL RANDOM MONSTER FUNCTION
const rollMonster = (props) => {
    const number = props
    const table = encounterTable[number - 1]
    return (table[Math.floor(Math.random() * table.length)])
}

//CALL MONSTER BASED ON GAME ROUND
const pushMonster = (props) => {
    const gameRound = props
    const newGameRound = gameRound + 1
    let nextMonster = null

    //ASSIGN STATS TO NEW MONSTER
    if (gameRound < 3) {
        nextMonster = rollMonster(newGameRound)
        return ({
            userTurn: 'player',
            monster: nextMonster,
            monsterMaxHealth: nextMonster.health,
            monsterCurrentHealth: nextMonster.health,
            gameRound: newGameRound,
            damageReport: 'Your foe awaits...'
        })
    } else {
        return ({
            gameVictory: true,
            damageReport: 'You are victorious'
        })
    }
}

//GAME TABLE CLASS COMPONENT
class GameTable extends Component {

    //GAME TABLE STATE
    state = {
        gameVictory: null,
        gameLoss: null,
        userTurn: null,
        monster: null,
        monsterMaxHealth: null,
        monsterCurrentHealth: null,
        playerCurrentHealth: null,
        playerMaxHealth: null,
        playerDamage: 6,
        gameRound: 0,
        damageReport: ''
    }

    //START NEW GAME
    startGame = () => {
        const newMonster = rollMonster(1)
        this.setState({
            gameVictory: false,
            gameLoss: false,
            userTurn: 'player',
            monster: newMonster,
            monsterMaxHealth: newMonster.health,
            monsterCurrentHealth: newMonster.health,
            playerCurrentHealth: 40,
            playerMaxHealth: 40,
            gameRound: 1,
            damageReport: 'Your foe awaits...'
        },)
    }

    //NEW ROUND TURN REFRESH
    newRound = () => {
        const {gameRound} = this.state
        this.setState(pushMonster(gameRound))
    }

    //NEW GAME REFRESH
    refresh = () => {
        this.setState({
            gameVictory: null,
            userTurn: null,
            monster: null,
            monsterMaxHealth: null,
            monsterCurrentHealth: null,
            playerCurrentHealth: null,
            playerMaxHealth: null,
            playerDamage: 6,
            gameRound: 0,
            damageReport: ''
        })
    }

    //LOSS CONDITION FUNCTION
    setLossCondition(){
        this.setState({
            gameLoss: true
        })
    }

    //ATTACK LOGIC - MONSTER
    monsterAttack = () => {
        const {monster, playerCurrentHealth} = this.state // clean up this.state statements
        const monsterHit = Math.ceil(Math.random() * monster.damage) + monster.damage
        console.log('monster damage: ' + (JSON.stringify(monsterHit)))

        if (monsterHit >= playerCurrentHealth) {
            this.setState({
                gameLoss: true,
                userTurn: 'player',
                playerCurrentHealth: playerCurrentHealth - monsterHit,
                damageReport: 'You took ' + (JSON.stringify(monsterHit)) + ' from the ' + monster.monsterName
            })
        } else {
            this.setState({
                userTurn: 'player',
                playerCurrentHealth: playerCurrentHealth - monsterHit,
                damageReport: 'You took ' + (JSON.stringify(monsterHit)) + ' from the ' + monster.monsterName
            })
        }
    }

    //ATTACK LOGIC PLAYER
    attack = () => {
        const {playerDamage, monsterCurrentHealth, monster} = this.state
        const playerHit = Math.ceil(Math.random() * playerDamage)
        console.log('player damage: ' + (JSON.stringify(playerHit)))
        this.setState({
            userTurn: 'monster',
            monsterCurrentHealth: monsterCurrentHealth - playerHit,
            damageReport: 'You deal ' + (JSON.stringify(playerHit)) + ' damage to the ' + monster.monsterName
        })
    }

    //BUTTON CONTAINER LOGIC - add more buttons for player turn / exit button
    buttonContainer = (userTurn, gameVictory, gameLoss, monsterCurrentHealth) => {
        if (gameVictory === true) {
            return (
                <button onClick={this.refresh} className="GameTable-button">START A NEW GAME</button>
            )
        } else if (gameLoss) {
            return (
                <button onClick={this.refresh} className="GameTable-button">START A NEW GAME</button>
            )
        } else if (monsterCurrentHealth <= 0) {
            return (
                <button onClick={this.newRound} className="GameTable-button">CONTINUE</button>
            )
        } else if (userTurn === 'player'){
            return (
                <button onClick={this.attack} value="attack" className="GameTable-button">ATTACK!</button>
            )
        } else if (userTurn === 'monster') {
            return (
                <button onClick={this.monsterAttack} className="GameTable-button">CONTINUE</button>
            )
        } else {
            return (
                <h1>ERROR</h1>
            )
        }
    }

    //RENDER METHOD
    render() {
        const {gameVictory, gameLoss, damageReport, monsterCurrentHealth, monsterMaxHealth, monster, userTurn, playerCurrentHealth, playerMaxHealth, gameRound} = this.state

        if (this.state.gameRound === 0) {
            return (
                <div className="App">
                    <h1>Fight Monsters or Whatever React Edt</h1>
                    <button onClick={this.startGame} className="GameTable-button">PRESS TO START</button>
                    <h3>This is a work in progress</h3>
                    <a href="https://github.com/teraglin/Fight-Monsters-or-Whatever" target="_blank" rel="noreferrer">go here</a>
                    <span>to play the original game</span>
                </div>
            )
        } else {
            return (
                <div className="play-mat-container">
                    <HealthBar currentHealth={playerCurrentHealth} maxHealth={playerMaxHealth} />
                    
                    <div className="play-mat">
                        {monsterContainer(
                            monster,
                            monsterCurrentHealth,
                            monsterMaxHealth
                        )}
            
                        {userContainer(
                            gameVictory,
                            gameLoss,
                            damageReport,
                            monsterCurrentHealth,
                            gameRound,
                            monster,
                            userTurn
                        )}
                    </div>

                    <div className="button-container">
                        {this.buttonContainer(
                            userTurn,
                            gameVictory,
                            gameLoss,
                            monsterCurrentHealth
                        )}
                    </div>
                </div>
            )
        }
    
    }
}

export default GameTable