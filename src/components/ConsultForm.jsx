import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ConsultForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wechat: '',
    school_pref: '',
    budget: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // 👇 核心代码：向 Supabase 的 leads 表插入数据
      const { error } = await supabase
        .from('leads')
        .insert([formData]);

      if (error) throw error;

      setMessage('✅ 提交成功！顾问将在24小时内联系您。');
      
      // 清空表单
      setFormData({ name: '', phone: '', wechat: '', school_pref: '', budget: '' });
      
      // 3秒后关闭弹窗
      setTimeout(() => {
        onClose();
        setMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ 提交失败，请检查网络或直接加微信联系。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">预约免费咨询</h2>
        <p className="text-gray-500 text-sm mb-6">填写下方信息，获取专属留学方案</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" required placeholder="姓名" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          
          <input type="tel" name="phone" required placeholder="电话号码" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          
          <input type="text" name="wechat" placeholder="微信号 (可选)" value={formData.wechat} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          
          <input type="text" name="school_pref" placeholder="意向学校/专业" value={formData.school_pref} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          
          <select name="budget" value={formData.budget} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
            <option value="">预估预算 (人民币/年)</option>
            <option value="5-8万">5 - 8 万</option>
            <option value="8-12万">8 - 12 万</option>
            <option value="12-15万">12 - 15 万</option>
            <option value="15万以上">15 万以上</option>
          </select>

          {message && <div className={`p-3 rounded-lg text-sm ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</div>}

          <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50">
            {loading ? '提交中...' : '立即提交'}
          </button>
        </form>
      </div>
    </div>
  );
}