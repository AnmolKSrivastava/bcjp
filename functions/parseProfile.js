const OpenAI = require("openai");
const { flattenForPrompt, resolveTaxonomyIds } = require("./taxonomy");

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
  const taxonomy = flattenForPrompt();

  const qaText = answers
    .map((item, index) => {
      const q = item?.question ?? `Question ${index + 1}`;
      const a = item?.answer ?? "";
      return `Q${index + 1}: ${q}\nA${index + 1}: ${a}`;
    })
    .join("\n\n");

  const system = `You extract structured job-seeker profile data for Bharat Gig, a specialized Indian hiring platform for exactly seven industries.
Return ONLY valid JSON with these keys:
{
  "fullName": string,
  "industryId": string,
  "departmentId": string,
  "roleId": string,
  "yearsOfExperience": one of ${JSON.stringify(EXPERIENCE_OPTIONS)},
  "preferredWorkLocation": string (city/area in India),
  "expectedSalary": string (include ₹ and /month when possible),
  "availability": one of ${JSON.stringify(AVAILABILITY_OPTIONS)},
  "skills": string (comma-separated skills),
  "languages": string[] (subset of ${JSON.stringify(LANGUAGE_OPTIONS)})
}

Supported taxonomy (use exact IDs only):
${JSON.stringify(taxonomy)}

Rules:
- Interview language may be English, Hindi, Bengali, Marathi, or Tamil. Understand answers and map to English enum / taxonomy IDs.
- industryId, departmentId, and roleId MUST form a valid path in the taxonomy above.
- Prefer the closest matching role; never invent IDs.
- If taxonomy is unclear, pick the best available construction / manufacturing / restaurant / hospital / elderly-care / retail / showroom path that fits.
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
  const resolved = resolveTaxonomyIds({
    industryId: parsed.industryId,
    departmentId: parsed.departmentId,
    roleId: parsed.roleId
  });

  // Fallback if model returns invalid path
  const fallback = resolveTaxonomyIds({
    industryId: "manufacturing",
    departmentId: "manufacturing-others",
    roleId: "manufacturing-others-helper"
  });

  const taxonomy = resolved || fallback;

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
    industryId: taxonomy.industry.id,
    departmentId: taxonomy.department.id,
    roleId: taxonomy.role.id,
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
  EXPERIENCE_OPTIONS,
  AVAILABILITY_OPTIONS,
  LANGUAGE_OPTIONS
};
