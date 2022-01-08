// Métodos abreviado de teclado:
const key = {
	" ": function(video) {
		pausePlay(video);
	},

	"k": function(video) {
		pausePlay(video)
	},

	"0": function(video) {
		video.currentTime = 0;
	},

	"1": function(video) {
		video.currentTime = 0.1 * video.duration;
	},

	"2": function(video) {
		video.currentTime = 0.2 * video.duration;
	},

	"3": function(video) {
		video.currentTime = 0.3* video.duration;
	},

	"4": function(video) {
		video.currentTime = 0.4 * video.duration;
	},

	"5": function(video) {
		video.currentTime = 0.5 * video.duration;
	},

	"6": function(video) {
		video.currentTime = 0.6 * video.duration;
	},

	"7": function(video) {
		video.currentTime = 0.7 * video.duration;
	},

	"8": function(video) {
		video.currentTime = 0.8 * video.duration;
	},

	"9": function(video) {
		video.currentTime = 0.9 * video.duration;
	},

	// Feclas de teclado:
	"ArrowLeft": function(video) {
		const previousTime = video.currentTime - 5;
		video.currentTime = previousTime < 0
			? 0
			: previousTime;
	},

	"ArrowRight": function(video) {
		const nextTime = video.currentTime + 5;
		video.currentTime = nextTime > video.duration
			? video.duration
			: nextTime;
	},

	// Control de volumen:
	"ArrowUp": function(video) {
		const volume = video.volume + 0.05;
		video.volume = (volume > 1) ? 1 : volume;

	},

	"ArrowDown": function(video) {
		const volume = video.volume - 0.05;
		video.volume = (volume < 0) ? 0 : volume;

	},

	"m": function(video) {
		video.muted = !video.muted;
	}
};

/**
 * @param { HTMLVideoElement } video Reproductor de vídeo.
 */
const pausePlay = (video) => {
	video.paused
		? video.play()
		: video.pause();
}

/**
 * @param { KeyboardEvent } e Evento de teclado.
 * @param { HTMLVideoElement } video Reproductor de vídeo.
 * 
 */
const keyboard = function(e, video) {
	const tecla = e.key
	console.clear();
	console.log({tecla, e}, video);

	if (!e.ctrlKey && !e.altKey) {
		if (typeof key[tecla] === "function") {
			key[tecla](video);
		}

	}
}

export default keyboard;