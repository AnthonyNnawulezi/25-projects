import { useEffect, useRef, useState } from "react";
import "./style.css";

function MusicPlayer() {
  const TRACK_INDEX = 0;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(TRACK_INDEX);
  const [progress, setProgress] = useState(null);
  const audioRef = useRef();

  const tracks = [
    {
      title: "Track 1",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Track 2",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      image: "https://via.placeholder.com/150",
    },
  ];

  useEffect(() => {
    const intervalID = setInterval(() => {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100,
      );
    }, 1);
    return () => clearInterval(intervalID);
  }, [isPlaying]);

  function handleToggle() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function skipTo(route) {
    if (route === "forward") {
      setCurrentTrack((prevTrack) => (prevTrack + 1) % tracks.length);
    } else if (route === "backward") {
      setCurrentTrack(
        (prevTrack) => (prevTrack - 1 + tracks.length) % tracks.length,
      );
    }
  }

  return (
    <div className="music-player-container">
      <h1>Music Player</h1>
      <div className="music-container">
        <p className="title">{tracks[TRACK_INDEX].title}</p>
        <img src={tracks[TRACK_INDEX].image} alt={tracks[TRACK_INDEX].image} />
        <audio
          src={tracks[TRACK_INDEX].source}
          className="player"
          ref={audioRef}
        ></audio>
        <div className="track-bar">
          <div
            className="progress"
            style={{
              width: `${progress}%`,
              height: "15px",
              background: isPlaying ? "#674928" : "aliceblue",
            }}
          ></div>
        </div>
        <div className="controls">
          <button onClick={() => skipTo("backward")}>Backward</button>
          <button onClick={handleToggle}>{isPlaying ? "Pause" : "Play"}</button>
          <button onClick={() => skipTo("forward")}>Forward</button>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
