import React, { Component } from 'react'
import '../App.css';
import Concept from './Concept'

class StageThree extends Component {
	// To view edits and assign concepts
	constructor() {
		super();
		this.handleConceptChange = this.handleConceptChange.bind(this);
		this.eachConcept = this.eachConcept.bind(this);
		this.deleteConcept = this.deleteConcept.bind(this);
	}

	// For child component Concept to remove a concept
	deleteConcept(i) {
		let arr = this.props.edits;
		arr.splice(i, 1);
		this.props.onChange(arr);
	}

	// Render view for each edit and selected concept
	eachConcept(edit, i) {
		return (
			<Concept key={i} index={i} original={edit.original} edit={edit.edit} select={edit.concept} onChange={this.handleConceptChange} deleteFromConcepts={this.deleteConcept} />
		)
	}

	// Upon selection of concept, save to parent list of edits
	handleConceptChange(i, concept) {
		let arr = this.props.edits;
		arr[i]['concept'] = concept;
		this.props.onChange(arr);
	}

	render() {
		return (
			<main>
				<header>
					<h1 className="header">Stage 3:</h1>
					<h2 className="header">User assigns concepts to the edits</h2>
				</header>
				<section>
					{
						this.props.edits.map(this.eachConcept)
					}
				</section>
				<button className="nextButton" onClick={this.props.nextStage}>Next</button>
			</main>
		)
	}
}

export default StageThree

