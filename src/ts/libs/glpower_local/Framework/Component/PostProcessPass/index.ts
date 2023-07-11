import { GLPowerFrameBuffer } from '../../../GLPowerFrameBuffer';
import { GLPowerTexture } from '../../../GLPowerTexture';
import { Vector } from '../../../Math/Vector';
import { Material, MaterialParam } from '../Material';

export interface PostProcessPassParam extends MaterialParam{
	input?: ( GLPowerTexture | null )[],
	renderTarget: GLPowerFrameBuffer | null,
	clearColor?: Vector;
	clearDepth?: number;
}

import quadVert from './shaders/quad.vs';

export class PostProcessPass extends Material {

	public input: ( GLPowerTexture | null )[];
	public renderTarget: GLPowerFrameBuffer | null;

	public clearColor: Vector | null;
	public clearDepth: number | null;

	constructor( param: PostProcessPassParam ) {

		super( { ...param, vert: param.vert || quadVert } );

		this.renderTarget = param.renderTarget;
		this.input = param.input || [];

		this.clearColor = param.clearColor ?? null;
		this.clearDepth = param.clearDepth ?? null;
		this.depthTest = param.depthTest !== undefined ? param.depthTest : false;

	}

	public onAfterRender() {
	}

}
