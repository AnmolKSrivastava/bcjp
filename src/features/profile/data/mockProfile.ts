export interface GeneratedProfile {
  id: string;
  name: string;
  role: string;
  experience: string;
  location: string;
  skills: string[];
  expectedSalary: string;
  phone: string;
  availability: string;
  languages: string[];
  matchingJobs: number;
}

export const mockVoiceTranscripts = {
  en: "My name is Rajesh Kumar. I am an electrician with 5 years of experience in Delhi NCR. I have worked on residential and commercial wiring, panel installation, and safety compliance. I am available to start immediately.",
  hi: "मेरा नाम राजेश कुमार है। मैं दिल्ली NCR में 5 साल के अनुभव वाला इलेक्ट्रिशियन हूँ। मैंने घरेलू और व्यावसायिक वायरिंग, पैनल इंस्टॉलेशन और सुरक्षा मानकों पर काम किया है। मैं तुरंत काम शुरू कर सकता हूँ।",
};

const profiles: Record<"hi" | "en", GeneratedProfile> = {
  en: {
    id: "KS-2026-0847",
    name: "Rajesh Kumar",
    role: "Electrician",
    experience: "5 years",
    location: "Delhi NCR",
    skills: ["House Wiring", "Commercial Wiring", "Panel Installation", "Safety Compliance"],
    expectedSalary: "₹18,000 – ₹25,000/month",
    phone: "+91 98765 43210",
    availability: "Immediate",
    languages: ["Hindi", "English"],
    matchingJobs: 234,
  },
  hi: {
    id: "KS-2026-0847",
    name: "राजेश कुमार",
    role: "इलेक्ट्रिशियन",
    experience: "5 साल",
    location: "दिल्ली NCR",
    skills: ["हाउस वायरिंग", "कमर्शियल वायरिंग", "पैनल इंस्टॉलेशन", "सुरक्षा मानक"],
    expectedSalary: "₹18,000 – ₹25,000/माह",
    phone: "+91 98765 43210",
    availability: "तुरंत",
    languages: ["हिंदी", "अंग्रेज़ी"],
    matchingJobs: 234,
  },
};

export function getMockProfile(lang: "hi" | "en"): GeneratedProfile {
  return profiles[lang];
}

export const MOCK_RECORDING_MS = 2500;
