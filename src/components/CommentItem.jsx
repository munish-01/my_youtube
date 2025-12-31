import { useState } from "react";

const Avatar = ({ name }) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="avatar bg-indigo-500 text-white flex items-center justify-center rounded-full w-10 h-10 font-semibold">
      {initials}
    </div>
  );
};

const CommentItem = ({ comment, depth = 0 }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes || 0);
  const [expanded, setExpanded] = useState(false);

  const toggleLike = () => {
    setLiked((v) => !v);
    setLikes((l) => (liked ? Math.max(0, l - 1) : l + 1));
  };

  const text = comment.comment || "";
  const isLong = text.length > 220;
  const shortText = isLong ? text.slice(0, 220) + "..." : text;

  return (
    <div className={`comment-card p-3 rounded-md mb-3`} style={{ marginLeft: depth * 12 }}>
      <div className="flex gap-3">
        <Avatar name={comment.name} />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="font-semibold">{comment.name}</div>
            <div className="text-sm text-gray-500">{comment.time || "2d"}</div>
          </div>

          <div className="mt-1 text-gray-800">
            {isLong && !expanded ? <span>{shortText}</span> : <span>{text}</span>}
            {isLong && (
              <button
                onClick={() => setExpanded((s) => !s)}
                className="read-more text-indigo-600 ml-2 text-sm"
                aria-label={expanded ? "Show less" : "Read more"}
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>

          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            <button
              onClick={toggleLike}
              className={`like-btn flex items-center gap-1 ${liked ? "text-red-500" : "hover:text-indigo-600"}`}
              aria-pressed={liked}
            >
              <span aria-hidden>{liked ? "♥" : "♡"}</span>
              <span>{likes}</span>
            </button>

            <button className="hover:text-indigo-600">Reply</button>
          </div>

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3">
              {comment.replies.map((r, i) => (
                <CommentItem key={i} comment={r} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
