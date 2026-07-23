const OpenAI = require("openai");

const OCCUPATIONS = [
  "Electrician",
  "Plumber",
  "Driver",
  "Delivery Executive",
  "Security Guard",
  "Factory Worker",
  "Welder",
  "Housekeeping",
  "Cook",
  "Other"
];

const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10+ years"
];

const AVAILABILITY_OPTIONS = ["Immediate", "Within 1 week", "Within 1 month"];

const LANGUAGE_OPTIONS = [
  "Hindi",
  "English",
  "Bengali",
  "Tamil",
  "Marathi",
  "Telugu",
  "Gujarati",
  "Punjabi"
];

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured on the server.");
  }
  return new OpenAI({ apiKey });
}

/**
 * Map interview Q&A into candidate profile form fields using OpenAI.
 * API key stays on the server — never expose it to the Vite client.
 */
async function parseVoiceProfileAnswers({ interviewLanguage, siteLanguage, answers }) {
  if (!Array.isArray(answers) || answers.length === 0) {
    throw new Error("Answers are required.");
  }

  const client = getOpenAIClient();
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const qaText = answers
    .map((item, index) => {
      const q = item?.question ?? `Question ${index + 1}`;
      const a = item?.answer ?? "";
      return `Q${index + 1}: ${q}\nA${index + 1}: ${a}`;
    })
    .join("\n\n");

  const system = `You extract structured job-seeker profile data for Bharat Gig, an Indian blue-collar job portal.
Return ONLY valid JSON with these keys:
{
  "fullName": string,
  "occupation": one of ${JSON.stringify(OCCUPATIONS)},
  "yearsOfExperience": one of ${JSON.stringify(EXPERIENCE_OPTIONS)},
  "preferredWorkLocation": string (city/area in India),
  "expectedSalary": string (include ₹ and /month when possible),
  "availability": one of ${JSON.stringify(AVAILABILITY_OPTIONS)},
  "skills": string (comma-separated skills),
  "languages": string[] (subset of ${JSON.stringify(LANGUAGE_OPTIONS)})
}

Rules:
- Interview language may be English, Hindi, Bengali, Marathi, or Tamil. Understand the answers and map to the English enum values above.
- If occupation is unclear, use "Other".
- If experience is unclear, pick the closest EXPERIENCE option.
- If availability is unclear, use "Immediate".
- Always include the interview language in "languages" when it maps to LANGUAGE_OPTIONS.
- Never invent a fake name; if missing use "".
- Do not include markdown or extra keys.`;

  const userPrompt = `Site UI language: ${siteLanguage || "en"}
Interview language: ${interviewLanguage || "en"}

Interview transcript:
${qaText}`;

  const completion = await client.chat.completions.create({
    model,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: userPrompt }
    ]
  });

  const raw = completion.choices?.[0]?.message?.content ?? "{}";
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Model returned invalid JSON.");
  }

  return normalizeProfile(parsed);
}

function normalizeProfile(parsed) {
  const occupation = OCCUPATIONS.includes(parsed.occupation) ? parsed.occupation : "Other";
  const yearsOfExperience = EXPERIENCE_OPTIONS.includes(parsed.yearsOfExperience)
    ? parsed.yearsOfExperience
    : "Less than 1 year";
  const availability = AVAILABILITY_OPTIONS.includes(parsed.availability)
    ? parsed.availability
    : "Immediate";

  const languages = Array.isArray(parsed.languages)
    ? [...new Set(parsed.languages.filter((l) => LANGUAGE_OPTIONS.includes(l)))]
    : [];

  return {
    fullName: String(parsed.fullName ?? "").trim(),
    occupation,
    yearsOfExperience,
    preferredWorkLocation: String(parsed.preferredWorkLocation ?? "").trim(),
    expectedSalary: String(parsed.expectedSalary ?? "").trim(),
    availability,
    skills: String(parsed.skills ?? "").trim(),
    languages
  };
}

module.exports = {
  parseVoiceProfileAnswers,
  OCCUPATIONS,
  EXPERIENCE_OPTIONS,
  AVAILABILITY_OPTIONS,
  LANGUAGE_OPTIONS
};
