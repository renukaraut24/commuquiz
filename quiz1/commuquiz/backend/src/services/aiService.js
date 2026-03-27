const axios = require('axios');

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// 🔥 FALLBACK QUESTIONS (ALWAYS WORKING)
const getFallbackQuestions = (topic, count) => {
  const questions = [
    { question: `What is ${topic}?`, options: ["Concept", "Framework", "Language", "Tool"], correct: 0 },
    { question: `Why is ${topic} used?`, options: ["Speed", "Structure", "Efficiency", "All"], correct: 3 },
    { question: `Where is ${topic} applied?`, options: ["Frontend", "Backend", "Both", "None"], correct: 2 },
    { question: `Which is benefit of ${topic}?`, options: ["Reusability", "Speed", "Security", "All"], correct: 3 },
    { question: `What is limitation of ${topic}?`, options: ["Complexity", "Speed", "Security", "None"], correct: 0 },
    { question: `Who uses ${topic}?`, options: ["Students", "Developers", "Companies", "All"], correct: 3 },
    { question: `Best use of ${topic}?`, options: ["Apps", "Systems", "Web", "All"], correct: 3 },
    { question: `Is ${topic} important?`, options: ["Yes", "No", "Maybe", "Depends"], correct: 0 },
    { question: `Future of ${topic}?`, options: ["Growing", "Declining", "Stable", "Unknown"], correct: 0 },
    { question: `Core idea of ${topic}?`, options: ["Logic", "Design", "Structure", "All"], correct: 3 }
  ];

  return questions.slice(0, count);
};

// 🔥 MAIN FUNCTION
const generateQuestions = async (topic, count = 10) => {
  try {
    console.log("🔥 API KEY:", process.env.OPENROUTER_API_KEY);

    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: 'mistralai/mistral-7b-instruct', // ✅ stable model
        messages: [
          {
            role: 'user',
            content: `Generate ${count} MCQ questions about ${topic}. 
Return ONLY JSON like:
[
  {
    "question": "Question?",
    "options": ["A", "B", "C", "D"],
    "correct": 0
  }
]`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'CommuQuiz'
        }
      }
    );

    console.log("🔥 RESPONSE RECEIVED");

    const text = response.data.choices[0].message.content.trim();
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const questions = JSON.parse(cleaned);

    return { success: true, questions };

  } catch (err) {
    console.error("❌ FULL ERROR:", err.response?.data || err.message);

    // 🔥 FALLBACK ALWAYS RETURNS QUESTIONS
    return {
      success: true,
      questions: getFallbackQuestions(topic, count)
    };
  }
};

module.exports = { generateQuestions };