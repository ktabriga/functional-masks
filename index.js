
function mask(x, options) {
	const chars = String(x).replace(/[-.\,\(\)]/g).split('');	
	return chars.reduce(function (acc, char, i) {
		console.log(char, i)
		if (i == 0 && options[0]) return `${options[0]}${char}`;
		if (options[i]) {
			console.log(i, acc, char);
			return `${acc}${options[i]}${char}`;
		}
		return acc + char;
	}, '')
}

function createOptions (mask) {
	const elements = ['-', '.', ',', '(', ')', ' '];
	return mask.split('').reduce((options, char, i) => {
		if (elements.includes(char)) {
			const anteriores = Object.keys(options).map(i => options[i]).join('');
			let position = i === 0 ? 0 : i - anteriores.length;
			console.log(position, char, anteriores)
			if (elements.includes(options[position])) {
				char = options[position] + char;
			}			
			return Object.assign({}, options, {[position]: char});
		}
		return options;
	}, {});
}

