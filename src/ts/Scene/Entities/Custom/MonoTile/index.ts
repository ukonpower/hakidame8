import * as GLP from 'glpower';

import monoTileFrag from './shaders/monoTile.fs';
import monoTileVert from './shaders/monoTile.vs';

import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';

export class MonoTile extends GLP.Entity {

	constructor() {

		super();

		const mat = this.addComponent( "material", new GLP.Material( {
			name: "monoTile",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time ),
			frag: hotGet( 'monoTileFrag', monoTileFrag ),
			vert: hotGet( 'monoTileVert', monoTileVert )
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/monoTile.fs", ( module ) => {

				if ( module ) {

					mat.frag = hotUpdate( 'monoTileFrag', module.default );
					mat.requestUpdate();

				}

			} );

			import.meta.hot.accept( "./shaders/monoTile.vs", ( module ) => {

				if ( module ) {

					mat.vert = hotUpdate( 'monoTileVert', module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

}
