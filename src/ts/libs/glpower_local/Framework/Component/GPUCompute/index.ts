
import { Component } from '..';
import { GLPowerTexture } from '../../../GLPowerTexture';
import { GPUComputePass } from '../GPUComputePass';

export interface GPUComputeParam {
	input?: GLPowerTexture[];
	passes: GPUComputePass[];
}

export class GPUCompute extends Component {

	public passes: GPUComputePass[];

	constructor( param: GPUComputeParam ) {

		super();

		this.passes = param.passes;

	}

}
