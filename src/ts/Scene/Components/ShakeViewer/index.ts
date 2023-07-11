import * as GLP from 'glpower';

export class ShakeViewer extends GLP.Component {

	private shakePower: number;
	private shakeMatrix: GLP.Matrix;
	private shakeQua: GLP.Quaternion;

	private cameraComponent?: GLP.Camera;

	constructor( shakePower: number = 1.0 ) {

		super();

		this.shakePower = shakePower;
		this.shakeMatrix = new GLP.Matrix();
		this.shakeQua = new GLP.Quaternion();

	}

	protected setEntityImpl( entity: GLP.Entity | null ): void {

		this.emit( "setEntity" );

		const onUpdate = this.calcMatrix.bind( this );

		if ( entity ) {

			entity.on( 'notice/sceneTick', onUpdate );
			this.cameraComponent = entity.getComponent( 'camera' );

		} else {

			this.cameraComponent = undefined;

		}

		this.once( "setEntity", () => {

			if ( entity ) {

				entity.off( 'notice/sceneTick', onUpdate );

			}

		} );


	}

	private calcMatrix( event: GLP.EntityUpdateEvent ) {


		if ( this.entity ) {

			let shake = 0.008 * this.shakePower;

			if ( this.cameraComponent ) {

				shake *= this.cameraComponent.fov / 50.0;

			}

			this.shakeQua.setFromEuler( { x: Math.sin( event.time * 2.0 ) * shake, y: Math.sin( event.time * 2.5 ) * shake, z: 0 } );

			this.shakeMatrix.identity().applyQuaternion( this.shakeQua );


			this.entity.matrixWorld.multiply( this.shakeMatrix );

			const camera = this.entity.getComponent<GLP.Camera>( 'camera' );

			if ( camera ) {

				camera.viewMatrix.copy( this.entity.matrixWorld ).inverse();

			}

		}

	}


}
