const axios = require('axios');

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const getFallbackQuestions = (topic, count, quizType = 'mcq') => {
  if (quizType === 'truefalse') {
    const questions = [
      { question: `Is ${topic} typically used in frontend development?`, options: ["True", "False"], correct: 0, difficulty: "easy", type: "truefalse" },
      { question: `${topic} is a library, not a framework.`, options: ["True", "False"], correct: 1, difficulty: "medium", type: "truefalse" },
      { question: `True or false: ${topic} always requires a backend server.`, options: ["True", "False"], correct: 1, difficulty: "hard", type: "truefalse" }
    ];
    return questions.slice(0, count);
  }

  if (quizType === 'msq') {
    const questions = [
      { question: `Which of the following are core features of ${topic}?`, options: ["Feature A", "Feature B", "Feature C", "Feature D"], correctAnswers: [0, 2], difficulty: "medium", type: "msq" },
      { question: `Select all valid sentences about ${topic}.`, options: ["Option A", "Option B", "Option C", "Option D"], correctAnswers: [1, 3], difficulty: "hard", type: "msq" },
      { question: `Which need ${topic} for extension?`, options: ["Ext A", "Ext B", "Ext C", "Ext D"], correctAnswers: [0, 1], difficulty: "easy", type: "msq" }
    ];
    return questions.slice(0, count);
  }

  if (quizType === 'short') {
    const questions = [
      { question: `Define ${topic} in one sentence.`, answer: `A concise definition of ${topic}.`, difficulty: "easy", type: "short" },
      { question: `Explain one key benefit of ${topic}.`, answer: `It improves efficiency by...`, difficulty: "medium", type: "short" },
      { question: `List a critical drawback of ${topic}.`, answer: `Potential complexity and maintenance issues.`, difficulty: "hard", type: "short" }
    ];
    return questions.slice(0, count);
  }

  const questions = [
    { question: `What is the main concept behind ${topic}?`, options: ["Abstraction", "Encapsulation", "Inheritance", "Polymorphism"], correct: 0, difficulty: "easy", type: "mcq" },
    { question: `Which best describes ${topic}?`, options: ["A framework", "A design pattern", "A library", "An architecture"], correct: 2, difficulty: "medium", type: "mcq" },
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

const buildPromptByDifficultyAndType = (topic, count, difficulty, quizType) => {
  const difficultyMap = {
    easy: {
      level: 'Beginner',
      description: '⭐ BEGINNER (Level 1) - Foundation Knowledge',
      guidelines: `Generate professional beginner-level questions about "${topic}". These should test foundational understanding.
Questions should:
- Test understanding of core terminology and concepts
- Verify knowledge of basic definitions and fundamentals
- Check awareness of primary use cases
- Be suitable for someone new to the topic
- Have clear, unambiguous correct answers
- Include one obviously wrong option, two plausible distractors`
    },
    medium: {
      level: 'Intermediate',
      description: '⭐⭐ INTERMEDIATE (Level 2) - Practical Knowledge',
      guidelines: `Generate professional intermediate-level questions about "${topic}". These should test practical understanding and application.
Questions should:
- Require combining multiple concepts from ${topic}
- Test real-world application scenarios
- Check understanding of trade-offs and best practices
- Involve decision-making between similar options
- Be suitable for someone with 1-2 years experience
- Have nuanced, defensible correct answers`
    },
    hard: {
      level: 'Advanced',
      description: '⭐⭐⭐ ADVANCED (Level 3) - Expert Knowledge',
      guidelines: `Generate professional advanced-level questions about "${topic}". These should test deep expertise and critical thinking.
Questions should:
- Require expert-level understanding of ${topic}
- Involve edge cases, performance considerations, or architectural decisions
- Test understanding of 'why' not just 'what'
- Consider industry best practices and standards
- Be suitable for senior developers or architects
- Have technically precise, debatable correct answers`
    }
  };

  const level = difficultyMap[difficulty] || difficultyMap.medium;

  return `You are generating professional quiz questions for Commudle, a leading community learning platform.

${level.description}

Generate exactly ${count} high-quality multiple choice questions about "${topic}".

${level.guidelines}

IMPORTANT:
- Questions should be professional and industry-standard quality
- Each question should have exactly 4 options
- Exactly ONE option must be clearly correct
- The other three options should be plausible but distinctly wrong
- No ambiguity in the correct answer
- Questions should be specific to ${topic}, not generic
- Avoid trick questions or questions that test grammar/wording

Return ONLY a raw JSON array. No markdown. No backticks. No explanation. Just JSON.

[
  {
    "question": "Complete question text ending with ?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "difficulty": "${difficulty}"
  }
]

Return exactly ${count} questions. Return ONLY the JSON array.`;
};

const generateQuestions = async (topic, count = 10, difficulty = 'medium', quizType = 'mcq') => {
  try {
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: 'meta-llama/llama-3-8b-instruct',
        messages: [
          {
            role: 'user',
            content: buildPromptByDifficultyAndType(topic, count, difficulty, quizType)
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

module.exports = { generateQuestions, buildPromptByDifficultyAndType };