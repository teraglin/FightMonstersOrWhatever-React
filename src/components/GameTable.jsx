import { encounterTable1, encounterTable2, encounterTable3 } from "../data/monterSheets"
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

const buttonContainer = () => {

}

class GameTable extends Component {
    // constructor(props) {
    //     // //Nothing wrong with binding in the constructor
    //     // //like this, but you can avoid the need altogether
    //     // //by using arrow functions. - Andrew
    //     super(props)
    //     this.startGame = this.startGame.bind(this)
    //     this.attack = this.attack.bind(this)
    //     this.newRound = this.newRound.bind(this)
    //     this.refresh = this.refresh.bind(this)
    //     this.state = {
    //         gameVictory: null,
    //         userTurn: null,
    //         monster: null,
    //         monsterMaxHealth: null,
    //         monsterCurrentHealth: null,
    //         playerCurrentHealth: null,
    //         playerMaxHealth: null,
    //         playerDamage: 6,
    //         gameRound: 0,
    //         damageReport: ''
    //     }
    // }

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

//GAME STATE

    startGame = (event) => {
        console.log("LOG:", event.target.value)
        const newMonster = encounterTable1[Math.floor(Math.random() * encounterTable1.length)]
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
        //I'd recommend using a function outside the class which
        //returns the new state variables, and then just calling
        //setState
        const {gameRound} = this.state
        if (gameRound === 1) {
            const nextMonster = encounterTable2[Math.floor(Math.random() * encounterTable2.length)]
            this.setState({
                userTurn: 'player',
                monster: nextMonster,
                monsterMaxHealth: nextMonster.health,
                monsterCurrentHealth: nextMonster.health,
                gameRound: 2,
                damageReport: 'Your foe awaits...'
            })
        } else if (gameRound === 2) {
            const nextMonster = encounterTable3[Math.floor(Math.random() * encounterTable3.length)]
            this.setState({
                monster: nextMonster,
                monsterMaxHealth: nextMonster.health,
                monsterCurrentHealth: nextMonster.health,
                gameRound: 3,
                damageReport: 'Your foe awaits...'
            })
        } else {
            this.setState({
                gameVictory: true,
                damageReport: 'You are victorious'
            })
        }

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
            } else {
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
                                <button onClick={this.attack} value="attack" className="GameTable-button">Attack!</button>
                            </div>
                        </div>
                    </div>
                )
            }

        }
    }
}

export default GameTable