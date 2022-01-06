import createElement from "./createElement.js";

/**
 * @param { string } path Ruta de la API
 * @return { Promise<Array<string|number>> }
 */
const getData = async(path) => {
	const response = await fetch(path);
	const data = await response.json();

	return data;
}

/**
 * @param { Object<string, string> } config Configuración de renderizado-
 * @returns { void }
 */
const render = async (config) => {
	const { selectorMultimedia, selectorAside, path = "api/" } = config;
	if (!selectorMultimedia || !selectorAside ) return;


	const multimedia = document.querySelector(selectorMultimedia);
	const aside = document.querySelector(selectorAside);
	if (!multimedia || !aside) {
		
		if (!multimedia) console.warn("Verifique el selector para el objeto multimedia", {multimedia:multimedia});
		if (!aside) console.warn("Verifique el selector para la barra lateral", {aside: aside});

		return;
	}

	const data = await getData(path);

	let [ defaultPath ] = data;
	defaultPath = defaultPath.replace(/^[.\/]/g, "")
	const [ video ] = createElement("video");
	video.setAttribute("controls", "");
	video.setAttribute("src", `./multimedia/${defaultPath}`);
	video.setAttribute("autoplay", "");

	multimedia.appendChild(video);

	// Renderizar la lista de reproducción:
	const [lists, list, graphic, img, content, title] = createElement(
		"div", "a", "div", "img", "div", "div"
	);

	// Preparación de la lista del reproductor:
	lists.classList.add("lists");
	list.classList.add("lists__item");
	graphic.classList.add("lists__item__graphic");
	img.classList.add("lists__item__graphic__img");
	content.classList.add("lists__item__content");
	title.classList.add("lists__item__content__title");

	lists.textContent = "";

	data.forEach(path => {
		let __path = path.replace(/^[.\/]+/g, "");
		__path = __path.replace(/(y2mate\.com)+/g, "");
		__path = __path.replace(" - ", "");
		__path = __path.replace(/([a-zá-ź_\-0-9]+\.mp4)/gi, "");
		__path = __path.replace(/([a-zá-ź_\-0-9]+\.webm)/gi, "");
		__path = __path.substring(0, 50) + "...";

		const __list = list.cloneNode(false),
			__graphic = graphic.cloneNode(false),
			__img = img.cloneNode(false),
			__content = content.cloneNode(false),
			__title = title.cloneNode(false);

		__title.textContent = __path;

		__graphic.appendChild(__img);
		__content.appendChild(__title);

		__list.append(__graphic, __content);
		__list.setAttribute("href", `multimedia/${path}`);

		lists.appendChild(__list);
	});

	lists.addEventListener("click", (e) => {
		e.preventDefault();
		const anchor = e.target;

		console.log({anchor});
		
		if (anchor.tagName !== "A") return;
		video.setAttribute("src", anchor.href);
	});

	aside.textContent = "";
	aside.appendChild(lists);
}

const config = {
	selectorMultimedia: "#multimedia",
	selectorAside: "#sidebar",
};

render( config );

export { };