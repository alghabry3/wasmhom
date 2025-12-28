
import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';

interface LoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // محاكاة عملية التحقق من البيانات وربطها مستقبلاً بـ Odoo Auth
    setTimeout(() => {
      if (email === 'admin@wasmhome.com' && password === 'admin123') {
        sessionStorage.setItem('wasm_auth', 'true');
        onLoginSuccess();
      } else {
        setError('بيانات الدخول غير صحيحة. يرجى التأكد من البريد الإلكتروني وكلمة المرور.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden font-tajawal">
      {/* خلفية جمالية معمارية */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-10 grayscale" 
          alt="background" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-gray-200/50"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-8 md:p-12">
          <div className="text-center mb-10">
            <Logo className="h-12 mx-auto mb-6" />
            <h1 className="text-2xl font-black text-gray-900">بوابة الإدارة</h1>
            <p className="text-gray-400 text-sm mt-2">يرجى تسجيل الدخول للوصول إلى لوحة تحكم Odoo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm animate-shake">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border-0 rounded-2xl p-5 pr-12 focus:ring-2 focus:ring-black transition-all outline-none font-bold"
                  placeholder="name@wasmhome.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border-0 rounded-2xl p-5 pr-12 focus:ring-2 focus:ring-black transition-all outline-none font-bold"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-black" />
                <span className="text-xs text-gray-500 font-bold group-hover:text-black transition-colors">تذكرني</span>
              </label>
              <button type="button" className="text-xs font-bold text-gray-400 hover:text-black transition-colors underline">نسيت كلمة المرور؟</button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-black/20 hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:bg-gray-400"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  جاري التحقق...
                </>
              ) : (
                <>
                  دخول النظام
                  <ShieldCheck size={20} />
                </>
              )}
            </button>
          </form>

          <button 
            onClick={onBack}
            className="w-full mt-8 flex items-center justify-center gap-2 text-gray-400 font-bold text-sm hover:text-black transition-all"
          >
            <ArrowLeft size={16} className="rtl-flip" />
            العودة للموقع الرئيسي
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">
            Powered by Wasm Home Tech & Odoo 19
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
