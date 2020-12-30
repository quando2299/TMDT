import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  width: "auto",
  height: "300px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const Dropzone = (props) => {
  const [images, setImages] = useState([]);
  const maxSize = 1024 * 1024;
  const { getImages } = props;

  const onDrop = (acceptedFiles) => {
    getImages(acceptedFiles);
    setImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
  
  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    rejectedFiles,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    minSize: 0,
    maxSize,
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    },
    [images]
  );

  const isFileTooLarge =
    rejectedFiles &&
    rejectedFiles.length > 0 &&
    rejectedFiles[0].size > maxSize;

  return (
    <div style={baseStyle} {...getRootProps()}>
      <input {...getInputProps()} />
      {!isDragActive && "Click here or drop a images to upload!"}
      {isDragActive && !isDragReject && "Drop it like it's hot!"}
      {isDragReject && "File type not accepted, sorry!"}
      {isFileTooLarge && (
        <div className="text-danger mt-2">File is too large.</div>
      )}
    </div>
  );
};

Dropzone.propTypes = {
  getImages: PropTypes.func.isRequired,
};

export default Dropzone;
