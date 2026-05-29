import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

const universities = [
  {
    name: "马来亚大学", nameEn: "Universiti Malaya (UM)",
    rank: "QS #58", location: "吉隆坡", type: "国立", founded: "1949年",
    strengths: ["工程学", "医学", "法学", "商科"],
    tuition: "RM 15,000–35,000/年",
    desc: "马来西亚排名第一的综合性国立大学，亚洲顶尖学府之一，科研实力雄厚。",
    website: "https://www.um.edu.my",
    highlights: ["全国排名 #1", "建校76年", "5万+在校生", "130国认可"],
    gradStart: "#2563eb", gradEnd: "#1e40af", icon: "🏛",
  },
  {
    name: "马来西亚理工大学", nameEn: "Universiti Teknologi Malaysia (UTM)",
    rank: "QS #153", location: "柔佛/吉隆坡", type: "国立", founded: "1904年",
    strengths: ["工程学", "计算机科学", "建筑", "理工"],
    tuition: "RM 12,000–28,000/年",
    desc: "马来西亚顶尖理工大学，工程与技术领域在东南亚享有盛誉。",
    website: "https://www.utm.my",
    highlights: ["工程强校", "建校121年", "双校区", "东南亚顶尖"],
    gradStart: "#dc2626", gradEnd: "#991b1b", icon: "⚙️",
  },
  {
    name: "马来西亚博特拉大学", nameEn: "Universiti Putra Malaysia (UPM)",
    rank: "QS #134", location: "雪兰莪", type: "国立", founded: "1931年",
    strengths: ["农业", "生物科学", "环境", "医学"],
    tuition: "RM 12,000–25,000/年",
    desc: "以农业与生物科学著称，近年来综合实力快速提升，跻身全球前150强。",
    website: "https://www.upm.edu.my",
    highlights: ["前150强", "农业第一", "建校94年", "绿色校园"],
    gradStart: "#d97706", gradEnd: "#b45309", icon: "🌿",
  },
  {
    name: "泰莱大学", nameEn: "Taylor's University",
    rank: "QS #253", location: "雪兰莪", type: "私立", founded: "1969年",
    strengths: ["酒店管理", "设计", "商科", "传媒"],
    tuition: "RM 35,000–70,000/年",
    desc: "马来西亚排名第一的私立大学，国际化程度极高，校园环境顶级。",
    website: "https://university.taylors.edu.my",
    highlights: ["私立第一", "国际化高", "顶级环境", "双联课程"],
    gradStart: "#059669", gradEnd: "#065f46", icon: "🎓",
  },
  {
    name: "马来西亚理科大学", nameEn: "Universiti Sains Malaysia (USM)",
    rank: "QS #134", location: "槟城/吉兰丹", type: "国立", founded: "1969年",
    strengths: ["自然科学", "药学", "工程学", "管理学"],
    tuition: "RM 10,000–24,000/年",
    desc: "位于槟城，以科学创新著称，排名保持稳定，是马来西亚北部最高学府。",
    website: "https://www.usm.my",
    highlights: ["槟城名校", "科研强校", "药学顶尖", "UNESCO认可"],
    gradStart: "#7c3aed", gradEnd: "#5b21b6", icon: "🔬",
  },
  {
    name: "马来西亚国民大学", nameEn: "Universiti Kebangsaan Malaysia (UKM)",
    rank: "QS #126", location: "雪兰莪/吉隆坡", type: "国立", founded: "1970年",
    strengths: ["社会科学", "商学", "医学", "语言学"],
    tuition: "RM 11,000–27,000/年",
    desc: "排名显著上升，进入全球前130强，是马来西亚国立大学中的佼佼者。",
    website: "https://www.ukm.my",
    highlights: ["全国前3", "快速上升", "医学强校", "建校55年"],
    gradStart: "#f97316", gradEnd: "#c2410c", icon: "📚",
  },
];

/* ── 浮窗内容（通过 portal 挂载到 body） ── */
function HoverPreview({ uni, mousePos }) {
  const W = 300, OFFSET = 20;
  const vw = typeof window !== "undefined" ? window.innerWidth  : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  let left = mousePos.x + OFFSET;
  let top  = mousePos.y + OFFSET;
  if (left + W  > vw - 8) left = mousePos.x - W - OFFSET;
  if (top  + 340 > vh - 8) top  = mousePos.y - 340 - OFFSET;
  if (left < 8) left = 8;
  if (top  < 8) top  = 8;

  return createPortal(
    <div style={{
      position: "fixed", left, top, width: W, zIndex: 99999,
      borderRadius: 14, overflow: "hidden", pointerEvents: "none",
      boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.25)",
      background: "#0e1e16",
      animation: "pvIn .15s cubic-bezier(.2,.8,.3,1) forwards",
    }}>
      {/* 头部 */}
      <div style={{
        background: `linear-gradient(135deg, ${uni.gradStart}, ${uni.gradEnd})`,
        padding: "1rem 1.2rem",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
          <span style={{ fontSize:"1.6rem" }}>{uni.icon}</span>
          <div>
            <div style={{ color:"#fff", fontWeight:800, fontSize:".95rem" }}>{uni.name}</div>
            <div style={{ color:"rgba(255,255,255,.65)", fontSize:".68rem" }}>{uni.nameEn}</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          <span style={{ background:"rgba(255,255,255,.2)", color:"#fff",
            fontSize:".65rem", fontWeight:700, padding:"2px 8px", borderRadius:99 }}>{uni.rank}</span>
          <span style={{ background:"rgba(255,255,255,.15)", color:"#fff",
            fontSize:".65rem", padding:"2px 8px", borderRadius:99 }}>{uni.type}</span>
        </div>
      </div>

      {/* 亮点 2x2 */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:"rgba(201,168,76,0.08)" }}>
        {uni.highlights.map((h, i) => (
          <div key={i} style={{
            background:"#0e1e16", padding:".55rem .7rem",
            fontSize:".7rem", color:"#C9A84C", fontWeight:600,
            textAlign:"center", letterSpacing:".02em",
          }}>{h}</div>
        ))}
      </div>

      {/* 详情 */}
      <div style={{ padding:".85rem 1.1rem" }}>
        <p style={{ color:"#9A9587", fontSize:".76rem", lineHeight:1.6, marginBottom:".7rem" }}>
          {uni.desc}
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:".75rem" }}>
          {uni.strengths.map(s => (
            <span key={s} style={{
              background:"rgba(201,168,76,0.1)", color:"#C9A84C",
              border:"1px solid rgba(201,168,76,0.2)",
              fontSize:".63rem", padding:"2px 7px", borderRadius:99,
            }}>{s}</span>
          ))}
        </div>
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          borderTop:"1px solid rgba(201,168,76,0.1)", paddingTop:".65rem",
        }}>
          <span style={{ color:"#9A9587", fontSize:".68rem" }}>参考学费</span>
          <span style={{ color:"#4ade80", fontWeight:700, fontSize:".78rem" }}>{uni.tuition}</span>
        </div>
        <div style={{ marginTop:".6rem", textAlign:"center",
          color:"rgba(201,168,76,.4)", fontSize:".62rem", letterSpacing:".1em" }}>
          点击卡片 · 访问官网 →
        </div>
      </div>

      <style>{`
        @keyframes pvIn {
          from { opacity:0; transform:scale(.93) translateY(5px); }
          to   { opacity:1; transform:scale(1)   translateY(0); }
        }
      `}</style>
    </div>,
    document.body   // ✅ 挂到 body，完全脱离父级裁剪
  );
}

/* ── 单张卡片 ── */
function UniCard({ uni }) {
  const [hovered,  setHovered]  = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const timerRef = useRef(null);

  const onEnter = () => { clearTimeout(timerRef.current); setHovered(true); };
  const onLeave = () => { timerRef.current = setTimeout(() => setHovered(false), 80); };
  const onMove  = useCallback((e) => setMousePos({ x: e.clientX, y: e.clientY }), []);
  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <>
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseMove={onMove}
        onClick={() => window.open(uni.website, "_blank")}
        style={{
          background:"#fff", border:"1px solid #e7e5e4", borderRadius:16,
          overflow:"hidden", cursor:"pointer",
          transition:"transform .25s ease, box-shadow .25s ease",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px ${uni.gradStart}55`
            : "0 1px 4px rgba(0,0,0,0.07)",
        }}
      >
        {/* 头部 */}
        <div style={{
          background:`linear-gradient(135deg, ${uni.gradStart}, ${uni.gradEnd})`,
          padding:"1.4rem 1.5rem", color:"#fff",
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ background:"rgba(255,255,255,.2)", fontSize:".68rem",
              fontWeight:700, padding:"3px 10px", borderRadius:99 }}>{uni.rank}</span>
            <span style={{ background:"rgba(255,255,255,.15)", fontSize:".68rem",
              padding:"3px 10px", borderRadius:99 }}>{uni.type}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:10 }}>
            <span style={{ fontSize:"1.5rem" }}>{uni.icon}</span>
            <div>
              <h3 style={{ fontSize:"1.1rem", fontWeight:900, marginBottom:3 }}>{uni.name}</h3>
              <p style={{ fontSize:".7rem", opacity:.7 }}>{uni.nameEn}</p>
            </div>
          </div>
        </div>

        {/* 内容 */}
        <div style={{ padding:"1.1rem 1.25rem" }}>
          <div style={{ display:"flex", gap:14, fontSize:".8rem", color:"#78716c", marginBottom:9 }}>
            <span>📍 {uni.location}</span><span>🏛 {uni.founded}</span>
          </div>
          <p style={{ fontSize:".82rem", color:"#57534e", lineHeight:1.65, marginBottom:11 }}>{uni.desc}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:11 }}>
            {uni.strengths.map(s => (
              <span key={s} style={{ background:"#f5f5f4", color:"#57534e",
                fontSize:".68rem", padding:"3px 9px", borderRadius:99 }}>{s}</span>
            ))}
          </div>
          <div style={{ borderTop:"1px solid #f5f5f4", paddingTop:9,
            display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:".7rem", color:"#a8a29e" }}>参考学费</span>
            <span style={{ fontSize:".82rem", fontWeight:700, color:"#059669" }}>{uni.tuition}</span>
          </div>
          <div style={{
            marginTop:8, textAlign:"center", fontSize:".68rem",
            color: hovered ? "#a8a29e" : "transparent",
            transition:"color .2s", letterSpacing:".04em",
          }}>
            🖥 悬停查看详情 · 点击访问官网
          </div>
        </div>
      </div>

      {/* Portal 浮窗 */}
      {hovered && <HoverPreview uni={uni} mousePos={mousePos} />}
    </>
  );
}

export default function Universities() {
  return (
    <div className="py-24 px-6">
      <div style={{
        maxWidth:1200, margin:"0 auto", borderRadius:24, padding:"3rem 3.5rem",
        background:"rgba(255,255,255,0.04)", backdropFilter:"blur(14px)",
        border:"1px solid rgba(255,255,255,0.09)",
        boxShadow:"0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
          <span style={{
            display:"inline-block", background:"rgba(59,130,246,0.12)", color:"#60a5fa",
            fontSize:".68rem", fontWeight:600, letterSpacing:".25em",
            padding:".4rem 1.2rem", borderRadius:99,
            border:"1px solid rgba(59,130,246,0.2)", marginBottom:"1.1rem",
          }}>名校推荐</span>
          <h2 style={{
            fontFamily:"'Noto Serif SC',serif",
            fontSize:"clamp(2rem,5vw,3.2rem)",
            fontWeight:900, color:"#F5F0E8", marginBottom:"1rem",
          }}>
            马来西亚<span style={{ color:"#60a5fa" }}>顶尖大学</span>
          </h2>
          <p style={{ color:"#9A9587", fontSize:"1rem", maxWidth:480, margin:"0 auto" }}>
            悬停卡片查看详情，点击直接访问官网
          </p>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",
          gap:"1.25rem",
        }}>
          {universities.map(uni => <UniCard key={uni.name} uni={uni} />)}
        </div>

        <p style={{ textAlign:"center", color:"rgba(255,255,255,.3)",
          fontSize:".73rem", marginTop:"2rem" }}>
          * 学费以马来西亚林吉特（RM）计算，具体因专业而异 · QS排名为2026年最新数据
        </p>
      </div>
    </div>
  );
}