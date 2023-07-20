#include <common>
#include <packing>
#include <frag_h>
#include <noise>
uniform float uTime;

void main( void ) {

	vec2 aspect = vec2( 1.0, 0.2);

	#include <frag_in>

	outNormal.y += (fbm( vec3( vUv * aspect * 2000.0, 0.0 ) ) - 0.5) * 0.15;
	outNormal = normalize( outNormal );

	outColor *= fbm( vec3( vUv * aspect * 10.0, fbm( vec3( vUv * aspect * 100.0, 0.0 ) ) ) ) * 0.5 + 0.5;

	outColor.xyz *= vec3( 0.85, 0.9, 1.0 );
	
	#include <frag_out>

} 