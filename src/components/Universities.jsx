import { useState } from "react";

const universities = [
  {
    name: "马来亚大学",
    nameEn: "Universiti Malaya (UM)",
    rank: "QS #58",
    location: "吉隆坡",
    type: "国立",
    founded: "1949年",
    strengths: ["工程学", "医学", "法学", "商科"],
    tuition: "RM 15,000–35,000/年",
    desc: "马来西亚排名第一的综合性国立大学，亚洲顶尖学府之一，科研实力雄厚。",
    color: "from-blue-600 to-blue-800",
    emoji: "🔵",
  },
  {
    name: "马来西亚理工大学",
    nameEn: "Universiti Teknologi Malaysia (UTM)",
    rank: "QS #153",
    location: "柔佛/吉隆坡",
    type: "国立",
    founded: "1904年",
    strengths: ["工程学", "计算机科学", "建筑", "理工"],
    tuition: "RM 12,000–28,000/年",
    desc: "马来西亚顶尖理工大学，工程与技术领域在东南亚享有盛誉。",
    color: "from-red-600 to-red-800",
    emoji: "🔴",
  },
  {
    name: "马来西亚博特拉大学",
    nameEn: "Universiti Putra Malaysia (UPM)",
    rank: "QS #134",
    location: "雪兰莪",
    type: "国立",
    founded: "1931年",
    strengths: ["农业", "生物科学", "环境", "医学"],
    tuition: "RM 12,000–25,000/年",
    desc: "以农业与生物科学著称，近年来综合实力快速提升，跻身全球前150强。",
    color: "from-yellow-500 to-yellow-700",
    emoji: "🟡",
  },
  {
    name: "泰莱大学",
    nameEn: "Taylor's University",
    rank: "QS #253",
    location: "雪兰莪",
    type: "私立",
    founded: "1969年",
    strengths: ["酒店管理", "设计", "商科", "传媒"],
    tuition: "RM 35,000–70,000/年",
    desc: "马来西亚排名第一的私立大学，国际化程度极高，校园环境顶级。",
    color: "from-emerald-600 to-emerald-800",
    emoji: "🟢",
  },
  {
    name: "马来西亚理科大学",
    nameEn: "Universiti Sains Malaysia (USM)",
    rank: "QS #134",
    location: "槟城/吉兰丹",
    type: "国立",
    founded: "1969年",
    strengths: ["自然科学", "药学", "工程学", "管理学", "艺术"],
    tuition: "RM 10,000–24,000/年",
    desc: "位于槟城，以科学创新著称，排名保持稳定，是马来西亚北部最高学府。",
    color: "from-purple-600 to-purple-800",
    emoji: "🟣",
  },
  {
     name: "马来西亚国民大学",
    nameEn: "Universiti Kebangsaan Malaysia (UKM)",
    rank: "QS #126",
    location: "雪兰莪/吉隆坡",
    type: "国立",
    founded: "1970年",
    strengths: ["社会科学",  "商学", "医学", "语言学"],
    tuition: "RM 11,000–27,000/年",
    desc: "排名显著上升，进入全球前130强，是马来西亚国立大学中的佼佼者。",
    color: "from-orange-500 to-orange-700",
    emoji: "🟠",
  },
];

export default function Universities() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="py-24 px-6">
      {/* 透明玻璃框 */}
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-white/20 shadow-xl">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            名校推荐
          </span>
          <h2 className="text-4xl md:text-5xl font-black  text-white  mb-4">
            马来西亚<span className="text-blue-600">顶尖大学</span>
          </h2>
          <p className=" text-white  text-lg max-w-2xl mx-auto">
            从国立综合大学到国际私立院校，满足不同专业需求
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <div
              key={uni.name}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelected(selected?.name === uni.name ? null : uni)}
            >
              <div className={`bg-gradient-to-r ${uni.color} p-6 text-white`}>
                <div className="flex items-start justify-between mb-2">
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {uni.rank}
                  </span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                    {uni.type}
                  </span>
                </div>
                <h3 className="text-xl font-black mt-3 mb-1">{uni.name}</h3>
                <p className="text-white/75 text-xs">{uni.nameEn}</p>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
                  <span>📍 {uni.location}</span>
                  <span>🏛 {uni.founded}</span>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">{uni.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {uni.strengths.map((s) => (
                    <span key={s} className="bg-stone-100 text-stone-600 text-xs px-2.5 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="border-t border-stone-100 pt-3 flex items-center justify-between">
                  <span className="text-xs text-stone-400">参考学费</span>
                  <span className="text-sm font-bold text-emerald-600">{uni.tuition}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white text-sm mt-8">
          * 学费以马来西亚林吉特（RM）计算，具体费用因专业而异，请咨询相关院校，该QS排名为26年最新排名
        </p>
      </div>
    </div>
  );
}