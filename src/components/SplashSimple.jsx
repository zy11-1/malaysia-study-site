import { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";

export default function SplashSimple({ onComplete }) {
  const [ready, setReady]     = useState(false);
  const [leaving, setLeaving] = useState(false);
  const calledRef = useRef(false);

  // DOM refs for GSAP
  const curtainLRef  = useRef(null);
  const curtainRRef  = useRef(null);
  const seamRef      = useRef(null);
  const haloRef      = useRef(null);
  const raysRef      = useRef(null);
  const finalRef     = useRef(null);
  const contentRef   = useRef(null);

  const particles = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size:  +(Math.random() * 3 + 1).toFixed(1),
      left:  +(Math.random() * 100).toFixed(2),
      top:   +(Math.random() * 100).toFixed(2),
      alpha: +(Math.random() * 0.3 + 0.08).toFixed(2),
      dur:   +(Math.random() * 9 + 6).toFixed(1),
      del:   +(Math.random() * 6).toFixed(1),
    })), []
  );

  const rays = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle:  (i / 12) * 360,
      width:  i % 3 === 0 ? 2 : 1,
      length: i % 3 === 0 ? 90 : 75,
    })), []
  );

  // ── GSAP 离场 timeline ──
  const runLeaveAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => onComplete(),
    });

    // 0. 内容淡出
    tl.to(contentRef.current, {
      opacity: 0,
      scale: 1.04,
      duration: 0.4,
      ease: "power2.in",
    }, 0);

    // 1. 光晕从中心柔和扩散
    tl.fromTo(haloRef.current,
      { scale: 0.3, opacity: 0, filter: "blur(30px)" },
      { scale: 1.8, opacity: 0.35, filter: "blur(18px)", duration: 1.0, ease: "power2.out" },
      0.05
    );
    tl.to(haloRef.current, {
      scale: 3, opacity: 0, filter: "blur(50px)", duration: 0.7, ease: "power1.in",
    }, 0.8);

    // 2. 射线 stagger 从中心伸出
    const rayEls = raysRef.current?.querySelectorAll(".ray");
    if (rayEls?.length) {
      tl.fromTo(rayEls,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1, opacity: 0.55,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.025,
        },
        0.1
      );
      tl.to(rayEls, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.in",
        stagger: 0.015,
      }, 0.75);
    }

    // 3. 中缝光线从中心向上下伸展
    tl.fromTo(seamRef.current,
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.5, ease: "power3.out", transformOrigin: "center center" },
      0.2
    );

    // 4. 窗帘同步撕开（配合缓动，比 CSS 更顺滑）
    tl.to(curtainLRef.current, {
      x: "-100%",
      duration: 1.1,
      ease: "power4.inOut",
    }, 0.25);
    tl.to(curtainRRef.current, {
      x: "100%",
      duration: 1.1,
      ease: "power4.inOut",
    }, 0.25);

    // 5. 中缝光随窗帘打开而消散
    tl.to(seamRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.in",
    }, 0.7);

    // 6. 全屏白光柔和淡入（进入 hero 前）
    tl.fromTo(finalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.55, ease: "power2.inOut" },
      1.0
    );
  };

  const doEnter = useRef(null);
  doEnter.current = () => {
    if (!ready || calledRef.current) return;
    calledRef.current = true;
    setLeaving(true);
  };

  // leaving 变为 true 后 DOM 渲染完毕再跑 GSAP
  useEffect(() => {
    if (!leaving) return;
    // rAF 确保离场层已挂载
    requestAnimationFrame(() => runLeaveAnimation());
  }, [leaving]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onClick = () => doEnter.current();
    const onKey   = (e) => { if (["Enter"," ","ArrowDown"].includes(e.key)) { e.preventDefault(); doEnter.current(); } };
    const onWheel = (e) => { if (Math.abs(e.deltaY) > 5) doEnter.current(); };
    window.addEventListener("click",   onClick);
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel",   onWheel, { passive: true });
    return () => {
      window.removeEventListener("click",   onClick);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel",   onWheel);
    };
  }, []);

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:50,
      background:"#08100D", overflow:"hidden",
      display:"flex", alignItems:"center", justifyContent:"center",
      cursor: ready ? "pointer" : "default",
    }}>

      {/* 背景粒子 */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
        {particles.map(p => (
          <div key={p.id} style={{
            position:"absolute", borderRadius:"50%",
            width:p.size, height:p.size,
            left:p.left+"%", top:p.top+"%",
            background:`rgba(201,168,76,${p.alpha})`,
            animation:`spFloat ${p.dur}s ease-in-out ${p.del}s infinite`,
          }}/>
        ))}
      </div>

      {/* 旋转光环 */}
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
        {[260,420,580,740].map((s,i) => (
          <div key={s} style={{
            position:"absolute", borderRadius:"50%", width:s, height:s,
            border:"1px solid rgba(201,168,76,0.07)",
            animation:`spRotate ${18+i*10}s linear infinite ${i%2?"reverse":""}`,
          }}/>
        ))}
      </div>

      {/* 中心径向光 */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.10) 0%, transparent 65%)" }}/>

      {/* 主文案 */}
      <div ref={contentRef} style={{
        position:"relative", zIndex:10, textAlign:"center", padding:"0 2rem",
      }}>
        <div style={{ marginBottom:"2rem" }}>
          <span style={{
            display:"inline-flex", alignItems:"center", gap:10,
            padding:".5rem 1.4rem", borderRadius:99,
            border:"1px solid rgba(201,168,76,.2)", background:"rgba(201,168,76,.05)",
          }}>
            <span style={{ fontSize:"1.3rem",color:"white" }}>🇲🇾</span>
            <span style={{ color:"#C9A84C", fontSize:".65rem", letterSpacing:".32em", fontWeight:600 }}>
              STUDY IN MALAYSIA
            </span>
          </span>
        </div>

        <h1 style={{
          fontFamily:"'Noto Serif SC',serif",
          fontSize:"clamp(3rem,9vw,6rem)",
          fontWeight:900, color:"#F5F0E8",
          lineHeight:1.1, letterSpacing:".04em", marginBottom:".8rem",
        }}>留学南洋</h1>

        <h2 style={{
          fontFamily:"'Noto Serif SC',serif",
          fontSize:"clamp(1.2rem,3.5vw,2.2rem)",
          fontWeight:700, color:"rgba(201,168,76,.85)",
          letterSpacing:".08em", marginBottom:"1.4rem", fontStyle:"italic",
        }}>开启命运改变之旅</h2>

        <p style={{ color:"#9A9587", fontSize:".85rem", letterSpacing:".12em", marginBottom:"2.5rem" }}>
          KUALA LUMPUR · PENANG · JOHOR BAHRU
        </p>

        <div style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(10px)",
          transition: "opacity .7s ease, transform .7s ease",
        }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem", marginBottom:"1.1rem" }}>
            <div style={{ width:48, height:1, background:"linear-gradient(to right,transparent,#C9A84C)" }}/>
            <span style={{ color:"rgba(201,168,76,.4)", fontSize:".6rem", letterSpacing:".3em" }}>ENTER</span>
            <div style={{ width:48, height:1, background:"linear-gradient(to left,transparent,#C9A84C)" }}/>
          </div>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:".8rem" }}>
            <div style={{ width:26, height:42, borderRadius:13,
              border:"2px solid rgba(201,168,76,.3)",
              display:"flex", justifyContent:"center", paddingTop:6 }}>
              <div style={{ width:4, height:9, borderRadius:2, background:"#C9A84C",
                animation:"spScroll 1.4s ease-in-out infinite" }}/>
            </div>
          </div>
          <p style={{ color:"#C9A84C", fontSize:"1.3rem", letterSpacing:".18em", fontWeight:500,
            animation:"spPulse 2s ease-in-out infinite" }}>点击 · 进入</p>
          <p style={{ color:"#444", fontSize:".7rem", letterSpacing:".1em", marginTop:".4rem" }}>
            或滑动滚轮 / 按任意键
          </p>
        </div>
      </div>

      {/* ══ 离场层（leaving 后挂载，全部由 GSAP 控制） ══ */}
      {leaving && <>

        {/* 柔和光晕 */}
        <div ref={haloRef} style={{
          position:"fixed", inset:0, zIndex:55, pointerEvents:"none",
          background:"radial-gradient(circle at 50% 50%, rgba(255,245,200,0.45) 0%, rgba(201,168,76,0.15) 35%, transparent 70%)",
          opacity:0,
        }}/>

        {/* 射线容器 */}
        <div ref={raysRef} style={{
          position:"fixed", inset:0, zIndex:56, pointerEvents:"none",
          display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
        }}>
          {rays.map(r => (
            <div key={r.id} className="ray" style={{
              position:"absolute",
              width: r.width+"px",
              height: r.length+"vmax",
              transformOrigin:"50% 100%",
              transform:`rotate(${r.angle}deg) scaleY(0)`,
              bottom:"50%",
              left:`calc(50% - ${r.width/2}px)`,
              background:"linear-gradient(to top, rgba(255,245,200,0.05) 0%, rgba(255,245,200,0.35) 35%, rgba(201,168,76,0.18) 65%, transparent 100%)",
              borderRadius:"50% 50% 0 0 / 30% 30% 0 0",
              opacity:0,
            }}/>
          ))}
        </div>

        {/* 中缝金线 */}
        <div ref={seamRef} style={{
          position:"fixed", top:0, bottom:0, left:"50%",
          width:1, marginLeft:"-0.5px", zIndex:61, pointerEvents:"none",
          background:"linear-gradient(to bottom, transparent, rgba(255,245,180,0.8) 20%, rgba(255,240,160,1) 50%, rgba(255,245,180,0.8) 80%, transparent)",
          transformOrigin:"center center",
          opacity:0,
          boxShadow:"0 0 8px rgba(255,240,160,0.5)",
        }}/>

        {/* 左窗帘 */}
        <div ref={curtainLRef} style={{
          position:"fixed", top:0, bottom:0, left:0, width:"50%", zIndex:60,
          background:"linear-gradient(to left, #122018 0%, #08100D 100%)",
        }}/>

        {/* 右窗帘 */}
        <div ref={curtainRRef} style={{
          position:"fixed", top:0, bottom:0, right:0, width:"50%", zIndex:60,
          background:"linear-gradient(to right, #122018 0%, #08100D 100%)",
        }}/>

        {/* 全屏白光 */}
        <div ref={finalRef} style={{
          position:"fixed", inset:0, zIndex:70, pointerEvents:"none",
          background:"#FAFAF5",
          opacity:0,
        }}/>

      </>}

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
      `}</style>
    </div>
  );
}