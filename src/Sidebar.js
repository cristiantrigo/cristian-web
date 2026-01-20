import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";

export default function Sidebar() {
  const { isDarkMode, toggleTheme } = useTheme();

  // 1. LÓGICA RESPONSIVE (Igual que en el Chat)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 810;

  // Estas medidas coinciden exactamente con las de TerminalChat.js
  const fontSize = isMobile ? "28px" : "64px";
  const lineHeight = isMobile ? "24px" : "48px";
  const padding = "16px";

  // 2. LÓGICA DE COPIAR EMAIL (Traducción de tu código Framer)
  const emailOriginal = "hello@cristiantrigo.es";
  const [emailText, setEmailText] = useState(emailOriginal);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timer;
    if (isCopied) {
      setEmailText("☕ Copied"); // Mensaje de éxito

      // Esperar 2 segundos y volver al email (10s me parecía mucho, pero puedes poner 10000)
      timer = setTimeout(() => {
        setIsCopied(false);
        setEmailText(emailOriginal);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleCopyClick = (e) => {
    e.preventDefault(); // Evita que se abra el cliente de correo
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
        width: "100%", // Asegura que ocupe el ancho en móvil
        boxSizing: "border-box",
        fontFamily: "'PP NeueBit Bold', monospace",
        // APLICAMOS LAS VARIABLES DINÁMICAS AQUÍ:
        fontSize: fontSize,
        lineHeight: lineHeight,
        textTransform: "none",
      }}
    >
      {/* --- PARTE SUPERIOR (Nombre + Icono) --- */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          marginBottom: isMobile ? "20px" : "0", // Un poco de aire en móvil si hace falta
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

      {/* --- PARTE CENTRAL --- */}
      <div
        style={{
          maxWidth: "100%",
          margin: isMobile ? "20px 0" : "0", // Separación en móvil
        }}
      >
        Lead Product
        <br />
        Designer at BBVA
      </div>

      {/* --- PARTE INFERIOR (Email con lógica de copia) --- */}
      <div style={{ wordBreak: "break-all" }}>
        <span
          onClick={handleCopyClick}
          style={{
            cursor: "pointer",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          // Efecto visual simple al pasar el mouse
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.7)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
        >
          {emailText}
        </span>
      </div>
    </div>
  );
}
