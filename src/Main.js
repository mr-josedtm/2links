import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Uploader from "./components/uploader";
import Page from "./components/page";
import defaultData from "./data/example-links-v0.json";
import Modal from "./components/modal.js";
import Search from "./components/search";
import UtextInput from "./components/underlined-text-input";

const Main = () => {
  // ----- File loaded data to display and to be saved
  const [selectedFileData, setSelectedFileData] = useState(null);
  // TODO validar contenido del json
  // ----- Application data provided in the file
  const [data, setData] = useState(null);

  // ----- Array with available pages, usefull to the navbar and provably to the modal combo
  const [availablePages, setAvailablePages] = useState(null);
  
  // ----- Page actually displayed
  const [currentPage, setCurrentPage] = useState(null);
  
  // ----- Validates if the file and the data is correctly loaded
  const [goApp, setGoApp] = useState(false);
  
  // ----- Validates if loaded data was changed
  const [dataChanges, setDataChanges] = useState(false);
  
  // ----- TODO
  const [openModal, setOpenModal] = useState(false);
  
  const [modRequest, setModRequest] = useState(null);

  // ----- Array with links resulting of a search, usefull to the navbar search combo
  const [searchLinksResult, setSearchLinksResult] = useState([]);
  
  const toggleModal = (modRequest) => {
    if(modRequest){
      setModRequest(modRequest);
    } else {
      setModRequest(null);
    }
    setOpenModal(!openModal);
    // Con if openmodal limpiar estados si true o false segun toque
  };

  const modNames = (newName) => {
    // Validar que el nombre no viene vacio
    console.log(newName);

    // FIXME: validar todas las modRequest para que vengan completas y no den fallos quizas validar arriba, donde se setea
    switch (modRequest.type) {
      case "__page":
        modPage(newName);
        break;
      case "__folder":
        modFolder(newName);
        break;
      case "__link":
        editLink(newName);
        break;
      default:
        console.log("Mod request default behavior");
    }
    toggleModal(null);
  };

  // ################# Data cleaning #################
  const clearInput = () => {
    setSelectedFileData(null);
    setData(null);
    setAvailablePages(null);
    setGoApp(false);
  };

  // ################# Data load #################
  const onFileChange = async (event) => {
    let newFile = event.target.files[0];
    if (newFile) {
      if (newFile.type !== "application/json") {
        alert("Only JSON file are allowed");
      } else {
        setSelectedFileData({
          type: newFile.type,
          name: newFile.name,
          lastModifiedDate: newFile.lastModifiedDate,
          size: newFile.size,
        });

        event.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
          const text = e.target.result;
          setData(JSON.parse(text));
        };

        reader.readAsText(event.target.files[0]);
      }
    } else {
      setSelectedFileData(null);
      setData(null);
    }
  };

  // ################# Data load #################
  const onLoadExample = async (event) => {
    setSelectedFileData({
      type: "application/json",
      name: "example-links-v0.json",
      lastModifiedDate: new Date(),
      size: 0,
    });
    setData(defaultData);
  };

  // ################# On page change #################
  const changePage = (selPage) => {
    let currentSelectedPage = data.filter((p) => p.id === selPage.id)[0];
    setCurrentPage(currentSelectedPage);
  };

  // ################# Is app ready #################
  const toApp = () => {
    let goAppChange = selectedFileData && data;
    setGoApp(goAppChange);
  };

  // ################# Add new links #################
  const onAddLink = (newLink) => {
    if (newLink.pageId && newLink.folderId) {
      let auxData = [...data];

      let pageIndex = auxData.findIndex(
        (p) => parseInt(p.id) === newLink.pageId
      );

      // let folder = [...auxData[pageIndex].folders.findIndex(f => f.id === selectedFolderId)];
      let folder = auxData[pageIndex].folders.find(
        (f) => parseInt(f.id) === newLink.folderId
      );

      // TODO si la pagina no empieza por https lo pone como una ruta del dominio

      folder.links.push({
        name: newLink.name,
        link: newLink.link,
        icon: "no-icon",
        description: "Default description",
      });

      setData(auxData);
    }
  };

  // ################# Edit links #################
  const editLink = (newName) => {
    console.log(modRequest);
    let auxData = [...data];

    let pageIndex = auxData.findIndex(
      (p) => parseInt(p.id) === modRequest.pageId
    );

    let folder = auxData[pageIndex].folders.find(
      (f) => parseInt(f.id) === modRequest.folderId
    );

    folder.links[modRequest.linkIndex].name = newName;

    setData(auxData);
  };

  // ################# Delete links #################
  const deleteLink = (deleteReq) => {
    let auxData = [...data];

    let pageIndex = auxData.findIndex(
      (p) => parseInt(p.id) === deleteReq.pageId
    );

    let folder = auxData[pageIndex].folders.find(
      (f) => parseInt(f.id) === deleteReq.folderId
    );

    folder.links.splice(deleteReq.linkIndex, 1);

    setData(auxData);
  };

  // ################# Delete folder #################
  const deleteFolder = (folderId) => {
    let auxData = [...data];

    let pageIndex = auxData.findIndex((p) => parseInt(p.id) === currentPage.id);

    let folderIndex = currentPage.folders.findIndex(
      (p) => parseInt(p.id) === folderId
    );

    auxData[pageIndex].folders.splice(folderIndex, 1);

    setData(auxData);
  };

  // ################# Modify folder #################
  const modFolder = (newName) => {
    let auxData = [...data];

    let pageIndex = auxData.findIndex((p) => parseInt(p.id) === currentPage.id);

    let folderIndex = currentPage.folders.findIndex(
      (p) => parseInt(p.id) === modRequest.folderId
    );

    auxData[pageIndex].folders[folderIndex].name = newName;

    setData(auxData);
  };

  const maxFolderId = () => {
    let folderIds = data.map((page) =>
      Math.max.apply(
        null,
        page.folders.length > 0 ? page.folders.map((folder) => folder.id) : [0]
      )
    );

    return Math.max.apply(null, folderIds);
  };

  // ################# Create new folger #################
  const onNewFolder = () => {
    let auxData = [...data];

    let pageIndex = auxData.findIndex((p) => parseInt(p.id) === currentPage.id);

    auxData[pageIndex].folders.push({
      id: maxFolderId() + 1,
      name: "New Folder",
      links: [],
      notes: ["folder notes splits by ,"],
    });

    setData(auxData);
    setDataChanges(true);
  };

  // ################# Create new page #################
  const onNewPage = () => {
    let auxData = [...data];

    let pageIds = auxData.map((p) => p.id);
    let newPageId = Math.max.apply(null, pageIds) + 1;

    auxData.push({
      id: newPageId,
      name: "New Page",
      folders: [],
    });

    setData(auxData);

    let newAvailablePages = auxData.map((p) => ({ id: p.id, name: p.name }));
    setAvailablePages(newAvailablePages);

    let newCurrentPage = auxData.filter((p) => p.id === newPageId)[0];
    setCurrentPage(newCurrentPage);
  };

  // ################# Delete page #################
  const onDeletePage = (pageId) => {
    let auxData = [...data];

    let pageIndex = auxData.findIndex((p) => parseInt(p.id) === pageId);

    auxData.splice(pageIndex, 1);

    // TODO hay varias cosas parecidas que se hacen desde varios PushSubscriptionOptions. AGRUPAR

    if (auxData.length < 1) {
      alert("You are deleting the last page, a new one will be created");
      auxData.push({
        id: 1,
        name: "New Page",
        folders: [],
      });
    }

    setData(auxData);
    setCurrentPage(null);
    setAvailablePages(null);
  };

  // ################# Modify page #################
  const modPage = (newName) => {
    let auxData = [...data];

    let pageIndex = auxData.findIndex((p) => parseInt(p.id) === modRequest.pageId);

    auxData[pageIndex].name = newName;

    setData(auxData);
    setCurrentPage(auxData[pageIndex]);
    setAvailablePages(null);
  };

  // ################# Search link #################
  const searchLink = (event) => {
    if (event !== null) {
      let searchCriteriaValue = event.target.value;

      if (data !== null && searchCriteriaValue.length >= 3) {
        let searchResult = data
          .map((page) =>
            page.folders.map((folder) => folder.links.map((link) => link))
          )
          .flat(2)
          .filter((link) =>
            link.name.toUpperCase().includes(searchCriteriaValue.toUpperCase())
          );

        console.log(searchResult);

        setSearchLinksResult(searchResult);
      } else {
        setSearchLinksResult([]);
      }

    } else {
      setSearchLinksResult([]);
    }
  };

  // **************** FIXME ****************
  const saveFile = async () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    let documentName = selectedFileData.name;
    let newDocumentName = documentName;

    // If the document ends with -vX.json, we increment the version number
    let regexDocVersion = new RegExp('-v[0-9]*.json');
    if(regexDocVersion.test(documentName)){
      
      let documentVersion = regexDocVersion.exec(documentName);
      
      let regexDocVersionNumber = new RegExp('[0-9]');
      let documentVersionNumber = regexDocVersionNumber.exec(documentVersion);

      newDocumentName = documentName.replace(documentVersion, `-v${parseInt(documentVersionNumber)+1}.json`)
      // ####### Another way ###################
      // let documentName = selectedFileData.name;
  
      // let regexDocVersion = new RegExp('-v[0-9]*.json');
      // if(regexDocVersion.test(documentName)){
  
      //   console.log(documentName);
      //   let documentVersion = documentName.match("-v[0-9]*.json")[0];
      //   console.log(documentVersion);
      //   let documentVersionNumber = documentName.match("[0-9]")[0];
      //   let newDocumentName = documentName.replace(documentVersion, `-v${parseInt(documentVersionNumber)+1}.json`)
      //   console.log(newDocumentName);
      // }
      // ##########################
    }


    const a = document.createElement("a");
    a.download = newDocumentName;
    a.href = URL.createObjectURL(blob);
    a.addEventListener("click", (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  useEffect(() => {
    if (data && !currentPage) {
      let firstPage = data[0];
      setCurrentPage(firstPage);

      let currentAvailablePages = data.map((p) => ({ id: p.id, name: p.name }));
      setAvailablePages(currentAvailablePages);
    }
    if (dataChanges) {
      window.addEventListener("beforeunload", function (e) {
        let confirmationMessage = "o/";

        (e || window.event).returnValue = confirmationMessage; //Gecko + IE

        console.log("logout !");
        return confirmationMessage; //Webkit, Safari, Chrome
      });
    }
  }, [data, currentPage, dataChanges]);

  const modInputRef = React.createRef();

  const bodyRender = () => {
    if (goApp && currentPage) {
      return (
        <>
          <Search
            searchLink={searchLink}
            searchLinksResult={searchLinksResult}
          />
          <Page
            selectedPage={currentPage}
            onNewPage={onNewPage}
            deleteLink={deleteLink}
            onAddLink={onAddLink}
            onNewFolder={onNewFolder}
            deleteFolder={deleteFolder}
            toggleModal={toggleModal}
            deletePage={onDeletePage}
          />
          {/* Deshabilitar si no hay nada que guardar y habilitar cuando lo haya */}
          <button className="save-button" onClick={() => saveFile()}>
            Save it!
          </button>
        </>
      );
    }
    return (
      <Uploader
        selectedFile={selectedFileData}
        fileContent={data}
        onFileChange={onFileChange}
        clearInput={clearInput}
        onDone={toApp}
        onLoadExample={onLoadExample}
      />
    );
  };

  return (
    <>
      <Navbar
        title="L1nk B00k"
        subTitle="v.0.1.0"
        linkPages={availablePages}
        changePage={changePage}
        clearInput={clearInput}
        deletePage={onDeletePage}
      />
      <div className="resources-content">{bodyRender()}</div>
      <Modal show={openModal} toggleModal={toggleModal}>
        <UtextInput rRef={modInputRef} type="text"/>
        <button className="modal-send-button" onClick={() => {modNames(modInputRef.current.value); modInputRef.current.value = "" }}>
          Change
        </button>
        <button className="modal-send-button grey" onClick={() => {toggleModal(); modInputRef.current.value = "" }}>
          Cancel
        </button>
      </Modal>
    </>
  );
};

export default Main;
