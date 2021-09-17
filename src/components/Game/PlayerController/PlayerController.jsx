import React from 'react'

import {
    handleMonster,
    handleShowAttackButtons,
    handleGameRefresh
} from '../../../utils/gameFunctions'

import {
    handlePlayerRecklessAttack,
    handlePlayerBalancedAttack,
    handlePlayerDefensiveAttack,
    handleMonsterAttack,
    handleMultiAttack,
    handleRestrain,
    handleBreath,
    handlePlayerFlask,
    handlePlayerShield,
} from '../../../utils/combatFunctions'

const PlayerController = (props) => {
    const { store, dispatch } = props

    const checkCooldown = (cooldown) => {
        if (cooldown === 0) {
            return ""
        } else {
            return "disabled"
        }
    }

    //Player Turn Controlls
    const playerTurnControlls = (store) => {
        if (store.showAttackButtons === false) {
            return (
                <div className="clear-background">
                    <button
                        id="purple-button"
                        onClick={(event) => { handleShowAttackButtons(event, dispatch) }}
                        value={JSON.stringify(store)}
                    >
                        ATTACK
                    </button>

                    {/* SHIELD */}
                    <button
                        id="blue-button"
                        onClick={(event) => { handlePlayerShield(event, dispatch) }}
                        value={JSON.stringify(store)}
                        disabled={checkCooldown(store.shieldCooldown)}
                    >
                        SHIELD
                    </button>

                    {/* FLASK */}
                    <button
                        id="green-button"
                        onClick={(event) => { handlePlayerFlask(event, dispatch) }}
                        value={Math.ceil(Math.random() * store.playerHealing)}
                        disabled={checkCooldown(store.flaskCooldown)}
                    >
                        FLASK
                    </button>
                </div>
            )
        } else {
            return (
                <div className="clear-background">
                    <div className="clear-background">
                        <button
                            id="purple-button"
                            onClick={(event) => { handlePlayerRecklessAttack(event, dispatch) }}
                            value={JSON.stringify(store)}
                        >
                            RECKLESS
                        </button>

                        <button
                            id="purple-button"
                            onClick={(event) => { handlePlayerBalancedAttack(event, dispatch) }}
                            value={JSON.stringify(store)}
                        >
                            BALANCED
                        </button>

                        <button
                            id="purple-button"
                            onClick={(event) => { handlePlayerDefensiveAttack(event, dispatch) }}
                            value={JSON.stringify(store)}
                        >
                            DEFENSIVE
                        </button>
                    </div>

                    <button
                        onClick={(event) => { handleShowAttackButtons(event, dispatch) }}
                        value={JSON.stringify(store)}
                    >
                        BACK
                    </button>
                </div>
            )
        }
    }

    //Monster Turn Controlls
    const monsterTurnControlls = (store) => {

        return (
            <div className="clear-background">
                {/* HURT PLAYER */}
                <button
                    onClick={(event) => { handleMonsterAttack(event, dispatch) }}
                    value={JSON.stringify(store)}
                >
                    Continue
                </button>
            </div>
        )
    }

    const monsterSpecialControls = (store) => {
        // set multiCooldown to 3 with initiateMultiAttack
        // if 0 -> initiate
        // else if 1 -> finalise
        // else multiattack

        const { specialMove } = store.monster

        if (specialMove === "multiAttack") {
            // MULTIATTACK
            return (
                <button
                    onClick={(event) => { handleMultiAttack(event, dispatch) }}
                    value={JSON.stringify(store)}
                >
                    Continue
                </button>
            )
        } else if (specialMove === "restrain") {
            // RESTRAIN
            return (
                <button
                    onClick={(event) => { handleRestrain(event, dispatch) }}
                    value={JSON.stringify(store)}
                >
                    Continue
                </button>
            )
        } else if (specialMove === "breath") {
            return (
                <button
                    onClick={(event) => { handleBreath(event, dispatch) }}
                    value={JSON.stringify(store)}
                >
                    Continue
                </button>
            )
        }
    }

    //RENDER CONTROLS

    //if userTurn -> playerTurnControls
    //else if !userTurn
    // if monster specialCooldown === 0 -> monsterSpecialControls
    // else -> monsterTurnControls

    const renderCombatControlls = (store) => {
        //PLAYER
        if (store.userTurn === true) {
            return (
                playerTurnControlls(store)
            )
            //MONSTER
        } else if (store.userTurn === false) {
            //MONSTER SPECIAL
            if (store.specialCooldown === 0) {
                return (
                    monsterSpecialControls(store)
                )
                //MONSTER NORMAL
            } else {
                return (
                    monsterTurnControlls(store)
                )
            }
            //ERROR
        } else {
            return (
                <div>
                    <h1>ERROR</h1>
                    <p>Refresh page. Progress cannot be saved.</p>
                </div>
            )
        }
    }

    const combatLogic = (store, dispatch) => {
        //if player dead => render defeat screen
        //if monster dead
        //if game round === 3 => victory screen
        //if game round < 3 => you killed monster -> click to continue -> new monster
        //else combat screen
        if (store.playerCurrentHealth <= 0) {
            //defeat
            return (
                <div className="clear-background">
                    <h3 className="clear-background">
                        The {store.monster.monsterName} was too much for you. You fall back and watch the blood pool from your dying body. The crowd cheers.
                    </h3>
                    {/* change to a router link */}
                    <button
                        onClick={(event) => { handleGameRefresh(event, dispatch) }}
                    >
                        Main Menu
                    </button>
                </div>
            )
        } else if (store.monsterCurrentHealth <= 0) {
            //monster health <= 0
            if (store.gameRound < 3) {
                // not last monster
                return (
                    <div className="clear-background">
                        <h3 className="clear-background">
                            You pull your blade from the {store.monster.monsterName}'s limp body. The crowd cheers. The gates open and another monster emerges
                        </h3>
                        < button
                            onClick={(event) => { handleMonster(event, dispatch) }}
                            value={store.gameRound}
                        >
                            Continue
                        </button >
                    </div>
                )
            } else {
                //last monster
                return (
                    <div className="clear-background">
                        <h3 className="clear-background">
                            "{store.playerName}! {store.playerName}! {store.playerName}!" The crowd goes wild. The gate opens and you return to your cell. You live to fight more monsters.
                        </h3>
                        {/* button => main menu */}
                        <button
                            onClick={(event) => { handleGameRefresh(event, dispatch) }}
                        >
                            Main Menu
                        </button >
                    </div>
                )
            }
        } else {
            //render controls
            return (
                <div className="clear-background">
                    {renderCombatControlls(store)}
                </div>
            )
        }
    }

    return (
        <div className="user-container">
            <h4 className="clear-background">{store.damageReport}</h4>
            {combatLogic(store, dispatch)}
        </div >
    )
}

export default PlayerController