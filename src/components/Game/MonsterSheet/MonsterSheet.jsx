import React from 'react'

import { ProgressBar } from '../ProgressBar/ProgressBar'

const MonsterSheet = (props) => {
    const { store, currentMonster } = props

    return (
        <div className='monster-container'>

            <ProgressBar bgcolor="#BA0F30" completed={store.monsterCurrentHealth} maxHealth={store.monsterMaxHealth} name={currentMonster.monsterName} />

            <table>
                <tbody>
                    <tr>
                        <th>NAME</th>
                        <td>{currentMonster.monsterName}</td>
                    </tr>
                    <tr>
                        <th>HEALTH</th>
                        <td>{store.monsterCurrentHealth} / {store.monsterMaxHealth}</td>
                    </tr>
                    <tr>
                        <th>ARMOUR</th>
                        <td>{currentMonster.armour}</td>
                    </tr>
                    <tr>
                        <th>DAMAGE</th>
                        <td>{currentMonster.damage}</td>
                    </tr>
                    <tr>
                        <th>SPECIAL MOVE</th>
                        <td>{currentMonster.specialMove}</td>
                    </tr>
                    <tr>
                        <th>SPECIAL COOLDOWN</th>
                        <td>{store.specialCooldown}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MonsterSheet