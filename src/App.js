import React, { Component } from "react";
import "./App.css";

import Button from "./components/Button";
import wordList from "./words.js";

const startingState = {
  currentWord: "No Phrase Selected",
  wordSelected: false,
  ready: false,
  currentTime: 60,
  currentlyRunning: false,
  gameOver: false,
  difficulty: "easy"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = startingState;
  }

  getNewWord = () => {
    if (this.state.currentlyRunning) {
      return;
    }

    const words = wordList[this.state.difficulty];

    this.setState({
      currentWord: words[Math.floor(Math.random() * words.length)],
      wordSelected: true
    });
  };

  setReady = () => {
    this.setState({
      ready: true
    });
  };

  setDifficulty = e => {
    this.setState(
      {
        difficulty: e.currentTarget.value
      },
      () => this.getNewWord()
    );
  };

  startTimer = () => {
    this.setState({
      currentlyRunning: true
    });
    this.timerID = setInterval(() => this.tick(), 1000);
  };

  stopTimer = () => {
    clearInterval(this.timerID);
    this.setState(startingState);
  };

  reset = () => {
    this.setState(startingState);
  };

  tick = () => {
    this.setState((prevState, prevProps) => ({
      currentTime: prevState.currentTime - 1
    }));

    if (this.state.currentTime === 0) {
      this.stopTimer();
      this.setState({
        gameOver: true
      });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Win, Lose, or Draw!</h1>
        </header>
        <main className="flex flex-hor-center">
          {this.state.gameOver && (
            <div className="game-over flex flex-center">
              <div>
                <h2>Time's Up!</h2>
                <Button
                  onClick={this.reset}
                  text="New Game"
                  class="btn-warning"
                />
              </div>
            </div>
          )}
          {this.state.ready ? (
            <section className="timer-block">
              <h2>Start Timer</h2>
              <div className="timer">{this.state.currentTime}</div>
              {this.state.currentlyRunning ? (
                <Button
                  onClick={this.stopTimer}
                  text="Stop"
                  class="btn-danger"
                />
              ) : (
                <Button
                  onClick={this.startTimer}
                  text="Start"
                  class="btn-primary"
                />
              )}
            </section>
          ) : (
            <section className="word-block">
              <h2>Select Phrase</h2>
              <div className="flex flex-center">
                <div className="radio-button">
                  <input
                    type="radio"
                    id="difficultyChoice1"
                    name="difficulty"
                    value="easy"
                    checked={this.state.difficulty === "easy"}
                    onChange={this.setDifficulty}
                  />
                  <label
                    for="difficultyChoice1"
                    className={
                      this.state.difficulty === "easy"
                        ? "btn-info"
                        : "btn-secondary"
                    }
                  >
                    Easy
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    type="radio"
                    id="difficultyChoice2"
                    name="difficulty"
                    value="medium"
                    checked={this.state.difficulty === "medium"}
                    onChange={this.setDifficulty}
                  />
                  <label
                    for="difficultyChoice2"
                    className={
                      this.state.difficulty === "medium"
                        ? "btn-info"
                        : "btn-secondary"
                    }
                  >
                    Medium
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    type="radio"
                    id="difficultyChoice3"
                    name="difficulty"
                    value="hard"
                    checked={this.state.difficulty === "hard"}
                    onChange={this.setDifficulty}
                  />
                  <label
                    for="difficultyChoice3"
                    className={
                      this.state.difficulty === "hard"
                        ? "btn-info"
                        : "btn-secondary"
                    }
                  >
                    Hard
                  </label>
                </div>
              </div>

              <div className="current-word">{this.state.currentWord}</div>
              <Button
                onClick={this.getNewWord}
                text="New Phrase"
                class="btn-primary"
              />
              <div className="spacing-top">
                <Button
                  onClick={this.setReady}
                  text="Press When Ready"
                  class="btn-success"
                  disabled={!this.state.wordSelected}
                />
              </div>
            </section>
          )}
        </main>
      </div>
    );
  }
}

export default App;
