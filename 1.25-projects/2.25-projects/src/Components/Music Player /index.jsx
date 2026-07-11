import { useCallback, useEffect, useRef } from "react";

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

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return undefined;

    function handleTimeUpdate() {
      const { currentTime, duration } = audioElement;
      setProgress(duration ? (currentTime / duration) * 100 : 0);
    }

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    return () =>
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  // If we change tracks while playing, tell the new track to play
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.error("Playback prevented:", err));
    }
  }, [trackIndex, isPlaying]);

  // Auto-play next track when current one finishes
  const handleTrackEnded = () => {
    handleNextTrack();
  };

  const handleNextTrack = useCallback(() => {
    setTrackIndex((trackIndex) => (trackIndex + 1) % TRACKS.length);
  }, []);

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

  return <div className="music-player-container"></div>;
}
