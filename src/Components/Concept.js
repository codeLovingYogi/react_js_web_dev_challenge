import React, { Component } from 'react'
import '../App.css';

class Concept extends Component {
	// Allows for assignment of a concept to each Edit
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.remove = this.remove.bind(this);
	}

	// Upon selection of concept, save to appropriate location in list of edits
	handleChange(event) {
    	var concept = event.target.value;
    	this.props.onChange(this.props.index, concept);
  	}

  	// Upon click to remove concept, runs parent delete function
  	remove() {
  		this.props.deleteFromConcepts(this.props.index);
  	}

	render() {
		return (
			<main className="concept">
				<section>
					<span>{this.props.original} / {this.props.edit}</span>
					<section className="select-style"> 	
						<select defaultValue={this.props.select} onChange={this.handleChange}>
							<option value="">Select Option</option>
							<option value="articles">Articles</option>
							<option value="commas">Commas</option>
							<option value="propernouns">Proper Nouns</option>
						</select>
					</section>
				</section>
				<section>
					<span className="removeButton"><button onClick={this.remove}>Remove</button></span>
				</section>
			</main>
		);
	}
}

export default Concept

