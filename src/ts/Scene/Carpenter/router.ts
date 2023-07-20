import * as GLP from 'glpower';

import { Tree } from '../Entities/Tree';

import { Cave } from '../Entities/Cave';
import { Sky } from '../Entities/Sky';
import { Floor } from '../Entities/Floor';
import { EBorder } from '../Entities/Effects/EBorder';
import { EGridDots } from '../Entities/Effects/EGridDots';
import { ERing } from '../Entities/Effects/ERing';
import { ECross } from '../Entities/Effects/ECross';
import { EArea } from '../Entities/Effects/EArea';
import { EGridLine } from '../Entities/Effects/EGridLine';
import { CeilingLight } from '../Entities/Custom/CeilingLight';
import { DustParticles } from '../Entities/Custom/DustParticles';
import { Mover } from '../Entities/Custom/Mover';
import { MonoTile } from '../Entities/Custom/MonoTile';
import { Concrete } from '../Entities/Custom/Concrete';
import { Frame } from '../Entities/Custom/Frame';
import { Trails } from '../Entities/Custom/Trails';
import { Target } from '../Entities/Custom/Target';
import { Content8 } from '../Entities/Custom/Content8';

export const router = ( node: GLP.BLidgeNode ) => {

	// class

	if ( node.class == "Tree" ) {

		return new Tree();

	} else if ( node.class == "Cave" ) {

		return new Cave();

	} else if ( node.class == "Sky" ) {

		return new Sky();

	} else if ( node.class == "Floor" ) {

		return new Floor();

	} else if ( node.class == 'EGridDots' ) {

		return new EGridDots();

	} else if ( node.class == "EBorder" ) {

		return new EBorder();

	} else if ( node.class == "ERing" ) {

		return new ERing();

	} else if ( node.class == "ECross" ) {

		return new ECross();

	} else if ( node.class == "EGridLine" ) {

		return new EGridLine();

	} else if ( node.class == 'EArea' ) {

		return new EArea();

	}

	// custom

	if ( node.class == "Mover" ) {

		return new Mover();

	} else if ( node.class == "CeilingLight" ) {

		return new CeilingLight();

	} else if ( node.class == "DustParticles" ) {

		return new DustParticles();

	} else if ( node.class == "MonoTile" ) {

		return new MonoTile( );

	} else if ( node.class == "Wall" ) {

		return new Concrete();

	} else if ( node.class == "Frame" ) {

		return new Frame();

	} else if ( node.class == "Trails" ) {

		return new Trails();

	} else if ( node.class == "Target" ) {

		return new Content8();

		return new Target();

	} else if ( node.class == "Content8" ) {

		return new Content8();

	}

	const baseEntity = new GLP.Entity();

	return baseEntity;

};
