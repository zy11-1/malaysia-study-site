import { useEffect, useRef, useState } from "react";

// --- 数据配置 ---
const stats = [
  { num: 20, suffix: "+", label: "顶尖院校" },
  { num: 50, suffix: "%", label: "低于欧美费用" },
  { num: 95, suffix: "%", label: "签证获批率" },
  { num: 130, suffix: "+", label: "学历认可国家" },
];

// --- 子组件 1: 数字动画 ---
function AnimatedNumber({ target, suffix }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        // 调整步长以控制动画速度
        const step = Math.ceil(target / 40);
        const id = setInterval(() => {
          start = Math.min(start + step, target);
          setVal(start);
          if (start >= target) clearInterval(id);
        }, 30);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// --- 子组件 2: B站视频弹窗 ---
function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // 【重要】在这里替换你的 B站视频 BV号
  
  const bvid = "BV1j9G76VEyq"; 
  
  // 构建 B站嵌入链接
  // high_quality=1: 尝试高清
  // danmaku=0: 关闭弹幕，保持界面干净
  const videoSrc = `//player.bilibili.com/player.html?isOutside=true&bvid=${bvid}&p=1&high_quality=1&danmaku=0`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-[rgba(201,168,76,0.3)]"
        onClick={(e) => e.stopPropagation()} // 防止点击视频区域关闭弹窗
      >
        {/* 关闭按钮 */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-[var(--gold)] transition-colors z-10 bg-black/50 rounded-full p-2"
          aria-label="Close Video"
        >
          ✕
        </button>
        
        {/* B站 Iframe */}
        <iframe
          src={videoSrc}
          scrolling="no"
          border="0"
          frameBorder="no"
          framespacing="0"
          allowFullScreen={true}
          className="w-full h-full"
          title="Bilibili Video Player"
        ></iframe>
      </div>
    </div>
  );
}

// --- 主组件: Hero ---
export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // 控制视频弹窗显示的状态
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  /* 1. Particle Canvas Effect */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // 初始化尺寸
    resize();
    window.addEventListener("resize", resize);

    // 初始化粒子
    const pts = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.5 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.a})`;
        ctx.fill();
        
        // 移动粒子
        p.x += p.vx; 
        p.y += p.vy;
        
        // 边界反弹
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    
    draw();
    
    // 清理函数
    return () => { 
      cancelAnimationFrame(raf); 
      window.removeEventListener("resize", resize); 
    };
  }, []);

  /* 2. Parallax Scroll Effect */
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const y = window.scrollY * 0.35;
      el.style.transform = `translateY(${y}px)`;
    };
    
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#08100D" }}
    >
      {/* --- 背景层 (视差效果) --- */}
      <div ref={containerRef} className="absolute inset-0 will-change-transform">
        {/* 深绿色径向渐变 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 60% 40%, rgba(13,59,46,0.7) 0%, rgba(8,16,13,0) 65%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(201,168,76,0.06) 0%, transparent 60%)",
          }}
        />
        {/* 金色网格线 */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* --- 粒子画布 --- */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* --- 主要内容层 --- */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-32 pb-24">
        <div className="max-w-3xl">
          
          {/* 顶部小标题 (Eyebrow) */}
          <div
            className="eyebrow flex items-center gap-3 mb-8 reveal visible"
            style={{ transitionDelay: ".1s" }}
          >
            <span className="w-8 h-px" style={{ background: "var(--gold)" }} />
            <span className="text-sm tracking-widest uppercase text-[var(--muted)]">
              MALAYSIA STUDY ABROAD GUIDE 2025
            </span>
          </div>

          {/* 主标题 (Headline) */}
          <h1
            className="font-display font-black leading-none mb-8 reveal visible"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              color: "var(--cream)",
              transitionDelay: ".2s",
            }}
          >
            探索马来西亚
            <br />
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>无限可能</span>
          </h1>

          {/* 副标题 (Sub) */}
          <p
            className="text-base md:text-lg leading-relaxed mb-12 reveal visible"
            style={{ color: "var(--muted)", maxWidth: "520px", transitionDelay: ".3s" }}
          >
            世界一流教育 · 低廉生活成本 · 多元文化融合
            <br />
            在热带天堂开启你的国际留学之旅
          </p>

          {/* 按钮组 (CTAs) */}
          <div
            className="flex flex-wrap gap-4 mb-20 reveal visible"
            style={{ transitionDelay: ".4s" }}
          >
            {/* 主要按钮：滚动到下方 */}
            <button
              className="btn-gold cursor-none px-8 py-3 bg-[var(--gold)] text-black font-bold rounded hover:bg-white transition-colors duration-300"
              onClick={() => document.getElementById("why")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span>立即探索 →</span>
            </button>
            
            {/* 次要按钮：打开视频 */}
            <button
              className="text-sm tracking-widest uppercase cursor-none flex items-center gap-3 transition-colors duration-300 hover:text-[var(--gold)]"
              style={{ color: "var(--muted)" }}
              onClick={() => setIsVideoOpen(true)} 
            >
              <span
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-300"
                style={{ borderColor: "rgba(201,168,76,0.3)" }}
              >
                ▶
              </span>
              观看介绍
            </button>
          </div>

          {/* 统计数据 (Stats) */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 reveal visible"
            style={{ transitionDelay: ".5s" }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  className="font-display font-black text-4xl md:text-5xl mb-1"
                  style={{ color: "var(--gold)" }}
                >
                  <AnimatedNumber target={s.num} suffix={s.suffix} />
                </div>
                <div className="text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 底部渐变遮罩 --- */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0A0A0A)",
        }}
      />

      {/* --- 滚动提示图标 --- */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--muted)" }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontSize: ".6rem" }}>
          Scroll
        </span>
        <div
          className="w-px h-12"
          style={{
            background: "linear-gradient(to bottom, var(--gold), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
            50% { opacity: 1; transform: scaleY(1); }
          }
        `}</style>
      </div>

      {/* --- 视频模态框 (放在 section 内部最底层) --- */}
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
      />
    </section>
  );
}