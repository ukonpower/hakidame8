import * as GLP from 'glpower';

import frameFrag from './shaders/frame.fs';
import frameVert from './shaders/frame.vs';

import paperFrag from './shaders/paper.fs';
import drawingFrag from './shaders/drawing.fs';

import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';

export class Frame extends GLP.Entity {

	constructor() {

		super();

		this.addComponent( "material", new GLP.Material( {
			name: "frame",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time ),
			frag: hotGet( 'frameFrag', frameFrag ),
			vert: hotGet( 'frameVert', frameVert )
		} ) );

		// paper

		const paper = new GLP.Entity();
		paper.position.set( 0.0, 0.0, 0.014 );
		paper.addComponent( "geometry", new GLP.PlaneGeometry( 1.2, 1.3, 1.0 ) );
		paper.addComponent( "material", new GLP.Material( {
			name: "frame",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time ),
			frag: paperFrag,
		} ) );
		this.add( paper );

		// drawing

		const drawing = new GLP.Entity();
		drawing.position.set( 0.0, 0.0, 0.019 );
		drawing.addComponent( "geometry", new GLP.PlaneGeometry( 1.2 * 0.7, 1.3 * 0.7, 1.0 ) );
		drawing.addComponent( "material", new GLP.Material( {
			name: "frame",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, {
				uRnd: {
					value: Math.random(),
					type: "1f"
				}
			} ),
			frag: drawingFrag,
		} ) );
		this.add( drawing );


	}

}
