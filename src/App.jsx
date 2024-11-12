import Canvas from './Canvas';
import './index.css';
import data from './data';
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useRef, useState } from 'react';
import NavBar from './Components/NavBar';
import gsap from 'gsap';
import { Analytics } from '@vercel/analytics/react';

function App() {

  const [showCanvas, setShowCanvas] = useState(false);
  const [isRedBackground, setIsRedBackground] = useState(false);
  const headingRef = useRef();
  const growingspan = useRef();
  const cursorRef = useRef(null); 
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => !prevShowCanvas);

      gsap.set(growingspan.current, {
        top: e.clientY,
        left: e.clientX,
      });

      gsap.to("body", {
        backgroundColor: isRedBackground ? "#000" : "#fd2c2a",
        duration: 1.2,
        color: isRedBackground ? "#fff" : "#000",
      });

      gsap.to(growingspan.current, {
        scale: 1000,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(growingspan.current, {
            scale: 0,
            clearProps: "all",
          });
        },
      });

      setIsRedBackground(!isRedBackground); 
    };

    const headingElement = headingRef.current;
    headingElement.addEventListener("click", handleClick);

    return () => {
      headingElement.removeEventListener("click", handleClick);
    };
  }, [isRedBackground]);

  useEffect(() => {
    const handleMouseMove = (dets) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: dets.clientX,
          y: dets.clientY,
          duration: 0.5,
          backgroundColor: isRedBackground ? "#ffffff" : "#fd2c2a",
        });
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 5,
          backgroundImage: 'url(https://thirtysixstudio.com/favicon.ico)',
          backgroundSize: 'cover',
          backgroundColor: 'transparent', 
        });
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          backgroundImage: 'none',
          backgroundColor: isRedBackground ? "#ffffff" : "#fd2c2a",
        });
      }
    };

    
    const headingElement = headingRef.current;
    headingElement.addEventListener("mouseenter", handleMouseEnter);
    headingElement.addEventListener("mouseleave", handleMouseLeave);

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      headingElement.removeEventListener("mouseenter", handleMouseEnter);
      headingElement.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isRedBackground]);

  return (
    <>
      <div className="main">
        <span
          ref={cursorRef}
          className="drag-cursor rounded-full fixed align-middle h-5 w-5 pointer-events-none"
        ></span>
      </div>
      <span ref={growingspan} className="growing rounded-full block fixed top-[-10%] left-[-10%] w-5 h-5"></span>
      <div className="w-full relative min-h-screen">
        {showCanvas && data[0].map((canvasdets, index) => (
          <Canvas key={index} details={canvasdets} />
        ))}
        <NavBar />
      </div>
      <div className="w-full relative min-h-screen">
        {showCanvas && data[1].map((canvasdets, index) => (
          <Canvas key={index} details={canvasdets} />
        ))}
      </div>
      <div className="text w-[50%]">
        <div className="w-full flex items-center justify-center absolute top-[103%] left-[-1%]">
          <h1 ref={headingRef} className="text-[12rem] font-normal ">
            Thirtysixstudios
          </h1>
        </div>
        <h3
          style={{
            position: 'absolute',
            left: '25%',
            fontSize: '35px',
            top: '13%',
          }}
          className="text-4xl left-[20vw] w-[350px]"
        >
          At Thirtysixstudio, we build immersive digital experiences for brands
          with a purpose.
        </h3>
        <p
          style={{
            position: 'absolute',
            left: '25%',
            fontSize: '14px',
            top: '45%',
          }}
          className="text-lg w-[300px] font-normal"
        >
          We’re a boutique production studio focused on design, motion, and
          creative technology, constantly reimagining what digital craft can do
          for present-time ads and campaigns
        </p>
        <p
          style={{
            position: 'absolute',
            left: '25%',
            top: '64%',
          }}
          className="text-md"
        >
          scroll
        </p>
        <Analytics />
      </div>
    </>
  );
}

export default App;
