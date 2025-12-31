import React, { useEffect, useState } from "react";
import MENU_LOGO from "../assets/hamburger.png";
import YT_LOGO from "../assets/yt-logo.png";
import USER_LOGO from "../assets/user-icon.png";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults, setQuery } from "../utils/searchSlice";
import { useNavigate } from "react-router";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [ShowSuggestions, setShowSuggestions] = useState(false);

  const searchState = useSelector((store) => store.search);
  const dispatch = useDispatch();

  // Keep redux query in sync so other components can react to it (e.g. Comments)
  React.useEffect(() => {
    dispatch(setQuery(searchQuery));
  }, [searchQuery, dispatch]);

  /**
   *  searchCache = {
   *     "iphone": ["iphone 11", "iphone 14"]
   *  }
   *  searchQuery = iphone
   */

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchState?.cache && searchState.cache[searchQuery]) {
        setSuggestions(searchState.cache[searchQuery]);
      } else {
        getSearchSugsestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, searchState]);

  const getSearchSugsestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    // update cache
    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };

  const navigate = useNavigate();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="flex items-center justify-between h-14 px-4 shadow-sm bg-white sticky top-0 z-50">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <img
          src={MENU_LOGO}
          alt="menu"
          className="h-6 cursor-pointer"
          onClick={() => toggleMenuHandler()}
        />
        <img src={YT_LOGO} alt="youtube logo" className="h-5 cursor-pointer" />
      </div>

      {/* CENTER SEARCH */}
      <div className="hidden md:flex items-center w-[55%]">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          type="text"
          placeholder="Search"
          className="w-full h-10 px-4 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
        />
        <button onClick={() => { dispatch(setQuery(searchQuery)); navigate("/?q=" + encodeURIComponent(searchQuery)); setShowSuggestions(false); }} className="h-10 px-6 border border-l-0 border-gray-300 rounded-r-full bg-gray-100 hover:bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </button>
        {/* suggestion box */}
        {ShowSuggestions && (
          <div className="absolute top-14 w-[48.5%] bg-white border border-gray-300 rounded-lg shadow-lg">
            <ul>
              {suggestions.map((s) => (
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  key={s}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center">
        <img
          src={USER_LOGO}
          alt="user"
          className="h-8 cursor-pointer rounded-full"
        />
      </div>
    </div>
  );
};

export default Head;
