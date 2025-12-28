
import React, { useState, useMemo } from 'react';
import { 
  Lock, Mail, ArrowLeft, Loader2, ShieldCheck, 
  AlertCircle, Key, Globe, ShieldAlert, Cpu, User, CheckCircle2
} from 'lucide-react';
import Logo from '../components/Logo';

interface LoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBack }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<1 | 2>(1); // 1: Credentials/Register, 2: 2FA Code
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordRequirements = useMemo(() => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      match: mode === 'register' ? (password === confirmPassword && confirmPassword !== '') : true
    };
  }, [password, confirmPassword, mode]);

  const isFormValid = useMemo(() => {
    if (mode === 'login') {
      return email !== '' && password !== '';
    }
    return (
      name !== '' &&
      email !== '' &&
      passwordRequirements.length &&
      passwordRequirements.uppercase &&
      passwordRequirements.number &&
      passwordRequirements.match
    );
  }, [mode, name, email, passwordRequirements]);

  const handleInitialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setError('');

    // Simulate authentication logic
    setTimeout(() => {
      if (mode === 'login') {
        if (email === 'admin@wasmhome.com' && password === 'admin123') {
          setStep(2);
          setIsLoading(false);
        } else {
          setError('بيانات الدخول غير صحيحة. يرجى التأكد من الصلاحيات.');
          setIsLoading(false);
        }
      } else {
        // Registration simulation
        setStep(2);
        setIsLoading(false);
      }
    }, 1200);
  };

  const handleOTPVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate security code (0000 for success)
    setTimeout(() => {
      if (otp.join('') === '0000') {
        sessionStorage.setItem('wasm_auth', 'true');
        onLoginSuccess();
      } else {
        setError('رمز الأمان غير صحيح. يرجى المحاولة مرة أخرى.');
        setIsLoading(false);
        setOtp(['', '', '', '']);
      }
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input
    if (value !== '' && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-tajawal overflow-hidden">
      
      {/* Right Side: Identity & Info */}
      <div className="hidden md:flex md:w-1/2 bg-gray-900 relative items-center justify-center p-20 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30 grayscale" 
            alt="Corporate Architecture" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black/80"></div>
        </div>

        <div className="relative z-10 max-w-lg">
          <Logo dark={false} className="h-20 mb-12" />
          <h2 className="text-4xl font-black mb-6 leading-tight uppercase tracking-tighter">
            نظام الإدارة المتكامل <br />
            <span className="text-yellow-400">Odoo V19 Premium</span>
          </h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed mb-12">
            مرحباً بك في بوابة التحكم المركزية لوسم هوم. هذا النظام مؤمن بأعلى معايير التشفير العالمية لضمان سرية البيانات العقارية وطلبات العملاء.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
              <ShieldCheck className="text-green-400 mb-4" size={24} />
              <h4 className="font-bold mb-1">اتصال مؤمن</h4>
              <p className="text-xs text-gray-500 font-light">تشفير AES-256 بت</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
              <Cpu className="text-blue-400 mb-4" size={24} />
              <h4 className="font-bold mb-1">الحالة السحابية</h4>
              <p className="text-xs text-gray-500 font-light">مزامنة Odoo نشطة</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 flex gap-6 text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
           <span>WASM HOME v3.4.0</span>
           <span>LEGAL COMPLIANCE 2024</span>
        </div>
      </div>

      {/* Left Side: Forms */}
      <div className="flex-grow flex flex-col justify-center p-8 md:p-24 bg-gray-50 relative">
        <div className="max-w-md mx-auto w-full">
          
          {/* Mobile Logo */}
          <div className="md:hidden mb-12 text-center">
             <Logo className="h-12 mx-auto" />
          </div>

          {step === 1 && (
            <div className="flex bg-gray-200/50 p-1 rounded-2xl mb-10 w-fit mx-auto md:mx-0">
              <button 
                onClick={() => { setMode('login'); setError(''); }}
                className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${mode === 'login' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                تسجيل الدخول
              </button>
              <button 
                onClick={() => { setMode('register'); setError(''); }}
                className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${mode === 'register' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                إنشاء حساب
              </button>
            </div>
          )}

          <div className="mb-10 animate-in slide-in-from-bottom duration-500">
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              {step === 2 ? 'تأكيد الهوية' : (mode === 'login' ? 'مرحباً بعودتك' : 'انضم لفريق وسم')}
            </h1>
            <p className="text-gray-500 font-light">
              {step === 2 
                ? 'أدخل الرمز المرسل لجهازك (استخدم 0000 للتجربة)' 
                : (mode === 'login' ? 'أدخل بيانات الاعتماد الخاصة بك للوصول للنظام' : 'قم بتعبئة البيانات لإنشاء حساب إداري جديد')}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm mb-8 animate-shake">
              <ShieldAlert size={18} />
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleInitialLogin} className="space-y-6 animate-in fade-in duration-500">
              {mode === 'register' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">الاسم الكامل</label>
                  <div className="relative">
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-gray-100 rounded-2xl p-5 pr-12 focus:ring-2 focus:ring-black transition-all outline-none font-bold text-gray-900 shadow-sm"
                      placeholder="أحمد محمد"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">البريد الإلكتروني الإداري</label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-gray-100 rounded-2xl p-5 pr-12 focus:ring-2 focus:ring-black transition-all outline-none font-bold text-gray-900 shadow-sm"
                    placeholder="admin@wasmhome.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-gray-100 rounded-2xl p-5 pr-12 focus:ring-2 focus:ring-black transition-all outline-none font-bold text-gray-900 shadow-sm"
                    placeholder="••••••••"
                  />
                </div>
                {mode === 'register' && (
                  <div className="grid grid-cols-2 gap-2 mt-3 px-2">
                    {[
                      { key: 'length', label: '8 محارف على الأقل' },
                      { key: 'uppercase', label: 'حرف كبير واحد' },
                      { key: 'number', label: 'رقم واحد على الأقل' },
                      { key: 'match', label: 'تطابق كلمتي المرور' }
                    ].map(req => (
                      <div key={req.key} className={`flex items-center gap-2 text-[10px] font-black transition-colors ${passwordRequirements[req.key as keyof typeof passwordRequirements] ? 'text-green-500' : 'text-gray-300'}`}>
                        <CheckCircle2 size={12} />
                        {req.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {mode === 'register' && (
                <div className="space-y-2 animate-in slide-in-from-top duration-300">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">تأكيد كلمة المرور</label>
                  <div className="relative">
                    <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input 
                      type="password" 
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full bg-white border rounded-2xl p-5 pr-12 focus:ring-2 focus:ring-black transition-all outline-none font-bold text-gray-900 shadow-sm ${confirmPassword !== '' && !passwordRequirements.match ? 'border-red-300' : 'border-gray-100'}`}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between px-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-black" />
                  <span className="text-xs text-gray-500 font-bold">حفظ الجلسة</span>
                </label>
                <button type="button" className="text-xs font-bold text-gray-400 hover:text-black transition-colors">دعم الوصول الفني</button>
              </div>

              <button 
                type="submit" 
                disabled={isLoading || !isFormValid}
                className="w-full bg-black text-white py-6 rounded-2xl font-black text-lg shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:bg-gray-100 disabled:text-gray-400 group"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
                    <ArrowLeft size={20} className="rtl-flip group-hover:translate-x-[-4px] transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOTPVerify} className="space-y-10 animate-in slide-in-from-left duration-500">
              <div className="flex justify-between gap-4" dir="ltr">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-1/4 bg-white border-2 border-gray-100 rounded-2xl p-6 text-center text-3xl font-black focus:border-black focus:ring-0 outline-none transition-all shadow-sm"
                  />
                ))}
              </div>

              <div className="space-y-4">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-black text-white py-6 rounded-2xl font-black text-lg shadow-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:bg-gray-400"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'تأكيد ودخول النظام'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="w-full text-gray-400 font-bold text-sm hover:text-black transition-all py-2"
                >
                  الرجوع لتغيير البيانات
                </button>
              </div>

              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
                 <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
                    <Key size={20} />
                 </div>
                 <p className="text-xs text-blue-800 leading-relaxed font-medium">
                    تم إرسال رمز الأمان المكون من 4 أرقام إلى رقم الجوال المرتبط ببريدك الإداري. الرمز صالح لمدة 5 دقائق.
                 </p>
              </div>
            </form>
          )}

          <div className="mt-20 flex flex-col items-center gap-6">
             <button 
                onClick={onBack}
                className="flex items-center gap-2 text-gray-400 font-bold text-sm hover:text-black transition-all"
              >
                <Globe size={16} />
                الرجوع لموقع الواجهة العامة
              </button>
              
              <div className="flex items-center gap-2 text-[10px] text-gray-300 font-black uppercase tracking-widest">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 نظام مؤمن من قبل Wasm Tech Security
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
