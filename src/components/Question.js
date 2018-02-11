import React, { Component } from 'react';
import { render } from 'react-dom';
import '../css/category.css';
import '../css/question.css';
import AnswerBox from './AnswerBox';

export default class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {timeLeft:10, playersAnswered:[], prevAnswer:undefined};
    this.handleKeyPress =  this.handleKeyPress.bind(this);
    this.handleAnswerSubmitted = this.handleAnswerSubmitted.bind(this);
    this.handleAnswerUpdated = this.handleAnswerUpdated.bind(this);
  }

  render() {
    const questionClass = (this.state.prevAnswer ? 
      "questionCorrect" : 
      (this.state.prevAnswer !== undefined ? "questionIncorrect" : "question"));

    const timerClass = (this.state.prevAnswer !== undefined ? "timerHidden" : "");
    const answerClass = (this.allPlayersAnswered() ? "" : "timerHidden");
    return (
      <div className="questionWrapper">
        <div className={questionClass}>
          {questionClass === 'questionCorrect' ? 'Correct!!!': ''}
          {questionClass === 'questionIncorrect' ? 'Sorry!!!': ''}
          <div id="timer" className={timerClass}>Time Left: {this.state.timeLeft}</div>
          <div id="answer" className={answerClass}>The answer was: {this.props.question.answer}</div>
          <p>
            {this.props.question.text}
          </p>
          {this.state.answerer ? 
            <AnswerBox 
            answerer={this.state.answerer}
            onAnswerUpdated={this.handleAnswerUpdated} 
            onAnswerSubmitted={this.handleAnswerSubmitted}/> : ""}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.countDown(),
      1000
    );
    this.setupKeypress();
  }  

  componentWillUnmount() {
    this.removeTimer();
    this.removeKeypress();
  }

  countDown() {
    const timeLeft = this.state.timeLeft-1;
    this.setState({timeLeft: timeLeft});
    if (timeLeft === 0) {
      if (this.state.answerer) {
        this.handleAnswerSubmitted();
      } else {
        this.props.onComplete();
      }
    }
  }

  removeTimer() {
    clearInterval(this.timerID);
    this.timerID = null;
  }

  setupKeypress() {
    document.addEventListener("keypress", this.handleKeyPress);
  }

  removeKeypress() {
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  handleKeyPress(event) {
    this.props.players.forEach((p) => {
      if (p.answerTriggerKey === event.keyCode) {
        if (!this.state.playersAnswered.includes(p.id)) {
          this.removeKeypress();
          this.setState({ answerer: p, timeLeft: 30 });
        }
      }
    });
  }

  handleAnswerUpdated(answer) {
    this.setState({submittedAnswer: answer});
  }

  handleAnswerSubmitted() {
    const playersAnswered = Array.from(this.state.playersAnswered);
    playersAnswered.push(this.state.answerer.id);

    if (this.props.question.answer === this.state.submittedAnswer) {
      this.finishAnswerID = setInterval(() => this.asyncCorrect(), 4000, 1);
      this.setState({prevAnswer: true, playersAnswered:playersAnswered});
    } else {
      this.finishAnswerID = setInterval(() => this.asyncIncorrect(), 4000, 1);
      this.setState({prevAnswer: false, playersAnswered:playersAnswered});
    }
  }

  asyncIncorrect() {
    this.props.onAnswered(this.state.answerer, false, this.calculateQuestionValue());
    if (this.allPlayersAnswered()) {
      this.props.onComplete();
    } 
    this.asyncFinish();
  }

  asyncCorrect() {
    this.props.onAnswered(this.state.answerer, true, this.calculateQuestionValue());
    this.props.onComplete(); 
    this.asyncFinish();   
  }
  asyncFinish() {
    clearInterval(this.finishAnswerID);
    this.setState({answerer: undefined, prevAnswer: undefined, timeLeft:10});
    this.setupKeypress();
  }

  calculateQuestionValue() {
    let qValue = null;
    if (this.props.question.isDailyDouble) {
      qValue = parseInt(this.props.dailyDoubleWager);
    } else {
      qValue = this.props.question.value;
    }
    return qValue;
  }

  allPlayersAnswered() {
    return this.state.playersAnswered.length === this.props.players.length;
  }
};