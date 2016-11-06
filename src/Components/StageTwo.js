import React, { Component } from 'react'
import '../App.css';
var diffs = require('./GetDiffs');

class StageTwo extends Component {
	// To make edits to original passage with errors
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.nextStage = this.nextStage.bind(this)
	}

	// When passage entered, save to edited variable in parent component
	handleChange(event) {
    	var edited = event.target.value;
    	this.props.onChange(edited);
  	}

  	// Check that passage was modified, find edits, and advance to next stage
	nextStage() {
		var edited = this.refs.editedText.value;
		if (this.props.passage === edited) {
			alert("No edits entered in passage.");
		} else {
			// Use diff tool to find edits between original and edited passage
			var edits = diffs.getEdits(this.props.passage, edited);
			// Call parent function to save edits
			this.props.addEdits(edits);
			this.props.nextStage();
		}
	}

	render() {
		return (
			<main>
				<header>
					<h1 className="header">Stage 2:</h1>
					<h2 className="header">User adds errors to the passage of text</h2>
				</header>
				<section>
					<textarea onChange={this.handleChange} ref="editedText" className="passage" defaultValue={this.props.passage}/>
				</section>
				<button className="nextButton" onClick={this.nextStage}>Next</button>
			</main>
		)
	}
}

export default StageTwo