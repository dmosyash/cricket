import React, { useState } from 'react';
import ScoreBoard from './components/scoreboard/Scoreboard';

import { startGame, togglePausePlay } from './services/playGame';
import './App.css';

/**
 * @name App
 * @description The main component of the app.
 * It contains three parts Live Score, Scoreboard and Start/Stop button
 * It maintains the status of the Game, like start or stop, showing live score
 * showing status like who won the match. It gets the data from the Services 
 * and provide it to Scoreboard Component
 */

function App() {
  const [isGameStarted, setIsGameStarted] = useState(0);
  const [score, setScore] = useState('Click on Start to Play');
  const [scoreDetails, setScoreDetails] = useState({ TeamA: {}, TeamB: {}});
  const [team, setTeam] = useState('TeamA');
  let scoreData = {};

  const toggleGame = () => {
    if (isGameStarted) {
      togglePausePlay();
      setIsGameStarted(isGameStarted + 1);
    } else {
      setIsGameStarted(1);
      startGame(showScore, getData, inningsOver, gameOver);
    }
  }

  const getData = (data) => {
    scoreData = data;
    scoreDetails[team] = scoreData;
    setScoreDetails(scoreDetails);
  }

  const showScore = (score) => {
    setScore(score);
  }

  const inningsOver = data => {
    setTeam('TeamB');
    let tmp = scoreDetails;
    tmp['TeamB'] = data;
    setScoreDetails(tmp);
  }

  const gameOver = () => {
    if (scoreDetails.TeamA.score === scoreDetails.TeamB.score) {
      setScore(`This Match is a Draw`);
    } else if (scoreDetails.TeamA.score > scoreDetails.TeamB.score) {
        setScore('TeamA Wins');
    } else {
      setScore(`TeamB Wins`);
    }
    setIsGameStarted(0);
  }

  return (
    <div className="App">
      <header className="App-header">
        <ScoreBoard team={team} data={scoreDetails} />
        <div className="score-status">{score}</div>
        <button className="toggle-button" onClick={() => toggleGame(isGameStarted)}>{isGameStarted % 2 === 0 ? 'Start' : 'Stop'}</button>
      </header>
    </div>
  );
}

export default App;
