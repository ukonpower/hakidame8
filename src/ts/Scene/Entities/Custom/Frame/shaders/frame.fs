#include <common>
#include <packing>
#include <frag_h>
#include <noise>

uniform float uTime;

void main( void ) {

	#include <frag_in>

	outColor *= 0.75;
	outNormal.x *= fbm( vec3( vUv * 50.0, fbm( vec3( vUv * 1.0, 0.0 ) ) ) ) * 0.2 + 0.8;

	
	#include <frag_out>

}