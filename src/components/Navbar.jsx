import { useState, useEffect } from "react";

const links = [
  { id: "why", label: "为什么选择" },
  { id: "universities", label: "顶尖大学" },
  { id: "cost", label: "费用生活" },
  { id: "lifestyle", label: "生活文化" },
  { id: "faq", label: "常见问题" },
];

export default function Navbar({ activeNav, setActiveNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      
      // 更新活跃导航项
      const sections = links.map(l => l.id);
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveNav(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [setActiveNav]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(8,16,13,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div
            className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-black"
            style={{ background: "var(--gold)", color: "#08100D" }}
          >
            MY
          </div>
          <span
            className="font-display font-bold text-lg tracking-wide"
            style={{ color: "var(--cream)" }}
          >
            留学马来西亚
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className="text-sm tracking-wide transition-colors duration-300 relative group"
                style={{ color: activeNav === link.id ? "var(--gold)" : "var(--muted)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ 
                    background: "var(--gold)",
                    width: activeNav === link.id ? "100%" : "0"
                  }}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className="hidden md:block btn-gold text-xs"
          style={{ padding: ".65rem 1.6rem" }}
        >
          <span>免费咨询</span>
        </button>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "var(--cream)" }}
        >
          <div className="w-6 space-y-1.5">
            <span
              className="block h-px transition-all duration-300"
              style={{
                background: "var(--gold)",
                transform: menuOpen ? "rotate(45deg) translateY(5px)" : "none",
              }}
            />
            <span
              className="block h-px transition-all duration-300"
              style={{
                background: "var(--gold)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px transition-all duration-300"
              style={{
                background: "var(--gold)",
                transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "none",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: menuOpen ? "400px" : "0",
          background: "rgba(8,16,13,0.97)",
          borderTop: menuOpen ? "1px solid rgba(201,168,76,0.1)" : "none",
        }}
      >
        <div className="px-8 py-6 space-y-4">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="block w-full text-left text-sm py-2"
              style={{ color: "var(--muted)", letterSpacing: ".05em" }}
            >
              {link.label}
            </button>
          ))}
          <button className="btn-gold w-full mt-4">
            <span>免费咨询</span>
          </button>
        </div>
      </div>
    </nav>
  );
}