import React from 'react';

/**
 * @name BoardDetails
 * @description This component is used to show the Batting and Bowling board
 * It contains two components batsmen Scoreboard, Bowler scoreboard of both teams
 */

function BattingDetails({ data }) {
    function details() {
        if (!data.batsmenArray) return;
        return data.batsmenArray.map(bat => {
            return (
                <tr>
                    <td>{bat.name}</td>
                    <td>{bat.runs}</td>
                    <td>{bat.bowls}</td>
                    <td>{bat.fours}</td>
                    <td>{bat.sixes}</td>
                    <td>{bat.wicketBy}</td>
                    <td>{bat.sr}</td>
                </tr>
            )
        });
    }
    return (
        <div className="batting">
            <table>
                <tr>
                    <th>Batsmen</th>
                    <th>Runs</th>
                    <th>Bowls</th>
                    <th>4s</th>
                    <th>6s</th>
                    <th>Wickets by</th>
                    <th>SR</th>
                </tr>
                {details()}
            </table>
        </div>
    );
}

function BowlingDetails({ data }) {
    function details() {
        if (!data.bowlersArray) return;
        return data.bowlersArray.map(bowl => {
            return (
                <tr>
                    <td>{bowl.name}</td>
                    <td>{bowl.runs}</td>
                    <td>{bowl.overs}</td>
                    <td>{bowl.wickets}</td>
                    <td>{bowl.madein}</td>
                    <td>{bowl.econ}</td>
                    <td>{bowl.zeros}</td>
                    <td>{bowl.fours}</td>
                    <td>{bowl.sixes}</td>
                    <td>{bowl.wd}</td>
                    <td>{bowl.nb}</td>
                </tr>
            )
        });
    }
    return (
        <div className="bowling">
            <table>
                <tr>
                    <th>Bowler</th>
                    <th>Runs</th>
                    <th>Overs</th>
                    <th>Wickets</th>
                    <th>Madein</th>
                    <th>Econ</th>
                    <th>0s</th>
                    <th>4s</th>
                    <th>6s</th>
                    <th>WD</th>
                    <th>NB</th>
                </tr>
                {details()}
            </table>
        </div>
    );
}

function BoardDetails({ team, data }) {
    const teams = Object.keys(data);
    const oppTeam = teams.find(t => t !== team);
    return (
        <div className="details">
            <h4>{team}</h4>
            <BattingDetails data={data[team]} />
            <BowlingDetails data={data[team]} />
            {data[team].target ?
                (
                    <>
                        <h4>{oppTeam}</h4>
                        <BattingDetails data={data[oppTeam]} />
                        <BowlingDetails data={data[oppTeam]} />
                    </>
                ) : null
            }
        </div>
    );
}

export default BoardDetails;
