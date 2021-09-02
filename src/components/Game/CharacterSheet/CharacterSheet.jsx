import React from 'react'

const CharacterSheet = (props) => {
    const {store} = props

    return (
        <div className='player-container'>
            <h1>You are:</h1>
            <table>
                <tr>
                    <th>NAME</th>
                    <td>Nicholas Cage</td>
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
            </table>
        </div>
    )
}

export default CharacterSheet