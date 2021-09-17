
import React from 'react'

import {
    Link
} from "react-router-dom"

const LandingScreen = () => {

    return (
        <div>
            <div className="App">
                <div>
                    <h1>Fight Monsters or Whatever React Edt</h1>
                    <p>By Aidan Kirvan</p>
                </div>

                <Link to="game">
                    <button className="GameTable-button">
                        PLAY GAME
                    </button>
                </Link>

                <Link to="about">
                    <button className="GameTable-button">
                        HOW TO PLAY
                    </button>
                </Link>
                <div>
                    <h3>This is a work in progress</h3>
                    <a href="https://github.com/teraglin/Fight-Monsters-or-Whatever" target="_blank" rel="noreferrer">go here </a>
                    <span>to play the original game</span>
                </div>
            </div>
        </div>
    )

}

export default LandingScreen