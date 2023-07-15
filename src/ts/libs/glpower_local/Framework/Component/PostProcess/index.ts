import { Component } from '..';
import { GLPowerTexture } from '../../../GLPowerTexture';
import { PostProcessPass } from '../PostProcessPass';

export interface PostProcessParam {
	input?: GLPowerTexture[];
	passes: PostProcessPass[];
}

let postProcessId = 0;

export class PostProcess extends Component {

	public uuid: number;
	public passes: PostProcessPass[];

	constructor( param: PostProcessParam ) {

		super();

		this.uuid = postProcessId ++;

		this.passes = param.passes;

	}

}
