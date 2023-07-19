import * as GLP from 'glpower';

import ceilingLightFrag from './shaders/ceilingLight.fs';
import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';

export class CeilingLight extends GLP.Entity {

	constructor() {

		super();

		const mat = this.addComponent( "material", new GLP.Material( {
			name: "ceilingLight",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time ),
			frag: hotGet( 'ceilingLightFrag', ceilingLightFrag )
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/ceilingLight.fs", ( module ) => {

				if ( module ) {

					mat.frag = hotUpdate( 'ceilingLight', module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
