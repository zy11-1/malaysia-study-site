const reasons = [
  {
    icon: "🎓",
    title: "世界认可的学历",
    desc: "马来西亚多所大学跻身QS世界排名前300，学历获全球130多个国家认可，回国后可直接就业或申请更高学历。",
    color: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100",
  },
  {
    icon: "💰",
    title: "极具竞争力的费用",
    desc: "学费和生活费仅为英美澳的30%~50%，一年总花费约人民币6~15万，性价比极高，减轻家庭负担。",
    color: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100",
  },
  {
    icon: "🌏",
    title: "华人友好环境",
    desc: "马来西亚华人占总人口约23%，全国各地华人社区成熟，普通话和粤语广泛通用，适应期极短。",
    color: "bg-rose-50 border-rose-200",
    iconBg: "bg-rose-100",
  },
  {
    icon: "✈️",
    title: "地理位置优越",
    desc: "位于东南亚心脏地带，飞往中国、日本、澳大利亚均在5小时以内，假期出行极为方便。",
    color: "bg-sky-50 border-sky-200",
    iconBg: "bg-sky-100",
  },
  {
    icon: "🍜",
    title: "饮食文化多元",
    desc: "融合马来、华人、印度三大饮食文化，口味丰富多样，中餐随处可见，完全不用担心饮食不适应。",
    color: "bg-violet-50 border-violet-200",
    iconBg: "bg-violet-100",
  },
  {
    icon: "🔒",
    title: "安全稳定环境",
    desc: "马来西亚社会稳定，政治相对和平，对留学生友好，签证政策宽松，获批率高达95%以上。",
    color: "bg-teal-50 border-teal-200",
    iconBg: "bg-teal-100",
  },
];

export default function WhyMalaysia() {
  return (
    <div className="py-24 px-6">
      {/* 透明玻璃框 - 背景透明，只有淡淡边框和模糊效果 */}
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-white/20 shadow-xl">
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            六大核心优势
          </span>
          <h2 className="text-4xl md:text-5xl font-black  text-white  mb-4">
            为什么选择<span className="text-emerald-600">马来西亚</span>？
          </h2>
          <p className=" text-white  text-lg max-w-2xl mx-auto">
            亚洲性价比最高的英语留学目的地，兼顾教育质量与生活品质
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className={`${r.color} border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
            >
              <div className={`${r.iconBg} w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {r.icon}
              </div>
              <h3 className="text-lg font-bold text-stone-800 mb-2">{r.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}