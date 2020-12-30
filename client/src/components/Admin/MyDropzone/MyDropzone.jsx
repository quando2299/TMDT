import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./MyDropzone.scss";

function MyDropzone(props) {
  const [files, setFiles] = useState([]);
  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      props.getImages(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    maxFiles: 3,
    minSize: 1024,
    maxSize: 3072000,
  });

  const thumbs = files.map((file) => (
    <div className="thumb-item" key={file.name}>
      <div className="thumb-inner">
        <img src={file.preview} alt="thumb-item" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const additionalClass = isDragAccept
    ? "accept"
    : isDragReject
    ? "reject"
    : "";

  return (
    <section>
      <div {...getRootProps({ className: `dropzone ${additionalClass}` })}>
        <input {...getInputProps()} id="dropzone-img" />
        <span>{isDragActive ? "📂" : ""}</span>
        {isDragAccept && (
          <p style={{ marginTop: "1rem" }}>All files will be accepted</p>
        )}
        {isDragReject && (
          <p style={{ marginTop: "1rem" }}>Some files will be rejected</p>
        )}
        {!isDragActive && (
          <p style={{ marginTop: "1rem" }}>
            Drag 'n' drop some files here, or click to select files (3 files are
            the maximum)
          </p>
        )}
      </div>
      <aside className="thumbs-container">{thumbs}</aside>
    </section>
  );
}

MyDropzone.propTypes = {
  getImages: PropTypes.func.isRequired,
};

export default MyDropzone;
