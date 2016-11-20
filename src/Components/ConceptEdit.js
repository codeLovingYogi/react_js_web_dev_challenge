import React, { Component } from 'react'
import '../App.css';

function ConceptEdit(props) {
	// For rendering of concepts in Review mode
	return (
		<main className="concept">
			<section>
				<span>{props.original} / {props.edit}</span>
				<section className="select-style"> 	
					<select disabled defaultValue={props.select} onChange={props.handleChange}>
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

export default ConceptEdit

