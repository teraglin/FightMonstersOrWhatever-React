
import React from 'react'

import {
    Link
} from "react-router-dom"

const LandingScreen = () => {

    const alertNotice = {
        background: "#BA0F30",
        color: "white",
        padding: 10,
        borderRadius: 3
    }

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

                    <p>
                        go <a href="https://github.com/teraglin/Fight-Monsters-or-Whatever" target="_blank" rel="noreferrer noopener">here</a> to play the original game
                    </p>
                <div>
                    <h3 style={{color: "red", marginTop: 50}}>ALERTS:</h3>
                    <h3 style={alertNotice}>This is a work in progress.</h3>
                    <h3 style={alertNotice}>You will want to run me on computer or labtop for now. Mobile optimisation is on the way.</h3>
                </div>
                </div>
            </div>
        </div>
    )

}

export default LandingScreen