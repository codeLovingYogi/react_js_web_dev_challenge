import React, { Component } from 'react'
import '../App.css';

class ConceptEdit extends Component {
	// For rendering of concepts in Review mode
	render() {
		return (
			<main className="concept">
				<section>
					<span>{this.props.original} / {this.props.edit}</span>
					<section className="select-style"> 	
						<select disabled defaultValue={this.props.select} onChange={this.handleChange}>
							<option value="">Select Option</option>
							<option value="articles">Articles</option>
							<option value="commas">Commas</option>
							<option value="propernouns">Proper Nouns</option>
						</select>
					</section>
				</section>
			</main>
		);
	}
}

export default ConceptEdit

