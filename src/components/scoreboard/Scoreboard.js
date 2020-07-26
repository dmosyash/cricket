import React, { useState } from 'react';
import BoardDetails from './../board-details/BoardDetails';

import './scoreboard.css';

/**
 * @name Scoreboard
 * @description This component is used to show the Scoreboard
 * It contains three parts Live Score, Batsmen board and Bowler board of both teams
 * By using BoardDetails component
 */

function Scoreboard({ team, data }) {
    const [isDetailsShown, setIsDetailsShown] = useState(false);
    let teamData = data[team];
    let rr = (teamData.score / (teamData.bowls / 6)).toFixed(1);
    return (
        <div className="board">
            <div className="score">
                <span className="label">{team}</span>
                <br />
                <span><span className="label">Runs:</span> {teamData.score}/{teamData.wickets}</span>
                <br />
                <span>RR: {isNaN(rr) ? 0 : rr}</span>
                <br />
                <span><span className="label">Overs:</span> {teamData.overs}</span>
                {teamData.target ? (<><br /><span className="label">target: {teamData.target}</span></>) : null}
            </div>
            <span style={{ cursor: 'pointer' }} onClick={() => setIsDetailsShown(!isDetailsShown)}>{isDetailsShown ? 'Hide' : 'Show'} Details</span>
            
            {isDetailsShown ?
                <BoardDetails team={team} data={data} />
                : null
            }
        </div>
    );
}

export default Scoreboard;
