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
  ];

  // Track progress interval
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        if (audioRef.current) {
          const { currentTime, duration } = audioRef.current;
          setTrackProgress((currentTime / duration) * 100 || 0);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle play/pause
  const playAndPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev); // ✅ FIXED: You had a bug here (`setIsPlaying != isPlaying`)
  };

  // Auto-play new track on track change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
    setTrackProgress(0);
  }, [currMusicTrack]);

  // Skip forward/backward
  const skipTrack = (direction) => {
    setCurrMusicTrack((prevTrack) => {
      if (direction === "forward") {
        return (prevTrack + 1) % tracks.length;
      } else if (direction === "backward") {
        return (prevTrack - 1 + tracks.length) % tracks.length;
      }
      return prevTrack;
    });
  };

  return (
    <div className="music-player">
      <h1>Music Player</h1>
      <h2>{tracks[currMusicTrack].title}</h2>
      <img
        src={tracks[currMusicTrack].image}
        alt={tracks[currMusicTrack].title}
      />
      <audio ref={audioRef}>
        <source src={tracks[currMusicTrack].source} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
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
        <button onClick={() => skipTrack("backward")}>⏮ Backward</button>
        <button onClick={playAndPause}>
          {isPlaying ? "⏸ Pause" : "▶️ Play"}
        </button>
        <button onClick={() => skipTrack("forward")}>⏭ Forward</button>
      </div>
    </div>
  );
}

export default MusicPlayer;
