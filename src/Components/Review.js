import React, { Component } from 'react'
import '../App.css';
import ConceptEdit from './ConceptEdit'

class Review extends Component {
	// To review passage, edits, and assigned concepts
	constructor() {
		super();
		this.handleConceptChange = this.handleConceptChange.bind(this);
		this.nextStage = this.nextStage.bind(this)
		this.eachConcept = this.eachConcept.bind(this);
		this.state = {
			saved: false,
		}	
	}

	eachConcept(edit, i) {
		return(
			<ConceptEdit key={i} index={i} original={edit.original} edit={edit.edit} select={edit.concept} />
		)
	}

	handleConceptChange(i, concept){
		var arr = this.props.edits;
		arr[i]['concept'] = concept;
		this.props.onChange(arr);
	}

	nextStage() {
		this.setState({saved: true})
	}

	render() {
		if(this.state.saved){
			return(
				<h1>Passage Saved</h1>
			)
		}
		else{
			return (
				<main>
					<h1>Stage 4:</h1>
					<h2>Review</h2>
					<section>
						<h3>Passage:</h3>
						<textarea readOnly className="passage" defaultValue={this.props.passage} />
					</section>
					<section>
						<h3>Edits:</h3>
						<textarea readOnly className="passage" defaultValue={this.props.edited} />
					</section>
					<section>
						<h3>Concepts:</h3>
						{
							this.props.edits.map(this.eachConcept)
						}
					</section>
					<section>
						<button className="nextButton" onClick={this.nextStage}>Save</button>
					</section>
				</main>
			)
		}
	}
}

export default Review


