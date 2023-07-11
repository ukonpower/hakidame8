#include <common>
#include <vert_h>

layout ( location = 3 ) in float size;

uniform float uTime;
uniform vec3 uRange;
out float vAlpha;

void main( void ) {

	#include <vert_in>

	outPos.y += uRange.y / 2.0;
	outPos.y = mod( outPos.y + sin( uTime  * 0.5 + outPos.x + outPos.z ) * 0.1, uRange.y );
	outPos.y -= uRange.y / 2.0;
	
	#include <vert_out>

	vAlpha = smoothstep( -40.0, 0.0, mvPosition.z);
	gl_PointSize = 0.5 + size * 5.0 * vAlpha;
	
}