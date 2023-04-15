import React from "react";
import Folder from "./folder";

const Page = ({ selectedPage, onNewPage, deleteLink, onAddLink, onNewFolder, deleteFolder, toggleModal, deletePage }) => {
    selectedPage.folders.sort((fO,fT) => (fO.name > fT.name) ? 1 : ((fO.name < fT.name) ? -1 : 0))

    let pageData = {
      type: "__page",
      pageId: selectedPage.id
    };

  return (
    <>
    <div className="page-icon-container">
      <h2 className="global-green-text">{selectedPage.name}</h2> 
      <button className="page-icon" onClick={() => toggleModal(pageData)}>&#9998;</button> 
      <button className="close-thik green-icon" onClick={() => deletePage(selectedPage.id)}/>
    </div>

      <button className="uploader-button done" onClick={onNewFolder}>New folder</button>
      <button className="uploader-button new-page" onClick={onNewPage}>New page</button>
      {(selectedPage.folders && selectedPage.folders.length > 0) ? selectedPage.folders.map((folder, key) => (
        <Folder
          key={key}
          pageId={selectedPage.id}
          data={folder}
          deleteLink={deleteLink}
          onAddLink={onAddLink}
          deleteFolder={deleteFolder}
          toggleModal={toggleModal}
        />
      )) : <p className="global-pink-text"> Create a new folder to add links</p>}
    </>
  );
};

export default Page;
