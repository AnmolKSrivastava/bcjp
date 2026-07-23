/** Interview languages for voice profile onboarding */
const INTERVIEW_LANGUAGES = [
  { code: "en", en: "English", hi: "अंग्रेज़ी", speech: "en-IN", tts: "en-IN" },
  { code: "hi", en: "Hindi", hi: "हिंदी", speech: "hi-IN", tts: "hi-IN" },
  { code: "bn", en: "Bengali", hi: "बंगाली", speech: "bn-IN", tts: "bn-IN" },
  { code: "mr", en: "Marathi", hi: "मराठी", speech: "mr-IN", tts: "mr-IN" },
  { code: "ta", en: "Tamil", hi: "तमिल", speech: "ta-IN", tts: "ta-IN" }
];

/**
 * Profile questions asked after language selection.
 * Keys: en, hi, bn, mr, ta
 */
const PROFILE_QUESTIONS = [
  {
    id: "fullName",
    en: "What is your full name?",
    hi: "आपका पूरा नाम क्या है?",
    bn: "আপনার পুরো নাম কী?",
    mr: "तुमचे पूर्ण नाव काय आहे?",
    ta: "உங்கள் முழுப் பெயர் என்ன?"
  },
  {
    id: "occupation",
    en: "What work do you do? For example electrician, driver, plumber, cook.",
    hi: "आप क्या काम करते हैं? जैसे इलेक्ट्रिशियन, ड्राइवर, प्लंबर, रसोइया।",
    bn: "আপনি কী কাজ করেন? যেমন ইলেকট্রিশিয়ান, ড্রাইভার, প্লাম্বার, রাঁধুনি।",
    mr: "तुम्ही कोणते काम करता? जसे इलेक्ट्रिशियन, ड्रायव्हर, प्लंबर, स्वयंपाकी।",
    ta: "நீங்கள் என்ன வேலை செய்கிறீர்கள்? உதாரணம் எலக்ட்ரீஷியன், டிரைவர், பிளம்பர், சமையல்."
  },
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
    en: "What skills do you have? You can list a few.",
    hi: "आपके पास कौन-कौन से कौशल हैं? कुछ बताइए।",
    bn: "আপনার কী কী দক্ষতা আছে? কয়েকটি বলুন।",
    mr: "तुमच्याकडे कोणती कौशल्ये आहेत? काही सांगा.",
    ta: "உங்களிடம் என்ன திறன்கள் உள்ளன? சிலவற்றைச் சொல்லுங்கள்."
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

const LANGUAGE_PROMPT = {
  en: "Which language do you want for this interview? Say English, Hindi, Bengali, Marathi, or Tamil.",
  hi: "आप यह इंटरव्यू किस भाषा में देना चाहते हैं? अंग्रेज़ी, हिंदी, बंगाली, मराठी या तमिल बोलें।"
};

function getInterviewLanguage(code) {
  return INTERVIEW_LANGUAGES.find((l) => l.code === code) ?? INTERVIEW_LANGUAGES[0];
}

function getQuestionText(question, interviewLang) {
  return question[interviewLang] || question.en;
}

export {
  INTERVIEW_LANGUAGES,
  PROFILE_QUESTIONS,
  LANGUAGE_PROMPT,
  getInterviewLanguage,
  getQuestionText
};
