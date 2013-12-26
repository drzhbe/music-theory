var canvas = document.getElementById('main-canvas'),
	ctx = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var defaultColor = 'rgba(0, 0, 0, 1)';
var noteSize = 20;
var startX = 20;
var distanceBetweenLines = 20;
var lineLength = 300;
var amountOfLines = 5;

var notes = [];

// рисуем нотный стан: 5 линий
function drawStave() {
	ctx.beginPath();
	for (var i = 0; i < amountOfLines; i++) {
		var y = (i + 1) * distanceBetweenLines;
		ctx.moveTo(startX, y);
		ctx.lineTo(lineLength, y);
	}
	ctx.stroke();
}

/**
 * Ноткина картинка.
 */
var noteImg = new Image();
noteImg.src = 'img/8thNote.svg';
/**
 * Нотка.
 * @param {object} topLeft { x: number, y: number }
 */
function Note(topLeft) {
	this.x = topLeft.x;
	this.y = topLeft.y;
}
Note.prototype.img = noteImg;

function addMouseHandlers() {

	function detectCoords(x, y) {
		var row = Math.floor(x / noteSize);
		var column = Math.floor(y / (noteSize / 2)); // нота может быть не только над/под линией, но и на ней
		return {
			x: row * noteSize,
			y: column * noteSize / 2
		};
	}

	var lastHoveredRect = { x: null, y: null };
	// @TODO: добавить пропускную способность по requestAnimationFrame
	canvas.addEventListener('mousemove', function(e) {
		// продолжаем только если мышка ползает над нотным станом
		if (e.x > startX + lineLength || e.y > (amountOfLines + 1) * distanceBetweenLines) return;

		// подсветим каждый кубик под нотку по ховеру
		var topLeft = detectCoords(e.x, e.y);

		// закрываем глаза если тотже квадрат под ховером
		if (topLeft.x == lastHoveredRect.x && topLeft.y == lastHoveredRect.y) return;

		lastHoveredRect = topLeft;

		draw();

		ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
		ctx.fillRect(topLeft.x, topLeft.y, noteSize, noteSize);
		ctx.strokeRect(topLeft.x, topLeft.y, noteSize, noteSize);
		ctx.fillStyle = defaultColor;
	});

	canvas.addEventListener('click', function(e) {
		if (e.which == 1) {
			var topLeft = detectCoords(e.x, e.y);
			notes.push(new Note(topLeft));
			draw();
		}
	});
}

function draw() {
	// @TODO: сделать определение зоны перерисовки
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	drawStave();
	for (var i = 0, l = notes.length; i < l; i++) {
		ctx.drawImage(notes[i].img, notes[i].x, notes[i].y, noteSize, noteSize);
	}
}

function main() {
	draw();
	addMouseHandlers();
}

main();
