import { useEffect, useRef } from "react";

const YouTubePlayer = ({ videoId, autoplay = true, onEnd }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Load API only once
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const createPlayer = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            if (autoplay) {
              try {
                // Mute so browsers will allow autoplay
                event.target.mute();
                event.target.playVideo();
              } catch (e) {}
            }
          },
          onStateChange: (event) => {
            // 0 === ended
            if (event.data === 0 && typeof onEnd === "function") {
              onEnd();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      if (!playerRef.current) createPlayer();
      else {
        try {
          playerRef.current.loadVideoById(videoId);
          if (autoplay) {
            playerRef.current.mute();
            playerRef.current.playVideo();
          }
        } catch (e) {}
      }
    } else {
      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId, autoplay, onEnd]);

  return (
    <div className="w-full aspect-video bg-black">
      <div id="yt-player" className="w-full h-full" />
    </div>
  );
};

export default YouTubePlayer; 
