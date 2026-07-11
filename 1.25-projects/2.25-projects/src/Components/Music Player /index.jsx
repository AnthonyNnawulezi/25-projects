import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.load();
    if (isPlaying) {
      audioElement.play().catch((error) => {
        console.error("Playback failed:", error);
      });
    }
  }, [currentTrackIndex]);
}
