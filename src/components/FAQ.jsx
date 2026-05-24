import { useState } from 'react';
import ConsultForm from './ConsultForm';

const faqs = [
  {
    q: "马来西亚留学需要什么入学条件？",
    a: "本科申请一般需要高中毕业证及成绩单、英语成绩（IELTS 5.5~6.5或托福60~80分）、护照复印件及个人陈述。部分国立大学要求成绩更高，私立大学相对宽松，且不少大学提供预科课程。",
  },
  {
    q: "马来西亚学生签证好办吗？",
    a: "马来西亚学生签证（Student Pass）申请较为简便，获批率高达95%以上。通常在收到学校录取通知书后，由学校协助办理，整个流程约需4~8周，材料包括录取函、健康证明、财务证明等。",
  },
  {
    q: "马来西亚的英语教学水平如何？",
    a: "马来西亚是前英国殖民地，英语是官方语言之一，各大学课程大多以英语授课。英语水平普遍较高，日常生活中英语使用非常普遍，留学生语言适应期短。",
  },
  {
    q: "马来西亚学历回国后认可吗？",
    a: "马来西亚大学学历获中国教育部认可（需选择认可院校），回国后可在教育部学历认证中心办理认证。QS排名前列的马来亚大学、博特拉大学等学历认可度高，建议提前在教育部官网查询认可院校名单。",
  },
  {
    q: "马来西亚华人多吗？语言会有障碍吗？",
    a: "马来西亚华人约占总人口23%，全国各地华人社区成熟，普通话、粤语、闽南语广泛使用。在吉隆坡、槟城等城市，中文标识随处可见，中国留学生几乎不会遇到语言障碍。",
  },
  {
    q: "在马来西亚可以打工吗？",
    a: "持有效学生签证的留学生每周可合法打工不超过20小时。大学校园内有不少兼职机会，大型购物中心和餐饮业也欢迎留学生，时薪约RM8~15。暑期可全职工作，有助于积累工作经验和补贴生活费用。",
  },
  {
    q: "马来西亚的气候适合居住吗？",
    a: "马来西亚地处赤道附近，全年温暖，气温通常在25~35°C之间。分旱季（3~9月）和雨季（10~2月），雨季有时下阵雨，但不影响日常生活。无台风、地震等自然灾害，气候总体适宜。",
  },
  {
    q: "马来西亚安全吗？治安状况怎样？",
    a: "马来西亚整体治安良好，政治稳定，宗教与种族关系和谐。大城市夜间需注意个人财物安全，避免前往偏僻地区。校园内安全设施完善，华人聚居区治安较好，留学生总体反馈安全感较高。",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showWechatModal, setShowWechatModal] = useState(false);
  const [isConsultFormOpen, setIsConsultFormOpen] = useState(false);//控制咨询表单弹窗的状态

  return (
    <div className="py-24 px-6">
      {/* 透明玻璃框 */}
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-10 md:p-14 border border-white/20 shadow-xl">
        <div className="text-center mb-16">
          <span className="inline-block bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            常见问题
          </span>
          <h2 className="text-4xl md:text-5xl font-black  text-white  mb-4">
            你最关心的<span className="text-violet-600">问题</span>
          </h2>
          <p className=" text-white text-lg">我们整理了留学生最常见的疑问，帮你快速了解</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === i ? "border-violet-300 shadow-md" : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className={`font-semibold text-base ${openIndex === i ? "text-violet-700" : "text-stone-700"}`}>
                  {faq.q}
                </span>
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                    openIndex === i ? "bg-violet-100 text-violet-700 rotate-180" : "bg-stone-100 text-stone-500"
                  }`}
                >
                  ▼
                </span>
              </button>

              {openIndex === i && (
                <div className="px-6 pb-5">
                  <div className="border-t border-stone-100 pt-4 text-stone-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-10 text-white">
          <h3 className="text-2xl font-black mb-3">还有其他问题？</h3>
          <p className="text-white/80 mb-6 text-sm">我们的留学顾问团队随时为你解答，提供一对一免费咨询服务</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setIsConsultFormOpen(true)}
              className="bg-white text-emerald-700 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-md"
            >
              ✍️ 填写咨询表单
            </button>

            <button 
              onClick={() => setShowWechatModal(true)}
              className="bg-white text-emerald-700 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-md"
            >
              加入留学群
            </button>
          </div>
        </div>
      </div>
      
       <ConsultForm isOpen={isConsultFormOpen} onClose={() => setIsConsultFormOpen(false)} />

      {showWechatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">扫码加入留学交流群</h3>
              <button 
                onClick={() => setShowWechatModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <img 
              src="/images/wechat-qrcode.jpg" 
              alt="微信二维码" 
              className="w-full h-auto mb-4 rounded-lg border border-gray-200" 
            />
            <p className="text-gray-500 text-sm text-center mb-4">
              扫描二维码，添加小助手微信，拉你进专属留学交流群
            </p>
            <button 
              onClick={() => setShowWechatModal(false)}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
}