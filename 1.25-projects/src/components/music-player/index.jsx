import { useEffect, useRef, useState } from "react";
import "./style.css";

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [currMusicTrack, setCurrMusicTrack] = useState(0);

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
    // Add more tracks as needed
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTrackProgress(
          (audioRef.current.currentTime / audioRef.current.duration) * 100,
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  function playAndPause() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    // setIsPlaying(!isPlaying);
    setIsPlaying((prev) => !prev);
  }

  function skipTrack(direction) {
    if (direction === "forward") {
      setCurrMusicTrack((prevTrack) => prevTrack + 1);
    } else if (direction === "backward") {
      setCurrMusicTrack(
        (prevTrack) => (prevTrack - 1 + tracks.length) % tracks.length,
      );
    }
    setTrackProgress(0); //on clicking another song
  }

  return (
    <div className="music-player">
      <h1>Music Player</h1>
      <h2>{tracks[currMusicTrack].title}</h2>
      <img
        src={tracks[currMusicTrack].image}
        alt={tracks[currMusicTrack].title}
      />
      <audio src={tracks[currMusicTrack].source} ref={audioRef}></audio>
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${trackProgress}%`,
            background: isPlaying ? "#3498db" : "#a43636",
            height: "15px",
          }}
        ></div>
      </div>
      <div className="controls">
        <button onClick={() => skipTrack("backward")}>Backward</button>
        <button onClick={playAndPause}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={() => skipTrack("forward")}>Forward</button>
      </div>
    </div>
  );
}

export default MusicPlayer;
