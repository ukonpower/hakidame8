import * as GLP from 'glpower';

import { Material } from '~/ts/libs/framework/Components/Material';
import { Entity } from '~/ts/libs/framework/Entity';
import { hotGet, hotUpdate } from '~/ts/libs/framework/Utils/Hot';
import { gl, globalUniforms } from '~/ts/Globals';

import dustParticlesVert from './shaders/dustParticles.vs';
import dustParticlesFrag from './shaders/dustParticles.fs';
import { Geometry } from '~/ts/libs/framework/Components/Geometry';

export class DustParticles extends Entity {

	constructor() {

		super();

		// geometry

		const range = new GLP.Vector( 10.0, 5.0, 10.0 );
		const count = 300;

		const positionArray = [];
		const sizeArray = [];

		for ( let i = 0; i < count; i ++ ) {

			positionArray.push( ( Math.random() - 0.5 ) * range.x );
			positionArray.push( ( Math.random() - 0.5 ) * range.y );
			positionArray.push( ( Math.random() - 0.5 ) * range.z );

			sizeArray.push( Math.random( ) );

		}

		const geo = this.addComponent( "geometry", new Geometry() );
		geo.setAttribute( "position", new Float32Array( positionArray ), 3 );
		geo.setAttribute( "size", new Float32Array( sizeArray ), 1 );

		// mat

		const mat = this.addComponent( "material", new Material( {
			type: [ "forward" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, {
				uRange: {
					value: range,
					type: "3f"
				}
			} ),
			vert: hotGet( 'dustParticlesVert', dustParticlesVert ),
			frag: hotGet( 'dustParticlesFrag', dustParticlesFrag ),
			drawType: gl.POINTS
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( [ "./shaders/dustParticles.vs", "./shaders/dustParticles.fs" ], ( module ) => {

				if ( module[ 0 ] ) {

					mat.vert = hotUpdate( 'dustParticlesVert', module[ 0 ].default );

				}

				if ( module[ 1 ] ) {

					mat.frag = hotUpdate( 'dustParticlesFrag', module[ 1 ].default );

				}

				mat.requestUpdate();

			} );

		}

	}

}
