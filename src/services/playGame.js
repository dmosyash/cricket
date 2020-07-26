import BoardHandler from './boardHandler';

const typesOfScore = ['0', '1', '2', '3', '4', '5', '6'];
const typesOfExtras = ['wd', 'nb', 'out'];
let scoreListener;
let isPaused = false;

export const startGame = async (scoreCallback, dataCallback, inningsOver, gameOver) => {
    scoreListener = scoreCallback;
    let teamABatting = new BoardHandler('teamA', 'teamB');
    dataCallback(teamABatting);
    await startBowling(teamABatting);
    let teamBBatting = new BoardHandler('teamB', 'teamA');
    teamBBatting.target = teamABatting.score + 1;
    inningsOver(teamBBatting);
    await startBowling(teamBBatting);
    gameOver();
}

export const togglePausePlay = () => {
    isPaused = !isPaused;
}

const startBowling = game => {
    return new Promise(resolve => {
        const bowlInterval = setInterval(() => {
            if (!isPaused) {
                if (game.bowls === 119 || game.wickets === 10 || (game.target && game.score >= game.target)) {
                    clearInterval(bowlInterval);
                    resolve();
                }
                bowl(game);
            }
        }, 1000);
    });
}

const bowl = game => {
    let scoreIndex = Math.floor(Math.random() * 10);
    if (scoreIndex < 7) {
        game.updateScore(typesOfScore[scoreIndex]);
        scoreListener(typesOfScore[scoreIndex], game);
    } else {
        game.updateExtras(typesOfExtras[scoreIndex - 7]);
        scoreListener(typesOfExtras[scoreIndex - 7], game);
    }
}