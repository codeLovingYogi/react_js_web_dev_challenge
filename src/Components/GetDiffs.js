// Diff tool to identify differences between original and edited passages

var jsdiff = require('diff');

var errors = [];
var commasOriginal = []; // To track sequence of comma changes
var commasEdit = [];	// To track sequnce of comma changes

var methods = {
	getEdits: function(original, edit) {
		// Run diff tool to find differences in original and edited passages
		var diff = jsdiff.diffChars(original, edit);
		var n = diff.length
		var countPrior = 0; // Track previous rows to review 
		var countAfter = 0; // To skip rows already reviewed
		var commas = false;	// To track sequence of comma changes
		
		// Loop through list of change objects returned from diff tool
		for (var i = 0; i < n; i++) {
			var original = "";
			var edit = "";
			var priorWord = "";
			var remWord = "";
			var remWordEdit = "";
			var current = diff[i];
			var prior = diff[i-1];
			var rem;	// To loop through diff for rest of word
			
			countPrior++;
			
			if (current['added'] || current['removed']) {
				if (current['added']) {
					// 'Added' items are edits
					// Look for previous portion of word
					// Handle if single word is added
					if (prior && prior['value'] === ' ' && current['value'][current['value'].length-1] === ' ') {
						original = priorWord;
						edit = current['value'];
					} else {
						// Find first part of word if any
						priorWord = this.getPriorWord(diff, i, countPrior);
						
						// Find remaining portion of word
						for (var y = 1; y < n; y++) {
							countAfter++;
							rem = diff[i + y];
							if (rem) {
								if (rem['removed']) {
									remWord += rem;
								} else if (rem['added']) {
									remWordEdit += rem['value'];
								} else if (!(rem['added']) && !(rem['removed'])) {
									remWord += this.getRemWord(rem['value']);
									break;
								}
							}
						}

						original = priorWord + remWordEdit + remWord;
						edit = priorWord + current['value'] + remWord;
						i += countAfter - 1;
					}
				}
				else {
					// 'Removed' items were in original passage
					// Look for previous portion of word
					// Handle if single word is removed
					if (prior && prior['value'] === ' ' && current['value'][current['value'].length-1] === ' ') {
						edit = priorWord;
						original = current['value'];
					}
					else {
						// Find first part of word if any
						priorWord = this.getPriorWord(diff, i, countPrior);
						
						// Find remaining portion of word
						for (var z = 1; z < n; z++) {
							countAfter++;
							rem = diff[i + z];
							if (rem) {
								if (rem['removed']) {
									remWord += rem;
								} else if (rem['added']) {
									remWordEdit += rem['value'];
								} else if (!(rem['added']) && !(rem['removed'])) {
									if (rem['value'] === ' ') {
										break;
									}

									remWord += this.getRemWord(rem['value']);
									remWordEdit += this.getRemWord(rem['value'])
									
									if (rem['value'].length !== 1) {
										break;
									}	
								}
							}
						}

						original = priorWord + current['value'] + remWord;
						edit = priorWord + remWordEdit;
						i += countAfter - 1;
					}
				}
				countPrior = 0;
				countAfter = 0;
				
				// Find sequence of comma changes
				if (original.indexOf(',') > 0) {
					commas = true;
				} else {
					commas = false;
				}

				// Keep track of sequence of edits with commas
				if (commas) {
					commasOriginal.push(original);
					commasEdit.push(edit);
				} else {
					// Add current edit
					this.addEdit(original, edit);

					// Join list of comma changes into one and add edit
					if (commasOriginal.length > 0) {
						this.combineCommas(commasOriginal, commasEdit);
					}
				}
			}
		}
		if (commasOriginal.length > 0) {
			this.combineCommas(commasOriginal, commasEdit);
		}
		return errors;
	},

	// Get only the last word in long string of unchanged text
	getPriorWord: function(diff, i, countPrior) {
		var priorWords = ""; 
		for (var x = 1; x < countPrior; x++) {
			var prev = diff[i - x]['value'];
			if (prev[prev.length - 1] !== ' ') {
				priorWords = prev.split(' ')
				return (priorWords[priorWords.length - 1]);
			}
		}
		return priorWords;
	},

	getRemWord: function(words) {
		var remWords = words.split(' ');
		return remWords[0];
	},

	// Add each edit to array of edits
	addEdit: function(original, edit) {
		var error = {};
		error['original'] = original.trim();
		error['edit'] = edit.trim();
		errors.push(error);
	},

	combineCommas: function(originalList, editList) {
		var commasO = originalList.join(' ');
		var commasE = editList.join(' ');
		this.addEdit(commasO, commasE);
		commasOriginal = [];
		commasEdit = [];
	}
};

module.exports = methods;
