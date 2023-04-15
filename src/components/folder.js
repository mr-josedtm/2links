import React, { useState } from "react";
import defaultIcon from "../images/default-ico-w.png";
import UtextInput from "./underlined-text-input";

const Folder = ({ pageId, data, deleteLink, onAddLink, deleteFolder, toggleModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  const nameRef = React.createRef();
  const urlRef = React.createRef();

  let folderData = {
    type: "__folder",
    pageId: pageId,
    folderId: data.id
  };

  return (
    <>
      <div className="custom-button" onClick={() => toggleFolder()}>
        <p className="global-pink-text">{`[${data.name}]`}</p>
        <div className="folder-icon-container">
          <span>
            <div className="folder"></div>
          </span>
          <button className="folder-icon" onClick={(event) => {
              toggleModal(folderData); event.stopPropagation()}}>&#9998;</button>  
          <button className="close-thik folder-icon" onClick={(event) => {deleteFolder(data.id); event.stopPropagation()}} />
        </div>
      </div>

      <div className={`block collapse ${isOpen ? "show" : ""}`}>
        <ul className="link-group">
          {data.links.map((l, i) => (
            <li key={i} className="list-item">
              <img
                className="folder-icon-image"
                alt=""
                src={l.icon}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultIcon;
                }}
              />{" "}
              <a target="_blank" rel="noreferrer" href={l.link}>
                {l.name}
              </a>
              <button className="folder-icon link" onClick={() => toggleModal({
                    type: "__link",
                    pageId: pageId,
                    folderId: data.id,
                    linkIndex: i
                  })}>&#9998;</button>  
              <button
                className="close-thik"
                onClick={() =>
                  deleteLink({
                    pageId: pageId,
                    folderId: data.id,
                    linkIndex: i,
                  })
                }
              />
            </li>
          ))}
        </ul>

        <br />
        <div className="folder-creation-container">
          <label className="folder-creation-label">Name:</label>
          <UtextInput type="text" rRef={nameRef} />

          <label className="folder-creation-label">Url:</label>
          <UtextInput type="text" rRef={urlRef} />

          <button
            className="folder-cretion-send"
            onClick={() => {
              onAddLink({
                pageId: pageId,
                folderId: data.id,
                name: nameRef.current.value,
                link: urlRef.current.value,
              });
              nameRef.current.value = "";
              urlRef.current.value = "";
            }
            }
          >
            Send!
          </button>
        </div>
      </div>
    </>
  );
};

export default Folder;
