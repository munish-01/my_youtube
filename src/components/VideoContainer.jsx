import React, { useEffect, useState } from "react";
import { YT_API_KEY, GOOGLE_API_KEY } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchQuery = useSelector((store) => store.search?.query || "");
  const q = searchQuery.trim();

  const getVideos = async () => {
    const data = await fetch(YT_API_KEY);
    const json = await data.json();
    setVideos(json.items);
  };

  const searchVideos = async (query) => {
    setLoading(true);
    try {
      const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&q=${encodeURIComponent(
        query
      )}&key=${GOOGLE_API_KEY}`;
      const res = await fetch(url);
      const json = await res.json();
      const items = (json.items || []).map((it) => ({ id: it.id.videoId, snippet: it.snippet }));
      setVideos(items);
      setError(null);
    } catch (err) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (q) {
      searchVideos(q);
    } else {
      getVideos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  if (loading) return <div className="p-6">Loading videos...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  if (!videos || videos.length === 0)
    return <div className="p-6 text-gray-600">No videos found{q ? ` for "${q}"` : ""}.</div>;

  return (
    <div
      className="grid gap-4 px-4 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4 
                xl:grid-cols-5"
    >
      {videos.map((video) => (
        <Link key={video.id} to={"/watch?v=" + video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
