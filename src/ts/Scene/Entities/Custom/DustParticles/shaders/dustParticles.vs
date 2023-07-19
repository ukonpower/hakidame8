#include <common>
#include <vert_h>

layout ( location = 3 ) in float size;

uniform float uTime;
uniform vec3 uRange;
out float vAlpha;

void main( void ) {

	#include <vert_in>

	outPos.y += uRange.y / 2.0;

	float t = uTime * 0.5;

	outPos.y += sin( t + outPos.x * 10.0 ) * 0.05;
	outPos.x += sin( t * 1.2 + outPos.x * 1.0 ) * 0.05;
	
	outPos.y -= uRange.y / 2.0;


	outPos.z = fract( outPos.z + uTime * 0.1 );
	
	#include <vert_out>

	vAlpha = smoothstep( -1.8, 0.0, mvPosition.z);
	gl_PointSize = 0.1 + size * 10.0 * vAlpha;
	
}