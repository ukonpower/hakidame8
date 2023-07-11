import { Component, ComponentUpdateEvent } from "..";
import { Matrix } from "../../../Math/Matrix";

export interface CameraParam {
	fov?: number;
	near?: number;
	far?: number;
}

export class Camera extends Component {

	public projectionMatrix: Matrix;
	public viewMatrix: Matrix;
	// public renderTarget: CameraRenderTarget;

	public fov: number;
	public aspect: number;
	public near: number;
	public far: number;

	constructor( param: CameraParam ) {

		super();

		param = param || {};

		this.viewMatrix = new Matrix();
		this.projectionMatrix = new Matrix();

		// this.renderTarget = param.renderTarget;

		this.fov = param.fov || 50;
		this.near = param.near || 0.01;
		this.far = param.far || 1000;
		this.aspect = 1.0;

		this.updateProjectionMatrix();

	}

	public updateProjectionMatrix() {

		this.projectionMatrix.perspective( this.fov, this.aspect, this.near, this.far );

	}

	protected updateImpl( event: ComponentUpdateEvent ): void {

		this.viewMatrix.copy( event.entity.matrixWorld ).inverse();

	}

}
