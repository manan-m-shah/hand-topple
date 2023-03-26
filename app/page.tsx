"use client";
import { useContext, useRef } from "react";
import AppContext from "../context/AppContext";
import { ActionKind } from "../types/Context";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import Playground from "../components/Playground";

const Home = () => {
  const { state, dispatch } = useContext(AppContext);
  console.log("Hand", state.hand);

  const webcamRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    // // Loop and detect hands
    // setInterval(() => {
    //   detect(net);
    // }, 100);
  };

  const detect = async (net: handpose.HandPose) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;

      // Make Detections
      const hand = await net.estimateHands(video);
      dispatch({ type: ActionKind.SET_HAND, payload: hand });
    }
  };

  runHandpose();

  return (
    <div>
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

      <Playground />

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
