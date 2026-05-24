import { useState, useEffect, useRef, useMemo } from "react";

export default function SplashSimple({ onComplete }) {
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const calledRef = useRef(false);

  const particles = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: +(Math.random() * 3 + 1).toFixed(1),
      left: +(Math.random() * 100).toFixed(2),
      top: +(Math.random() * 100).toFixed(2),
      alpha: +(Math.random() * 0.3 + 0.08).toFixed(2),
      dur: +(Math.random() * 9 + 6).toFixed(1),
      del: +(Math.random() * 6).toFixed(1),
    })), []
  );

  // 光线射线 — 减少数量，更柔和
  const rays = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i / 12) * 360,
      width: i % 3 === 0 ? 2 : 1,
      length: i % 3 === 0 ? 90 : 75,
      opacity: 0.4,
      delay: (i * 0.025).toFixed(3),
    })), []
  );

  const doEnter = useRef(null);
  doEnter.current = () => {
    if (!ready || calledRef.current) return;
    calledRef.current = true;
    setLeaving(true);
    setTimeout(() => onComplete(), 1800);
  };

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onClick = () => doEnter.current();
    const onKey = (e) => { if (["Enter", " ", "ArrowDown"].includes(e.key)) { e.preventDefault(); doEnter.current(); } };
    const onWheel = (e) => { if (Math.abs(e.deltaY) > 5) doEnter.current(); };
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "#08100D", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: ready ? "pointer" : "default",
    }}>

      {/* 背景粒子 */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {particles.map(p => (
          <div key={p.id} style={{
            position: "absolute", borderRadius: "50%",
            width: p.size, height: p.size,
            left: p.left + "%", top: p.top + "%",
            background: `rgba(201,168,76,${p.alpha})`,
            animation: `spFloat ${p.dur}s ease-in-out ${p.del}s infinite`,
          }} />
        ))}
      </div>

      {/* 旋转光环 */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        {[260, 420, 580, 740].map((s, i) => (
          <div key={s} style={{
            position: "absolute", borderRadius: "50%", width: s, height: s,
            border: "1px solid rgba(201,168,76,0.07)",
            animation: `spRotate ${18 + i * 10}s linear infinite ${i % 2 ? "reverse" : ""}`,
          }} />
        ))}
      </div>

      {/* 中心径向光 */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.10) 0%, transparent 65%)"
      }} />

      {/* 主文案 */}
      <div style={{
        position: "relative", zIndex: 10, textAlign: "center", padding: "0 2rem",
        transition: "opacity .5s ease",
        opacity: leaving ? 0 : 1,
        pointerEvents: leaving ? "none" : "auto",
      }}>
        <div style={{ marginBottom: "2rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: ".5rem 1.4rem", borderRadius: 99,
            border: "1px solid rgba(201,168,76,.2)", background: "rgba(201,168,76,.05)",
          }}>
            <span style={{ fontSize: "1.3rem" }}>🇲🇾</span>
            <span style={{ color: "#C9A84C", fontSize: ".65rem", letterSpacing: ".32em", fontWeight: 600 }}>
              STUDY IN MALAYSIA
            </span>
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Noto Serif SC',serif",
          fontSize: "clamp(3rem,9vw,6rem)",
          fontWeight: 900, color: "#F5F0E8",
          lineHeight: 1.1, letterSpacing: ".04em", marginBottom: ".8rem",
        }}>留学南洋</h1>

        <h2 style={{
          fontFamily: "'Noto Serif SC',serif",
          fontSize: "clamp(1.2rem,3.5vw,2.2rem)",
          fontWeight: 700, color: "rgba(201,168,76,.85)",
          letterSpacing: ".08em", marginBottom: "1.4rem", fontStyle: "italic",
        }}>开启命运改变之旅</h2>

        <p style={{ color: "#9A9587", fontSize: ".85rem", letterSpacing: ".12em", marginBottom: "2.5rem" }}>
          KUALA LUMPUR · PENANG · JOHOR BAHRU
        </p>

        <div style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(10px)",
          transition: "opacity .7s ease, transform .7s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.1rem" }}>
            <div style={{ width: 48, height: 1, background: "linear-gradient(to right,transparent,#C9A84C)" }} />
            <span style={{ color: "rgba(201,168,76,.4)", fontSize: ".6rem", letterSpacing: ".3em" }}>ENTER</span>
            <div style={{ width: 48, height: 1, background: "linear-gradient(to left,transparent,#C9A84C)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: ".8rem" }}>
            <div style={{
              width: 26, height: 42, borderRadius: 13,
              border: "2px solid rgba(201,168,76,.3)",
              display: "flex", justifyContent: "center", paddingTop: 6
            }}>
              <div style={{
                width: 4, height: 9, borderRadius: 2, background: "#C9A84C",
                animation: "spScroll 1.4s ease-in-out infinite"
              }} />
            </div>
          </div>
          <p style={{
            color: "#C9A84C", fontSize: "1.3rem", letterSpacing: ".18em", fontWeight: 500,
            animation: "spPulse 2s ease-in-out infinite"
          }}>点击 · 进入</p>
          <p style={{ color: "#444", fontSize: ".7rem", letterSpacing: ".1em", marginTop: ".4rem" }}>
            或滑动滚轮 / 按任意键
          </p>
        </div>
      </div>

      {/* ══ 优化后的离场动画层 — 淡化圆形，自然打开 ══ */}
      {leaving && (
        <>
          {/* 1. 柔和光晕 — 淡化圆形边缘，使用更分散的渐变 */}
          <div style={{
            position: "fixed", inset: 0, zIndex: 55, pointerEvents: "none",
            background: "radial-gradient(circle at 50% 50%, rgba(255,245,200,0.3) 0%, rgba(201,168,76,0.1) 30%, rgba(201,168,76,0.03) 60%, transparent 85%)",
            animation: "spSoftHalo 1.4s ease-out forwards",
            opacity: 0,
          }} />

          {/* 2. 光线射线 — 更细更柔和 */}
          <div style={{
            position: "fixed", inset: 0, zIndex: 56, pointerEvents: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}>
            {rays.map(r => (
              <div key={r.id} style={{
                position: "absolute",
                width: r.width + "px",
                height: r.length + "vmax",
                transformOrigin: "50% 100%",
                transform: `rotate(${r.angle}deg)`,
                bottom: "50%",
                left: `calc(50% - ${r.width / 2}px)`,
                background: `linear-gradient(to top, rgba(255,245,200,0) 0%, rgba(255,245,200,0.3) 30%, rgba(201,168,76,0.15) 60%, transparent 100%)`,
                borderRadius: "50% 50% 0 0 / 30% 30% 0 0",
                animation: `spRaySoft 1.2s cubic-bezier(0.2, 0.8, 0.3, 1) ${r.delay}s forwards`,
                opacity: 0,
              }} />
            ))}
          </div>

          {/* 3. 垂直线条撕开效果 — 替代圆形核心 */}
          <div style={{
            position: "fixed", inset: 0, zIndex: 56, pointerEvents: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* 中心垂直光柱 */}
            <div style={{
              position: "absolute",
              width: "1px",
              height: "0%",
              background: "linear-gradient(to bottom, transparent, rgba(255,245,200,0.8) 20%, rgba(255,240,180,1) 50%, rgba(255,245,200,0.8) 80%, transparent)",
              animation: "spVerticalBeam 1s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards",
              boxShadow: "0 0 8px rgba(255,240,180,0.5)",
            }} />
            
            {/* 左侧展开光晕 */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "0%",
              background: "linear-gradient(90deg, rgba(201,168,76,0.08), transparent)",
              animation: "spLeftExpand 1s cubic-bezier(0.4, 0, 0.2, 1) 0.15s forwards",
              transform: "translateX(-100%)",
            }} />
            
            {/* 右侧展开光晕 */}
            <div style={{
              position: "absolute",
              right: "50%",
              top: 0,
              bottom: 0,
              width: "0%",
              background: "linear-gradient(270deg, rgba(201,168,76,0.08), transparent)",
              animation: "spRightExpand 1s cubic-bezier(0.4, 0, 0.2, 1) 0.15s forwards",
              transform: "translateX(100%)",
            }} />
          </div>

          {/* 4. 金色粒子飘散 — 从中心向外扩散，不形成圆形 */}
          <div style={{
            position: "fixed", inset: 0, zIndex: 56, pointerEvents: "none",
          }}>
            {[...Array(80)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: Math.random() * 4 + 1 + "px",
                  height: Math.random() * 4 + 1 + "px",
                  background: `rgba(201,168,76,${Math.random() * 0.5 + 0.2})`,
                  borderRadius: "2px",
                  boxShadow: "0 0 3px rgba(201,168,76,0.4)",
                  animation: `spParticleFlow ${Math.random() * 0.8 + 0.6}s ease-out forwards`,
                  transform: `translate(-50%, -50%)`,
                }}
              />
            ))}
          </div>

          {/* 5. 左窗帘 — 带曲线缓动 */}
          <div style={{
            position: "fixed", top: 0, bottom: 0, left: 0, width: "50%", zIndex: 60,
            background: "linear-gradient(135deg, #0A1515 0%, #08100D 100%)",
            animation: "spCurtainLeftSmooth 1.2s cubic-bezier(0.65, 0, 0.35, 1) 0.2s forwards",
          }} />

          {/* 6. 右窗帘 */}
          <div style={{
            position: "fixed", top: 0, bottom: 0, right: 0, width: "50%", zIndex: 60,
            background: "linear-gradient(225deg, #0A1515 0%, #08100D 100%)",
            animation: "spCurtainRightSmooth 1.2s cubic-bezier(0.65, 0, 0.35, 1) 0.2s forwards",
          }} />

          {/* 7. 中缝光线 — 更细腻 */}
          <div style={{
            position: "fixed", top: 0, bottom: 0, left: "50%",
            width: "1px", marginLeft: "-0.5px", zIndex: 61, pointerEvents: "none",
            background: "linear-gradient(to bottom, transparent, rgba(255,245,180,0.7) 15%, rgba(255,240,160,1) 50%, rgba(255,245,180,0.7) 85%, transparent)",
            animation: "spSeamGlow 1.3s ease-out 0.2s forwards",
            boxShadow: "0 0 6px rgba(255,240,160,0.4)",
          }} />

          {/* 8. 最终淡入 */}
          <div style={{
            position: "fixed", inset: 0, zIndex: 70, pointerEvents: "none",
            background: "linear-gradient(135deg, #FAFAF5 0%, #F5F0EA 100%)",
            animation: "spFinalFade 1.6s ease-out forwards",
            opacity: 0,
          }} />
        </>
      )}

      <style>{`
        @keyframes spFloat {
          0%,100%{ transform:translate(0,0); }
          33%{ transform:translate(10px,-18px); }
          66%{ transform:translate(-8px,-10px); }
        }
        @keyframes spRotate {
          from{ transform:rotate(0deg); }
          to{ transform:rotate(360deg); }
        }
        @keyframes spScroll {
          0%{ transform:translateY(0); opacity:1; }
          100%{ transform:translateY(14px); opacity:0; }
        }
        @keyframes spPulse {
          0%,100%{ opacity:.6; }
          50%{ opacity:1; }
        }

        /* 柔和射线 — 淡化圆形感 */
        @keyframes spRaySoft {
          0%  { opacity: 0; transform: rotate(var(--angle, 0deg)) scaleY(0); }
          20% { opacity: 0.4; }
          60% { opacity: 0.6; transform: rotate(var(--angle, 0deg)) scaleY(1); }
          100%{ opacity: 0; transform: rotate(var(--angle, 0deg)) scaleY(1.1); }
        }

        /* 柔和光晕 — 边缘完全淡化 */
        @keyframes spSoftHalo {
          0%  { opacity: 0; transform: scale(0.5); filter: blur(20px); }
          40% { opacity: 0.4; transform: scale(0.9); filter: blur(15px); }
          80% { opacity: 0.2; transform: scale(1.5); filter: blur(30px); }
          100%{ opacity: 0; transform: scale(2); filter: blur(40px); }
        }

        /* 垂直光柱 — 从中心向上下延伸 */
        @keyframes spVerticalBeam {
          0%  { height: 0%; opacity: 0; }
          30% { opacity: 0.8; }
          60% { height: 100%; opacity: 0.6; }
          100%{ height: 100%; opacity: 0; }
        }

        /* 左侧展开 */
        @keyframes spLeftExpand {
          0%  { width: 0%; opacity: 0; }
          50% { width: 50%; opacity: 0.3; }
          100%{ width: 50%; opacity: 0; }
        }

        /* 右侧展开 */
        @keyframes spRightExpand {
          0%  { width: 0%; opacity: 0; }
          50% { width: 50%; opacity: 0.3; }
          100%{ width: 50%; opacity: 0; }
        }

        /* 粒子流向 — 不形成圆形 */
        @keyframes spParticleFlow {
          0% { 
            transform: translate(-50%, -50%) scale(0); 
            opacity: 1; 
          }
          100% { 
            transform: translate(
              calc(-50% + ${Math.random() * 400 - 200}px),
              calc(-50% + ${Math.random() * 200 - 100}px)
            ) scale(1.2); 
            opacity: 0; 
          }
        }

        /* 窗帘平滑撕开 */
        @keyframes spCurtainLeftSmooth {
          0%  { transform: translateX(0); }
          100%{ transform: translateX(-100%); }
        }
        @keyframes spCurtainRightSmooth {
          0%  { transform: translateX(0); }
          100%{ transform: translateX(100%); }
        }

        /* 中缝光芒 */
        @keyframes spSeamGlow {
          0%, 30% { opacity: 1; transform: scaleY(0.3); }
          60% { opacity: 0.8; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(1.2); }
        }

        /* 最终淡入 */
        @keyframes spFinalFade {
          0%  { opacity: 0; }
          40% { opacity: 0; }
          70% { opacity: 0.6; }
          100%{ opacity: 1; }
        }
      `}</style>
    </div>
  );
}