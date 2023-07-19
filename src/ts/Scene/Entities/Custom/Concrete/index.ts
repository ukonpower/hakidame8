import * as GLP from 'glpower';

import concreteFrag from './shaders/concrete.fs';
import concreteVert from './shaders/concrete.vs';

import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';

export class Concrete extends GLP.Entity {

	constructor() {

		super();

		const mat = this.addComponent( "material", new GLP.Material( {
			name: "concrete",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time ),
			frag: hotGet( 'concreteFrag', concreteFrag ),
			vert: hotGet( 'concreteVert', concreteVert )
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/concrete.fs", ( module ) => {

				if ( module ) {

					mat.frag = hotUpdate( 'concreteFrag', module.default );
					mat.requestUpdate();

				}

			} );

			import.meta.hot.accept( "./shaders/concrete.vs", ( module ) => {

				if ( module ) {

					mat.vert = hotUpdate( 'concreteVert', module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
