"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TerminalChat from "../components/TerminalChat";

export default function HomePage() {
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 810;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100dvh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: isMobile ? "100%" : "35%",
          height: isMobile ? "auto" : "100%",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <Sidebar />
      </div>
      <div
        style={{
          flex: 1,
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <TerminalChat />
      </div>
    </div>
  );
}
