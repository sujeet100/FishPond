var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var background = new Image();
background.src = "water.jpg";

var fishImage = new Image();
fishImage.src = "goldfish.png";

var fishImage2 = new Image();
fishImage2.src = "fishstrip.png";

class Sprite {


	constructor(options) {
		this.frames = options.frames || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

		this.context = options.context;
		this.width = options.width;
		this.height = options.height;
		this.image = options.image;
		this.xSpeed = options.xSpeed;
		this.ySpeed = options.ySpeed || 0;
		this.x = options.x || 0;
		this.y = options.y || 0;
		this.loop = options.loop;

		this.frameIndex = 0;
		this.i = options.startFrameIndex || 0;
		this.tickCount = 0;
		this.ticksPerFrame = options.ticksPerFrame || 0;
		this.numberOfFrames = options.numberOfFrames || 1;
		this.sizeX = options.sizeX || 400;
		this.sizeY = options.sizeY || 400;
		this.verticalFrames = options.verticalFrames || 1;

	}

	update() {

		this.tickCount += 1;

		if (this.tickCount > this.ticksPerFrame) {

			this.tickCount = 0;

			if (this.i < this.frames.length) {
				// Go to the next frame
				this.frameIndex = this.frames[this.i];
				this.i++;
			} else if (this.loop) {
				this.i = 0;
			}
			this.y = this.y + this.ySpeed;
			this.x = this.x + this.xSpeed;
			//reset if fish goes out of the window frame
			if (this.x > window.innerWidth)
				this.x = -400;

		}
	}
}

function render(fishes, context) {
	context.mozImageSmoothingEnabled = false;
	context.webkitImageSmoothingEnabled = false;
	context.msImageSmoothingEnabled = false;
	context.imageSmoothingEnabled = false;
	//this.context.scale(-1, -1)
	context.drawImage(background, 0, 0, canvas.width, canvas.height);

	// Draw the animation
	fishes.forEach(fish => context.drawImage(
		fish.image,
		fish.frameIndex * fish.width / fish.numberOfFrames,
		fish.height * (fish.verticalFrames - 1),
		fish.width / fish.numberOfFrames,
		fish.height,
		fish.x,
		fish.y,
		fish.sizeX,
		fish.sizeY));

}

let fish1 = new Sprite({
	context: canvas.getContext("2d"),
	width: 5200,
	height: 400,
	image: fishImage,
	numberOfFrames: 13,
	xSpeed: 10,
	loop: true,
	ticksPerFrame: 4
});

let fish2 = new Sprite({
	context: canvas.getContext("2d"),
	width: 5200,
	height: 400,
	image: fishImage,
	numberOfFrames: 13,
	xSpeed: 5,
	loop: true,
	x: 300,
	y: 200,
	ticksPerFrame: 4,
	sizeX: 300,
	sizeY: 300,
	startFrameIndex: 4
});

let fish3 = new Sprite({
	context: canvas.getContext("2d"),
	width: 5200,
	height: 400,
	image: fishImage,
	numberOfFrames: 13,
	xSpeed: 5,
	loop: true,
	x: 300,
	y: 400,
	ticksPerFrame: 4,
	sizeX: 200,
	sizeY: 200,
	ySpeed: 1,
	startFrameIndex: 10
});

let fish4 = new Sprite({
	context: canvas.getContext("2d"),
	width: 4912,
	height: 317,
	image: fishImage2,
	numberOfFrames: 16,
	xSpeed: 5,
	loop: true,
	x: 30,
	y: 500,
	ticksPerFrame: 4,
	sizeX: 200,
	sizeY: 200,
	ySpeed: -4,
	startFrameIndex: 0,
	frames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
});

let fish5 = new Sprite({
	context: canvas.getContext("2d"),
	width: 4912,
	height: 317,
	image: fishImage2,
	numberOfFrames: 16,
	xSpeed: 5,
	loop: true,
	x: 400,
	y: 50,
	ticksPerFrame: 4,
	sizeX: 200,
	sizeY: 200,
	ySpeed: 0,
	startFrameIndex: 0,
	frames: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
	verticalFrames: 3
});

function gameLoop() {

	window.requestAnimationFrame(gameLoop);
	let fishes = [fish1, fish2, fish3, fish4, fish5];
	fishes.forEach(f => f.update());
	render(fishes, canvas.getContext("2d"));
}

fishImage.addEventListener("load", gameLoop);