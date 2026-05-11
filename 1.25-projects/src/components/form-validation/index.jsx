import { useRef, useState } from "react";
import "./style.css";

function FileUpload() {
  const [file, setFile] = useState();
  const uploadReference = useRef();
  const progressReference = useRef();
  const statusReference = useRef();
  const loadReference = useRef();

  function uploadFile() {
    const file = uploadReference.current.files[0];
    setFile(URL.createObjectURL(file));
    let formData = new FormData();
    formData.append("image", file);
    let xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", handleProgress, false);
    xhr.addEventListener("load", handleSuccess, false);
    xhr.addEventListener("error", handleError, false);
    xhr.addEventListener("abort", handleAbort, false);
    xhr.open("POST", "https://v2.convertapi.com");
    xhr.send(formData);
    console.log(file);
  }

  function handleProgress(event) {
    loadReference.current.innerHTML = `Uploaded ${event.loaded} bytes of ${event.total}`;
    const percentage = (event.loaded / event.total) * 100;
    progressReference.current.value = `${Math.round(percentage)}`;
    statusReference.current.innerHTML = `${Math.round(
      percentage
    )} % Uploaded...`;
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
    <div className="upload-container">
      <h1>File Upload</h1>
      <input
        type="file"
        name="file"
        onChange={uploadFile}
        ref={uploadReference}
        id=""
      />
      <label htmlFor="">
        File Progress:{" "}
        <progress ref={progressReference} value={"0"} max={"100"}></progress>
      </label>
      <p ref={statusReference} className="status"></p>
      <p ref={loadReference} className="load"></p>
      <img
        src={file}
        alt="file-upload"
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
}

export default FileUpload;
