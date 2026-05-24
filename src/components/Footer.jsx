export default function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-sm text-white py-8 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; 2026 Study Malaysia Guide. All rights reserved.</p>
        <p className="mt-2 text-white">Made with ❤️ for future international students</p>
        
        {/* 作者署名 */}
        <p className="mt-3 text-white text-sm">
          设计与开发 by <span className="text-amber-500 font-bold text-xl tracking-wide">zhao zhengyi 赵政壹</span>
        </p>
        
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="text-white hover:text-stone-600 transition">Facebook</a>
          <a href="#" className="text-white hover:text-stone-600 transition">Instagram</a>
          <a href="#" className="text-white hover:text-stone-600 transition">WeChat</a>
        </div>
      </div>
    </footer>
  );
}