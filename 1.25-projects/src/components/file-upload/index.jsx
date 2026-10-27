import React from "react";
import { useRef } from "react";
import { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState();
  const uploadReference = useRef();
  const progressReference = useRef();
  const statusReference = useRef();

  function handleUploadFile() {
    const file = uploadReference.current.files[0];
    console.log(file);
  }
  return <div>FileUpload</div>;
}

export default FileUpload;
