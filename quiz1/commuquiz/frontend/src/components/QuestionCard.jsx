const OPTION_LABELS = ['A', 'B', 'C', 'D'];
const OPTION_COLORS = [
  'hover:bg-blue-700 border-blue-600',
  'hover:bg-orange-700 border-orange-600',
  'hover:bg-green-700 border-green-600',
  'hover:bg-red-700 border-red-600',
];
const SELECTED_COLORS = [
  'bg-blue-700 border-blue-400',
  'bg-orange-700 border-orange-400',
  'bg-green-700 border-green-400',
  'bg-red-700 border-red-400',
];

export default function QuestionCard({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  onAnswer,
  disabled,
}) {
  const getStyle = (index) => {
    if (correctAnswer !== null) {
      if (index === correctAnswer) return 'bg-green-700 border-green-400 text-white';
      if (index === selectedAnswer) return 'bg-red-800 border-red-500 text-white opacity-80';
      return 'bg-gray-800 border-gray-700 opacity-40';
    }
    if (selectedAnswer === index) return `${SELECTED_COLORS[index]} text-white`;
    return `bg-gray-800 border-gray-700 text-gray-200 ${!disabled ? OPTION_COLORS[index] : ''}`;
  };

  return (
    <div>
      <div className="bg-gray-900 rounded-2xl p-6 mb-5 border border-gray-800">
        <p className="text-lg font-bold leading-relaxed text-white">{question}</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => !disabled && onAnswer(i)}
            disabled={disabled}
            className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all duration-150 ${getStyle(i)}`}
          >
            <span className="font-bold mr-3 opacity-70">{OPTION_LABELS[i]}.</span>
            {opt}
            {correctAnswer !== null && i === correctAnswer && (
              <span className="ml-2 text-green-300">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
