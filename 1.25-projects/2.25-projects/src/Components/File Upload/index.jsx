import { useEffect, useRef, useState } from "react";
import "./file-upload.css";

// Replace with your real backend upload endpoint.
const UPLOAD_URL = "/api/upload";

// Set a maximum image size of 5 MiB.
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function FileUpload() {
  // Store the selected image file.
  const [selectedFile, setSelectedFile] = useState(null);

  // Store the image preview URL.
  const [previewUrl, setPreviewUrl] = useState(null);

  // Store upload progress from 0 to 100.
  const [uploadProgress, setUploadProgress] = useState(0);

  // Store messages describing the upload status.
  const [uploadStatus, setUploadStatus] = useState("");

  // Store the number of bytes transferred.
  const [uploadDetails, setUploadDetails] = useState("");

  // Track whether an upload is currently active.
  const [isUploading, setIsUploading] = useState(false);

  // Store the server's response text.
  const [serverResponse, setServerResponse] = useState("");

  // Keep a reference to the current upload request.
  const uploadRequestRef = useRef(null);

  // Release old preview URLs when they are no longer needed.
  useEffect(() => {
    if (!previewUrl) return;

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Cancel an active upload when the component unmounts.
  useEffect(() => {
    return () => {
      const activeRequest = uploadRequestRef.current;

      uploadRequestRef.current = null;
      activeRequest?.abort();
    };
  }, []);

  // Handle file selection.
  function handleFileChange(event) {
    const imageFile = event.currentTarget.files?.[0];

    // Cancel any previous upload before starting another.
    const previousRequest = uploadRequestRef.current;
    uploadRequestRef.current = null;
    previousRequest?.abort();

    // Reset information from the previous upload.
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setUploadStatus("");
    setUploadDetails("");
    setServerResponse("");
    setIsUploading(false);

    // Stop if no file was selected.
    if (!imageFile) {
      setUploadStatus("Please select an image.");
      return;
    }

    // Check that the selected file is an image.
    if (!imageFile.type.startsWith("image/")) {
      setUploadStatus("Only image files are allowed.");
      event.currentTarget.value = "";
      return;
    }

    // Check that the file is not empty.
    if (imageFile.size === 0) {
      setUploadStatus("The selected image is empty.");
      event.currentTarget.value = "";
      return;
    }

    // Check the image file size.
    if (imageFile.size > MAX_FILE_SIZE) {
      setUploadStatus("Image must be 5 MiB or smaller.");
      event.currentTarget.value = "";
      return;
    }

    // Save the file so its metadata can be displayed.
    setSelectedFile(imageFile);

    // Create a temporary URL for the image preview.
    const imageUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(imageUrl);

    // Create FormData and attach the selected image.
    const formData = new FormData();
    formData.append("image", imageFile);

    // Create an HTTP request.
    const request = new XMLHttpRequest();

    // Store the active request in the ref.
    uploadRequestRef.current = request;

    // Mark the upload as active.
    setIsUploading(true);
    setUploadStatus("Uploading...");

    // Update progress while the file is being transmitted.
    request.upload.addEventListener("progress", (progressEvent) => {
      // Ignore events from an outdated request.
      if (uploadRequestRef.current !== request) return;

      // Ensure the total number of bytes is available.
      if (!progressEvent.lengthComputable || progressEvent.total === 0) {
        return;
      }

      // Get the number of transmitted bytes.
      const loadedBytes = progressEvent.loaded;
      const totalBytes = progressEvent.total;

      // Calculate the upload percentage.
      const percentage = Math.round((loadedBytes / totalBytes) * 100);

      // Update the progress bar.
      setUploadProgress(percentage);

      // Display the bytes transferred.
      setUploadDetails(`Uploaded ${loadedBytes} of ${totalBytes} bytes`);

      // Wait for server confirmation after sending all bytes.
      if (percentage === 100) {
        setUploadStatus("File sent. Waiting for server...");
      } else {
        setUploadStatus(`Uploading... ${percentage}%`);
      }
    });

    // Finish only the currently active request.
    function finishUpload(message) {
      if (uploadRequestRef.current !== request) return;

      uploadRequestRef.current = null;
      setIsUploading(false);
      setUploadStatus(message);
    }

    // Handle the server's completed response.
    request.addEventListener("load", () => {
      if (uploadRequestRef.current !== request) return;

      // Check that the server returned a successful status.
      if (request.status >= 200 && request.status < 300) {
        setUploadProgress(100);

        // Store the response returned by the server.
        setServerResponse(request.responseText);

        finishUpload("Upload complete!");
      } else {
        finishUpload(`Upload failed. HTTP ${request.status}`);
      }
    });

    // Handle network failures.
    request.addEventListener("error", () => {
      finishUpload("Network error. Please try again.");
    });

    // Handle cancelled uploads.
    request.addEventListener("abort", () => {
      finishUpload("Upload cancelled.");
    });

    // Handle requests that take too long.
    request.addEventListener("timeout", () => {
      finishUpload("Upload timed out.");
    });

    // Set a timeout of 60 seconds.
    request.timeout = 60000;

    // Configure and send the HTTP request.
    try {
      request.open("POST", UPLOAD_URL);
      request.send(formData);
    } catch (error) {
      console.error("Upload could not start:", error);
      finishUpload("Could not start the upload.");
    }
  }

  // Cancel the current upload when requested.
  function handleCancelUpload() {
    uploadRequestRef.current?.abort();
  }

  return (
    <div className="file-upload-container">
      <h1>File Upload</h1>

      {/* File selection */}
      <div className="choose-image-wrapper">
        <label htmlFor="choose-image">Choose an image</label>

        <input
          type="file"
          id="choose-image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Upload progress */}
      <div className="file-progress">
        <label htmlFor="file-progress">File Progress</label>

        <progress id="file-progress" value={uploadProgress} max={100} />

        <p>{uploadProgress}%</p>
      </div>

      {/* Allow cancellation during an upload */}
      {isUploading && (
        <button type="button" onClick={handleCancelUpload}>
          Cancel Upload
        </button>
      )}

      {/* Upload status */}
      {uploadStatus && (
        <p className="uploaded-status" role="status">
          {uploadStatus}
        </p>
      )}

      {/* Bytes transferred */}
      {uploadDetails && <p>{uploadDetails}</p>}

      {/* Selected file metadata */}
      {selectedFile && (
        <div className="image-metadata">
          <p>File name: {selectedFile.name}</p>
          <p>File size: {selectedFile.size} bytes</p>
          <p>File type: {selectedFile.type}</p>
        </div>
      )}

      {/* Raw server response, if one was returned */}
      {serverResponse && (
        <div className="image-url-response">
          <h2>Server Response</h2>
          <pre>{serverResponse}</pre>
        </div>
      )}

      {/* Display the selected image preview */}
      {previewUrl && (
        <div className="file-image">
          <img src={previewUrl} alt="Preview of selected image" />
        </div>
      )}
    </div>
  );
}

export default FileUpload;
