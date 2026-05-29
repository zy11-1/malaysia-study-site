const cities = [
  { name: "吉隆坡", flag: "🏙️", level: "中等", color: "text-amber-600 bg-amber-50" },
  { name: "槟城", flag: "🌊", level: "较低", color: "text-emerald-600 bg-emerald-50" },
  { name: "柔佛新山", flag: "🌆", level: "最低", color: "text-green-600 bg-green-50" },
];

const expenses = [
  { category: "住宿", icon: "🏠", kl: "RM 600–1,500", pg: "RM 500–1,200", jb: "RM 400–900", tip: "学生宿舍最实惠，合租可大幅降低成本" },
  { category: "餐饮", icon: "🍽️", kl: "RM 400–700", pg: "RM 350–600", jb: "RM 300–500", tip: "路边摊一餐约RM5~10，非常经济实惠" },
  { category: "交通", icon: "🚌", kl: "RM 150–300", pg: "RM 100–200", jb: "RM 100–200", tip: "吉隆坡地铁网络发达，公共交通方便" },
  { category: "通讯", icon: "📱", kl: "RM 50–80", pg: "RM 50–80", jb: "RM 50–80", tip: "本地电话卡便宜，流量套餐约RM50/月" },
  { category: "娱乐购物", icon: "🛍️", kl: "RM 200–500", pg: "RM 150–400", jb: "RM 150–300", tip: "购物中心遍布全国，娱乐选择丰富" },
];

const comparison = [
  { country: "英国", flag: "🇬🇧", annual: "¥30–50万", color: "bg-red-100 text-red-700" },
  { country: "美国", flag: "🇺🇸", annual: "¥35–60万", color: "bg-red-100 text-red-700" },
  { country: "澳大利亚", flag: "🇦🇺", annual: "¥25–45万", color: "bg-orange-100 text-orange-700" },
  { country: "新加坡", flag: "🇸🇬", annual: "¥25–40万", color: "bg-orange-100 text-orange-700" },
  { country: "马来西亚", flag: "🇲🇾", annual: "¥6–15万", color: "bg-emerald-100 text-emerald-700", highlight: true },
];

export default function CostOfLiving() {
  return (
    <div className="py-24 px-6">
      {/* 透明玻璃框 */}
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-white/20 shadow-xl">
        <div className="text-center mb-16">
          <span className="inline-block bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            费用参考
          </span>
          <h2 className="text-4xl md:text-5xl font-black  text-white  mb-4">
            <span className="text-amber-500">低成本</span>，高回报
          </h2>
          <p className=" text-white  text-lg max-w-2xl mx-auto">
            同等教育质量，留学费用仅为西方国家的三分之一
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 mb-12">
          <h3 className="text-lg font-bold text-stone-800 mb-6 text-center">各国留学年均总费用对比（学费+生活费）</h3>
          <div className="space-y-3">
            {comparison.map((c) => (
              <div
                key={c.country}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  c.highlight ? "bg-emerald-50 border-2 border-emerald-400 ring-2 ring-emerald-100" : "bg-stone-50"
                }`}
              >
                <span className="text-2xl w-8">{c.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${c.highlight ? "text-emerald-700 text-base" : "text-stone-700"}`}>
                      {c.country}
                    </span>
                    {c.highlight && (
                      <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">最优选择</span>
                    )}
                  </div>
                  <div className="mt-2 bg-stone-200 rounded-full h-2 w-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${c.highlight ? "bg-emerald-500" : "bg-stone-400"}`}
                      style={{
                        width: c.country === "马来西亚" ? "20%" :
                               c.country === "澳大利亚" || c.country === "新加坡" ? "75%" : "95%"
                      }}
                    />
                  </div>
                </div>
                <span className={`text-sm font-bold px-3 py-1.5 rounded-xl ${c.color} whitespace-nowrap`}>
                  {c.annual}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
          <h3 className="text-lg font-bold text-stone-800 mb-2">主要城市月均生活费参考</h3>
          <p className="text-sm text-stone-400 mb-6">以马来西亚林吉特（RM）计，1 RM ≈ 1.7 人民币</p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {cities.map((c) => (
              <div key={c.name} className={`${c.color} rounded-xl p-3 text-center`}>
                <div className="text-xl mb-1">{c.flag}</div>
                <div className="font-bold text-sm">{c.name}</div>
                <div className="text-xs mt-0.5 opacity-75">消费{c.level}</div>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-stone-100">
                  <th className="text-left pb-3 text-stone-400 font-medium">项目</th>
                  <th className="text-center pb-3 text-amber-600 font-bold">吉隆坡</th>
                  <th className="text-center pb-3 text-emerald-600 font-bold">槟城</th>
                  <th className="text-center pb-3 text-green-600 font-bold">新山</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((e, i) => (
                  <tr key={e.category} className={`border-b border-stone-50 ${i % 2 === 0 ? "bg-stone-50/50" : ""}`}>
                    <td className="py-3 flex items-center gap-2">
                      <span>{e.icon}</span>
                      <div>
                        <div className="font-medium text-stone-700">{e.category}</div>
                        <div className="text-xs text-stone-400">{e.tip}</div>
                      </div>
                    </td>
                    <td className="py-3 text-center text-stone-600 font-medium">{e.kl}</td>
                    <td className="py-3 text-center text-stone-600 font-medium">{e.pg}</td>
                    <td className="py-3 text-center text-stone-600 font-medium">{e.jb}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-stone-200 font-bold">
                  <td className="pt-3 text-stone-700">月均总计</td>
                  <td className="pt-3 text-center text-amber-600">RM 1,400–3,080</td>
                  <td className="pt-3 text-center text-emerald-600">RM 1,150–2,480</td>
                  <td className="pt-3 text-center text-green-600">RM 1,000–1,980</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}