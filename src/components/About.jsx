import {
    Link
} from "react-router-dom"

const About = () => {
    return (
        <div>
            <h1>HOW TO PLAY</h1>
            <h3>Figure it out yourself.</h3>

            <p>In all seriousness, this section is still being written.</p>
            <Link to="/">
                <button className="game-table-button">
                    BACK
                </button>
            </Link>
        </div>
    )
}

export default About