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
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const activeRequestRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      const activeRequest = activeRequestRef.current;

      activeRequestRef.current = null;
      activeRequest?.abort();
    };
  }, []);

  function getFileError(file) {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Please choose an image (JPG, PNG, GIF or WebP).";
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `File is too large. Maximum size is ${MAX_FILE_SIZE_BYTES}.`;
    }
    return null; // null means "no problem found"
  }

  function uploadImage(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

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

    request.open("POST", UPLOAD_URL);
    request.send(formData);
  }

  return <div>FileUpload</div>;
}

export default FileUpload;
