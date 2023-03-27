"use client";
import { useContext, useRef, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import { ActionKind } from "../types/Context";
// @ts-ignore
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import Playground from "../components/Playground";

const Home = () => {
  const { state, dispatch } = useContext(AppContext);
  // console.log("Hand", state.hand);

  const webcamRef = useRef(null);
  const [net, setNet] = useState<handpose.HandPose | null>(null);

  const runHandpose = async () => {
    if (net) {
      return;
    }
    const newNet = await handpose.load();
    setNet(newNet);
    console.log("Handpose model loaded.");
    // Loop and detect hands
    setInterval(() => {
      detect(newNet);
    }, 100);
  };

  const detect = async (net: handpose.HandPose) => {
    console.log("Detecting hands");
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      // @ts-ignore
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      // @ts-ignore
      const video = webcamRef.current.video;

      // Make Detections
      const hand = await net.estimateHands(video);
      dispatch({ type: ActionKind.SET_HAND, payload: hand });
    }
  };

  runHandpose();

  return (
    <div className="max-h-screen h-full w-full">
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 0,
          height: 0,
        }}
      />

      <div className="max-h-screen h-full w-full">
        <Playground />
      </div>

      {/* <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      /> */}
    </div>
  );
};

export default Home;
