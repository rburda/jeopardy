import React from 'react';

export default class AnswerBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div id="answerWrapper">
        <form onSubmit={this.handleSubmit}>
          <label>
            {this.props.answerer.name}
            <textarea id="answerText" onKeyUp={
              (e) => {
                if(e.keyCode == 13 && e.shiftKey == false) {
                  this.handleSubmit(e);
                } else {
                  this.props.onAnswerUpdated(e.target.value);
                }}} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    this.props.onAnswerSubmitted();
    event.preventDefault();
  }
}