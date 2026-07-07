import { useState } from "react";
import "./style.css";

function MusicPlayer() {
  const TRACK_INDEX = 0;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(TRACK_INDEX);

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

  return (
    <div className="music-player-container">
      <h1>Music Player</h1>
      <div className="music-container">
        <p className="title">{tracks[TRACK_INDEX].title}</p>
        <audio src={tracks[TRACK_INDEX].source} className="player"></audio>
        <div className="track-bar">
          <div className="progress"></div>
        </div>
        <div className="controls">
          <button>Backward</button>
          <button></button>
          <button>Forward</button>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
