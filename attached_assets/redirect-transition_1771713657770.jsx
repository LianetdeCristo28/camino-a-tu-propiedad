import { useState, useEffect, useRef } from "react";

const LOFTY_URL = "https://lianetespinosaojeda.expportal.com/listing?condition=%7B%22location%22%3A%7B%22city%22%3A%5B%22Orlando%2C%20FL%22%5D%7D%2C%22price%22%3A%22%2C400000%22%2C%22beds%22%3A%223%2C%22%7D";

// Simulated flow stages
const stages = [
  { label: "Verificando tu perfil", icon: "shield", duration: 800 },
  { label: "Conectando con Stellar MLS", icon: "database", duration: 1000 },
  { label: "Filtrando propiedades en Orlando, FL", icon: "filter", duration: 1200 },
  { label: "Preparando resultados personalizados", icon: "sparkles", duration: 900 },
];

const Icons = {
  shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  database: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
    </svg>
  ),
  filter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  ),
  sparkles: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  ),
  home: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  key: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/>
    </svg>
  ),
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17l9.2-9.2M17 17V7H7"/>
    </svg>
  ),
};

function ParticleField() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            borderRadius: "50%",
            backgroundColor: i % 3 === 0 ? "#D2B463" : i % 3 === 1 ? "#CBB29B" : "#BDB2A4",
            opacity: 0.15 + Math.random() * 0.25,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particleFloat ${4 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function RedirectTransition() {
  const [phase, setPhase] = useState("idle"); // idle | loading | complete | redirecting
  const [currentStage, setCurrentStage] = useState(-1);
  const [stageProgress, setStageProgress] = useState(0);
  const [completedStages, setCompletedStages] = useState([]);
  const [filters] = useState({ city: "Orlando", maxPrice: "400,000", beds: "3+" });
  const progressInterval = useRef(null);

  const startTransition = () => {
    setPhase("loading");
    setCurrentStage(0);
    setCompletedStages([]);
    setStageProgress(0);
  };

  useEffect(() => {
    if (phase !== "loading" || currentStage < 0) return;

    if (currentStage >= stages.length) {
      setPhase("complete");
      setTimeout(() => setPhase("redirecting"), 1200);
      return;
    }

    const stage = stages[currentStage];
    let progress = 0;
    const step = 100 / (stage.duration / 30);

    progressInterval.current = setInterval(() => {
      progress += step;
      setStageProgress(Math.min(progress, 100));

      if (progress >= 100) {
        clearInterval(progressInterval.current);
        setCompletedStages((prev) => [...prev, currentStage]);
        setTimeout(() => {
          setCurrentStage((prev) => prev + 1);
          setStageProgress(0);
        }, 200);
      }
    }, 30);

    return () => clearInterval(progressInterval.current);
  }, [phase, currentStage]);

  const totalProgress =
    phase === "complete" || phase === "redirecting"
      ? 100
      : stages.length > 0
      ? ((completedStages.length + stageProgress / 100) / stages.length) * 100
      : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; }
          25% { transform: translateY(-30px) translateX(10px) scale(1.2); opacity: 0.35; }
          50% { transform: translateY(-15px) translateX(-15px) scale(0.9); opacity: 0.2; }
          75% { transform: translateY(-40px) translateX(5px) scale(1.1); opacity: 0.3; }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(210, 180, 99, 0.15); }
          50% { box-shadow: 0 0 40px rgba(210, 180, 99, 0.35); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes checkPop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(3px) translateY(-3px); }
        }

        .stage-enter { animation: fadeSlideUp 0.4s ease-out forwards; }
        .complete-enter { animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .check-pop { animation: checkPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#F8F6F2",
          fontFamily: "'Inter', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          position: "relative",
        }}
      >
        <ParticleField />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "520px",
          }}
        >
          {/* === IDLE STATE: Simulated CTA === */}
          {phase === "idle" && (
            <div style={{ textAlign: "center", animation: "fadeSlideUp 0.6s ease-out" }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#BDB2A4",
                marginBottom: "12px"
              }}>
                Demo de Transición
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#17140F",
                marginBottom: "8px",
                lineHeight: 1.3,
              }}>
                Buscar Propiedades en Orlando
              </h2>
              <p style={{ color: "#BDB2A4", fontSize: "14px", marginBottom: "32px" }}>
                {filters.beds} habitaciones · Hasta ${filters.maxPrice} · Florida
              </p>

              <button
                onClick={startTransition}
                style={{
                  background: "#D2B463",
                  color: "#17140F",
                  border: "none",
                  padding: "18px 48px",
                  borderRadius: "999px",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.3px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 24px rgba(210, 180, 99, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(210, 180, 99, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(210, 180, 99, 0.3)";
                }}
              >
                Buscar Propiedades Activas
              </button>
            </div>
          )}

          {/* === LOADING + COMPLETE + REDIRECTING === */}
          {phase !== "idle" && (
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "24px",
                border: "1px solid rgba(189, 178, 164, 0.2)",
                overflow: "hidden",
                boxShadow: "0 24px 80px rgba(23, 20, 15, 0.08), 0 4px 16px rgba(23, 20, 15, 0.04)",
                animation: "scaleIn 0.4s ease-out",
              }}
            >
              {/* Top accent bar */}
              <div style={{ height: "3px", background: "linear-gradient(90deg, #D2B463, #CBB29B, #D2B463)", backgroundSize: "200%", animation: phase !== "complete" && phase !== "redirecting" ? "shimmer 2s linear infinite" : "none" }} />

              {/* Header */}
              <div style={{ padding: "36px 36px 0", textAlign: "center" }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "20px",
                  background: phase === "complete" || phase === "redirecting" ? "#17140F" : "linear-gradient(135deg, #F8F6F2, #E5E1D8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  color: phase === "complete" || phase === "redirecting" ? "#D2B463" : "#17140F",
                  transition: "all 0.5s ease",
                  animation: phase === "complete" || phase === "redirecting" ? "pulseGlow 2s ease-in-out infinite" : "none",
                }}>
                  {phase === "complete" || phase === "redirecting" ? Icons.key : Icons.home}
                </div>

                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#17140F",
                  marginBottom: "6px",
                  lineHeight: 1.3,
                }}>
                  {phase === "redirecting"
                    ? "¡Listo!"
                    : phase === "complete"
                    ? "Búsqueda personalizada lista"
                    : "Preparando tu búsqueda"}
                </h3>
                <p style={{ color: "#BDB2A4", fontSize: "14px", lineHeight: 1.5 }}>
                  {phase === "redirecting"
                    ? "Abriendo tus propiedades…"
                    : phase === "complete"
                    ? `${filters.beds} hab · Hasta $${filters.maxPrice} · Orlando, FL`
                    : "Conectando con el mercado de Florida en tiempo real"}
                </p>
              </div>

              {/* Progress Section */}
              <div style={{ padding: "28px 36px 32px" }}>
                {/* Global progress bar */}
                <div style={{
                  height: "4px",
                  borderRadius: "4px",
                  background: "#F0EDE8",
                  marginBottom: "24px",
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    borderRadius: "4px",
                    background: "linear-gradient(90deg, #D2B463, #CBB29B)",
                    width: `${totalProgress}%`,
                    transition: "width 0.3s ease",
                  }} />
                </div>

                {/* Stage items */}
                {phase !== "redirecting" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {stages.map((stage, i) => {
                      const isCompleted = completedStages.includes(i);
                      const isActive = currentStage === i && phase === "loading";
                      const isPending = !isCompleted && !isActive;

                      return (
                        <div
                          key={i}
                          className={isActive ? "stage-enter" : ""}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            padding: "10px 14px",
                            borderRadius: "12px",
                            background: isActive ? "#F8F6F2" : "transparent",
                            opacity: isPending && phase === "loading" ? 0.35 : 1,
                            transition: "all 0.4s ease",
                          }}
                        >
                          {/* Status indicator */}
                          <div style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            background: isCompleted ? "#17140F" : isActive ? "#E5E1D8" : "#F5F3EF",
                            color: isCompleted ? "#D2B463" : isActive ? "#17140F" : "#BDB2A4",
                            transition: "all 0.3s ease",
                          }}>
                            {isCompleted ? (
                              <svg className="check-pop" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            ) : (
                              Icons[stage.icon]
                            )}
                          </div>

                          {/* Label */}
                          <span style={{
                            fontSize: "14px",
                            fontWeight: isActive ? 500 : 400,
                            color: isCompleted ? "#17140F" : isActive ? "#17140F" : "#BDB2A4",
                            flex: 1,
                            transition: "all 0.3s ease",
                          }}>
                            {stage.label}
                          </span>

                          {/* Stage micro-progress */}
                          {isActive && (
                            <div style={{
                              width: "48px",
                              height: "3px",
                              borderRadius: "3px",
                              background: "#E5E1D8",
                              overflow: "hidden",
                            }}>
                              <div style={{
                                height: "100%",
                                background: "#D2B463",
                                borderRadius: "3px",
                                width: `${stageProgress}%`,
                                transition: "width 0.05s linear",
                              }} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Redirecting state */}
                {phase === "redirecting" && (
                  <div className="complete-enter" style={{ textAlign: "center", padding: "12px 0" }}>
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      background: "#17140F",
                      color: "#F8F6F2",
                      padding: "14px 28px",
                      borderRadius: "999px",
                      fontSize: "14px",
                      fontWeight: 500,
                      animation: "float 2s ease-in-out infinite",
                    }}>
                      <span>Abriendo propiedades</span>
                      <span style={{ animation: "arrowBounce 1s ease-in-out infinite", display: "inline-flex" }}>
                        {Icons.arrow}
                      </span>
                    </div>
                    <p style={{
                      marginTop: "16px",
                      fontSize: "12px",
                      color: "#BDB2A4",
                    }}>
                      Se abrirá una nueva pestaña con tus resultados
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div style={{
                borderTop: "1px solid rgba(189, 178, 164, 0.15)",
                padding: "14px 36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "#FAFAF8",
              }}>
                <div style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: phase === "complete" || phase === "redirecting" ? "#4ADE80" : "#D2B463",
                  transition: "background 0.3s ease",
                }} />
                <span style={{ fontSize: "11px", color: "#BDB2A4", letterSpacing: "0.5px" }}>
                  Stellar MLS · Datos verificados en tiempo real
                </span>
              </div>
            </div>
          )}

          {/* Reset for demo */}
          {phase === "redirecting" && (
            <button
              onClick={() => { setPhase("idle"); setCurrentStage(-1); setCompletedStages([]); setStageProgress(0); }}
              style={{
                display: "block",
                margin: "24px auto 0",
                background: "none",
                border: "none",
                color: "#BDB2A4",
                fontSize: "13px",
                cursor: "pointer",
                textDecoration: "underline",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Reiniciar demo
            </button>
          )}
        </div>
      </div>
    </>
  );
}
