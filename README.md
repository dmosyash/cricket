# Cricket Scoreboard System
This is a web application for cricket scoreboard.

[Click here to see the live App](https://home-automation-system.netlify.app/)

This application is developed in Reactjs.

## Structure of the App

The App is developed in ReactJs. It is created with the help of **React cli**. No framework is used for CSS and modeling purpose. Home page of this app is divided into 2 parts

- Live Score and status
- Scoreboard

#### Live Score and status
It is the main component, App component. It contains three parts Live Score, Scoreboard and Start/Stop button. It maintains the status of the Game, like start or stop, showing live score, showing status like who won the match. It gets the data from the Services and provide it to Scoreboard Component.


#### Scoreboard
This component is used to show the Scoreboard. It contains three parts Score, Batsmen board and Bowler board of both teams. By using BoardDetails component


### Services
This application has only three services.
- playGame
- boardhandler
- teams

#### playGame
This service is the controller of the Application. It initialize the game and play every bowl and update the scores and status of the game. It does this with the help of BoardHandler Class.

#### boardHandler
This service has a class BoardHandler, as name suggest it does all the operation to update the Board.
It also contains 2 more classes one for Batsman and one for Bowler.
