import React from "react";
import { useRef } from "react";
import { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState();
  const uploadReference = useRef();
  const progressReference = useRef();
  const statusReference = useRef();
  const loadReference = useRef();

  function chooseImage() {
    const file = uploadReference.current.files[0];

    if (!file) return;
    setFile(URL.createObjectURL(file));
    let formData = new FormData();
    formData.append("image", file);
    let xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", handleProgress, false);
    xhr.addEventListener("load", handleSuccess, false);
    xhr.addEventListener("error", handleError, false);
    xhr.addEventListener("abort", handleAbort, false);
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
          <progress ref={progressReference} value={0} max={100} />%
        </label>
      </div>
      <p className="uploaded-status" ref={statusReference}></p>
      <p className="" ref={loadReference}></p>
      <img
        src={file}
        alt="Selected image"
        width={250}
        style={{ width: "100px", height: "100px" }}
        onError={(event) => {
          console.log("Could not display:", event.currentTarget.src);
        }}
      />
    </div>
  );
}

export default FileUpload;
