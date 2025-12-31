import { useState } from "react";
import { useSelector } from "react-redux";
import CommentItem from "./CommentItem";
import "./CommentsContainer.css";

const commentsData = [
  {
    name: "User1",
    comment: "This is a great video!",
    replies: [
      {
        name: "UserA",
        comment: "I agree with you!",
      },
      {
        name: "UserB",
        comment: "Thanks for the insight.",
      },
    ],
  },
  {
    name: "User2",
    comment: "Thanks for sharing this information.",
  },
  {
    name: "User3",
    comment: "I learned a lot from this tutorial.",
    replies: [
      {
        name: "UserC",
        comment: "Me too! It was very helpful.",
      },
    ],
  },
  {
    name: "User4",
    comment: "Can you make a video on React hooks?",
    replies: [],
  },
  {
    name: "User5",
    comment: "Looking forward to more content like this!",
    replies: [
      {
        name: "UserD",
        comment: "Same here!",
        replies: [
          {
            name: "UserE",
            comment: "The creator is doing a fantastic job.",
          },
          {
            name: "UserF",
            comment: "Absolutely agree!",
          },
        ],
      },
    ],
  },
];

const initialComments = commentsData.map((c, i) => ({
  ...c,
  time: `${i + 1}d`,
  createdAt: Date.now() - i * 1000,
  likes: Math.floor(Math.random() * 6),
}));

const CommentsContainer = () => {
  const [comments, setComments] = useState(initialComments);
  const [limit, setLimit] = useState(3);
  const [sortBy, setSortBy] = useState("newest");
  const [text, setText] = useState("");
  const charLimit = 500;

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const newComment = {
      name: "You",
      comment: trimmed,
      replies: [],
      time: "now",
      createdAt: Date.now(),
      likes: 0,
    };
    setComments((c) => [newComment, ...c]);
    setText("");
    setLimit((l) => l + 1);
  };

  const sorted = [...comments].sort((a, b) =>
    sortBy === "newest" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
  );

  const searchQuery = useSelector((store) => store.search?.query || "");
  const q = searchQuery.trim().toLowerCase();

  const filtered = q
    ? sorted.filter((c) => {
        const inSelf =
          c.name?.toLowerCase().includes(q) || c.comment?.toLowerCase().includes(q);
        const inReplies =
          c.replies && c.replies.some((r) => (r.name || "").toLowerCase().includes(q) || (r.comment || "").toLowerCase().includes(q));
        return inSelf || inReplies;
      })
    : sorted;

  const visible = filtered.slice(0, limit);

  return (
    <div className="comments-wrapper">
      <h3 className="font-semibold mb-3">Comments ({comments.length})</h3>

      <form onSubmit={handleAdd} className="add-comment">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={charLimit}
          placeholder="Add a public comment"
          className="w-full border rounded p-2"
          rows={3}
        />
        <div className="flex justify-between items-center mt-2">
          <div className="char-count">{text.length}/{charLimit}</div>
          <button type="submit" className="bg-indigo-600 text-white px-3 py-1 rounded">
            Comment
          </button>
        </div>
      </form>

      <div className="controls flex items-center gap-3 mt-4 mb-3">
        <label className="text-sm text-gray-600">Sort:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded px-2 py-1">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-gray-600 py-4">No comments match "{searchQuery}"</div>
      ) : (
        <div>
          {visible.map((c, i) => (
            <CommentItem key={i} comment={c} />
          ))}
        </div>
      )}

      {limit < comments.length && (
        <div className="mt-4 text-center">
          <button className="load-more-btn" onClick={() => setLimit((l) => l + 3)}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsContainer;
