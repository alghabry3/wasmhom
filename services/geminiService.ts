import { GoogleGenAI, Type } from "@google/genai";
import { Project, QuizState, AdvisorResult } from "../types";
import { MOCK_PROJECTS } from "../constants";

// Use process.env.API_KEY directly as per SDK requirements
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSmartRecommendations(state: QuizState): Promise<AdvisorResult> {
  const prompt = `
    أنا مستشار عقاري ذكي لشركة وسم هوم العقارية.
    العميل يبحث عن عقار بالمواصفات التالية:
    - الغرض: ${state.purpose}
    - المدينة: ${state.city}
    - الميزانية: ${state.budget}
    - يحتاج تمويل: ${state.financing ? 'نعم' : 'لا'}

    بناءً على قائمة المشاريع المتوفرة لدينا:
    ${JSON.stringify(MOCK_PROJECTS.map(p => ({ id: p.id, name: p.name, city: p.city, price: p.priceFrom, type: p.type })))}

    قم باختيار أفضل 3 مشاريع مناسبة للعميل واشرح "سبب الترشيح" بشكل مقنع ومهني باللهجة السعودية البيضاء أو الفصحى المبسطة.
    يجب أن يكون الرد بتنسيق JSON حصراً.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            selectedProjectIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "قائمة بمعرفات المشاريع المختارة"
            },
            reason: {
              type: Type.STRING,
              description: "سبب اختيار هذه المشاريع للعميل"
            }
          },
          required: ["selectedProjectIds", "reason"]
        }
      }
    });

    const data = JSON.parse(response.text);
    const selectedProjects = MOCK_PROJECTS.filter(p => data.selectedProjectIds.includes(p.id));

    return {
      projects: selectedProjects.length > 0 ? selectedProjects : MOCK_PROJECTS.slice(0, 3),
      reason: data.reason || "هذه المشاريع هي الأفضل بناءً على ميزانيتك وموقعك المفضل."
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      projects: MOCK_PROJECTS.slice(0, 3),
      reason: "بناءً على معطياتك، نوصي بهذه المشاريع الرائدة التي تحقق توازناً بين السعر والموقع."
    };
  }
}