"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TerminalChat from "../components/TerminalChat";
import WorkScreen from "../components/WorkScreen";

export default function HomePage() {
  const [windowWidth, setWindowWidth] = useState(1200);
  const [workMode, setWorkMode] = useState(false);

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
        position: "relative",
      }}
    >
      {/* SIDEBAR / WORK SCREEN */}
      <div
        style={{
          width: workMode ? "100%" : isMobile ? "100%" : "35%",
          height: isMobile && !workMode ? "auto" : "100%",
          flexShrink: 0,
          zIndex: 10,
          transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
        {workMode ? (
          <WorkScreen onGoBack={() => setWorkMode(false)} />
        ) : (
          <Sidebar />
        )}
      </div>

      {/* TERMINAL CHAT */}
      <div
        style={{
          flex: workMode ? 0 : 1,
          width: workMode ? 0 : "auto",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          transition: "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1), width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: workMode ? 0 : 1,
        }}
      >
        <TerminalChat onWorkMode={() => setWorkMode(true)} />
      </div>
    </div>
  );
}
