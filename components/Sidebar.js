"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";

export default function Sidebar() {
  const { isDarkMode, toggleTheme } = useTheme();

  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 810;

  const fontSize = isMobile ? "28px" : "64px";
  const lineHeight = isMobile ? "24px" : "48px";
  const padding = "16px";

  const emailOriginal = "hello@cristiantrigo.es";
  const [emailText, setEmailText] = useState(emailOriginal);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timer;
    if (isCopied) {
      setEmailText("Copied");
      timer = setTimeout(() => {
        setIsCopied(false);
        setEmailText(emailOriginal);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleCopyClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(emailOriginal);
    setIsCopied(true);
  };

  return (
    <div
      style={{
        backgroundColor: "#FF2B00",
        color: "#000000",
        padding: padding,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "var(--font-neuebit), monospace",
        fontSize: fontSize,
        lineHeight: lineHeight,
        textTransform: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          marginBottom: isMobile ? "20px" : "0",
        }}
      >
        <span>Cristian Trigo</span>
        <span
          onClick={toggleTheme}
          style={{
            cursor: "pointer",
            userSelect: "none",
            marginLeft: "20px",
          }}
        >
          {isDarkMode ? "☽" : "☼"}
        </span>
      </div>

      <div
        style={{
          maxWidth: "100%",
          margin: isMobile ? "20px 0" : "0",
        }}
      >
        Lead Product
        <br />
        Designer at BBVA
      </div>

      <div style={{ wordBreak: "break-all" }}>
        <span
          onClick={handleCopyClick}
          style={{
            cursor: "pointer",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.7)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
        >
          {emailText}
        </span>
      </div>
    </div>
  );
}
