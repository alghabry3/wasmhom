
import React from 'react';
import { FAQ_ITEMS, COMPANY_INFO } from '../constants';
import { HelpCircle, Shield, FileText } from 'lucide-react';

interface LegalPageProps {
  type: 'faq' | 'terms' | 'privacy';
}

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const titles = {
    faq: 'الأسئلة الشائعة',
    terms: 'الشروط والأحكام',
    privacy: 'سياسة الخصوصية'
  };

  return (
    <div className="animate-in fade-in duration-700 bg-white min-h-screen pb-24">
      <section className="bg-gray-50 py-24 border-b border-gray-100 mb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-black text-white p-4 rounded-2xl w-fit mx-auto mb-8">
            {type === 'faq' && <HelpCircle size={32} />}
            {type === 'privacy' && <Shield size={32} />}
            {type === 'terms' && <FileText size={32} />}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">{titles[type]}</h1>
          <p className="text-gray-500 text-lg">كل ما تحتاج معرفته عن سياساتنا وإجراءاتنا لضمان حقوقك.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        {type === 'faq' && (
          <div className="space-y-8">
            {FAQ_ITEMS.map((item) => (
              <div key={item.id} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <span className="text-xs font-black text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full mb-4 inline-block">{item.category}</span>
                <h3 className="text-xl font-black mb-4">{item.question}</h3>
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        )}

        {type === 'privacy' && (
          <div className="prose prose-lg text-gray-600 max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-black text-black">جمع المعلومات</h2>
              <p>نقوم في وسم هوم بجمع المعلومات اللازمة فقط لتقديم أفضل الخدمات العقارية لك، بما في ذلك الاسم، رقم الجوال، والمعلومات الائتمانية الأساسية اللازمة لدراسة طلبات التمويل.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black">أمن البيانات</h2>
              <p>نستخدم تقنيات تشفير متطورة لحماية بياناتك الشخصية والمالية. لا نقوم بمشاركة بياناتك مع أي طرف ثالث إلا بعد الحصول على موافقتك الصريحة أو لغرض إكمال طلب التمويل مع البنوك المعتمدة.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black">حقوق المستخدم</h2>
              <p>لك الحق في طلب الوصول إلى بياناتك أو تحديثها أو حذفها من سجلاتنا في أي وقت عبر التواصل مع خدمة العملاء.</p>
            </section>
          </div>
        )}

        {type === 'terms' && (
          <div className="prose prose-lg text-gray-600 max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-black text-black">قبول الشروط</h2>
              <p>باستخدامك لموقع وسم هوم، فإنك توافق على الالتزام بالشروط والأحكام الموضحة هنا. هذه الشروط تخضع للأنظمة والقوانين السارية في المملكة العربية السعودية.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black">الوساطة العقارية</h2>
              <p>تعمل وسم هوم كوسيط عقاري مرخص من الهيئة العامة للعقار (رخصة رقم: 1200008899). نلتزم بالشفافية الكاملة في عرض المعلومات وخطط الأسعار.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-black">التمويل والاستشارات</h2>
              <p>المعلومات المقدمة عبر حاسبة التمويل هي تقديرية فقط. العرض النهائي يعتمد على سياسات البنك الممول والملاءة المالية للعميل وقت تقديم الطلب.</p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalPage;
