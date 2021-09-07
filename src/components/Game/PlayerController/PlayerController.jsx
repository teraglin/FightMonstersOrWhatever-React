import React from 'react'

import {
    handleMonsterAttack,
    handlePlayerAttack,
    handleMonster,
    handlePlayerFlask
} from '../../../utils/gameFunctions'

const PlayerController = (props) => {
    const { store, dispatch } = props

    //Player Turn Controlls
    const playerTurnControlls = (store) => {
        
        return (
            <div>
                {/* HURT MONSTER */}
                <button
                    onClick={(event) => { handlePlayerAttack(event, dispatch) }}
                    value={JSON.stringify(store)}
                >
                    Hurt Monster
                </button>

                {/* FLASK */}
                <button
                    onClick={(event) => { handlePlayerFlask(event, dispatch) }}
                    value={Math.ceil(Math.random() * store.playerHealing)}
                >
                    Flask
                </button>
            </div>
        )
    }

    //Monster Turn Controlls
    const MonsterTurnControlls = (store) => {
        
        return (
            <div>
                {/* HURT PLAYER */}
                <button
                                    // onClick={(event) => { handlePlayerAttack(event, dispatch) }}
                                    // value={JSON.stringify(store)}
                    onClick={(event) => { handleMonsterAttack(event, dispatch) }}
                    value={JSON.stringify(store)}
                >
                    Hurt Player
                </button>
            </div>
        )
    }

    //RENDER CONTROLS
    const renderCombatControlls = (store) => {
        if (store.userTurn === true) {
            return (
                playerTurnControlls(store)
            )
        } else if (store.userTurn === false) {
            return (
                MonsterTurnControlls(store)
            )
        } else {
            return (
                <h1>ERROR</h1>
            )
        }
    }

    const combatLogic = (store, dispatch) => {
        //if player dead => lass screen
        //if monster dead
        //if game round === 3 => victory screen
        //if game round < 3 => you killed monster -> click to continue -> new monster
        //else combat screen
        if (store.playerCurrentHealth <= 0) {
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
            if (store.gameRound < 3) {
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
                //button -> main menu
                return (
                    //change button to router link
                    <div>
                        <h3>
                            "{store.playerName}! {store.playerName}! {store.playerName}!" The crowd goes wild. The gate opens and you return to your cell. You live to fight more monsters.
                        </h3>
                        < button >
                            Main Menu
                        </button >
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <h3>
                        What do you do?
                    </h3>
                    {renderCombatControlls(store)}
                </div>
            )
        }
    }


    // const combatLog = (store) => {
    //     if (store.playerCurrentHealth >= 0) {
    //         return 
    //     }
    // }

    return (
        <div>
            <p>
                {store.damageReport}
            </p>
            {combatLogic(store, dispatch)}
        </div >
    )
}

export default PlayerController