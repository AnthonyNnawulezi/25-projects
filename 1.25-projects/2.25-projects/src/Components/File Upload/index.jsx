import { useState } from "react";
import "./file-upload.css";

function FileUpload() {
  // State variables to track the selected file, preview URL, and status text
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  // Function that runs when a user selects an image file
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    // Check if the user cancelled the file picker
    if (!file) {
      setStatusMessage("No file selected.");
      return;
    }

    // Save the file object into state
    setSelectedFile(file);
    setStatusMessage(`Selected: ${file.name} (${file.size} bytes)`);

    // Create a temporary browser URL so the user can preview the image
    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
  };

  return (
    <div className="file-upload-container">
      <h1>File Upload</h1>

      <div className="choose-image-wrapper">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          name="choose-image"
          id="choose-image"
        />
      </div>

      {/* Show status message */}
      <p className="uploaded-status">{statusMessage}</p>

      {/* Display the image preview if a valid preview URL exists */}
      {previewUrl && (
        <div className="file-image">
          <img
            src={previewUrl}
            alt="Selected file preview"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
}

export default FileUpload;
