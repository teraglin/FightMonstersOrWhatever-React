import { encounterTable } from "../data/monterSheets"
import React, {Component} from 'react'
import HealthBar from "./HealthBar"

const monsterContainer = (event, monsterCurrentHealth, monsterMaxHealth) => {
    return (
        <div className='monster-container'>
        <h1>You are fighting:</h1>
        <ul>
            <li>Name: {event.monsterName}</li>
            <li>Health: {monsterCurrentHealth} / {monsterMaxHealth}</li>
            <li>Armour: {event.armour}</li>
            <li>Damage: {event.damage}</li>
            <li>Special Move: {event.specialMove}</li>
            <li>Special Cooldown: {event.specialCooldown}</li>
        </ul>
    </div>
    )
}

const userContainer = () => {
    
}



const rollMonster = (props) => {
    const number = props
    console.log(number)
    const table = encounterTable[number - 1]
    console.log(table)
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

class GameTable extends Component {

    //GAME TABLE STATE
    state = {
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
    }

    //GAME STATE CONTROLS
    startGame = (event) => {
        console.log("LOG:", event.target.value)
        const newMonster = rollMonster(1)
        //Consider extracting this logic to a separate function,
        //which can be called every time you need a new monster
        //(by separate, I mean outside of the class) - Andrew
        this.setState({
            gameVictory: false,
            userTurn: 'player',
            monster: newMonster,
            monsterMaxHealth: newMonster.health,
            monsterCurrentHealth: newMonster.health,
            playerCurrentHealth: 40,
            playerMaxHealth: 40,
            gameRound: 1,
            damageReport: 'Your foe awaits...'
        }, console.log(this.state))
    }

    newRound = () => {
        const {gameRound} = this.state
        this.setState(pushMonster(gameRound))
        console.log(this.state)
    }

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

//ATTACK LOGIC

    monsterAttack = () => {
        const {monster, playerCurrentHealth} = this.state // clean up this.state statements
        const monsterHit = Math.ceil(Math.random() * monster.damage) + monster.damage
        console.log('monster damage: ' + (JSON.stringify(monsterHit)))
        
        this.setState({
            userTurn: 'player',
            playerCurrentHealth: playerCurrentHealth - monsterHit,
            damageReport: 'You took ' + (JSON.stringify(monsterHit)) + ' from the ' + monster.monsterName
        })

        console.log(this.state)
    }

    attack = () => {
        const {playerDamage, monsterCurrentHealth, monster} = this.state
        const playerHit = Math.ceil(Math.random() * playerDamage)
        console.log('player damage: ' + (JSON.stringify(playerHit)))
        
        this.setState({
            userTurn: 'monster',
            monsterCurrentHealth: monsterCurrentHealth - playerHit,
            damageReport: 'You deal ' + (JSON.stringify(playerHit)) + ' damage to the ' + monster.monsterName
        })

        console.log(this.state)
    }

    buttonContainer = (userTurn) => {
        if (userTurn === 'player'){
            return (
                <button onClick={this.attack} value="attack" className="GameTable-button">Attack!</button>
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

    render() {
        //A lot of these blocks of JSX are very similar to each
        //other. Consider extracting out to a separate functional
        //components (or maybe 2 or 3), and then just pass in props
        //for things like which text they're showing - Andrew
        const {gameVictory, damageReport, monsterCurrentHealth, monsterMaxHealth, monster, userTurn, playerCurrentHealth, playerMaxHealth} = this.state
        if (this.state.gameRound === 0) {
            return (
                <div className="App">
                    <h1>Fight Monsters or Whatever React Edt</h1>
                    <button onClick={this.startGame} className="GameTable-button" value="game-started">PRESS TO START</button>
                </div>
            )
        } else if (gameVictory === true) {
            return (
                <div className="App">
                    <HealthBar currentHealth={playerCurrentHealth} maxHealth={playerMaxHealth} />
                    <h3>{damageReport}</h3>
                    <h1>You are victorious!!</h1>
                    <button onClick={this.refresh} className="GameTable-button">Press to start a new game</button>
                </div> 
            )
        } else if (monsterCurrentHealth <= 0) {
            if (this.state.gameRound === 3) {
                return (
                    <div className="App">
                        <HealthBar currentHealth={playerCurrentHealth} maxHealth={playerMaxHealth} />
                        <h3>{damageReport}</h3>
                        <h2>You have defeated the {monster.monsterName}.</h2>
                        <button onClick={this.newRound} className="GameTable-button">Press to continue...</button>
                    </div>
                )
            } else {
                return (
                    <div className="App">
                        <HealthBar currentHealth={playerCurrentHealth} maxHealth={playerMaxHealth} />
                        <h3>{damageReport}</h3>
                        <h2>You have defeated the {monster.monsterName}.</h2>
                        <h4>The gate opens and a new foe emerges...</h4>
                        <button onClick={this.newRound} className="GameTable-button">Press to continue...</button>
                    </div>
                )
            }
        } else {
            if (userTurn === 'monster') {
                return (
                    <div className="App">
                        <HealthBar currentHealth={playerCurrentHealth} maxHealth={playerMaxHealth} />
                        <div className='play-mat'>
                            {monsterContainer(
                                monster,
                                monsterCurrentHealth,
                                monsterMaxHealth
                            )}
                            <div className='user-container'>
                                <h3 className="user-text-background">{damageReport}</h3>
                                <h2 className="user-text-background">Now the {monster.monsterName} will attack</h2>
                                <button onClick={this.monsterAttack} className="GameTable-button">CONTINUE</button>
                            </div>
                        </div>
                    </div>
                )
            } else if (userTurn === 'player') {
                return (
                    <div className="App">
                        <HealthBar currentHealth={playerCurrentHealth} maxHealth={playerMaxHealth} />
                        <div className='play-mat'>
                            {monsterContainer(
                                monster,
                                monsterCurrentHealth,
                                monsterMaxHealth
                            )}
                            <div className='user-container'>
                                <h3 className="user-text-background">{damageReport}</h3>
                                {this.buttonContainer(userTurn)}
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <h1>ERROR</h1>
                )
            }

        }
    }
}

export default GameTable