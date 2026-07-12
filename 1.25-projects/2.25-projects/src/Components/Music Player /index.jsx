import { useCallback, useEffect, useRef, useState } from "react";

const TRACKS = [
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

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const handleTimeUpdate = () => {
    const audioElement = audioRef.current;
    const { currentTime, duration } = audioElement;

    setProgress(duration ? (currentTime / duration) * 100 : 0);
  };

  // If we change tracks while playing, tell the new track to play
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.load();
    if (isPlaying) {
      audioElement.play().catch((error) => {
        console.error("Playback prevented:", error);
      });
    }
  }, [trackIndex, isPlaying]);

  const handlePreviousTrack = useCallback(() => {
    setTrackIndex(
      (trackIndex) => (trackIndex - 1 + TRACKS.length) % TRACKS.length,
    );
  }, []);

  function handleTogglePlay() {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch((error) => {
        console.error("Playback failed:", error);
      });
    }
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  }

  const currentTrack = TRACKS[trackIndex];

  return (
    <div className="music-player-container">
      <h1>Music Player</h1>
      <div className="music-container">
        <p className="title">{currentTrack.title}</p>
      </div>
      <img src={currentTrack.image} alt={`${currentTrack.title}`} />
      <audio
        src={currentTrack.source}
        ref={audioRef}
        className="player"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNextTrack}
      />
      <div className="track-bar">
        <div
          className={`progress ${isPlaying ? "is-playing" : "is-paused"}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="controls">
        <button onClick={handlePreviousTrack}>Backward</button>
        <button onClick={handleTogglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={handleNextTrack}>Forward</button>
      </div>
    </div>
  );
}

export default MusicPlayer;
