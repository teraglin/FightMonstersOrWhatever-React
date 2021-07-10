import {
    gameEnd
} from '../utils/gameFunctions'

import { encounterTable } from "../data/monsterSheets"

const GameStart = ({store, dispatch}) => {

    //Retrieve Monster Object from stringified data
    let monsterObject = []

    if (store.monster !== null) {
        monsterObject = JSON.parse(store.monster)
    }

    return (
        <div>
            <button onClick={(event) => {gameEnd(event, dispatch)}} value={"false"} >take me back</button>
            <p>
                {store.monster === null ? "no monster" : monsterObject.monsterName}
            </p>
        </div>
    )

}

export default GameStart