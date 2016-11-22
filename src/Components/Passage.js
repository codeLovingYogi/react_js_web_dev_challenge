import React, { Component } from 'react'
import '../App.css';
import StageOne from './StageOne'
import StageTwo from './StageTwo'
import StageThree from './StageThree'
import Review from './Review'
import AllPassages from './AllPassages'

class Passage extends Component {
	// Main component to track passage entry stage and information
	constructor() {
		super();
		this.savePassage = this.savePassage.bind(this);
		this.saveEdit = this.saveEdit.bind(this);
		this.addEdits = this.addEdits.bind(this);
		this.addConcepts = this.addConcepts.bind(this);
		this.incrementStage = this.incrementStage.bind(this);
		this.addPassage = this.addPassage.bind(this);
		this.state = {
			stage: 1,
			passage: "",
			editedPassage: "",
			edits: [],
		}
	}

	// Saves passage from Stage 1
	savePassage(passage) {
		this.setState({passage: passage })
	}

	// Saves edited passage from Stage 2
	saveEdit(edited) {
		this.setState({editedPassage: edited })
	}

	// Saves list of edits found in Stage 2
	addEdits(edits){
		let list = [];
		list = edits;
		this.setState({edits: list});
	}

	// Saves concepts selected for each edit in Stage 3
	addConcepts(concepts) {
		let list = this.state.edits;
		list = concepts
		this.setState({edits: list});
	}

	// Called to advance each stage to next stage
	incrementStage() {
		let stage = this.state.stage + 1;
		this.setState({stage: stage})
	}

	addPassage(passage) {
		this.props.addPassage(passage);
	}

	// Renders different components based on passage's current stage
	render() {
		switch(this.state.stage) {
			case 1: 
				return <StageOne passage={this.state.passage} onChange={this.savePassage} nextStage={this.incrementStage} />;
			case 2: 
				return <StageTwo passage={this.state.passage} addEdits={this.addEdits} onChange={this.saveEdit} nextStage={this.incrementStage} />;
			case 3: 
				return <StageThree edits={this.state.edits} onChange={this.addConcepts} nextStage={this.incrementStage} />;
			case 4: 
				return <Review passage={this.state.passage} edited={this.state.editedPassage} edits={this.state.edits} nextStage={this.incrementStage} addPassage={this.addPassage} />;
			case 5: 
				return <AllPassages />;
			default:
				return <StageOne />;
		}
	}
}

export default Passage

