const exclude = [
	"INPUT", "TEXTAREA"
];
/**
 * @param { HTMLInputElement } __inputs
 * @returns { boolean }
 */
const isInput = (...inputs) => {
	for (const input of inputs) {
		if (exclude.includes(input.tagName)) return true;
	}

	return false;
}

export default isInput;