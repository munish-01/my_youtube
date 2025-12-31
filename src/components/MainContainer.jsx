import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  return (
    <div>
      <ButtonList />
      <div
        className={` transition-all duration-300 ${
          isMenuOpen ? "ml-20 md:ml-60" : "ml-0"
        }`}
        style={{
          width: isMenuOpen
            ? window.innerWidth >= 768
              ? "calc(100vw - 15rem)" // desktop sidebar
              : "calc(100vw - 5rem)" // mobile icon rail
            : "100vw",
        }}
      >
        <VideoContainer />
      </div>
    </div>
  );
};

export default MainContainer;
