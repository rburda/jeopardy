import React from 'react';
import {Client} from 'node-rest-client';
import GameBoard from './GameBoard';
import Question from './Question';
import DailyDoubleQuestion from './DailyDoubleQuestion';

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {gameState: {status:"loading"}, rawCategories:[]};
    this.onSelectQuestion = this.onSelectQuestion.bind(this);
    this.onCompleteQuestion = this.onCompleteQuestion.bind(this);
    this.registerQuestions = this.registerQuestions.bind(this);
    this.loadQuestions(this.registerQuestions);
  }

  render() {
    if (this.state.gameState.status === 'loading') {
      return (<div>Loading.....</div>);
    } else if (this.state.gameState.view === 'gameBoard') {
      return <GameBoard
        categories={this.state.categories} 
        players={this.state.players} 
        onSelectQuestion={this.onSelectQuestion}
        visible={this.state.gameState.view === 'gameBoard'} />;
    } else if (this.state.gameState.currentQuestion.isDailyDouble) {
      return <DailyDoubleQuestion
        question={this.state.gameState.currentQuestion}
        players={this.state.players}
        onComplete={this.onCompleteQuestion}
        onAnswered={this.onAnswered.bind(this)} />;        
    } else {
      return <Question 
        question={this.state.gameState.currentQuestion} 
        players={this.state.players}
        onComplete={this.onCompleteQuestion}
        onAnswered={this.onAnswered.bind(this)} />;
    }
  }

  onSelectQuestion(catId, questionId) {
    let currentQuestion = null;
    const newCategories = this.state.categories.map((c, _) =>  {
      if (c.id === catId) {
        const catCopy = Object.assign({}, c);        
        const newQuestions = c.questions.map((q, _) => {
          if (q.id === questionId) {
            const questionCopy = Object.assign({}, q);
            questionCopy.used = true;
            currentQuestion = questionCopy;
            return questionCopy;
          } else {
            return q;
          }
        });
        catCopy.questions = newQuestions;
        return catCopy;
      } else {
        return c;
      }
    });
    const gameStateCopy = Object.assign({}, this.state.gameState);
    gameStateCopy.view = 'question';
    gameStateCopy.currentQuestion = currentQuestion;
    const stateCopy = Object.assign({}, this.state);
    stateCopy.categories = newCategories;
    stateCopy.gameState = gameStateCopy;
    this.setState(stateCopy);
  }

  onCompleteQuestion() {
    const gameStateCopy = Object.assign({}, this.state.gameState);
    gameStateCopy.view = 'gameBoard';
    gameStateCopy.currentQuestion = null;
    this.setState({gameState: gameStateCopy});
  }

  onAnswered(player, correct, questionValue = this.state.gameState.currentQuestion.value) {
    const playerCopy = Object.assign({}, player);
    if (correct) {
      playerCopy.score = player.score + questionValue;
    } else {
      playerCopy.score = player.score - questionValue;
    }
    const players = this.state.players.map((p) => {
      if (p.id === playerCopy.id) {
        return playerCopy;
      } else {
        return p;
      }
    });
    this.setState({players: players});
  }

  loadQuestions(callback) {
    var client = new Client();
    [...Array(5).keys()].map((_,i) => {
      const catId = this.getRandomCategory();
      client.get("http://jservice.io/api/clues?category="+catId, function (data, response) {
        callback(data);
      });      
    });
  }

  getRandomCategory() {
    const olympicCategories = 
    [1732,14072,14754,15723,16262,16786,17019,17286,17455,2000,5914,8403,3559,
     4531,5150,5178,8407,7716,7879,18366,14151];
    
    //const olympicCategories = [15929];
     const idx = Math.floor(Math.random() * (olympicCategories.length-1));
     return olympicCategories[idx];
  }

  registerQuestions(category) {
    var categories = Array.from(this.state.rawCategories);
    categories.push(category);
    this.setState({rawCategories: categories});
    if (categories.length == 5) {
      this.setupBoard();
    }
  }

a
b
c

  setupBoard() {
    console.log(this.state.rawCategories);
    this.setState({
      loading: false,
      //['Events', 'Skills', 'Famous Gymnasts', 'Difficulty', 'Judging', 'Random']
      categories: this.state.rawCategories.map((v, i) => {
          return {
            id: v[0].id+v[0].category.id,
            name: v[0].category.title,
            questions: v.slice(0,5).map((qv, qi) => {
              return {
                id: qv.id,
                text: qv.question,
                answer: qv.answer,
                value: (qi+1)*200,
                isDailyDouble: (i === 1 ? false : false),
                used: false
              };
            })
          };
        }),
      players: [...Array(2).keys()].map((pv, pi) => {
        return {
          id: pi,
          name: (pi === 0 ? "Avery" : "Caleb"),
          answerTriggerKey: (pi === 0) ? 97 /* a */: 108 /* l */,
          score: 0
        };
      }),
      gameState: {
        status: "inprogress",
        view: "gameBoard",
        currentQuestion: null
      }
    });
  }
}