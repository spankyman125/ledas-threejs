/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { TextureLoader } from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.css";

function Sphere(props) {
  const [color] = useState(Math.random() * 0xffffff);

  return (
    <mesh {...props}>
      <sphereGeometry args={[0.5]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
}

function SphereList({ list }) {
  return (
    <>
      {list.map((sphere, i) => (
        <Sphere key={i} position={[sphere.x, sphere.y, sphere.z]} />
      ))}
    </>
  );
}

function Box(props) {
  const texture = useLoader(TextureLoader, "textures/cube.jpg");
  texture.anisotropy = 16

  return (
    <mesh {...props}>
      <boxGeometry args={[10, 10, 10]} />
      <meshLambertMaterial map={texture} />
    </mesh>
  );
}

function App() {
  const [sphereList, setList] = useState([]);

  return (
    <Canvas camera={{ fov: 60, position: [25, 10, 10] }}>
      <OrbitControls />
      <Box
        position={[0, 0, 0]}
        onClick={(e) => {
          setList(
            sphereList.concat({
              x: e.point.x,
              y: e.point.y,
              z: e.point.z,
            })
          );
        }}
      />
      <SphereList list={sphereList} />
      <ambientLight color={0x404040} intensity={3} />
      <directionalLight position={[2, 2, 4]} intensity={3} color={0xffffff} />
    </Canvas>
  );
}

export default App;
