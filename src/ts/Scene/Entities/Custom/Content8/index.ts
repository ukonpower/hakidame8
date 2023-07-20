import * as GLP from 'glpower';

import content8Frag from './shaders/content8.fs';
import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';

export class Content8 extends GLP.Entity {

	private qua: GLP.Quaternion;
	private euler: GLP.Euler;

	constructor() {

		super();

		this.qua = new GLP.Quaternion();
		this.euler = new GLP.Euler();

		const mat = this.addComponent( "material", new GLP.Material( {
			name: "content8",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, {
				uRnd: {
					value: Math.random(),
					type: "1f"
				}
			} ),
			frag: hotGet( 'content8Frag', content8Frag )
		} ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/content8.fs", ( module ) => {

				if ( module ) {

					mat.frag = hotUpdate( 'content8', module.default );
					mat.requestUpdate();

				}

			} );

		}

	}
	protected updateImpl( event: GLP.EntityUpdateEvent ): void {

		this.quaternion.multiply( this.qua.setFromEuler( this.euler.set( 0, event.deltaTime * - 0.2, event.deltaTime * 0.2 ) ) );

	}

}
