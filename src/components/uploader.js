import React from "react";


const Uploader = ({ selectedFile, fileContent, onFileChange, clearInput, onDone, onLoadExample }) => {
  const inputRef = React.createRef();

  let goAppChange = selectedFile && fileContent;

  let clearInputElement = () => {
    inputRef.current.value = "";
  }
  
  let calculatedSize = (size) => {
    if (!size || size === '') {
      return('No size found')
    }else if(size < 1024){
      return (`${size.toFixed(2)} bytes`)

    } else if (size < 1048576) {
      return (`${(size/1024).toFixed(2)} Kb`)

    } else if (size <= 104857600){
      return (`${(size/1048576).toFixed(2)} Mb`)

    } else {
      return ('The file size is greater than 100Mb!!!!')
    }
  }
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2 className="global-blue-text">File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
          <p>Size: {calculatedSize(selectedFile.size)}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4 className="global-pink-text">Choose for load resources</h4>
        </div>
      );
    }
  };

  let disabledButtonStye = {
    backgroundColor: "lightgrey",
    cursor: "not-allowed",
  };

  return (
    <div className="uploader-container">
      <h3 className="global-green-text">Select the URL file!</h3>
      <div className="uploader-item">
        <div className="uploader-file">
          <input
            ref={inputRef}
            type="file"
            className="uploader-file-upload"
            onChange={onFileChange}
          />
          <span>Upload</span>
        </div>
        <div className="uploader-item">
          <button
            className="uploader-button done"
            onClick={onDone}
            disabled={!goAppChange}
            style={!goAppChange ? disabledButtonStye : {}}
          >
            Done!
          </button>

          <button
            className="uploader-button clear"
            onClick={() => {clearInput(); clearInputElement()}}
          >
            x Clear
          </button>
        </div>
        <button className="uploader-button example" onClick={onLoadExample}>Load Example file</button>
      </div>
      {fileData()}
    </div>
  );
};

export default Uploader;
