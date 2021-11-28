import * as Phaser from 'phaser';

class Menu extends Phaser.Scene {
	text: Phaser.GameObjects.Text;

	constructor() {
		super('Menu');
	}

	create() {
		this.text = this.add.text(0, 0, "Test");
		this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
			this.text.text = 'asdfadfs';
		});
	}
}

let config = {
	type: Phaser.AUTO,
	antialias: false,
	gameTitle: 'Game Off 2021',
	fps: {
		min: 5,
		target: 10,
	},
	parent: 'root',
	width: 800,
	height: 600,
	scene: [
		Menu,
	],
};

let game = new Phaser.Game(config);
