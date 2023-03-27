import { useRef, useContext, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import AppContext from "../context/AppContext";

const Playground = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <Canvas camera={{ position: [0, 0, -1000] }}>
      <mesh>
        <ambientLight />
        <MyHand />
      </mesh>
    </Canvas>
  );
};

const MyHand = () => {
  const { state, dispatch } = useContext(AppContext);

  const [color, setColor] = useState("green");

  useEffect(() => {
    if (state.hand.length > 0) {
      setColor("red");
    } else {
      setColor("green");
    }
  }, [state.hand]);

  return (
    <mesh>
      <ambientLight />
      {
        // @ts-ignore
        state.hand[0]?.landmarks.map((landmark, index) => {
          return (
            <mesh
              key={index}
              position={[landmark[0], -landmark[1], landmark[2]]}
            >
              <boxGeometry args={[10, 10, 10]} />
              <meshStandardMaterial color="hotpink" />
            </mesh>
          );
        })
      }
      <boxGeometry args={[10, 10, 10]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Playground;
