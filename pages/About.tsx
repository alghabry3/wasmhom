
import React from 'react';
import { Target, Lightbulb, Users, Award, ShieldCheck, Heart } from 'lucide-react';
import Logo from '../components/Logo';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Intro */}
      <section className="py-24 md:py-32 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Logo className="h-16 mx-auto mb-10" />
          <h1 className="text-4xl md:text-6xl font-black mb-10 leading-tight">نصنع مستقبلاً عقارياً <span className="text-gray-400">يليق بكم</span></h1>
          <p className="text-xl text-gray-600 leading-relaxed font-light">
            وسم هوم ليست مجرد شركة وساطة عقارية، بل هي رؤية وطنية تهدف إلى إعادة تعريف تجربة التملك العقاري في المملكة العربية السعودية من خلال الابتكار والصدق والاحترافية.
          </p>
        </div>
      </section>

      {/* Stats/Icons */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div>
            <div className="text-5xl font-black mb-4">+500</div>
            <p className="text-gray-400 uppercase tracking-widest text-sm">وحدة سكنية مباعة</p>
          </div>
          <div>
            <div className="text-5xl font-black mb-4">+15</div>
            <p className="text-gray-400 uppercase tracking-widest text-sm">مشروع تطويري رائد</p>
          </div>
          <div>
            <div className="text-5xl font-black mb-4">+10</div>
            <p className="text-gray-400 uppercase tracking-widest text-sm">سنوات من الخبرة</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-8">
            {[
              { icon: <Target className="text-black" />, title: "رؤيتنا", desc: "أن نكون الخيار الأول والآمن لكل باحث عن عقار في المملكة." },
              { icon: <Award className="text-black" />, title: "قيمنا", desc: "الشفافية، الجودة، الالتزام، والابتكار المستمر." },
              { icon: <ShieldCheck className="text-black" />, title: "مهمتنا", desc: "تبسيط رحلة الشراء العقاري من خلال حلول تقنية واستشارية." },
              { icon: <Heart className="text-black" />, title: "عملاؤنا", desc: "نضع مصلحة العميل فوق كل اعتبار." },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-3xl group hover:bg-black hover:text-white transition-all duration-500">
                <div className="bg-white p-4 rounded-2xl w-fit mb-6 group-hover:bg-white/10">{item.icon}</div>
                <h3 className="font-black text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 group-hover:text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="space-y-8">
             <h2 className="text-3xl md:text-5xl font-black leading-tight">قصة وسم هوم</h2>
             <p className="text-gray-600 text-lg font-light leading-relaxed">
               بدأت وسم هوم كفكرة طموحة في مدينة الخبر، تهدف إلى ردم الفجوة بين تطلعات المشتري وتعقيدات السوق العقاري. نحن نؤمن بأن كل سعودي يستحق أن يمتلك منزل أحلامه بسهولة ويسر.
             </p>
             <p className="text-gray-600 text-lg font-light leading-relaxed">
               على مدار السنوات، قمنا ببناء شبكة واسعة من الشركاء والمطورين الموثوقين لضمان تقديم أفضل المنتجات العقارية التي تلتزم بأعلى معايير الجودة والاستدامة.
             </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-16">فريق القيادة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "أحمد بن علي", role: "المدير التنفيذي", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
              { name: "سارة المنصور", role: "مديرة الاستثمار", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
              { name: "فهد القحطاني", role: "مستشار عقاري أول", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
            ].map((member, idx) => (
              <div key={idx} className="group">
                <div className="relative overflow-hidden rounded-[2rem] mb-6 grayscale hover:grayscale-0 transition-all duration-700">
                  <img src={member.img} alt={member.name} className="w-full h-80 object-cover group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-black">{member.name}</h3>
                <p className="text-gray-500 font-bold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
