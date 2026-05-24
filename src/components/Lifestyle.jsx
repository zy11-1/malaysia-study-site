const cultures = [
  { name: "马来文化", icon: "🕌", color: "bg-green-500", desc: "伊斯兰文化底蕴深厚，传统节日丰富，待人热情友善" },
  { name: "华人文化", icon: "🏮", color: "bg-red-500", desc: "占人口约23%，华语社区成熟，春节等传统节日热闹非凡" },
  { name: "印度文化", icon: "🎪", color: "bg-orange-500", desc: "印度裔约占7%，塔米尔文化鲜明，屠妖节灯光璀璨" },
];

const foods = [
  { name: "椰浆饭", emoji: "🍚", desc: "国民早餐，椰香四溢" },
  { name: "肉骨茶", emoji: "🍲", desc: "华人特色，浓郁药香" },
  { name: "咖喱面", emoji: "🍜", desc: "南洋风味，香辣过瘾" },
  { name: "Roti Canai", emoji: "🫓", desc: "印度薄饼，外酥内软" },
  { name: "马来煎蕊", emoji: "🍧", desc: "甜品首选，清凉消暑" },
  { name: "沙爹串烧", emoji: "🍢", desc: "夜市必点，烟火气足" },
];

const activities = [
  { title: "城市探索", icon: "🏙️", items: ["双峰塔打卡", "中央市场购物", "茨厂街美食"] },
  { title: "自然体验", icon: "🌴", items: ["兰卡威海岛", "金马仑高原", "京那巴卢登山"] },
  { title: "购物娱乐", icon: "🛍️", items: ["巴生谷Mall群", "网红Pavilion", "夜市逛街"] },
  { title: "文化节日", icon: "🎊", items: ["开斋节", "华人新年", "屠妖节灯节"] },
];

export default function Lifestyle() {
  return (
    <div className="py-24 px-6">
      {/* 透明玻璃框 */}
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-white/20 shadow-xl">
        <div className="text-center mb-16">
          <span className="inline-block bg-rose-100 text-rose-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            生活文化
          </span>
          <h2 className="text-4xl md:text-5xl font-black  text-white  mb-4">
            多元文化的<span className="text-rose-500">热带乐园</span>
          </h2>
          <p className=" text-white  text-lg max-w-2xl mx-auto">
            三大民族文化在这片土地上和谐共存，造就独一无二的生活体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cultures.map((c) => (
            <div key={c.name} className="text-center p-8 rounded-3xl bg-stone-50 hover:shadow-md transition-shadow">
              <div className={`${c.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4`}>
                {c.icon}
              </div>
              <h3 className="text-lg font-bold text-stone-800 mb-2">{c.name}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-black  text-white  text-center mb-8">
            🍽️ 马来西亚美食天堂
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {foods.map((f) => (
              <div key={f.name} className="bg-gradient-to-b from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-4 text-center hover:shadow-md transition-all hover:-translate-y-1">
                <div className="text-4xl mb-2">{f.emoji}</div>
                <div className="font-bold text-stone-700 text-sm">{f.name}</div>
                <div className="text-xs text-stone-400 mt-1">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-black text-center mb-8">🎯 丰富的课余生活</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((a) => (
              <div key={a.title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                <div className="text-2xl mb-2">{a.icon}</div>
                <h4 className="font-bold text-white mb-3">{a.title}</h4>
                <ul className="space-y-1.5">
                  {a.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}