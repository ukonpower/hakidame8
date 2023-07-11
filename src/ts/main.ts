import * as GLP from 'glpower';
import { canvas } from './Globals';
import { Scene } from "./Scene";
import config from '../../config.json';

class App {

	private scene: Scene;
	private canvas: HTMLCanvasElement;
	private canvasWrap: HTMLElement;
	constructor() {

		const elm = document.createElement( "div" );
		document.body.appendChild( elm );
		elm.innerHTML = `
			<div class="cw"></div>
			<h1>NO.${config.no}/${config.title || 'UNTITLED'}</h1>
			<div class="text">
				<br/>
				DATE:${config.date}<br/>
				<a href="../">../</a>
			</div>
		`;

		document.title = `${config.no} | HAKIDAME`;

		this.canvasWrap = document.querySelector( '.cw' )!;

		this.canvas = canvas;
		this.canvasWrap.appendChild( this.canvas );

		// scene

		this.scene = new Scene();

		// event

		window.addEventListener( 'resize', this.resize.bind( this ) );

		this.resize();

		// animate

		this.animate();

	}

	private animate() {

		this.scene.update();

		window.requestAnimationFrame( this.animate.bind( this ) );

	}

	private resize() {

		const canvasAspect = window.innerWidth / window.innerHeight;

		let scale = canvasAspect < 1.0 ? Math.min( 1.5, window.devicePixelRatio ) : 1.0;
		scale *= 1.0;

		const blkRatioX = canvasAspect < 1.0 ? 0.75 : 1.0;
		const blkRatioY = canvasAspect < 1.0 ? 0.7 : 0.5;

		const width = window.innerWidth * scale * blkRatioX;
		const height = window.innerHeight * scale * blkRatioY;

		this.canvas.width = width;
		this.canvas.height = height;
		this.canvas.style.width = width / scale + "";
		this.canvas.style.height = height / scale + "";

		this.scene.resize( new GLP.Vector( this.canvas.width, this.canvas.height ) );

	}

}

new App();
