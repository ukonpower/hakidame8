#include <common>
#include <packing>
#include <frag_h>

#include <sdf>
#include <noise>
#include <rotate>

uniform vec3 cameraPosition;
uniform mat4 modelMatrixInverse;
uniform float uTime;
uniform float uTimeSeq;
uniform float uRnd; 

float smin( float a, float b, float k )
{
	float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
	return mix( b, a, h ) - k*h*(1.0-h);
}

vec2 D( vec3 p ) {

	float t = uTime * 0.02 + uRnd * 123.0;

	vec3 p1 = p + vec3( sin( t ) * 0.1, cos( t ) * 0.1, 0.0 );
	vec3 p2 = p + vec3( sin( t * 1.4 ) * 0.4, cos( t ) * 0.5, 0.0 );
	vec3 p3 = p + vec3( sin( t * 3.0 ) * 0.7, cos( t * 0.8 ) * 0.7, 0.0 );
	vec3 p4 = p + vec3( sin( t * 1.0 ) * 1.0, cos( t * 0.5 ) * 1.0, sin( t * 0.4 ) * 1.0 );
	vec3 p5 = p + vec3( sin( t * 1.6 ) * 1.0, cos( t * 0.4 ) * 1.0, cos( t * 0.3 ) * 1.0 );

	float sp1 = sdSphere( p1, 0.5 );
	float sp2 = sdSphere( p2, 0.3 );
	float sp3 = sdSphere( p3, 0.2 );
	float sp4 = sdSphere( p4, 0.2 );
	float sp5 = sdSphere( p5, 0.3 );

	float d;
	d = min( sp1, 999.0 );
	d = smin( sp2, d, 0.3 );
	d = smin( sp3, d, 0.3 );
	d = smin( sp4, d, 0.3 );
	d = smin( sp5, d, 0.3 );

	return vec2( d, 1.0 );

}

vec3 N( vec3 pos, float delta ){

    return normalize( vec3(
		D( pos ).x - D( vec3( pos.x - delta, pos.y, pos.z ) ).x,
		D( pos ).x - D( vec3( pos.x, pos.y - delta, pos.z ) ).x,
		D( pos ).x - D( vec3( pos.x, pos.y, pos.z - delta ) ).x
	) );
	
}

void main( void ) {

	#include <frag_in>

	vec3 rayPos = vec3( 0.0, 0.0, 3.0 );
	vec3 rayDir =  normalize(vec3(vUv.xy - 0.5, -1.0));
	vec2 dist = vec2( 0.0 );
	bool hit = false;

	vec3 normal;
	
	for( int i = 0; i < 16; i++ ) { 

		dist = D( rayPos );		
		rayPos += dist.x * rayDir;

		if( dist.x < 0.01 ) {

			normal = N( rayPos, 0.0001 );

			hit = true;
			break;

		}

		if( dist.x < -1.0 ) break;
		
	}

	if( hit ) {

		outColor.xyz *= dot( normal, vec3( 1.0 ) ) * 0.5;

	} else {

		outColor.xyz = vec3( 0.0 );
		
	}

	outColor = 0.2 + outColor * 0.8;
	outColor *= fbm( vec3( vUv * 5.0, fbm( vec3( vUv * 1.0, 0.0 ) ) ) ) * 0.8 + 0.2;

	outRoughness = 0.2;

	#include <frag_out>

} 