/**
 * @param { Array<string> } elements Nombre de la etiqueta HTML
 * @return { Array<HTMLElement> }
 */
const createElement = ( ...elements ) => {
	const __elements = [];

	elements.forEach(element => {
		if (typeof element === "string")
			__elements.push(
				document.createElement(element)
			);
	});

	return __elements;
}

export default createElement;