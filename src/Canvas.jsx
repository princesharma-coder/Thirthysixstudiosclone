import React, { useState } from "react";
import { useEffect, useRef } from "react";
import images from "./images";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Canvas(props) {
  const { startIndex, numImages, duration, size, top, left, zIndex } =
    props.details;
  const [index, setIndex] = useState({ value: startIndex });
  const canvasRef = useRef(null);

  useGSAP(() => [
    gsap.to(index, {
      value: startIndex + numImages - 1,
      duration: duration,
      repeat: -1,
      ease: "linear", 
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) });
      },
    }),

    gsap.from(canvasRef.current,{
      opacity:0,
      duration:0.5,
      ease:"power2.out",
      scale:0.8
    })
  ]);

  useEffect(() => {
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = images[index.value];
    img.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";

      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };
  }, [index]);

  return (
    <div>
      <canvas
      data-scroll
      data-scroll-speed={Math.random().toFixed(1)}
      ref={canvasRef}
      className="absolute pointer-events-none"
      style={{
        width: `${size * 1.8}px`,
        height: `${size * 1.8}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: `${zIndex}`,
      }}
      id="canvas"
    ></canvas>
    </div>
  );
}
