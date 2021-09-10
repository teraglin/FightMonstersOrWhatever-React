import React from 'react'

import {
    handleMonsterAttack,
    handlePlayerAttack,
    handleMonster,
    handlePlayerFlask,
    handlePlayerShield,
    handleMultiAttack
} from '../../../utils/gameFunctions'

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

        return (
            <div>

                {/* HURT MONSTER */}
                <button
                    onClick={(event) => { handlePlayerAttack(event, dispatch) }}
                    value={JSON.stringify(store)}
                >
                    Attack
                </button>

                {/* SHIELD */}
                <button
                    onClick={(event) => { handlePlayerShield(event, dispatch) }}
                    value={JSON.stringify(store)}
                    disabled={checkCooldown(store.shieldCooldown)}
                >
                    Shield
                </button>

                {/* FLASK */}
                <button
                    onClick={(event) => { handlePlayerFlask(event, dispatch) }}
                    value={Math.ceil(Math.random() * store.playerHealing)}
                    disabled={checkCooldown(store.flaskCooldown)}
                >
                    Flask
                </button>

            </div>
        )
    }

    //Monster Turn Controlls
    const monsterTurnControlls = (store) => {

        return (
            <div>
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

        if (store.monster.specialMove === "multiAttack") {      
            return (
                <div>
                    {/* Start multi attack, set multiCooldown to 2 */}
                    <button
                        onClick={(event) => { handleMultiAttack(event, dispatch) }}
                        value={JSON.stringify(store)}
                    >
                        Continue
                    </button>
                </div>
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
                <div>
                    <h3>
                        The {store.monster.monsterName} was too much for you. You fall back and watch the blood pool from your dying body. The crowd cheers.
                    </h3>
                    {/* change to a router link */}
                    <button>
                        Main Menu
                    </button>
                </div>
            )
        } else if (store.monsterCurrentHealth <= 0) {
            //monster health <= 0
            if (store.gameRound < 3) {
                //last monster dead
                return (
                    <div>
                        <h3>
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
                //not the last monster
                return (
                    //change button to router link
                    <div>
                        <h3>
                            "{store.playerName}! {store.playerName}! {store.playerName}!" The crowd goes wild. The gate opens and you return to your cell. You live to fight more monsters.
                        </h3>
                        {/* button => main menu */}
                        < button >
                            Main Menu
                        </button >
                    </div>
                )
            }
        } else {
            //render controls
            return (
                <div>
                    {renderCombatControlls(store)}
                </div>
            )
        }
    }

    return (
        <div>
            <h4>{store.damageReport}</h4>
            {combatLogic(store, dispatch)}
        </div >
    )
}

export default PlayerController