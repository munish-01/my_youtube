import { useSelector } from "react-redux";
import { useRef } from "react";
import Button from "./Button";

const ButtonList = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={` transition-all duration-300 relative ${
        isMenuOpen ? "ml-20 md:ml-60" : "ml-0"
      }`}
      style={{
        width: isMenuOpen
          ? window.innerWidth >= 768
            ? "calc(100vw - 15rem)"
            : "calc(100vw - 5rem)"
          : "100vw",
      }}
    >
      {/* LEFT SLIDER */}
      <button
        onClick={scrollLeft}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 
                   z-10 bg-white p-2 shadow rounded-full hover:bg-gray-100"
      >
        ◀
      </button>

      {/* SCROLLABLE BUTTONS */}
      <div
        ref={scrollRef}
        className="flex gap-3 px-10 py-3 overflow-x-auto scrollbar-hide select-none"
      >
        {[
          "All",
          "Gaming",
          "Songs",
          "Live",
          "Soccer",
          "Cricket",
          "Cooking",
          "Valentines",
          "Music",
          "News",
          "Podcasts",
          "Fashion",
          "gediya",
          "comedy",
          "Punjabi",
          "Recently Added",
        ].map((name) => (
          <Button key={name} name={name} />
        ))}
      </div>

      {/* RIGHT SLIDER */}
      <button
        onClick={scrollRight}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 
                   z-10 bg-white p-2 shadow rounded-full hover:bg-gray-100"
      >
        ▶
      </button>
    </div>
  );
};

export default ButtonList;
