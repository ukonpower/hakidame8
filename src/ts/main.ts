import * as GLP from 'glpower';
import { canvas, gpuState } from './Globals';
import { Scene } from "./Scene";
import config from '../../config.json';

class App {

	private scene: Scene;
	private canvas: HTMLCanvasElement;
	private cnavasContainer: HTMLElement;
	private canvasWrap: HTMLElement;

	constructor() {

		const elm = document.createElement( "div" );
		document.body.appendChild( elm );
		elm.innerHTML = `
			<div class="cc">
				<div class="cw"></div>
			</div>
			<h1>NO.${config.no}/${config.title || 'UNTITLED'}</h1>
			<div class="text">
				<br/>
				DATE:${config.date}<br/>
				<a href="../">../</a>
			</div>
		`;

		document.title = `${config.no} | HAKIDAME`;

		this.canvasWrap = document.querySelector( '.cw' )!;
		this.cnavasContainer = document.querySelector( '.cc' )!;

		this.canvas = canvas;
		this.canvasWrap.appendChild( this.canvas );

		// scene

		this.scene = new Scene();

		// event

		window.addEventListener( 'resize', this.resize.bind( this ) );

		this.resize();

		// animate

		this.animate();

		// gpustate

		if ( process.env.NODE_ENV == 'development' ) {

			if ( gpuState ) {

				const memoryElm = document.createElement( 'div' );
				memoryElm.style.position = "absolute";
				memoryElm.style.width = "250px";
				memoryElm.style.left = "0";
				memoryElm.style.overflowY = 'auto';
				this.cnavasContainer.appendChild( memoryElm );

				const timerElm = document.createElement( 'div' );
				timerElm.style.position = "absolute";
				timerElm.style.width = "250px";
				timerElm.style.height = "100%";
				timerElm.style.right = "0";
				timerElm.style.overflowY = 'auto';
				this.cnavasContainer.appendChild( timerElm );

				gpuState.init( memoryElm, timerElm );

			}

			this.animate();

		}


	}

	private animate() {

		if ( gpuState ) {

			gpuState.update();

		}

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
