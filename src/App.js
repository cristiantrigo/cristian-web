import React, { useState, useEffect } from "react";
import "./styles.css";
import { ThemeProvider } from "./ThemeContext";
import TerminalChat from "./TerminalChat";
import Sidebar from "./Sidebar";

export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 810;

  return (
    <ThemeProvider>
      {/* CONTENEDOR PRINCIPAL: Ocupa el 100% real de la pantalla */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: "100dvh", // Truco PRO para móviles (evita problemas con la barra de URL)
          width: "100vw",
          overflow: "hidden" // IMPORTANTE: Impide que se mueva toda la página
        }}
      >
        {/* LADO IZQUIERDO (SIDEBAR) */}
        <div style={{ 
            width: isMobile ? "100%" : "35%", 
            height: isMobile ? "auto" : "100%", // En móvil se adapta a su contenido
            flexShrink: 0, // PROHIBIDO ENCOGERSE: Esto lo mantiene fijo arriba
            zIndex: 10 // Asegura que quede por encima visualmente
        }}>
          <Sidebar />
        </div>

        {/* LADO DERECHO (CHAT) */}
        <div style={{ 
            flex: 1, // Toma todo el espacio sobrante
            height: "100%", // Ocupa todo el alto disponible
            position: "relative",
            overflow: "hidden" // El scroll lo gestionará el componente interno
        }}>
          <TerminalChat />
        </div>
      </div>
    </ThemeProvider>
  );
}