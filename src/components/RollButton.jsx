import {
    handleRoll
} from '../utils/gameFunctions'

const RollButton = ({store, dispatch}) => {

    return (
        <div>
            <button onClick={(event) => {handleRoll(event, dispatch)}} value={Math.ceil(Math.random() * 20)}>Click to roll</button>
            <p>{store.diceRollValue}</p>
        </div>
    )

}

export default RollButton