import React, { useState } from "react";
import defaultIcon from "../images/default-ico-w.png";
import UtextInput from "./underlined-text-input";
import Modal from "./modal";

import magnifyingIcon from "../images/magnifying-ico-w.png";

const Search = ({searchLink, searchLinksResult}) => {

  const searchRef = React.createRef();

  const [searchOpened, setSearchOpened] = useState(false);
  
  const toggleSearch = () => {
    setSearchOpened(!searchOpened);
    searchRef.current.value = "";
    searchLink(null);
  };

  return (
    <>
    <div className="search-header" onClick={() => toggleSearch()}>
      <img
        className="search-icon"
        alt="search"
        src={magnifyingIcon}
      />
      <h2 className="search-title"> Search</h2>
    </div>

      <Modal show={searchOpened} toggleModal={toggleSearch}>
        <div>
          <h2 className="search-title">Search:</h2>

          <UtextInput type="text" changeEventFunction={searchLink} rRef={searchRef}/>

          <ul className="search-link-group">
            {console.log(searchLinksResult)}
            {searchLinksResult.map((l, i) => (
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
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default Search;
