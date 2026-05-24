import { useState } from "react";
import Hero from "./components/Hero";
import WhyMalaysia from "./components/WhyMalaysia";
import Universities from "./components/Universities";
import CostOfLiving from "./components/CostOfLiving";
import Lifestyle from "./components/Lifestyle";
import FAQ from "./components/FAQ";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import SplashSimple from "./components/SplashSimple";
import useReveal from "./hooks/useReveal";

// ============================================================
// 1. 定义全局背景组件 (Fixed Background)
// ============================================================
const GlobalBackground = () => (
  // fixed: 固定在屏幕，不随滚动条移动
  // z-0: 层级最低，确保被上层内容遮挡或透出
  <div className="fixed inset-0 z-0 pointer-events-none">
    {/* 背景图片 labp1.jpg */}
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/labp1.jpg')" }}
    />
    
    {/* 全局暗色遮罩：让图片变暗，方便阅读文字 */}
    <div className="absolute inset-0 bg-black/60" />
    
    {/* 可选：金色光晕装饰 */}
    <div 
      className="absolute inset-0 opacity-20"
      style={{ background: "radial-gradient(circle at 50% 30%, rgba(201,168,76,0.2) 0%, transparent 60%)" }}
    />
  </div>
);

export default function App() {
  const [activeNav, setActiveNav] = useState("home");
  const [showSplash, setShowSplash] = useState(true);
  useReveal();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashSimple onComplete={handleSplashComplete} />;
  }

  return (
    // 外层容器：relative 用于定位上下文，bg-stone-900 作为备用底色
    <div className="font-sans text-stone-800 min-h-screen relative bg-stone-900">
      
      {/* 【关键】渲染全局背景，放在最前面，确保它在视觉最底层 */}
      <GlobalBackground />

      {/* 鼠标指针：z-50 确保在最顶层 */}
      <div className="relative z-50 pointer-events-none">
        <Cursor />
      </div>

      {/* Navbar：z-40 确保在背景之上 */}
      <div className="relative z-40">
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      </div>

      {/* 主内容区域：z-10 确保在背景之上 */}
      <main className="relative z-10">
        
        {/* 
          Hero 组件内部必须设置 z-50 和不透明背景，
          这样它会像一张纸一样盖住下面的 GlobalBackground 
        */}
        <section id="home">
          <Hero />
        </section>

        {/* 
          以下组件没有不透明背景，因此会透出下方的 GlobalBackground (labp1.jpg)
        */}
        <section id="why">
          <WhyMalaysia />
        </section>
        
        <section id="universities">
          <Universities />
        </section>
        
        <section id="cost">
          <CostOfLiving />
        </section>
        
        <section id="lifestyle">
          <Lifestyle />
        </section>
        
        <section id="faq">
          <FAQ />
        </section>
      </main>

      {/* Footer：同样透出背景 */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}