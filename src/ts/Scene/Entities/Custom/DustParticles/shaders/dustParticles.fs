#include <common>
#include <packing>
#include <frag_h>
#include <light>

in float vAlpha;
uniform vec3 cameraPosition;

void main( void ) {

	#include <frag_in>

	float circle = smoothstep( 0.5, 0.0, length( gl_PointCoord.xy - 0.5 ) );
	
	if( circle == 0.0 ) discard;

	outColor = vec4( vec3( 1.0 ),  vAlpha * (1.0 - circle * 0.6) * 0.6 );

	#include <frag_out>

} 