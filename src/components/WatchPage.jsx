import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams, useNavigate, Link } from "react-router";
import YouTubePlayer from "../utils/YoutubePlayer";
import { YT_API_KEY, GOOGLE_API_KEY } from "../utils/constants";
import VideoCard from "./VideoCard";
import CommentsContainer from "./CommentsContainer.jsX";


const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  useEffect(() => {
    if (!videoId) return;
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${GOOGLE_API_KEY}`
        );
        const json = await res.json();
        setVideo(json.items && json.items[0]);
      } catch (e) {
        console.error(e);
      }
    };

    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    const getRecs = async () => {
      try {
        const res = await fetch(YT_API_KEY);
        const json = await res.json();
        // filter out current video
        const items = (json.items || []).filter((i) => i.id !== videoId);
        setRecommendations(items);
      } catch (e) {
        console.error(e);
      }
    };
    getRecs();
  }, [videoId]);

  const handleVideoEnd = () => {
    if (recommendations.length > 0) {
      const next = recommendations[0].id;
      navigate(`/watch?v=${next}`);
    }
  };

  const formatViews = (views) => {
    if (!views) return "—";
    const v = parseInt(views, 10);
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "M views";
    if (v >= 1_000) return (v / 1_000).toFixed(1) + "K views";
    return v + " views";
  };

  return (
    <div className="w-full px-6 py-6 flex gap-6">
      <div className="flex-1">
        {/* Player */}
        <YouTubePlayer videoId={videoId} autoplay={true} onEnd={handleVideoEnd} />

        {/* Title */}
        <h1 className="text-xl font-semibold mt-4">{video?.snippet?.title}</h1>

        {/* Meta row */}
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-gray-600">
            {formatViews(video?.statistics?.viewCount)} • {video?.snippet?.publishedAt ? new Date(video.snippet.publishedAt).toLocaleDateString() : ""}
          </div>

          <div className="flex gap-3">
            <button className="px-3 py-2 bg-gray-100 rounded">Like</button>
            <button className="px-3 py-2 bg-gray-100 rounded">Share</button>
            <button className="px-3 py-2 bg-gray-100 rounded">Save</button>
          </div>
        </div>

        {/* Channel & Description */}
        <div className="flex items-start gap-4 mt-4">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={video?.snippet?.thumbnails?.default?.url}
            alt="channel"
          />

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{video?.snippet?.channelTitle}</div>
                <div className="text-sm text-gray-600">1.2M subscribers</div>
              </div>

              <button className="bg-red-600 text-white px-4 py-2 rounded">Subscribe</button>
            </div>

            <div className="text-sm text-gray-700 mt-3">
              <div className={showDesc ? "" : "line-clamp-3"}>{video?.snippet?.description}</div>
              <button onClick={() => setShowDesc((s) => !s)} className="text-sm text-blue-600 mt-2">
                {showDesc ? "Show less" : "Show more"}
              </button>
            </div>
          </div>
        </div>

        {/* Comments placeholder */}
        <div className="mt-6">
          <CommentsContainer/>
        </div>
      </div>

      {/* Recommendations */}
      <div className="w-80 space-y-4">
        {recommendations.map((rec) => (
          <Link key={rec.id} to={`/watch?v=${rec.id}`}>
            <VideoCard info={rec} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WatchPage;
