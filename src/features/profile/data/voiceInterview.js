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
    id: "industry",
    en: "Which industry do you want to work in? Say Construction, Manufacturing, Showroom, Retail, Hospital, Elderly Care, or Restaurant.",
    hi: "आप किस उद्योग में काम करना चाहते हैं? निर्माण, मैन्युफैक्चरिंग, शोरूम, रिटेल, अस्पताल, बुज़ुर्ग देखभाल, या रेस्तरां बोलें।",
    bn: "আপনি কোন শিল্পে কাজ করতে চান? কনস্ট্রাকশন, ম্যানুফ্যাকচারিং, শোরুম, রিটেইল, হাসপাতাল, বয়স্ক যত্ন, বা রেস্তোরাঁ বলুন।",
    mr: "तुम्ही कोणत्या उद्योगात काम करू इच्छिता? कन्स्ट्रक्शन, मॅन्युफॅक्चरिंग, शोरूम, रिटेल, हॉस्पिटल, वृद्ध देखभाल किंवा रेस्टॉरंट सांगा.",
    ta: "நீங்கள் எந்தத் துறையில் வேலை செய்ய விரும்புகிறீர்கள்? கட்டுமானம், உற்பத்தி, ஷோரூம், சில்லறை, மருத்துவமனை, முதியோர் பராமரிப்பு அல்லது உணவகம் என்று சொல்லுங்கள்."
  },
  {
    id: "department",
    en: "Within that industry, which department? For example Electrical, Kitchen, Nursing, Sales, or Warehouse.",
    hi: "उस उद्योग में कौन-सा विभाग? जैसे इलेक्ट्रिकल, किचन, नर्सिंग, सेल्स, या वेयरहाउस।",
    bn: "সেই শিল্পের মধ্যে কোন বিভাগ? যেমন ইলেকট্রিক্যাল, কিচেন, নার্সিং, সেলস, বা ওয়্যারহাউস।",
    mr: "त्या उद्योगात कोणता विभाग? जसे इलेक्ट्रिकल, किचन, नर्सिंग, सेल्स किंवा वेअरहाउस.",
    ta: "அந்தத் துறையில் எந்தப் பிரிவு? உதாரணம் மின்சாரம், சமையலறை, நர்சிங், விற்பனை அல்லது கிடங்கு."
  },
  {
    id: "role",
    en: "What job role do you want? For example Electrician, Chef, Caregiver, Cashier, or Machine Operator.",
    hi: "आप कौन-सी नौकरी की भूमिका चाहते हैं? जैसे इलेक्ट्रिशियन, शेफ, केयरगिवर, कैशियर, या मशीन ऑपरेटर।",
    bn: "আপনি কোন চাকরির ভূমিকা চান? যেমন ইলেকট্রিশিয়ান, শেফ, কেয়ারগিভার, ক্যাশিয়ার, বা মেশিন অপারেটর।",
    mr: "तुम्हाला कोणती जॉब रोल हवी आहे? जसे इलेक्ट्रिशियन, शेफ, केअरगिव्हर, कॅशियर किंवा मशीन ऑपरेटर.",
    ta: "நீங்கள் எந்த வேலைப் பதவியை விரும்புகிறீர்கள்? உதாரணம் எலக்ட்ரீஷியன், சமையல்காரர், பராமரிப்பாளர், காசாளர் அல்லது இயந்திர ஆபரேட்டர்."
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
