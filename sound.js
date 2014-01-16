var sine = [];
var delimeters = {
	'B': 2.575,
	'A': 2.89,
	'G': 3.248,
	'F': 3.64,
	'E': 3.86,
	'D': 4.33,
	'C#': 4.59,
	'C': 4.86
};

var frequencies = {
	'C0': 261.6255653006,
	'C#0': 277.1826309769,
	'D0': 293.6647679174,
	'D#0': 311.1269837221,
	'E0': 329.6275569129,
	'F0': 349.2282314330,
	'F#0': 369.9944227116,
	'G0': 391.9954359817,
	'G#0': 415.3046975799,
	'A0': 440.0000000000,
	'A#0': 466.1637615181,
	'B0:': 493.8833012561
};

// расстояние между полутонами ~0.26-0.27

var freq = 440;
var rate = 44100;
for (var i=0; i<10000; i++) {
	var time = i / rate;
	sine[i] = 128 + Math.round(127 * (Math.sin(2 * Math.PI * freq * time)));
}

var wave2 = new RIFFWAVE();
wave2.header.sampleRate = rate;
wave2.Make(sine);
var audio2 = new Audio(wave2.dataURI);

function play(audio) {
	if (!audio.paused) { // if playing stop and rewind
	    audio.pause();
	    audio.currentTime = 0;
  	}
  	audio.play();
}