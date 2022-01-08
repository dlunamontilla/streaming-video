import createElement from "./createElement.js";
import keyboard from "./keyboard.js";

// import loadData from "./canvas.js";

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

	console.log( {data});

	let [ defaultPath ] = data;

	if (!defaultPath) {
		console.warn("Agregue videos en la carpeta multimedia y dentro de la carpeta multimedia agregue una carpeta llamada \"jpeg\"");
		return;
	}


	defaultPath = defaultPath?.replace(/^[.\/]/g, "");
	const [ video ] = createElement("video");
	video.setAttribute("src", `./multimedia/${defaultPath}`);
	video.setAttribute("autoplay", "");
	video.setAttribute("data-id", "0");

	const [ multimediaInner ] = createElement("div");
	multimediaInner.classList.add("flex__item__inner");
	multimediaInner.appendChild(video);
	multimedia.appendChild(multimediaInner);

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

	const links = [];

	lists.textContent = "";

	data.forEach((path, index) => {
		let __path = path.replace(/^(.\/)+/g, "");
		__path = __path.replace(/(y2mate\.com)+/g, "");
		__path = __path.replace(" - ", "");
		__path = __path.replace(/([a-zá-ź_\-0-9]+\.mp4)/gi, "");
		__path = __path.replace(/([a-zá-ź_\-0-9]+\.webm)/gi, "");
		__path = __path.substring(0, 50) + "...";

		const video = `multimedia/${path.replace(/^(\.\/)/, "")}`;
		let imagen = "multimedia/jpeg" + path.replace(/(\.webm|\.mp4)/gi, ".jpg");
		imagen = imagen.replace(".", "");

		const __list = list.cloneNode(false),
			__graphic = graphic.cloneNode(false),
			__img = img.cloneNode(false),
			__content = content.cloneNode(false),
			__title = title.cloneNode(false);

		__title.textContent = __path;
		// __title.textContent = path;

		__img.setAttribute("src", imagen);
		__graphic.appendChild(__img);
		__content.appendChild(__title);

		__list.setAttribute("data-id", index);
		__list.append(__graphic, __content);
		__list.setAttribute("href", video);

		lists.appendChild(__list);

		links.push({href: video, __list});
	});

	lists.addEventListener("click", (e) => {
		e.preventDefault();
		const anchor = e.target;
		
		if (anchor.tagName !== "A") return;
		video.setAttribute("data-id", anchor.dataset.id);
		video.setAttribute("src", anchor.href);
		location.href = "#multimedia";
	});

	// video.muted = true;

	aside.textContent = "";
	aside.appendChild(lists);

	// Cuando el vídeo se detiene debe arrancar el siguiente:
	let pos = 0;
	video.addEventListener("ended", function() {
		/** @type { string } */
		let repeat = multimedia.dataset.repeat || "none";

		if (isNaN(this.dataset.id)) return;
		pos = Number(this.dataset.id) + 1;

		if (repeat == "all" && pos >= links.length) pos = 0;
		if (repeat == "current") pos = Number(this.dataset.id);

		const nextVideo = links[pos]?.href;

		if (nextVideo) {
			this.src = nextVideo;
			this.dataset.id = pos;
			// video.play();
		}
	});

	video.addEventListener("loadeddata", function() {
		video.play();
	});

	video.onclick = function() {
		this.paused
			? this.play()
			: this.pause();
	}

	// Método abreviado de teclado:
	onkeydown = function(e) {
		keyboard(e, video);
	}
}

const config = {
	selectorMultimedia: "#multimedia",
	selectorAside: "#sidebar",
};

render( config );

export { };