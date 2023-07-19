#include <common>
#include <vert_h>
#include <rotate>

uniform float uTime;
uniform float uMove;

void main( void ) {

	#include <vert_in>

	outUv.x += uMove * 1.4;
	
	#include <vert_out>
	
}