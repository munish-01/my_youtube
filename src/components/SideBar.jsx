import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  // Early Return pattern
  if(!isMenuOpen) return null

  return (
    <div
      className="
    fixed top-14 left-0 
    h-[calc(100vh-56px)] 
    bg-white shadow-sm
    w-20 md:w-60
    overflow-y-auto
  "
    >
      {/* MAIN */}
      <ul className="px-2 py-3">
        <li className="flex flex-col md:flex-row items-center gap-1 md:gap-4 px-2 py-3 rounded-lg bg-gray-100 cursor-pointer">
          🏠
          <span className="text-xs md:text-sm md:inline hidden"><Link to="/">Home</Link></span>
        </li>

        <li className="flex flex-col md:flex-row items-center gap-1 md:gap-4 px-2 py-3 rounded-lg hover:bg-gray-100 cursor-pointer">
          ▶️
          <span className="text-xs md:text-sm md:inline hidden">Shorts</span>
        </li>

        <li className="flex flex-col md:flex-row items-center gap-1 md:gap-4 px-2 py-3 rounded-lg hover:bg-gray-100 cursor-pointer">
          📺
          <span className="text-xs md:text-sm md:inline hidden">
            Subscriptions
          </span>
        </li>
      </ul>

      <hr className="my-2 md:block hidden" />

      {/* YOU */}
      <ul className="px-2 py-3">
        <li className="flex flex-col md:flex-row items-center gap-1 md:gap-4 px-2 py-3 rounded-lg hover:bg-gray-100 cursor-pointer">
          👤
          <span className="text-xs md:text-sm md:inline hidden">You</span>
        </li>

        <li className="flex flex-col md:flex-row items-center gap-1 md:gap-4 px-2 py-3 rounded-lg hover:bg-gray-100 cursor-pointer">
          🕘
          <span className="text-xs md:text-sm md:inline hidden">History</span>
        </li>
      </ul>

      <hr className="my-2 md:block hidden" />

      {/* EXPLORE */}

      <h1 className="px-3 pb-2 text-sm font-semibold hidden md:block">
        Explore
      </h1>

      <ul className="space-y-1">
        {[
          { icon: "🛍️", label: "Shopping" },
          { icon: "🎵", label: "Music" },
          { icon: "🎬", label: "Movies" },
          { icon: "📡", label: "Live" },
          { icon: "🎮", label: "Gaming" },
          { icon: "📰", label: "News" },
          { icon: "🏆", label: "Sports" },
          { icon: "🎓", label: "Courses" },
          { icon: "👗", label: "Fashion & Beauty" },
          { icon: "🎙️", label: "Podcasts" },
        ].map((item, index) => (
          <li
            key={index}
            className="flex flex-col md:flex-row items-center gap-1 md:gap-4 
                   px-2 py-3 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs md:text-sm hidden md:inline">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
