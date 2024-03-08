import React from "react";
import { useDropzone } from "react-dropzone";

function DragDropFileUpload({ onFileUpload }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFileUpload,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "1px solid black",
        borderStyle: "dashed",
        padding: "20px",
        width: "auto",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default DragDropFileUpload;
