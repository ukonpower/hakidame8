import * as GLP from 'glpower';
import { globalUniforms } from '~/ts/Globals';

export class Mover extends GLP.Entity {

	constructor() {

		super();

	}

	protected updateImpl( event: GLP.EntityUpdateEvent ): void {

		for ( let i = 0; i < this.children.length; i ++ ) {

			const c = this.children[ i ];

			// loop

			if ( c.userData.basePos === undefined ) {

				c.userData.basePos = c.position.clone();

			}

			const move = event.time * 0.4;
			globalUniforms.time.uMove.value = move * 0.02;

			c.position.z = c.userData.basePos.z + move;

			if ( c.position.z > 10.0 ) {

				c.userData.basePos.z -= 40;

			}

			// light

			if ( c.userData.spot == undefined ) {

				const spot = c.userData.spot = c.getComponent( "light" );

				if ( spot ) {

					c.userData.spot = spot;
					c.userData.spotBaseIntensity = c.userData.spot.intensity;

				} else {

					c.userData.spot = null;

				}

			}

			if ( c.userData.spot ) {

				c.userData.spot.intensity = c.userData.spotBaseIntensity * ( 1.0 - ( - c.position.z / 30 ) );

			}

		}

	}

}
