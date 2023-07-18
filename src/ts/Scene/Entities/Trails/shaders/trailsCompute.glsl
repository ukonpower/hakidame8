#include <common>
#include <noise>

layout (location = 0) out vec4 outColor0;
layout (location = 1) out vec4 outColor1;

uniform sampler2D gpuSampler0;
uniform sampler2D gpuSampler1;
uniform float uTime;
uniform vec2 uGPUResolution;

in vec2 vUv;

#include <noise4D>
#include <rotate>

void main( void ) {

	float t = uTime * 0.8;
	float id = vUv.x + vUv.y * uGPUResolution.x;

	vec4 position = texture( gpuSampler0, vUv );
	vec4 velocity = texture( gpuSampler1, vUv );

	float pixelX = 1.0 / uGPUResolution.x;

	// velocity

	float tOffset = id * 0.01;

	if( vUv.x < pixelX ) {
	
		vec3 pos = position.xyz;
		vec3 np = pos * (0.063 + 0.2 );

		vec3 noise = vec3(
			snoise4D( vec4( np, tOffset + t ) ),
			snoise4D( vec4( np + 1234.5, tOffset + t ) ),
			snoise4D( vec4( np + 2345.6, tOffset + t ) )
		) * 0.006;

		float dir = atan2( pos.z, pos.x );
		vec3 rotVel = vec3( 0.0 );
		rotVel.x += sin( dir ) * 0.0008;
		rotVel.z += -cos( dir ) * 0.0008;
		rotVel.zy *= rotate( 0.6 );

		velocity.xyz += rotVel;
		velocity.xyz += noise * ( 1.0 + 0.1 );

		velocity.xyz += -pos * 0.0002;
		velocity.xyz *= 0.97;

	}
	
	//  position

	if( vUv.x < pixelX ) {

		position.xyz += velocity.xyz;
		
	} else {

		position.xyz = texture( gpuSampler0, vUv - vec2( pixelX * 1.5, 0.0 ) ).xyz;
		
	}

	// lifetime

	if( position.w > 1.0 ) {
	
		position = vec4( 5.0, 0.0, 0.0, 0.0 );
		position.xz *= rotate( vUv.x * TPI * 20.0 - uTime * 0.02 );
		velocity = vec4( 0.0 );

	}

	position.w += 0.016 / 10.0;

	// out

	outColor0 = position;
	outColor1 = velocity;

} 