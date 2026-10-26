import { useRef, useState } from "react";
import "./file-upload.css";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [statusUpload, setstatusUpload] = useState("");

  function chooseImage(event) {
    const imageFile = event.target.files[0];

    if (!imageFile) return;

    setFile(imageFile);
    setPreviewUrl(URL.createObjectURL(imageFile));
    setProgressPercentage(0);
    setstatusUpload("Image selected");
  }
  return (
    <div className="file-upload-container">
      <h1>File pload</h1>
      <div className="choose-image-wrapper">
        <input
          type="file"
          onChange={chooseImage}
          name="choose-image"
          id="choose-image"
        />
      </div>
      <div className="file-progress">
        <label htmlFor="file-progress">File Progress</label>
        <input
          type="range"
          ref={progressPercentage}
          value={0}
          max={100}
          style={{ width: 200, height: 5 }}
        />
      </div>
      <div className="image-url-response"></div>
      <p className="uploaded-status">{statusUpload}</p>
      <div className="file-image">
        <img src={imageURLRef} alt="file-image" />
      </div>
    </div>
  );
}

export default FileUpload;
