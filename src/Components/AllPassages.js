import React, { Component } from 'react'
import '../App.css';
import Passage from './Passage'

class AllPassages extends Component {
	// Entry point to start adding a Passage
	constructor() {
		super();
		this.newPassage = this.newPassage.bind(this);
		this.state = {
			addNew: false,
		}
	}

	newPassage() {
		this.setState({addNew: true});
	}

	render() {
		if (this.state.addNew) {
			return <Passage addPassage={this.addPassage} /> 
		} else {
			return (
				<main>
					<button className="addButton" onClick={this.newPassage}>Add Passage</button>
				</main>
			)
		}	
	}
}

export default AllPassages

