const specialChars = /[-\.\,\(\)\/]/g;

function cleanSpecialChars (input) {
	return String(input).replace(specialChars, '');
}

function applyMask(input, options) {
	if (!input) return '';
	if (!options) throw Error('Options is required');
	const chars = cleanSpecialChars(input).split('');
	return chars.reduce(function (acc, char, i) {
		if (i == 0 && options[0]) return `${options[0]}${char}`;
		if (options[i + 1]) {
			return `${acc}${char}${options[i + 1]}`;
		}
		return acc + char;
	}, '')
}


//Cria configuração com posição dos elementos
function createMaskOptions (pattern) {
	return pattern.split('').reduce((options, char, i) => {
		if (specialChars.test(char)) {
			const anteriores = Object.keys(options).map(i => options[i]).join('');
			let position = i === 0 ? 0 : i - anteriores.length;
			if (specialChars.test(options[position])) {
				char = options[position] + char;
			}
			return Object.assign({}, options, {[position]: char});
		}
		return options;
	}, {});
}

module.exports = {
	applyMask,
	cleanSpecialChars,
	createMaskOptions
};
