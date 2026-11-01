import { useEffect, useRef, useState } from "react";
import "./file-upload.css";

// Largest accepted file: 5 * 1024 * 1024 bytes = 5 MB.
const MAX_FILE_SIZE_IN_BYTES = 5 * 1024 * 1024;

// Where the upload is sent. Replace with your real endpoint.
// (httpbin echoes the request back — useful while testing.)
const UPLOAD_ENDPOINT = "https://httpbin.org/post";

function FileUpload() {
  // The file the user picked. Null until they choose one.
  const [selectedFile, setSelectedFile] = useState(null);

  // Temporary blob URL for the preview. State (not ref) because changing it
  // must re-render the <img>.
  const [previewUrl, setPreviewUrl] = useState("");

  // 0–100, bound to the <progress> element.
  const [progressPercent, setProgressPercent] = useState(0);

  // Short status text shown under the controls.
  const [statusMessage, setStatusMessage] = useState("");

  // True while a request is in flight; disables the controls.
  const [isUploading, setIsUploading] = useState(false);

  // The live XMLHttpRequest, so Cancel and unmount can abort it.
  const activeRequestRef = useRef(null);

  // Release the old preview URL whenever it changes or on unmount.
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Abort any in-flight upload when the component unmounts.
  useEffect(() => {
    return () => {
      activeRequestRef.current?.abort();
    };
  }, []);

  // STEP 1 — user picks a file. Validate + preview only.
  function handleFileChange(event) {
    const imageFile = event.target.files?.[0];

    // Reset everything from a previous selection.
    setStatusMessage("");
    setProgressPercent(0);
    setSelectedFile(null);
    setPreviewUrl("");

    if (!imageFile) {
      return; // user cancelled the file picker
    }

    if (!imageFile.type.startsWith("image/")) {
      setStatusMessage("Please choose an image file (PNG, JPG, GIF…).");
      event.target.value = ""; // allow picking the same file again
      return;
    }

    if (imageFile.size > MAX_FILE_SIZE_IN_BYTES) {
      setStatusMessage("File is too large. The maximum size is 5 MB.");
      event.target.value = "";
      return;
    }

    setSelectedFile(imageFile);
    setPreviewUrl(URL.createObjectURL(imageFile));
  }

  // STEP 2 — user clicks Upload. This is where the network request lives.
  function handleUpload() {
    if (!selectedFile || isUploading) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    const request = new XMLHttpRequest();
    activeRequestRef.current = request;
    setIsUploading(true);

    // Fires repeatedly while the request body is being sent.
    request.upload.addEventListener("progress", (progressEvent) => {
      if (!progressEvent.lengthComputable) {
        return;
      }
      const percent = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100,
      );
      setProgressPercent(percent);
      setStatusMessage(
        `Uploaded ${progressEvent.loaded} bytes of ${progressEvent.total}`,
      );
    });

    // "load" fires for ANY finished response — including HTTP errors —
    // so we must inspect the status code ourselves.
    request.addEventListener("load", () => {
      setIsUploading(false);
      activeRequestRef.current = null;

      if (request.status >= 200 && request.status < 300) {
        setProgressPercent(100); // keep the bar full on success
        setStatusMessage("Upload complete!");
      } else {
        setProgressPercent(0);
        setStatusMessage(`Upload failed (HTTP ${request.status}).`);
      }
    });

    request.addEventListener("error", () => {
      setIsUploading(false);
      activeRequestRef.current = null;
      setProgressPercent(0);
      setStatusMessage("Upload failed. Check your connection and try again.");
    });

    request.addEventListener("abort", () => {
      setIsUploading(false);
      activeRequestRef.current = null;
      setProgressPercent(0);
      setStatusMessage("Upload cancelled.");
    });

    request.open("POST", UPLOAD_ENDPOINT);
    request.send(formData);
  }

  // Lets the user stop an upload in progress.
  function handleCancelUpload() {
    activeRequestRef.current?.abort();
  }

  return (
    <div className="file-upload-container">
      <h1>File Upload</h1>

      <div className="choose-image-wrapper">
        <label htmlFor="choose-image">Choose an image:</label>
        <input
          type="file"
          id="choose-image"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>

      <div className="file-actions">
        <button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
        >
          Upload
        </button>

        {isUploading && (
          <button type="button" onClick={handleCancelUpload}>
            Cancel
          </button>
        )}
      </div>

      <div className="file-progress">
        <label htmlFor="file-progress">File Progress: {progressPercent}%</label>
        <progress id="file-progress" value={progressPercent} max={100} />
      </div>

      <p className="uploaded-status" role="status">
        {statusMessage}
      </p>

      {previewUrl && (
        <div className="file-image">
          <img src={previewUrl} alt="Preview of the chosen file" />
        </div>
      )}
    </div>
  );
}

export default FileUpload;
