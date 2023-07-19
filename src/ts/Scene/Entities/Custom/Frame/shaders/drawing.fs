#include <common>
#include <packing>
#include <frag_h>

#include <noise>

void main( void ) {

	#include <frag_in>

	outColor *= fbm( vec3( vUv * 5.0, fbm( vec3( vUv * 1.0, 0.0 ) ) ) ) * 0.2 + 0.8;
	outColor *= 0.25;
	outRoughness = 0.2;
	
	#include <frag_out>

} 