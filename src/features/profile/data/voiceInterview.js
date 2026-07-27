import { getDepartments, getIndustries, getRoles, labelOf } from "@/features/taxonomy";

/** Interview languages for voice profile onboarding */
const INTERVIEW_LANGUAGES = [
  { code: "en", en: "English", hi: "अंग्रेज़ी", speech: "en-IN", tts: "en-IN" },
  { code: "hi", en: "Hindi", hi: "हिंदी", speech: "hi-IN", tts: "hi-IN" },
  { code: "bn", en: "Bengali", hi: "बंगाली", speech: "bn-IN", tts: "bn-IN" },
  { code: "mr", en: "Marathi", hi: "मराठी", speech: "mr-IN", tts: "mr-IN" },
  { code: "ta", en: "Tamil", hi: "तमिल", speech: "ta-IN", tts: "ta-IN" }
];

const LANGUAGE_PROMPT = {
  en: "Which language do you want for this interview? Say English, Hindi, Bengali, Marathi, or Tamil.",
  hi: "आप यह इंटरव्यू किस भाषा में देना चाहते हैं? अंग्रेज़ी, हिंदी, बंगाली, मराठी या तमिल बोलें।"
};

const STATIC_AFTER_TAXONOMY = [
  {
    id: "experience",
    en: "How many years of experience do you have?",
    hi: "आपके पास कितने साल का अनुभव है?",
    bn: "আপনার কত বছরের অভিজ্ঞতা আছে?",
    mr: "तुमचा किती वर्षांचा अनुभव आहे?",
    ta: "உங்களுக்கு எத்தனை ஆண்டுகள் அனுபவம் உள்ளது?"
  },
  {
    id: "location",
    en: "Which city or area do you want to work in?",
    hi: "आप किस शहर या इलाके में काम करना चाहते हैं?",
    bn: "আপনি কোন শহর বা এলাকায় কাজ করতে চান?",
    mr: "तुम्ही कोणत्या शहर किंवा परिसरात काम करू इच्छिता?",
    ta: "நீங்கள் எந்த நகரம் அல்லது பகுதியில் வேலை செய்ய விரும்புகிறீர்கள்?"
  },
  {
    id: "salary",
    en: "What monthly salary do you expect?",
    hi: "आप कितना मासिक वेतन चाहते हैं?",
    bn: "আপনি মাসে কত বেতন আশা করেন?",
    mr: "तुम्हाला महिन्याला किती पगार हवा आहे?",
    ta: "மாதச் சம்பளமாக என்ன எதிர்பார்க்கிறீர்கள்?"
  },
  {
    id: "availability",
    en: "When can you start work — immediately, within a week, or within a month?",
    hi: "आप कब काम शुरू कर सकते हैं — तुरंत, एक हफ्ते में, या एक महीने में?",
    bn: "আপনি কখন কাজ শুরু করতে পারেন — এখনই, এক সপ্তাহে, নাকি এক মাসে?",
    mr: "तुम्ही काम केव्हा सुरू करू शकता — लगेच, एका आठवड्यात, किंवा एका महिन्यात?",
    ta: "நீங்கள் எப்போது வேலையைத் தொடங்கலாம் — உடனே, ஒரு வாரத்தில், அல்லது ஒரு மாதத்தில்?"
  },
  {
    id: "skills",
    en: "What skills do you have related to this job role? You can list a few.",
    hi: "इस भूमिका से जुड़े आपके कौशल क्या हैं? कुछ बताइए।",
    bn: "এই ভূমিকার সাথে সম্পর্কিত আপনার কী কী দক্ষতা আছে? কয়েকটি বলুন।",
    mr: "या भूमिकेशी संबंधित तुमची कौशल्ये कोणती आहेत? काही सांगा.",
    ta: "இந்தப் பதவி தொடர்பான உங்கள் திறன்கள் என்ன? சிலவற்றைச் சொல்லுங்கள்."
  },
  {
    id: "languages",
    en: "Which languages do you speak?",
    hi: "आप कौन-कौन सी भाषाएँ बोलते हैं?",
    bn: "আপনি কোন কোন ভাষায় কথা বলেন?",
    mr: "तुम्ही कोणत्या भाषा बोलता?",
    ta: "நீங்கள் எந்தெந்த மொழிகளைப் பேசுகிறீர்கள்?"
  },
  {
    id: "extra",
    en: "Anything else employers should know about you? You can say skip.",
    hi: "नियोक्ताओं को आपके बारे में और कुछ पता होना चाहिए? नहीं तो 'स्किप' कहें।",
    bn: "নিয়োগকর্তাদের আর কিছু জানা উচিত? না হলে 'স্কিপ' বলুন।",
    mr: "नियोक्त्यांना तुमच्याबद्दल आणखी काही माहिती हवी आहे का? नाहीतर 'स्किप' म्हणा.",
    ta: "முதலாளிகள் உங்களைப் பற்றி மேலும் அறிய வேண்டியது உள்ளதா? இல்லையெனில் 'ஸ்கிப்' என்று சொல்லுங்கள்."
  }
];

const FULL_NAME_QUESTION = {
  id: "fullName",
  en: "What is your full name?",
  hi: "आपका पूरा नाम क्या है?",
  bn: "আপনার পুরো নাম কী?",
  mr: "तुमचे पूर्ण नाव काय आहे?",
  ta: "உங்கள் முழுப் பெயர் என்ன?"
};

/** Extra spoken aliases so voice matching is forgiving */
const INDUSTRY_ALIASES = {
  construction: ["construction", "construction workers", "civil", "building", "निर्माण", "कन्स्ट्रक्शन"],
  manufacturing: ["manufacturing", "factory", "production", "मैन्युफैक्चरिंग", "फैक्ट्री", "कारखाना"],
  showroom: ["showroom", "mall", "showrooms", "शोरूम", "मॉल"],
  retail: ["retail", "shop", "store", "रिटेल", "दुकान"],
  hospital: ["hospital", "hospital staff", "healthcare", "अस्पताल", "हॉस्पिटल"],
  "elderly-care": ["elderly care", "elderly", "caregiver", "senior care", "बुजुर्ग", "बुज़ुर्ग", "एल्डरली"],
  restaurant: ["restaurant", "hotel", "kitchen", "रेस्तरां", "होटल", "किचन"]
};

function normalizeSpeech(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/[।.!,?;:'"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function includesNeedle(haystack, needle) {
  const n = normalizeSpeech(needle);
  if (!n || !haystack) return false;
  if (haystack === n) return true;
  const re = new RegExp(`(?:^|\\s)${escapeRegExp(n)}(?:\\s|$)`, "i");
  if (re.test(haystack)) return true;
  if (/[^\u0000-\u007f]/.test(needle) && haystack.includes(n)) return true;
  return haystack.includes(n);
}

function listLabels(items, lang) {
  return items.map((item) => labelOf(item, lang === "hi" ? "hi" : "en")).join(", ");
}

function buildIndustryQuestion() {
  const industries = getIndustries();
  const enList = listLabels(industries, "en");
  const hiList = listLabels(industries, "hi");
  return {
    id: "industry",
    kind: "taxonomy",
    en: `Which industry do you want to work in? Say one of these: ${enList}.`,
    hi: `आप किस उद्योग में काम करना चाहते हैं? इनमें से एक बोलें: ${hiList}।`,
    bn: `আপনি কোন শিল্পে কাজ করতে চান? বলুন: ${enList}.`,
    mr: `तुम्ही कोणत्या उद्योगात काम करू इच्छिता? सांगा: ${enList}.`,
    ta: `நீங்கள் எந்தத் துறையில் வேலை செய்ய விரும்புகிறீர்கள்? சொல்லுங்கள்: ${enList}.`
  };
}

function buildDepartmentQuestion(industryId) {
  const departments = getDepartments(industryId);
  if (!departments.length) {
    return {
      id: "department",
      kind: "taxonomy",
      en: "Which department do you want?",
      hi: "आप कौन-सा विभाग चाहते हैं?",
      bn: "আপনি কোন বিভাগ চান?",
      mr: "तुम्हाला कोणता विभाग हवा आहे?",
      ta: "நீங்கள் எந்தப் பிரிவை விரும்புகிறீர்கள்?"
    };
  }
  const enList = listLabels(departments, "en");
  const hiList = listLabels(departments, "hi");
  const industry = getIndustries().find((i) => i.id === industryId);
  const industryNameEn = industry ? labelOf(industry, "en") : "this industry";
  const industryNameHi = industry ? labelOf(industry, "hi") : "इस उद्योग";
  return {
    id: "department",
    kind: "taxonomy",
    en: `For ${industryNameEn}, which department? Say one of these: ${enList}.`,
    hi: `${industryNameHi} के लिए कौन-सा विभाग? इनमें से एक बोलें: ${hiList}।`,
    bn: `${industryNameEn}-এর জন্য কোন বিভাগ? বলুন: ${enList}.`,
    mr: `${industryNameEn} साठी कोणता विभाग? सांगा: ${enList}.`,
    ta: `${industryNameEn}-க்கு எந்தப் பிரிவு? சொல்லுங்கள்: ${enList}.`
  };
}

function buildRoleQuestion(industryId, departmentId) {
  const roles = getRoles(industryId, departmentId);
  const departments = getDepartments(industryId);
  const department = departments.find((d) => d.id === departmentId);
  const deptEn = department ? labelOf(department, "en") : "this department";
  const deptHi = department ? labelOf(department, "hi") : "इस विभाग";
  if (!roles.length) {
    return {
      id: "role",
      kind: "taxonomy",
      en: "Which job role do you want?",
      hi: "आप कौन-सी नौकरी की भूमिका चाहते हैं?",
      bn: "আপনি কোন চাকরির ভূমিকা চান?",
      mr: "तुम्हाला कोणती जॉब रोल हवी आहे?",
      ta: "நீங்கள் எந்த வேலைப் பதவியை விரும்புகிறீர்கள்?"
    };
  }
  const enList = listLabels(roles, "en");
  const hiList = listLabels(roles, "hi");
  return {
    id: "role",
    kind: "taxonomy",
    en: `For ${deptEn}, which job role? Say one of these: ${enList}.`,
    hi: `${deptHi} के लिए कौन-सी भूमिका? इनमें से एक बोलें: ${hiList}।`,
    bn: `${deptEn}-এর জন্য কোন ভূমিকা? বলুন: ${enList}.`,
    mr: `${deptEn} साठी कोणती भूमिका? सांगा: ${enList}.`,
    ta: `${deptEn}-க்கு எந்தப் பதவி? சொல்லுங்கள்: ${enList}.`
  };
}

/**
 * Full interview question list. Department/role text depends on prior selections.
 */
function buildProfileQuestions({ industryId = null, departmentId = null } = {}) {
  return [
    FULL_NAME_QUESTION,
    buildIndustryQuestion(),
    buildDepartmentQuestion(industryId),
    buildRoleQuestion(industryId, departmentId),
    ...STATIC_AFTER_TAXONOMY
  ];
}

/** Default list length reference; prefer buildProfileQuestions at runtime */
const PROFILE_QUESTIONS = buildProfileQuestions();

function getInterviewLanguage(code) {
  return INTERVIEW_LANGUAGES.find((l) => l.code === code) ?? INTERVIEW_LANGUAGES[0];
}

function getQuestionText(question, interviewLang) {
  return question[interviewLang] || question.en;
}

function matchIndustryFromSpeech(transcript) {
  const t = normalizeSpeech(transcript);
  if (!t) return null;

  let best = null;
  let bestLen = 0;
  for (const industry of getIndustries()) {
    const aliases = [
      ...(INDUSTRY_ALIASES[industry.id] || []),
      industry.en,
      industry.hi,
      industry.id.replace(/-/g, " ")
    ];
    for (const alias of aliases) {
      if (includesNeedle(t, alias) && alias.length >= bestLen) {
        best = industry;
        bestLen = alias.length;
      }
    }
  }
  return best;
}

function matchDepartmentFromSpeech(transcript, industryId) {
  const t = normalizeSpeech(transcript);
  if (!t || !industryId) return null;
  const departments = getDepartments(industryId);
  let best = null;
  let bestLen = 0;
  for (const department of departments) {
    const aliases = [department.en, department.hi, department.id.split("-").slice(1).join(" ")];
    for (const alias of aliases) {
      if (includesNeedle(t, alias) && String(alias).length >= bestLen) {
        best = department;
        bestLen = String(alias).length;
      }
    }
  }
  return best;
}

function matchRoleFromSpeech(transcript, industryId, departmentId) {
  const t = normalizeSpeech(transcript);
  if (!t || !industryId || !departmentId) return null;
  const roles = getRoles(industryId, departmentId);
  let best = null;
  let bestLen = 0;
  for (const role of roles) {
    const aliases = [role.en, role.hi];
    for (const alias of aliases) {
      if (includesNeedle(t, alias) && String(alias).length >= bestLen) {
        best = role;
        bestLen = String(alias).length;
      }
    }
  }
  return best;
}

function getTaxonomyOptions(questionId, { industryId, departmentId }) {
  if (questionId === "industry") return getIndustries();
  if (questionId === "department") return getDepartments(industryId);
  if (questionId === "role") return getRoles(industryId, departmentId);
  return [];
}

export {
  INTERVIEW_LANGUAGES,
  LANGUAGE_PROMPT,
  PROFILE_QUESTIONS,
  buildProfileQuestions,
  getInterviewLanguage,
  getQuestionText,
  getTaxonomyOptions,
  matchDepartmentFromSpeech,
  matchIndustryFromSpeech,
  matchRoleFromSpeech
};
