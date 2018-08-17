//imports dependencies and files
import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import players from "./players.json";
import './App.css';

//sets state to 0 or empty
class App extends Component {
  state = {
    players,
    clickedPlayers: [],
    score: 0
  };

  //when you click on a card, the player is taken out of the array
  imageClick = event => {
    const currentPlayer = event.target.alt;
    const PlayerAlreadyClicked = 
      this.state.clickedPlayers.indexOf(currentPlayer) > -1;

      //if you click on a player that has already been selected, the game is reset and cards reordered
      if (PlayerAlreadyClicked) {
        this.setState({
          players: this.state.players.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedPlayers: [],
          score: 0
        });
          alert("You're OUT! Play Ball Again?");

          //if you click on an available fish, your score is increased and cards reordered
      } else {
        this.setState(
          {
            players: this.state.players.sort(function(a, b) {
              return 0.5 - Math.random();
            }),
            clickedPlayers: this.state.clickedPlayers.concat(
              currentPlayer
            ),
            score: this.state.score + 1
          },
          //if you get all 12 players correct you get a congrats message and the game resets
          () => {
            if (this.state.score === 12) {
              alert("Winner Winner Chicken Dinner!");
              this.setState({
                players: this.state.players.sort(function(a, b) {
                  return 0.5 - Math.random();
                }),
                clickedPlayers: [],
                score: 0
              });
            }
          }
        );
      }
  };

  //the order of components to be rendered: navbar, jumbotron, friendcard, footer
  render() {
    return (
      <div>
        <Navbar
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.players.map(players => (
            <FriendCard
              imageClick={this.imageClick}
              id={players.id}
              key={players.id}
              image={players.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
