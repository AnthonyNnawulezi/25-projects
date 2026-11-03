import { useEffect, useState } from "react";
import "./file-upload.css";

// ===== Settings: easy to find and change in one place =====
const UPLOAD_URL = "https://v2.convertapi.com/upload"; // TODO: replace with your real endpoint
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // convert MB to bytes
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

function FileUpload() {
  // ===== State: values that redraw the screen when they change =====
  const [previewUrl, setPreviewUrl] = useState(null); // temporary address used to show the image
  const [uploadPercent, setUploadPercent] = useState(0); // 0 to 100
  const [statusMessage, setStatusMessage] = useState(""); // text shown under the progress bar
  const [serverResponse, setServerResponse] = useState(""); // what the server sent back
  const [isUploading, setIsUploading] = useState(false); // true while an upload is running

  // Free the preview image from memory when it is replaced or the component is removed.
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Check the file is allowed. Returns an error message, or null if the file is fine.
  function getFileError(file) {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Please choose an image (JPG, PNG, GIF or WebP).";
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `File is too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`;
    }
    return null; // null means "no problem found"
  }

  // Send one file to the server and report progress as it goes.
  function uploadImage(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile); // "image" must match the field name your server expects

    const request = new XMLHttpRequest();
    setIsUploading(true);
    setStatusMessage("Starting upload...");

    // Fires again and again while bytes are being sent.
    request.upload.addEventListener("progress", (event) => {
      if (!event.lengthComputable) return; // the browser doesn't know the total size, so skip

      const percent = Math.round((event.loaded / event.total) * 100);
      setUploadPercent(percent);
      setStatusMessage(`Uploaded ${event.loaded} bytes of ${event.total}`);
    });

    // Fires when the server replies, whether it said "OK" or reported an error.
    request.addEventListener("load", () => {
      const isSuccess = request.status >= 200 && request.status < 300;

      if (isSuccess) {
        setUploadPercent(100);
        setStatusMessage("Upload complete!");
        setServerResponse(request.responseText); // the server's reply as text
      } else {
        setUploadPercent(0);
        setStatusMessage(
          `Upload failed (server replied ${request.status}). Please try again.`,
        );
      }
    });

    // Fires when the request could not reach the server at all.
    request.addEventListener("error", () => {
      setUploadPercent(0);
      setStatusMessage(
        "Upload failed. Please check your connection and try again.",
      );
    });

    // Fires after load OR error, so the cleanup lives in one place.
    request.addEventListener("loadend", () => {
      setIsUploading(false);
    });

    request.open("POST", UPLOAD_URL);
    request.send(formData); // the browser sets the Content-Type header for FormData itself
  }

  // Runs when the user picks a file.
  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    // Clear the input so choosing the same file again still triggers onChange.
    // (We already saved the file in selectedFile, so nothing is lost.)
    event.target.value = "";

    // Remove anything left over from the previous file.
    setPreviewUrl(null);
    setUploadPercent(0);
    setStatusMessage("");
    setServerResponse("");

    // The user may have cancelled the file dialog.
    if (!selectedFile) {
      setStatusMessage("No file selected.");
      return;
    }

    // Stop early if the file isn't allowed.
    const errorMessage = getFileError(selectedFile);
    if (errorMessage) {
      setStatusMessage(errorMessage);
      return;
    }

    setPreviewUrl(URL.createObjectURL(selectedFile)); // show the image straight away
    uploadImage(selectedFile);
  }

  return (
    <div className="file-upload-container">
      <h1>File Upload</h1>

      <div className="choose-image-wrapper">
        <label htmlFor="choose-image">Choose an image</label>
        {/* accept only filters the file picker. getFileError is the real check.
            disabled stops a second upload from starting mid-upload. */}
        <input
          type="file"
          id="choose-image"
          name="choose-image"
          accept={ALLOWED_FILE_TYPES.join(",")}
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>

      <div className="file-progress">
        <label htmlFor="file-progress">File progress</label>
        {/* <progress> is a read-only bar made for this job */}
        <progress id="file-progress" value={uploadPercent} max={100}></progress>
      </div>

      {/* role="status" makes screen readers announce changes */}
      <p className="uploaded-status" role="status">
        {statusMessage}
      </p>

      {/* Only shown once the server has replied successfully */}
      {serverResponse && (
        <div className="image-url-response">
          <pre>{serverResponse}</pre>
        </div>
      )}

      {/* Only shown once an image has been chosen */}
      {previewUrl && (
        <div className="file-image">
          <img src={previewUrl} alt="Preview of the chosen file" />
        </div>
      )}
    </div>
  );
}

export default FileUpload;
