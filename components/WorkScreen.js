"use client";

import { useState, useEffect } from "react";

const projects = [
  {
    id: "bbva-redesign",
    name: "BBVA App Redesign",
    year: "2024",
  },
  {
    id: "galope",
    name: "Galope Studio",
    year: "2024",
  },
  {
    id: "reby",
    name: "Reby",
    year: "2022",
  },
  {
    id: "bejao",
    name: "Be Jao",
    year: "2021",
  },
  {
    id: "movidastudio",
    name: "MovidaStudio",
    year: "2018",
  },
];

export default function WorkScreen({ onGoBack }) {
  const [windowWidth, setWindowWidth] = useState(1200);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 810;
  const fontSize = isMobile ? "28px" : "64px";
  const lineHeight = isMobile ? "24px" : "48px";

  return (
    <div
      style={{
        backgroundColor: "#FF2B00",
        color: "#000000",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        fontFamily: "var(--font-neuebit), monospace",
        fontSize: fontSize,
        lineHeight: lineHeight,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header: ← Go back */}
      <div style={{ padding: "16px", flexShrink: 0 }}>
        <span
          onClick={onGoBack}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.5)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
          style={{
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
        >
          ← Go back
        </span>
      </div>

      {/* Project list */}
      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 16px 16px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => {}}
            style={{
              cursor: "pointer",
              marginBottom: index < projects.length - 1 ? "8px" : "0",
              opacity: hoveredItem !== null && hoveredItem !== index ? 0.4 : 1,
              transition: "opacity 0.2s ease",
            }}
          >
            {project.name} ({project.year})
          </div>
        ))}
      </div>
    </div>
  );
}
