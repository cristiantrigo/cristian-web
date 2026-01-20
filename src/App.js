import React, { useState, useEffect } from "react";
import "./styles.css";
import { ThemeProvider } from "./ThemeContext";
import TerminalChat from "./TerminalChat";
import Sidebar from "./Sidebar";

export default function App() {
  // Detectar móvil para cambiar el diseño
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 800;

  return (
    <ThemeProvider>
      <div
        style={{
          display: "flex",
          // Si es móvil columna (uno encima de otro), si es PC fila (lado a lado)
          flexDirection: isMobile ? "column" : "row",
          height: "100vh", // Ocupa toda la pantalla
          width: "100vw",
          overflow: "hidden", // Evita scroll doble
        }}
      >
        {/* LADO IZQUIERDO (O SUPERIOR EN MÓVIL) */}
        <div
          style={{
            width: isMobile ? "100%" : "35%", // 35% de ancho para el naranja
            height: isMobile ? "auto" : "100%",
            flexShrink: 0,
          }}
        >
          <Sidebar />
        </div>

        {/* LADO DERECHO (CHAT) */}
        <div
          style={{
            flex: 1, // Toma el espacio restante
            height: "100%",
            position: "relative",
          }}
        >
          <TerminalChat />
        </div>
      </div>
    </ThemeProvider>
  );
}
