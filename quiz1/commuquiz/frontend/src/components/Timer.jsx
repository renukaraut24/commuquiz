export default function Timer({ timeLeft, totalTime = 20 }) {
  const percentage = (timeLeft / totalTime) * 100;
  const isLow = timeLeft <= 5;

  return (
    <div className="flex flex-col items-center">
      <div className={`text-4xl font-black mb-2 ${isLow ? 'text-red-400 animate-pulse' : 'text-white'}`}>
        {timeLeft}
      </div>
      <div className="w-full bg-gray-800 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-1000 ${isLow ? 'bg-red-500' : 'bg-teal-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
