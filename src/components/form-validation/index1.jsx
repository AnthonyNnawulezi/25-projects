import { useRef, useState } from "react";
import "./style.css";

function FileUpload1() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [loadInfo, setLoadInfo] = useState("");

  const fileInputRef = useRef();

  const uploadFile = () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setStatusMessage("No file selected.");
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        setUploadProgress(Math.round(percentage));
        setLoadInfo(`Uploaded ${event.loaded} of ${event.total} bytes`);
        setStatusMessage(`${Math.round(percentage)}% Uploaded...`);
      }
    });

    xhr.addEventListener("load", () => {
      setStatusMessage("Upload complete!");
      setUploadProgress(0);
    });

    xhr.addEventListener("error", () => {
      setStatusMessage("Upload failed! Please try again.");
    });

    xhr.addEventListener("abort", () => {
      setStatusMessage("Upload aborted! Please try again.");
    });

    xhr.open("POST", "https://v2.convertapi.com");
    xhr.send(formData);
  };

  return (
    <div className="upload-container">
      <h1>File Upload</h1>

      <input type="file" name="file" onChange={uploadFile} ref={fileInputRef} />

      <label>
        File Progress: <progress value={uploadProgress} max={100}></progress>
      </label>

      {statusMessage && <p className="status">{statusMessage}</p>}
      {loadInfo && <p className="load">{loadInfo}</p>}

      {previewUrl && (
        <img
          src={previewUrl}
          alt="File preview"
          style={{ width: "300px", height: "300px" }}
        />
      )}
    </div>
  );
}

export default FileUpload1;
