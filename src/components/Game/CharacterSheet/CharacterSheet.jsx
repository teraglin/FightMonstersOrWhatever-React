import React from 'react'

import { ProgressBar } from '../ProgressBar/ProgressBar'

const CharacterSheet = (props) => {
    const {store} = props

    const renderCooldown = (input) => {
        const value = parseInt(input)
        if (value === 0) {
            return "READY"
        } else {
            return value + "..."
        }
    }

    return (
        <div className='player-container'>
            <h1>You are:</h1>

            <ProgressBar bgcolor="#94C973" completed={store.playerCurrentHealth} maxHealth={store.playerMaxHealth} name={store.playerName} />

            <table>
                <tr>
                    <th>NAME</th>
                    <td>{store.playerName}</td>
                </tr>
                <tr>
                    <th>HEALTH</th>
                    <td>{store.playerCurrentHealth} / {store.playerMaxHealth}</td>
                </tr>
                <tr>
                    <th>ARMOUR</th>
                    <td>{store.playerArmour}</td>
                </tr>
                <tr>
                    <th>DAMAGE</th>
                    <td>{store.playerDamage}</td>
                </tr>
                <tr>
                    <th>SHIELD</th>
                    <td>{renderCooldown(store.shieldCooldown)}</td>
                </tr>
                <tr>
                    <th>FLASK</th>
                    <td>{renderCooldown(store.flaskCooldown)}</td>
                </tr>
            </table>
        </div>
    )
}

export default CharacterSheet