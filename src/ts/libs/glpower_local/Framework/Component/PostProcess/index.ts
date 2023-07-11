import { Component } from '..';
import { GLPowerTexture } from '../../../GLPowerTexture';
import { PostProcessPass } from '../PostProcessPass';

export interface PostProcessParam {
	input?: GLPowerTexture[];
	passes: PostProcessPass[];
}

export class PostProcess extends Component {

	public passes: PostProcessPass[];

	constructor( param: PostProcessParam ) {

		super();

		this.passes = param.passes;

	}

}
