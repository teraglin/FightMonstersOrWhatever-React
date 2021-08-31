import React from 'react'

const MonsterSheet = (props) => {
    const {store, currentMonster} = props

    return (
        <div className='monster-container'>
            <h1>You are fighting:</h1>
            <table>
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
                    <td>{currentMonster.specialCooldown}</td>
                </tr>
            </table>
        </div>
    )
}

export default MonsterSheet