import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useFBX, OrbitControls } from '@react-three/drei';
import { AnimationMixer } from 'three';

const AvatarModel = ({ animationFile }) => {
  const gltf = useGLTF("/models/65e7c8a4c27c34a2f1fb4452.glb");
  const fbxAnimation = useFBX(animationFile);
  const mixer = useRef(new AnimationMixer(gltf.scene));

  useEffect(() => {
    const action = mixer.current.clipAction(fbxAnimation.animations[0]);
    action.play();
    return () => {
      action.stop();
      mixer.current.uncacheAction(action);
    };
  }, [fbxAnimation, gltf.scene]);

  useFrame((state, delta) => mixer.current.update(delta));

  return <primitive object={gltf.scene} scale={[2, 2, 2]} position={[0, -1.5, 0]} />;
};

const Avatar = () => {
  const [animationFile, setAnimationFile] = React.useState("/animations/robot.fbx");

  const handleAnimationChange = (file) => {
    setAnimationFile(file);
  };

  return (
    <div style={{ height: "105vh" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={2} color={'#ffffff'} />
        <AvatarModel animationFile={animationFile} />
        <OrbitControls />
      </Canvas>
      <div style={{
        position: 'absolute',
        width: '100%',
        bottom: '30px',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 100
      }}>
        <button style={{ margin: '0 10px', padding: '10px 20px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => handleAnimationChange("/animations/robot.fbx")}>Dance</button>
        <button style={{ margin: '0 10px', padding: '10px 20px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => handleAnimationChange("/animations/talkvar1.fbx")}>Talk Var 1</button>
        <button style={{ margin: '0 10px', padding: '10px 20px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => handleAnimationChange("/animations/talkvar2.fbx")}>Talk Var 2</button>
        <button style={{ margin: '0 10px', padding: '10px 20px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => handleAnimationChange("/animations/wave.fbx")}>Wave</button>
      </div>
    </div>
  );
};

export default Avatar;
