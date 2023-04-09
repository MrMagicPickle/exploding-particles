import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ShaderParticleMaterial from './particles/ShaderMaterial';

function ExplodingParticlePoints() {
  const planeMesh = useRef(null);
  let runClock = true;
  useFrame((state) => {
    const { clock } = state;
    if (clock.running) {
      planeMesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
      if (clock.getElapsedTime() > 2 * Math.PI) {
        planeMesh.current.material.uniforms.uTime.value = 0;
        runClock = false;
        clock.stop();
        setTimeout(() => {
          runClock = true;
        }, 2000);
      }
    }
    else {
      if (runClock) {
        clock.start();
      }
    }
  });

  return <>
    <points ref={planeMesh} position={ [0,0,0] } rotation-y={ Math.PI * 0.5 }>
      <planeGeometry args={[670, 440, 670, 440]}/>
      <ShaderParticleMaterial/>
    </points>
  </>
}

export default function App() {
  return (
    <Canvas
      camera={{
          fov: 45,
          near: 100,
          far: 1500,
          position: [ 800, 0, 0 ]
      }}
    >
      <ambientLight intensity={0.5} />
      <ExplodingParticlePoints/>
      <OrbitControls />
    </Canvas>
  )
}
