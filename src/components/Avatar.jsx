import React from 'react';

const Avatar = () => (
    <model-viewer
    src="/models/65e7c8a4c27c34a2f1fb4452.glb"
    alt="A 3D model of an avatar"
    ar
    camera-controls
    style={{ width: '100%', height: '100vh' }} /* Adjusted height */
  ></model-viewer>
  
);

export default Avatar;