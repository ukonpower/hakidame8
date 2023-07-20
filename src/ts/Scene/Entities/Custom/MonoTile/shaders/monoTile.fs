#include <common>
#include <packing>
#include <frag_h>


uniform float uTime;

void main( void ) {

	#include <frag_in>

	float size = 17.0;
	vec2 tile = step( vec2( 0.5 ), fract( vUv * size ) );
	float t = tile.x;

	if( tile.y == 1.0 ) {

		t = 1.0 - t;
		
	}

	outColor *= t * 0.6 + 0.4;

	outColor.xyz *= vec3( 1.0, 1.0, 1.0 );

	
	#include <frag_out>

} 