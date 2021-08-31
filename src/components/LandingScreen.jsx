import {
    // gameStart
} from '../utils/gameFunctions'

import { encounterTable } from "../data/encounterTable"

const LandingScreen = ({store, dispatch}) => {

    //ROLL NEW MONSTER
    const encounterList1 = encounterTable[0]
    const newMon = encounterList1[Math.floor(Math.random() * encounterList1.length)]

    return (
        <div>
            {/* <button onClick={(event) => {gameStart(event, dispatch)}} value={JSON.stringify(newMon)}>Click to set monster</button> */}
            <h1>landing</h1>
        </div>
    )

}

export default LandingScreen