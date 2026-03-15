"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

const projects = [
  {
    id: "bbva-redesign",
    name: "BBVA App Redesign",
    year: "2024",
    role: "Lead Product Designer",
    description:
      "Redesigned the app experience for over 25 million users across four countries. Bridging design and communication, ensuring engineers and PMs are aligned on the 'why'.",
    tags: ["Product Design", "Design System", "Mobile"],
    link: null,
  },
  {
    id: "galope",
    name: "Galope Studio",
    year: "2024",
    role: "Founder & Designer",
    description:
      "A futures lab. We imagine new possible scenarios and turn complex trends into actionable strategic decisions through research, design, and storytelling.",
    tags: ["Brand", "Strategy", "Speculative Design"],
    link: null,
  },
  {
    id: "reby",
    name: "Reby",
    year: "2022",
    role: "Product Designer",
    description:
      "Designed the product experience for a sustainable mobility startup, focused on electric scooters and micro-mobility solutions across European cities.",
    tags: ["Product Design", "Mobility", "Sustainability"],
    link: null,
  },
  {
    id: "bejao",
    name: "Be Jao",
    year: "2021",
    role: "Product Designer",
    description:
      "Designed and built the experience for a fitness app. My first leap into product design, where I learned to balance user needs with business goals.",
    tags: ["Product Design", "Fitness", "Mobile App"],
    link: null,
  },
  {
    id: "movidastudio",
    name: "MovidaStudio",
    year: "2018",
    role: "Founder & Designer",
    description:
      "My own studio focused on brand strategy and design for startups. Where it all started — building brands from scratch and learning the craft of visual communication.",
    tags: ["Brand Strategy", "Visual Design", "Startups"],
    link: null,
  },
];

function buildProjectScenes() {
  const scenes = {};
  projects.forEach((project) => {
    const tagLine = project.tags.map((t) => `#${t.replace(/\s/g, "")}`).join(" ");
    let text = `${project.name} (${project.year})\n\nRole: ${project.role}\n\n${project.description}\n\n${tagLine}`;
    if (project.link) {
      text += `\n\nVisit: ${project.link}`;
    }
    scenes[`work-${project.id}`] = {
      text,
      options: [
        { number: 1, text: "See another project", next: "work" },
        { number: 2, text: "What is your career path?", next: "career" },
        { number: 3, text: "Tell me about yourself", next: "about" },
      ],
    };
  });
  return scenes;
}

export default function TerminalChat() {
  const { isDarkMode } = useTheme();

  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 810;

  const [history, setHistory] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentScene, setCurrentScene] = useState("intro");
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [headerInfo, setHeaderInfo] = useState({
    location: "LOADING...",
    date: "",
  });
  const [hoveredOption, setHoveredOption] = useState(null);
  const [isRestartHovered, setIsRestartHovered] = useState(false);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const hasInitialized = useRef(false);

  const theme = {
    bg: isDarkMode ? "#111111" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#000000",
    accent: "#8B7EFF",
    interactive: isDarkMode ? "#ffffff" : "#000000",
    hover: "#FF2B00",
  };

  const projectScenes = buildProjectScenes();

  const scenes = {
    intro: {
      intro:
        "Crafting digital products for over 8 years. I've designed and built experiences for start-ups, scale-ups & global companies.",
      text: "What brings you here?",
      options: [
        { number: 1, text: "Tell me about yourself", next: "about" },
        { number: 2, text: "What is your career path?", next: "career" },
        { number: 3, text: "What are your interests?", next: "interests" },
      ],
    },
    about: {
      text: "My life revolves around creation. I've dedicated most of my career to building digital products, but I'm always looking for something new to cook up—sometimes at my desk, sometimes in the kitchen, or in a printing workshop. I enjoy the process as much as the result, especially when the outcome is simple, elegant, and handmade.",
      options: [
        { number: 1, text: "What led you into design?", next: "design" },
        { number: 2, text: "My daily workflow", next: "workflow" },
        { number: 3, text: "What are you learning now?", next: "learning" },
      ],
    },
    design: {
      text: "I was a creative kid. I thought I wanted to be an architect because I was fascinated by building things (mostly LEGOs). Over time, my path naturally led me to design and its many branches. My first job was in a printing company, where I developed a lasting love for print and typography that still influences my digital work.",
      options: [
        { number: 1, text: "My daily workflow", next: "workflow" },
        { number: 2, text: "What are you learning now?", next: "learning" },
        { number: 3, text: "What are your interests?", next: "interests" },
      ],
    },
    workflow: {
      text: "I start early with a calm breakfast. Even though I work remotely, I visit the office regularly to connect with the team. I split my day into deep focus blocks for conceptualization, and sync slots for stakeholders. In the evenings, I train to clear my mind, cook something delicious, and watch a film.",
      options: [
        { number: 1, text: "What led you into design?", next: "design" },
        { number: 2, text: "What are you learning now?", next: "learning" },
        { number: 3, text: "What are your interests?", next: "interests" },
      ],
    },
    learning: {
      text: "I'm doubling down on Design Engineering. Thanks to universal access to knowledge, I'm specializing in automation tools—not just to speed up tasks, but to enhance the design process itself. I believe there's never been a better time to build software, and it's exciting to be part of this shift.",
      options: [
        { number: 1, text: "What led you into design?", next: "design" },
        { number: 2, text: "My daily workflow", next: "workflow" },
        { number: 3, text: "What are your interests?", next: "interests" },
      ],
    },
    career: {
      text: "At 19, I started working in a printing company and have been immersed in design ever since. I launched MovidaStudio in 2018, focused on brand strategy and design for startups. I spent some time at Garaje de Ideas in 2019 working for clients like Wallapop, Cofares, and Vorwerk. Later, I moved to Barcelona and made the leap to product design at Be Jao in 2021, a fitness app, and Reby in 2022, focused on sustainable mobility. Now you can find me at BBVA leading the innovation team in Spain since 2023. I also launched this year Galope Studio, focused on speculative and future design.",
      options: [
        { number: 1, text: "Show me your work", next: "work" },
        { number: 2, text: "What is your role at BBVA?", next: "bbva" },
        { number: 3, text: "More about Galope Studio", next: "galope" },
      ],
    },
    work: {
      text: "Here's a selection of projects I've worked on. Pick one to learn more:",
      type: "projectList",
      projects: projects,
      backOption: { text: "Go back", next: "career" },
    },
    bbva: {
      text: "I lead the innovation team in BBVA Spain. In 2024, I helped redesign the app experience for over 25 million users across four countries. My role bridges design and communication, ensuring engineers and PMs are aligned on the 'why'. The biggest challenge? Balancing fast delivery with the complexity of banking systems.",
      options: [
        { number: 1, text: "Show me your work", next: "work" },
        { number: 2, text: "More about Galope Studio", next: "galope" },
        { number: 3, text: "Tell me about yourself", next: "about" },
      ],
    },
    galope: {
      text: "Galope Studio is a futures lab. We imagine new possible scenarios and turn complex trends into actionable strategic decisions through research, design, and storytelling.",
      options: [
        { number: 1, text: "Show me your work", next: "work" },
        { number: 2, text: "What is your role at BBVA?", next: "bbva" },
        { number: 3, text: "Tell me about yourself", next: "about" },
      ],
    },
    interests: {
      text: "Beyond the screen, I love the tangible. I enjoy cooking, screen printing, and running long distances. I also really enjoy capturing my travels with my little BMPCC OG.",
      options: [
        { number: 1, text: "Tell me about yourself", next: "about" },
        { number: 2, text: "What is your career path?", next: "career" },
        { number: 3, text: "What are you learning now?", next: "learning" },
      ],
    },
    ...projectScenes,
  };

  const getScene = (sceneKey) => scenes[sceneKey];

  const handleRestart = () => {
    setHistory([]);
    setCurrentText("");
    setCurrentScene("intro");
    setShowOptions(false);
    setInputValue("");
    setHoveredOption(null);
    setIsRestartHovered(false);
    hasInitialized.current = false;
    setTimeout(() => typeIntro(), 100);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const typeIntro = () => {
    setIsTyping(true);
    setShowOptions(false);
    const fullText = scenes.intro.intro + "\n\n" + scenes.intro.text;
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setCurrentText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setHistory([{ type: "question", content: fullText }]);
        setCurrentText("");
        setIsTyping(false);
        setShowOptions(true);
      }
    }, 15);
  };

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      typeIntro();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      const scrollBehavior = isMobile ? "auto" : "smooth";
      bottomRef.current.scrollIntoView({
        behavior: scrollBehavior,
        block: "end",
      });
    }
  }, [history, currentText, showOptions, isMobile]);

  useEffect(() => {
    const now = new Date();
    let location = "CANARY";
    try {
      location = (Intl.DateTimeFormat().resolvedOptions().timeZone || "CANARY")
        .split("/")
        .pop()
        .replace("_", " ")
        .toUpperCase();
    } catch (e) {}

    setHeaderInfo({
      location: location,
      date: now
        .toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase(),
    });
  }, []);

  const typeText = (text) => {
    setIsTyping(true);
    setShowOptions(false);
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setCurrentText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setHistory((prev) => [...prev, { type: "answer", content: text }]);
        setCurrentText("");
        setIsTyping(false);
        setShowOptions(true);
      }
    }, 15);
  };

  const handleOptionClick = (optionNumber, nextScene) => {
    setHoveredOption(null);
    setHistory((prev) => [
      ...prev,
      { type: "input", content: `> ${optionNumber}` },
    ]);
    setShowOptions(false);
    setCurrentScene(nextScene);
    const scene = scenes[nextScene];
    if (scene) {
      setTimeout(() => {
        typeText(scene.text);
      }, 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue) {
      const input = inputValue.toLowerCase().trim();
      const num = parseInt(input);
      const scene = getScene(currentScene);
      if (!scene) return;

      if (scene.type === "projectList") {
        if (num >= 1 && num <= scene.projects.length) {
          const project = scene.projects[num - 1];
          handleOptionClick(num, `work-${project.id}`);
          setInputValue("");
        } else if (input === "0" || input === "back") {
          handleOptionClick("←", scene.backOption.next);
          setInputValue("");
        }
      } else if (scene.options && num >= 1 && num <= scene.options.length) {
        handleOptionClick(num, scene.options[num - 1].next);
        setInputValue("");
      }
    }
  };

  const fontSize = isMobile ? 28 : 64;
  const lineHeight = isMobile ? 24 : 48;
  const headerFontSize = isMobile ? "10px" : "16px";
  const bottomPadding = isMobile ? "80px" : "32px";

  const currentSceneData = getScene(currentScene);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: theme.bg,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "background-color 0.3s ease",
        color: theme.text,
        fontFamily: "var(--font-neuebit), monospace",
      }}
    >
      <style>{`
        ::placeholder { color: ${theme.text}; opacity: 0.3; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        input { font-family: inherit; }
        button { font-family: inherit; }
      `}</style>

      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 16px 0px 16px",
        }}
      >
        <div onClick={() => inputRef.current?.focus()}>
          {history.map((item, i) => (
            <div
              key={i}
              style={{
                whiteSpace: "pre-wrap",
                marginBottom: "32px",
                fontSize: `${fontSize}px`,
                lineHeight: `${lineHeight}px`,
                color: item.type === "answer" ? theme.accent : theme.text,
              }}
            >
              {item.content}
            </div>
          ))}
          {currentText && (
            <div
              style={{
                whiteSpace: "pre-wrap",
                marginBottom: "32px",
                fontSize: `${fontSize}px`,
                lineHeight: `${lineHeight}px`,
                color: theme.accent,
              }}
            >
              {currentText}
              <span style={{ opacity: showCursor ? 1 : 0 }}>_</span>
            </div>
          )}

          {showOptions && !isTyping && currentSceneData?.type === "projectList" && (
            <div style={{ marginTop: "32px" }}>
              {currentSceneData.projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() =>
                    handleOptionClick(index + 1, `work-${project.id}`)
                  }
                  onMouseEnter={() => setHoveredOption(index + 1)}
                  onMouseLeave={() => setHoveredOption(null)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: `${fontSize}px`,
                    lineHeight: `${lineHeight}px`,
                    color:
                      hoveredOption === index + 1
                        ? theme.hover
                        : theme.interactive,
                    marginBottom: "16px",
                    padding: 0,
                    transition: "color 0.1s ease",
                  }}
                >
                  {index + 1}. {project.name} ({project.year})
                </button>
              ))}
              <button
                onClick={() =>
                  handleOptionClick("←", currentSceneData.backOption.next)
                }
                onMouseEnter={() => setHoveredOption("back")}
                onMouseLeave={() => setHoveredOption(null)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: `${fontSize}px`,
                  lineHeight: `${lineHeight}px`,
                  color:
                    hoveredOption === "back"
                      ? theme.hover
                      : theme.interactive,
                  marginBottom: "16px",
                  padding: 0,
                  transition: "color 0.1s ease",
                }}
              >
                0. {currentSceneData.backOption.text}
              </button>
              <div
                style={{
                  marginTop: "32px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: `${fontSize}px`,
                  lineHeight: `${lineHeight}px`,
                  color: theme.text,
                }}
              >
                <span style={{ marginRight: "12px" }}>&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="1, 2, 3..."
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: theme.text,
                    width: "100%",
                    fontSize: `${fontSize}px`,
                    lineHeight: `${lineHeight}px`,
                    padding: 0,
                  }}
                  autoFocus
                />
              </div>
            </div>
          )}

          {showOptions && !isTyping && currentSceneData && currentSceneData.type !== "projectList" && currentSceneData.options && (
            <div style={{ marginTop: "32px" }}>
              {currentSceneData.options.map((option) => (
                <button
                  key={option.number}
                  onClick={() =>
                    handleOptionClick(option.number, option.next)
                  }
                  onMouseEnter={() => setHoveredOption(option.number)}
                  onMouseLeave={() => setHoveredOption(null)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: `${fontSize}px`,
                    lineHeight: `${lineHeight}px`,
                    color:
                      hoveredOption === option.number
                        ? theme.hover
                        : theme.interactive,
                    marginBottom: "16px",
                    padding: 0,
                    transition: "color 0.1s ease",
                  }}
                >
                  {option.number}. {option.text}
                </button>
              ))}
              <div
                style={{
                  marginTop: "32px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: `${fontSize}px`,
                  lineHeight: `${lineHeight}px`,
                  color: theme.text,
                }}
              >
                <span style={{ marginRight: "12px" }}>&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="1, 2, 3 or type..."
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: theme.text,
                    width: "100%",
                    fontSize: `${fontSize}px`,
                    lineHeight: `${lineHeight}px`,
                    padding: 0,
                  }}
                  autoFocus
                />
              </div>
            </div>
          )}

          <div ref={bottomRef} style={{ height: bottomPadding }} />
        </div>
      </div>

      <div
        style={{
          height: "48px",
          minHeight: "48px",
          padding: "0 16px",
          backgroundColor: theme.bg,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: headerFontSize,
          color: theme.text,
          flexShrink: 0,
          borderTop: `1px solid ${isDarkMode ? "#333" : "#eee"}`,
        }}
      >
        <span style={{ flex: 1 }}>{headerInfo.location}</span>
        <button
          onClick={handleRestart}
          onMouseEnter={() => setIsRestartHovered(true)}
          onMouseLeave={() => setIsRestartHovered(false)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            color: isRestartHovered ? theme.hover : theme.interactive,
            cursor: "pointer",
            fontSize: "12px",
            textAlign: "center",
            transition: "color 0.1s ease",
          }}
        >
          [RESTART]
        </button>
        <span style={{ flex: 1, textAlign: "right" }}>{headerInfo.date}</span>
      </div>
    </div>
  );
}
