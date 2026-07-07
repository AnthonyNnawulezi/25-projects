function MusicPlayer() {
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

  return (
    <div>
      <h1>Music Player</h1>
      <div className="music-container">
        <p className="title"></p>
        <audio src=""></audio>
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
