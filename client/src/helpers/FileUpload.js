import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { PlusCircleOutlined } from '@ant-design/icons';
import { API } from '../helpers/config';
import axios from 'axios';

const FileUpload = (props) => {
  const [Images, setImages] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    // console.log('files', files);
    // console.log('files[0]', files[0]);
    
    formData.append('file', files[0]);
    // console.log('formData', formData.get('file'));
    //save the Image we chose inside the Node Server
    axios
      .post(`${API}/product/uploadImage`, formData, config)
      .then((response) => {
        if (response.data.success) {
          setImages([...Images, response.data.image]);
          props.refreshFunction([...Images, response.data.image]);
        } else {
          alert('Failed to save the Image in Server');
        }
      });
  };

  const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '300px',
              height: '240px',
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}
          >
            {/* {console.log('getRootProps', { ...getRootProps() })}
            {console.log('getInputProps', { ...getInputProps() })} */}
            <input {...getInputProps()} />
            <PlusCircleOutlined style={{ fontSize: '3rem' }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'scroll',
        }}
      >
        {Images.map((image, index) => (
          <div onClick={() => onDelete(image)}>
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`http://localhost:8000/${image}`}
              alt={`productImg-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
