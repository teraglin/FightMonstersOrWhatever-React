import {
    Link
} from "react-router-dom"

const About = () => {
    return (
        <div className="htp-container">
            <div className="htp">
                <h1>HOW TO PLAY</h1>

                <h3>OVERVIEW</h3>

                <p>
                    Fight Monsters or Whatever is a turn-based fighting game that borrows combat mechanics from 5th edition Dungeons & Dragons (with a couple of changes).
                </p>

                <p>
                    In FMOW you are a pit fighter facing a number of monsters that are randomly called into the pit. There are three tiers of monsters, each harder than the previous tier. Defeating a monster takes you to the next tier. If you defeat THREE monsters, you win! If your health reaches 0, you lose.
                </p>

                <p>
                    To defeat a monster you will fight with a range of attack stances to alter your odds and time the use of your shield and healing flask.
                </p>

                <hr />

                <h3>THE CONTROLS</h3>

                <p>
                    When it is your turn in FMOW, you can do one of three things:
                </p>

                <ul>
                    <li>
                        <strong>ATTACK</strong> the monster
                    </li>
                    <li>
                        <strong>SHIELD</strong> yourself
                    </li>
                    <li>
                        Use your <strong>FLASK</strong>
                    </li>
                </ul>


                <h4>ATTACK</h4>
                <p>
                    An attack consists of two separate rolls that the game performs on your behalf. The first roll is to hit, and the second roll is to determine how much damage you do to your opponent. When rolling to hit, the game will compare the roll against the monster’s armour value. If the value is equal to or higher than the monster’s armour, you will hit your target, otherwise it’s a miss. Monsters with a higher armour value will be harder to hit.
                </p>

                <p>
                    When your attack hits, the game will roll a random number between 1 and the player’s damage score to determine damage. If however the roll to hit your monster is the maximum value, you will perform a “critical hit”. When this happens, your damage roll is doubled.
                </p>

                <p>
                    These rules also apply to you when the monster attacks back.
                </p>

                <p>
                    When you perform an attack action, you can attack with one of three attack stances:
                </p>

                <ul>
                    <li>Reckless</li>
                    <li>Balanced</li>
                    <li>Defensive</li>
                </ul>

                <p>
                    <strong>Reckless:</strong> Attacking reckless makes it more likely for you to hit your target. Two rolls will be made to hit your target, the game will use the highest score. However, attacking recklessly will leave you open, meaning your opponent’s attack will follow the same rules.
                </p>

                <p>
                    <strong>Balanced:</strong> You perform a straight attack. One roll will be made to hit and your opponent will do the same.
                </p>

                <p>
                    <strong>Defensive:</strong> Attacking defensively makes it harder for you to hit your target. Two rolls will be made to hit your target, the game chooses the lowest score. However, attacking defensively will make it harder for you to get hit, meaning your opponent's attack will follow the same rules.
                </p>

                <h4>Shield</h4>

                <p>
                    Casting a shield will prevent you from all harm on your opponent's next attack. This is especially useful against deadly “special attacks” that monsters can perform. Once the shield is cast it will take some time to cool down before you can use it again, so time your shields wisely!
                </p>

                <h4>Flask</h4>

                <p>
                    Using your flask will heal you. The amount you heal is not an incredible amount, but if you’re feeling lucky it might be your last chance against a powerful enemy. It can also be a good way to stall if your shield is on cooldown and you’re holding out to use it again. Once the flask is used it will take some time to refill before you can use it again, so time your flask wisely!
                </p>

                <hr />

                <h3>THE MONSTER’S TURN</h3>

                <p>
                    The monster’s you fight against will respond depending on how you attack, if you are reckless with your swings you may get an offensive edge but your defence will suffer. The opposite applies if you fight defensively.
                </p>

                <p>
                    Monsters also can perform “special attacks”. These attacks trigger on a cooldown that is unique to each monster. A large part of combat in FMOW is learning when these cooldowns occur for each monster and using your shield and flask at the right time.
                </p>

                <p>
                    There are three different special attacks:
                </p>

                <ul>
                    <li>Multi Attack</li>
                    <li>Restrain</li>
                    <li>Breath</li>
                </ul>

                <p>
                    <strong>Multi Attack:</strong> This is the most common special attack that monsters will use. In summary, it allows a monster to use three attacks in a row in one turn. You will want to be careful about how you are attacking when a multi attack starts. If you are attacking recklessly for example, the monster will be more likely to hit you on all three attacks. A defensive stance is effective against a multi attack, and using your shield will prevent damage from all three attacks entirely!
                </p>

                <p>
                    <strong>Restrain:</strong> Monsters like the GIANT SPIDER and the BASILISK will use a restrain special attack. When a monster uses one of these, it will always hit and deal damage unless your shield is up. Furthermore, if hit by a restrain, your next turn will pass and the monster will attack again as though you’ve attacked recklessly. After this your turn continues as normal.
                </p>

                <p>

                    <strong>Breath:</strong> A breath attack, performed more commonly by wyverns and dragons, is the most deadly of special attacks. This attack always hits and can only be blocked by a shield. The breath attack does a lot of damage, but it does double when attacking recklessly, half when attacking defensively and the full amount when using a balanced stance.
                </p>

                <hr />

                <h3>WINNING THE GAME</h3>

                <p>
                    When you have felled three monsters, you win Fight Monsters or Whatever. Should your health fall to 0 at any point along the way, you lose.
                </p>

                <p>
                    In any case that is how you play Fight Monsters or Whatever. Good luck and happy fighting!
                </p>

                <hr />

                <h3>FURTHER NOTES</h3>

                <h4>Monster and Player stats Disclaimer</h4>

                <p>
                    These are printed in game purely to see the mechanisms of the game. They are temporary and will be removed in the future.
                </p>

                <h4>Future additions</h4>
                <ul>
                    <li>
                        Roll and hit values printed
                    </li>
                    <li>
                        Choose 1 of 3 random items after defeating each monster. Each item improves your statistics or allows an ability like being able to see special attack cooldowns.
                    </li>
                    <li>
                        Combat log
                    </li>
                    <li>
                        Local storage saving
                    </li>
                    <li>
                        High scores
                    </li>
                    <li>
                        More monsters/rounds
                    </li>
                    <li>
                        More modes (endless, monster mode)
                    </li>
                </ul>

                <h4>About the creator</h4>
                <p>
                    Cick <a rel="noreferrer noopener" target="_blank" href="https://aidankirvan.netlify.app/">here</a> to view my portfolio!
                </p>

                <Link to="/">
                    <button className="game-table-button">
                        BACK
                    </button>
                </Link>

            </div>
        </div>
    )
}

export default About