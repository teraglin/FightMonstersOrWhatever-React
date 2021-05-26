import { encounterTable1, encounterTable2, encounterTable3 } from "../data/monterSheets"
import React, {Component} from 'react'


class GameTable extends Component {
    constructor(props) {
        super(props)
        this.startGame = this.startGame.bind(this)
        this.attack = this.attack.bind(this)
        this.newRound = this.newRound.bind(this)
        this.refresh = this.refresh.bind(this)
        // const roll2 = encounterTable2[Math.floor(Math.random() * encounterTable2.length)]
        // const roll3 = encounterTable3[Math.floor(Math.random() * encounterTable3.length)]
        this.state = {
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
    }

    printHealth(){
        return (
            <div>
                <h1>Player Health: {this.playerHealth}</h1>
            </div>
        )
    }

    startGame(){
        const newMonster = encounterTable1[Math.floor(Math.random() * encounterTable1.length)]
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

    newRound(){
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

    refresh(){
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

    monsterAttack(){
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

    attack(){
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
        const {gameVictory, damageReport, monsterCurrentHealth, monsterMaxHealth, monster, userTurn, playerCurrentHealth, playerMaxHealth} = this.state
        if (this.state.gameRound === 0) {
            return (
                <div className="App">
                    <h1>Fight Monsters or Whatever React Edt</h1>
                    <button className="GameTable-button" onClick={this.startGame.bind(this)}>PRESS TO START</button>
                </div>
            )
        } else if (gameVictory === true) {
            return (
                <div className="App">
                    <h3>{damageReport}</h3>
                    <h1>You are victorious!!</h1>
                    <button className="GameTable-button" onClick={this.refresh.bind(this)}>Press to start a new game</button>
                </div> 
            )
        } else if (monsterCurrentHealth <= 0) {
            if (this.state.gameRound === 3) {
                return (
                    <div className="App">
                        <h3>{damageReport}</h3>
                        <h2>You have defeated the {monster.monsterName}.</h2>
                        <button className="GameTable-button" onClick={this.newRound.bind(this)}>Press to continue...</button>
                    </div>
                )
            } else {
                return (
                    <div className="App">
                        <h3>{damageReport}</h3>
                        <h2>You have defeated the {monster.monsterName}.</h2>
                        <h4>The gate opens and a new foe emerges...</h4>
                        <button className="GameTable-button" onClick={this.newRound.bind(this)}>Press to continue...</button>
                    </div>
                )
            }
        } else {
            if (userTurn === 'monster') {
                return (
                    <div className="App">
                        <h2>HP: {playerCurrentHealth} / {playerMaxHealth}</h2>
                        <div className='play-mat'>
                            <div className='monster-container'>
                                <h1>You are fighting:</h1>
                                <ul>
                                    <li>Name: {monster.monsterName}</li>
                                    <li>Health: {monsterCurrentHealth} / {monsterMaxHealth}</li>
                                    <li>Armour: {monster.armour}</li>
                                    <li>Damage: 1 D{monster.damage}</li>
                                    <li>Special Move: {monster.specialMove}</li>
                                    <li>Special Cooldown: {monster.specialCooldown}</li>
                                </ul>
                            </div>
                            <div className='user-container'>
                                <h3 className="user-text-background">{damageReport}</h3>
                                <h2 className="user-text-background">Now the {monster.monsterName} will attack</h2>
                                <button className="GameTable-button" onClick={this.monsterAttack.bind(this)}>CONTINUE</button>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="App">
                        <h2>HP: {playerCurrentHealth} / {playerMaxHealth}</h2>
                        <div className='play-mat'>
                            <div className='monster-container'>
                                <h1>You are fighting:</h1>
                                <ul>
                                    <li>Name: {monster.monsterName}</li>
                                    <li>Health: {monsterCurrentHealth} / {monsterMaxHealth}</li>
                                    <li>Armour: {monster.armour}</li>
                                    <li>Damage: {monster.damage}</li>
                                    <li>Special Move: {monster.specialMove}</li>
                                    <li>Special Cooldown: {monster.specialCooldown}</li>
                                </ul>
                            </div>
                            <div className='user-container'>
                                <h3 className="user-text-background">{damageReport}</h3>
                                <button className="GameTable-button" onClick={this.attack.bind(this)}>Attack!</button>
                            </div>
                        </div>
                    </div>
                )
            }

        }
    }
}

export default GameTable