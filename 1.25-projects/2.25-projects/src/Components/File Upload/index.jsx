import { useEffect, useRef, useState } from "react";

const UPLOAD_URL = "https://v2.convertapi.com/upload";
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // convert MB to bytes
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

function FileUpload() {
  const [uploadPercent, setUploadPercent] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const [isUploading, setIsUploading] = useState(false);
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
      const activeRequest = activeRequestRef.current;

      activeRequestRef.current = null;
      activeRequest?.abort();
    };
  }, []);

  // Check the file is allowed. Returns an error message, or null if the file is fine.
  function getFileError(file) {
    console.log(file);

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Please choose an image (JPG, PNG, GIF or WebP).";
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `File is too large. Maximum size is ${MAX_FILE_SIZE_BYTES}.`;
    }
    if (file.size === 0) {
      event.currentTarget.value = "";
      return "The selected image is empty.";
    }
    return null; // null means "no problem found"
  }

  // STEP 1 — user picks a file. Validate + preview only.
  // Send one file to the server and report progress as it goes.
  function uploadImage(imageFile) {
    const formData = new FormData();

    formData.append("image", imageFile); // "image" must match the field name your server expects

    const request = new XMLHttpRequest();
    setIsUploading(true);
    setUploadStatus("Starting upload...");
    activeRequestRef.current = request;

    request.upload.addEventListener("progress", (event) => {
      if (!event.lengthComputable) return; // the browser doesn't know the total size, so skip

      const percent = Math.round((event.loaded / event.total) * 100);
      setUploadPercent(percent);
      setUploadStatus(`Uploaded ${event.loaded} bytes of ${event.total}`);
    });

    // Fires when the server replies, whether it said "OK" or reported an error.
    request.addEventListener("load", () => {
      setIsUploading(false);
      activeRequestRef.current = null;
      const isSuccess = request.status >= 200 && request.status < 300;

      if (isSuccess) {
        setUploadPercent(100);
        setUploadStatus("Upload complete!");
        setServerResponse(request.responseText); // the server's reply as text
      } else {
        setUploadPercent(0);
        setUploadStatus(
          `Upload failed (server replied ${request.status}). Please try again.`,
        );
      }
    });

    // Fires when the request could not reach the server at all.
    request.addEventListener("error", () => {
      setIsUploading(false);
      activeRequestRef.current = null;
      setUploadPercent(0);
      setUploadStatus(
        "Upload failed. Please check your connection and try again.",
      );
    });

    request.addEventListener("abort", () => {
      setIsUploading(false);
      activeRequestRef.current = null;
      setUploadPercent(0);
      setUploadStatus("Upload cancelled.");
    });

    // Fires after load OR error, so the cleanup lives in one place.
    request.addEventListener("loadend", () => {
      setIsUploading(false);
    });

    request.open("POST", UPLOAD_URL);
    request.send(formData); // the browser sets the Content-Type header for FormData itself
  }

  //   function handleCancelUpload() {
  //     activeRequestRef.current?.abort();
  //   }

  function handleFileChange(event) {
    const imageFile = event.currentTarget.files?.[0];
    event.target.value = ""; // allow picking the same file again

    // Reset everything from a previous selection.
    setPreviewUrl(null);
    setUploadPercent(0);
    setUploadStatus("");
    setServerResponse("");

    if (!imageFile) {
      setUploadStatus("No file selected.");
      return;
    }

    // Stop early if the file isn't allowed.
    const errorMessage = getFileError(imageFile);
    if (errorMessage) {
      setUploadStatus(errorMessage);
      return;
    }

    setPreviewUrl(URL.createObjectURL(imageFile));
    uploadImage(imageFile);
  }

  return (
    <div>
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
        {uploadStatus}
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
          <img
            src={previewUrl}
            alt="Preview of the chosen file"
            style={{ width: 300, height: 300 }}
          />
        </div>
      )}
    </div>
  );
}

export default FileUpload;
