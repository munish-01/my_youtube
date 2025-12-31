import React from "react";

const VideoCard = ({ info }) => {
    // console.log(info)
  if (!info) return null;

  const { snippet, statistics } = info;
  const { channelTitle, publishedAt, title, thumbnails } = snippet || {};

  return (
    <div className="cursor-pointer">
      {/* Thumbnail */}
      <div className="w-full aspect-video">
        <img
          className="w-full h-full object-cover rounded-xl"
          alt="thumbnail"
          src={thumbnails?.medium?.url}
        />
      </div>

      {/* Video Info */}
      <div className="flex gap-3 mt-3">
        {/* Channel Avatar placeholder */}
        <img
          className="w-9 h-9 rounded-full object-cover shrink-0"
          src={thumbnails?.medium?.url}
        />
        {/* <div className="w-9 h-9 rounded-full bg-gray-300 shrink-0" /> */}

        <div className="flex-1">
          {/* Title */}
          <h3 className="font-semibold text-sm leading-snug line-clamp-2">
            {title}
          </h3>

          {/* Channel Name */}
          <p className="text-sm text-gray-600 mt-1">{channelTitle}</p>

          {/* Views + Time */}
          <p className="text-sm text-gray-600">
            {statistics?.viewCount ? formatViews(statistics.viewCount) : "—"} •{" "}
            {timeAgo(publishedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

const formatViews = (views) => {
  if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M views";
  if (views >= 1_000) return (views / 1_000).toFixed(1) + "K views";
  return views + " views";
};

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0)
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
  }

  return "Just now";
};
