import { useState, useEffect } from "react";

export default function SplashSimple({ onComplete }) {
  const [typed, setTyped] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const fullText = "你的命运，即将改变";

  // 打字机效果
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(timer);
        // 1.5秒后自动进入
        setTimeout(() => {
          setIsAnimating(true);
          setTimeout(onComplete, 800);
        }, 1000);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#08100D]">
      {/* 背景粒子效果 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.15) 0%, transparent 60%)"
          }}
        />
      </div>

      {/* 内容 */}
      <div className={`relative z-10 text-center px-8 transition-all duration-700 ${isAnimating ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
        <div className="mb-8 text-gold text-xs tracking-[0.35em]">
          <span className="inline-block w-8 h-px bg-gold align-middle mx-2" />
          MALAYSIA STUDY
          <span className="inline-block w-8 h-px bg-gold align-middle mx-2" />
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl font-black text-[#F5F0E8]">
          {typed}
          <span className="inline-block w-0.5 h-12 ml-1 bg-gold animate-pulse" />
        </h1>
        
        <div className="mt-12 text-stone-500 text-xs tracking-widest animate-bounce">
          ↓ 点击进入 ↓
        </div>
      </div>

      {/* 撕裂动画 */}
      <div
        className={`fixed top-0 bottom-0 left-0 w-1/2 bg-[#08100D] transition-transform duration-800 ease-in-out z-20 ${
          isAnimating ? '-translate-x-full' : ''
        }`}
      />
      <div
        className={`fixed top-0 bottom-0 right-0 w-1/2 bg-[#08100D] transition-transform duration-800 ease-in-out z-20 ${
          isAnimating ? 'translate-x-full' : ''
        }`}
      />
    </div>
  );
}