import { useRef, useState } from "react";
import "./file-upload.css";

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [progressPercentage, setProgressPercentage] = useState(0);
//   const [statusUpload, setStatusUpload] = useState("");

//   function chooseImage(event) {
//     const imageFile = event.target.files[0];

//     if (!imageFile) return;

//     setFile(imageFile);
//     setPreviewUrl(URL.createObjectURL(imageFile));
//     setProgressPercentage(0);
//     setStatusUpload("Image selected");

//     const formData = new FormData();
//     formData.append("image", imageFile);

//     const xhr = new XMLHttpRequest();

//     xhr.upload.onprogress = function (event) {
//       if (event.lengthComputable) {
//         const percentage = Math.round((event.loaded / event.total) * 100);

//         setProgressPercentage(percentage);
//         setStatusUpload(`Uploading: ${percentage}%`);
//       }
//     };

//     xhr.onload = function () {
//       if (xhr.status >= 200 && xhr.status < 300) {
//         setStatusUpload("Upload complete!");
//       } else {
//         setStatusUpload(`Upload failed: ${xhr.status}`);
//       }
//     };

//     xhr.open("POST", "YOUR_UPLOAD_API_URL");
//     xhr.send(formData);
//   }
//   return (
//     <div className="file-upload-container">
//       <h1>File pload</h1>
//       <div className="choose-image-wrapper">
//         <input
//           type="file"
//           onChange={chooseImage}
//           //   accept="image/*"
//           id="choose-image"
//         />
//         {file && <p>Selected: {file.name}</p>}
//       </div>
//       <div className="file-progress">
//         <label>
//           File Progress:
//           <progress value={progressPercentage} max={100} />
//           {progressPercentage}%
//         </label>
//       </div>
//       <p className="uploaded-status">{statusUpload}</p>
//       {previewUrl && <img src={previewUrl} alt="Selected image" width={250} />}
//     </div>
//   );
// }

function FileUpload() {
  const [file, setFile] = useState();
  const uploadReference = useRef();
  const progressReference = useRef();
  const statusReference = useRef();
  const loadReference = useRef();

  function chooseImage() {
    const file = uploadReference.current.files[0];
    setFile(URL.createObjectURL(file));
    let formData = new FormData();
    FormData.append("image", file);
    let xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", handleProgress, false);
    xhr.upload.addEventListener("load", handleSuccess, false);
    xhr.upload.addEventListener("error", handleError, false);
    xhr.upload.addEventListener("abort", handleAbort, false);
    xhr.open("POST", "https://v2.convertapi.com/upload");
    xhr.send(formData);
  }

  function handleProgress(event) {
    loadReference.current.innerHTML = `Uploaded ${event.loaded} bytes of ${event.total} bytes`;
    const percentage = (event.loaded / event.total) * 100;
    progressReference.current.value = Math.round(percentage);
    statusReference.current.innerHTML = `${Math.round(percentage)}% uploaded...`;
  }

  function handleSuccess(event) {
    statusReference.current.innerHTML = event.target.responseText;
    progressReference.current.value = 0;
  }

  function handleError() {
    statusReference.current.innerHTML = "Upload failed! Please try again";
  }

  function handleAbort() {
    statusReference.current.innerHTML = "Upload aborted! Please try again";
  }

  return (
    <div className="file-upload-container">
      <h1>File pload</h1>
      <div className="choose-image-wrapper">
        <input
          type="file"
          onChange={chooseImage}
          //   accept="image/*"
          id="choose-image"
          ref={uploadReference}
        />
        {file && <p>Selected: {file.name}</p>}
      </div>
      <div className="file-progress">
        <label>
          File Progress:
          <progress max={100} />%
        </label>
      </div>
      <p className="uploaded-status" ref={statusReference}></p>
      <p className="" ref={loadReference}></p>
      <img
        src={file}
        alt="Selected image"
        width={250}
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
}

export default FileUpload;
