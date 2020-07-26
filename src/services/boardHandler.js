import teams from './teams';

/**
 * @name Batsman
 * @description This class contains all the details of the Batsman
 */

class Batsman {
    constructor(name) {
        this.name = name;
        this.runs = 0;
        this.bowls = 0;
        this.wickets = 0;
        this.fours = 0;
        this.sixes = 0;
        this.wicketBy = null;
        this.sr = 0;
    }

    updateScore = (score) => {
        this.runs += score;
        this.bowls += 1;
        this.fours += score === 4 ? 1 : 0;
        this.sixes += score === 6 ? 1 : 0;
        let sr = this.runs / this.bowls;
        this.sr = sr.toFixed(1);
    }

    gotOut = (bowler) => {
        this.wicketBy = bowler;
    }
}

/**
 * @name Bowler
 * @description This class contains all the details of the Bowler
 */

class Bowler {
    constructor(name) {
        this.name = name;
        this.runs = 0;
        this.bowls = 0;
        this.overs = 0;
        this.wickets = 0;
        this.econ = 0;
        this.zeros = 0;
        this.fours = 0;
        this.sixes = 0;
        this.wd = 0;
        this.nb = 0;
        this.madein = 0;
        this.lastOverScore = 0;
    }

    updateBowl = score => {
        this.runs += score;
        this.bowls += 1;
        this.overs = `${parseInt(this.bowls / 6)}.${this.bowls % 6}`;
        let econ = this.runs / (this.bowls / 6);
        this.econ = econ.toFixed(1);
        this.zeros += score === 0 ? 1 : 0;
        this.fours += score === 4 ? 1 : 0;
        this.sixs += score === 6 ? 1 : 0;
    }

    updateWide = () => {
        this.runs += 1;
        this.wd += 1;
    }

    updateNoBall = () => {
        this.runs += 1;
        this.nb += 1;
    }

    didOut = () => {
        this.bowls += 1;
        this.overs = `${parseInt(this.bowls / 6)}.${this.bowls % 6}`;
        this.wickets += 1;
    }

    updateOver = () => {
        let runsInOver = this.runs - this.lastOverScore;
        this.lastOverScore = this.runs;
        if (runsInOver === 0) {
            this.madein += 1;
        }
    }
}

/**
 * @name BoardHandler
 * @description This class maintains all the functionality of one innings in a match
 */

export default class BoardHandler {
    constructor(battingTeam, bowlingTeam) {
        this.battingTeam = battingTeam;
        this.score = 0;
        this.bowls = 0;
        this.overs = 0;
        this.wickets = 0;
        this.bowlerIndex = 11;
        this.bowlersArray = [
            new Bowler(teams[bowlingTeam][11]),
            new Bowler(teams[bowlingTeam][10]),
            new Bowler(teams[bowlingTeam][9]),
            new Bowler(teams[bowlingTeam][8]),
        ];
        this.batsmenArray = [new Batsman(teams[battingTeam][0]), new Batsman(teams[battingTeam][1])];
        this.batsmen = {
            strike: this.batsmenArray[0],
            nonStrike: this.batsmenArray[1]
        };
        this.switchBowler();
    }

    updateScore = score => {
        score = parseInt(score);
        this.score += score;
        this.batsmen.strike.updateScore(score);
        this.bowler.updateBowl(score);
        if (score % 2 === 1) {
            this.switchStrike();
        }
        this.bowled();
    }

    updateExtras = bowl => {
        switch (bowl) {
            case 'wd':
                this.score += 1;
                this.bowler.updateWide();
                break;
        
            case 'nb':
                this.score += 1;
                this.bowler.updateNoBall();
                break;

            case 'out':
                this.bowler.didOut();
                this.wickets += 1;
                this.batsmen.strike.gotOut(this.bowler.name);
                let tmp = new Batsman(teams[this.battingTeam][this.batsmenArray.length]);
                this.batsmenArray.push(tmp);
                this.batsmen.strike = tmp;
                this.bowled();
                break;
            
            default:
                break;
        }
    }

    bowled = () => {
        this.bowls += 1;
        this.overs = `${parseInt(this.bowls / 6)}.${this.bowls % 6}`;
        if (this.bowls % 6 === 0) {
            this.bowler.updateOver();
            this.switchBowler();
            this.switchStrike();
        }
    }

    switchStrike = () => {
        let tmp = this.batsmen.nonStrike;
        this.batsmen.nonStrike = this.batsmen.strike;
        this.batsmen.strike = tmp;
    }

    switchBowler = () => {
        let randomIndex = Math.floor(Math.random() * 4);
        this.bowler = this.bowlersArray[randomIndex];
    }
}