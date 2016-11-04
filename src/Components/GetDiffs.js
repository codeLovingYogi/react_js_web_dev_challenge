// Diff tool to identify differences between original and edited passages

var jsdiff = require('diff');

var errors = [];

var methods = {
	getEdits: function(original, edit) {
		var diff = jsdiff.diffChars(original, edit);
		var n = diff.length
		var countPrior = 0;
		var countAfter = 0;
		for (var i = 0; i < n; i++) {
			var original = "";
			var edit = "";
			var priorWord = "";
			var remWord = "";
			var remWordEdit = "";
			var current = diff[i]
			var prior = diff[i-1];
			var rem;	// To loop through diff for rest of word
			countPrior++;
			if (current['added'] || current['removed']){
				if(current['added']) {
					// 'Added' items are edits
					// Look for previous portion of word
					// Handle if single word is added
					if (prior && prior['value'] === ' ' && current['value'][current['value'].length-1] === ' '){
						original = priorWord;
						edit = current['value'];
					}
					else {
						priorWord = this.getPriorWord(diff, i, countPrior);
						// Find remaining portion of word
						for (var y = 1; y < n; y++) {
							countAfter++;
							rem = diff[i + y];
							if(rem){
								if (rem['removed']) {
									remWord += rem;
								}
								else if (rem['added']) {
									remWordEdit += rem['value'];
								}
								else if (!(rem['added']) && !(rem['removed'])){
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
					if (prior && prior['value'] === ' ' && current['value'][current['value'].length-1] === ' '){
						edit = priorWord;
						original = current['value'];
					}
					else{
						priorWord = this.getPriorWord(diff, i, countPrior);
						// Find remaining portion of word
						for (var z = 1; z < n; z++) {
							countAfter++;
							rem = diff[i + z];
							if(rem){
								if (rem['removed']) {
									remWord += rem;
								}
								else if (rem['added']) {
									remWordEdit += rem['value'];
								}
								else if (!(rem['added']) && !(rem['removed'])){
									if (rem['value'] === ' '){
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
				this.addEdit(original, edit);

			}
		}
		return errors;
	},

	// Get only the last word in long string of unchanged text
	getPriorWord: function(diff, i, countPrior) {
		var priorWords = ""; 
		for(var x = 1; x < countPrior; x++){
			var prev = diff[i - x]['value'];
			if(prev[prev.length - 1] !== ' '){
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
	}
};

module.exports = methods;
