import React from 'react';
import Question from './Question';


export default class DailyDoubleQuestion extends React.Component {
	constructor(props) {
		super(props);
		this.onWagerSubmitted = this.onWagerSubmitted.bind(this);
		this.state = {wagerValue: undefined}
	}

	render() {
		return (
			this.state.wagerValue ? this._createQuestion() : this._createWagerForm()
		);
	}

	_createQuestion() {
		return (
			<Question 
    			question={this.props.question} 
    			players={this.props.players}
		    	onComplete={this.props.onComplete}
		    	onAnswered={this.props.onAnswered}
		    	dailyDoubleWager = {this.state.wagerValue} /> 
		);		
	}

	_createWagerForm() {
		return (
			<WagerForm onWagerSubmitted={this.onWagerSubmitted}/>
		);
	}

	onWagerSubmitted(value) {
		this.setState({wagerValue: value});
	}
}

class WagerForm extends React.Component {
	constructor(props) {
		super(props);
		this.onWagerAmountUpdated = this.onWagerAmountUpdated.bind(this);
	}

	render() {
		return (
			<div className="dailyDoubleQuestion">
					<form onSubmit={() => this.props.onWagerSubmitted(this.state.wagerValue)}>
						<label>Avery, in the category of Events, how much would you like to wager? 
							<input type="text" onChange={this.onWagerAmountUpdated}/>
						</label>
					</form>	
				</div>
		);
	}

	onWagerAmountUpdated(e) {
		this.setState({wagerValue: e.target.value});
	}
}