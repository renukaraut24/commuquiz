const axios = require('axios');

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const getFallbackQuestions = (topic, count) => {
  const questions = [
    { question: `What is the main concept behind ${topic}?`, options: ["Abstraction", "Encapsulation", "Inheritance", "Polymorphism"], correct: 0, difficulty: "easy" },
    { question: `Which best describes ${topic}?`, options: ["A framework", "A design pattern", "A library", "An architecture"], correct: 2, difficulty: "medium" },
    { question: `What is a key benefit of ${topic}?`, options: ["Better performance", "Code reusability", "Easy debugging", "All of the above"], correct: 3, difficulty: "easy" },
    { question: `When is ${topic} most useful?`, options: ["Small projects", "Large scale apps", "Solo development", "Prototyping"], correct: 1, difficulty: "medium" },
    { question: `Which tool works best with ${topic}?`, options: ["Webpack", "Babel", "ESLint", "All of the above"], correct: 3, difficulty: "medium" },
    { question: `What problem does ${topic} solve?`, options: ["Code duplication", "Memory leaks", "Security issues", "Slow performance"], correct: 0, difficulty: "hard" },
    { question: `Who uses ${topic} the most?`, options: ["Frontend devs", "Backend devs", "Full stack devs", "All developers"], correct: 3, difficulty: "easy" },
    { question: `What is a limitation of ${topic}?`, options: ["Steep learning curve", "Poor performance", "No community", "Limited use cases"], correct: 0, difficulty: "hard" },
    { question: `How does ${topic} improve workflow?`, options: ["Automates tasks", "Reduces errors", "Speeds up dev", "All of the above"], correct: 3, difficulty: "medium" },
    { question: `What is the future of ${topic}?`, options: ["Will be deprecated", "Will grow popular", "Will stay same", "Will be replaced"], correct: 1, difficulty: "easy" }
  ];
  return questions.slice(0, count);
};

const generateQuestions = async (topic, count = 10) => {
  try {
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: 'meta-llama/llama-3-8b-instruct',
        messages: [
          {
            role: 'user',
            content: `Generate exactly ${count} multiple choice questions about "${topic}".

Return ONLY a raw JSON array. No markdown. No backticks. No explanation. Just JSON.

[
  {
    "question": "Question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "difficulty": "easy"
  }
]

Rules:
- correct must be 0, 1, 2, or 3 (index of correct option)
- difficulty must be easy, medium, or hard
- Mix difficulties: 40% easy, 40% medium, 20% hard
- Return exactly ${count} questions about ${topic}
- Return ONLY the JSON array, nothing else`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'CommuQuiz'
        }
      }
    );

    const text = response.data.choices[0].message.content.trim();
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const questions = JSON.parse(cleaned);

    console.log(`✅ AI generated ${questions.length} questions for: ${topic}`);
    return { success: true, questions };

  } catch (err) {
    console.error('❌ OpenRouter Error:', err.message);
    console.log('⚠️ Using fallback questions for:', topic);
    return { success: true, questions: getFallbackQuestions(topic, count) };
  }
};

module.exports = { generateQuestions };
