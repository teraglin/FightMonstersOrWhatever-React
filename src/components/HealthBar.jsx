import GameTable from './GameTable'

function HealthBar(props) {
    const {currentHealth, maxHealth} = props
    return (
        <h1>{currentHealth}/{maxHealth}</h1>
    )
}

export default HealthBar