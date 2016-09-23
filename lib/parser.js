'use strict';
var path = require('path');
module.exports = function (filePath, options, fileContent) {
	var lines = fileContent.split('\n');
	var docsText = [];
	var codeText = [];
	var sections = [];
	var prevComment = false;
	var multiLineComment = false;
	var init = true;
	var matchers = options.languages[path.extname(filePath)] || {};
	lines.map(function (line) {

		if (matchers.multiLineCommentStart && ~line.indexOf(matchers.multiLineCommentStart)) { // multilineComments start
			line = line.split(matchers.multiLineCommentStart);
			multiLineComment = true;

			if (line[1][0] === '*') { // for /** comments
				line[1] = line[1].slice(1);
			}
		}
		if (multiLineComment && ~line.indexOf(matchers.multiLineCommentEnd)) { // multilineComments end
			line = line.split(matchers.multiLineCommentEnd);
			multiLineComment = false;
		}

		if (multiLineComment) {

			if (!prevComment && !init) {
				sections.push({
					docsText: docsText.join('\n'),
					codeText: codeText.join('\n')
				});
				docsText = [];
				codeText = [];
			}
			prevComment = true;
			init = false;

			if (typeof line !== 'string') {
				if (~line[1].indexOf(matchers.multiLineCommentEnd)) { // multilineComments ends at same line
					line[1] = line[1].replace(matchers.multiLineCommentEnd, '');
					multiLineComment = false;
				}

				if (line[1].trim().length) {
					docsText.push(line[1] + '\n');
				}
				if (line[0].trim().length) {
					codeText.push(line[0]);
				}
			} else {
				if (matchers.removeMultiLineSpecial) {
					for (var i = 0; i < matchers.removeMultiLineSpecial.length; i++) {
						line = line.replace(matchers.removeMultiLineSpecial[i], '');
					}
				}
				docsText.push(line + '\n');
			}

		} else if (matchers.inlineComment && ~line.indexOf(matchers.inlineComment)) { // inline comments

			if (!prevComment && !init) {
				sections.push({
					docsText: docsText.join('\n'),
					codeText: codeText.join('\n')
				});
				docsText = [];
				codeText = [];
			}
			prevComment = true;
			init = false;

			line = line.split(matchers.inlineComment);

			docsText.push(line[1] + '\n');
			if (line[0].trim().length) {
				codeText.push(line[0]);
			}

		} else { // no comments

			prevComment = false;
			init = false;
			if (typeof line === 'string' && line.trim().length) {
				codeText.push(line);
			}
		}

	});
	// push the last section
	sections.push({
		docsText: docsText.join('\n'),
		codeText: codeText.join('\n')
	});

	return sections;
};
