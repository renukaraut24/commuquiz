const EMOJIS = ['🔥', '😂', '😮', '👏', '💯', '🎉'];

export default function EmojiReactions({ onReact }) {
  return (
    <div className="flex justify-center gap-4 py-2">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onReact(emoji)}
          className="text-2xl hover:scale-125 active:scale-110 transition-transform duration-100"
          title="React"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
