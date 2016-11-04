import React, { Component } from 'react'
import '../App.css';

class StageOne extends Component {
	// To enter grammatically correct passage
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.nextStage = this.nextStage.bind(this)
	}

	// When passage entered, save to passage variable in parent component
	handleChange(event) {
    	var passage = event.target.value;
    	this.props.onChange(passage);
  	}

  	// Check that passage was entered and advance to next stage
	nextStage() {
		var passage = this.refs.inputText.value;
		if(passage === "") {
			alert("Please enter passage text.");
		}
		else {
			this.props.nextStage();
		}
	}

	render() {
		return (
			<main>
				<h1>Stage 1:</h1>
				<h2 >User enters a passage of text</h2>
				<section>
					<textarea onChange={this.handleChange} ref="inputText" className="passage" placeholder="Write passage here..."/>
				</section>
				<button className="nextButton" onClick={this.nextStage}>Next</button>
			</main>
		)
	}
}

export default StageOne

