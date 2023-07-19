import * as GLP from 'glpower';

export class Target extends GLP.Entity {

	private qua: GLP.Quaternion;
	private euler: GLP.Euler;

	constructor() {

		super();

		this.qua = new GLP.Quaternion();
		this.euler = new GLP.Euler();

	}

	protected updateImpl( event: GLP.EntityUpdateEvent ): void {

		this.quaternion.multiply( this.qua.setFromEuler( this.euler.set( 0, event.deltaTime * - 0.2, event.deltaTime * 0.2 ) ) );

	}

}
