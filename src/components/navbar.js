import React, { useState } from 'react';

const Navbar = ({title, subTitle, linkPages, changePage, clearInput, searchLink, searchLinksResult}) => {

    linkPages && linkPages.sort((lO,lT) => (lO.name > lT.name) ? 1 : ((lO.name < lT.name) ? -1 : 0))

    const [opened, setOpened] = useState(false);

    const toggleMenu = () => {
        setOpened(!opened);
    }
  
    return (
      <header className="header">
        <nav className="navbar">
          <div className="container">
            <div className="brand">
              <h1 className="navbar-title">{title}</h1>
              <h5 className="navbar-sub-title">{subTitle}</h5>
            </div>
            <div className="toggle" onClick={toggleMenu}>
              <span className={`toggle-btn${opened ? " open" : ""}`}></span>
            </div>
            <div className={`menu${opened ? " open" : ""}`}>
              <ul className={`menu-list${opened ? " open" : ""}`}>
                <button
                  className="navbar-action-button"
                  onClick={() => {
                    clearInput();
                    toggleMenu();
                  }}
                >
                  Load new file
                </button>
                {linkPages &&
                  linkPages.map((p, i) => (
                    <li key={i} className={`menu-item${opened ? " open" : ""}`}>
                      <p
                        onClick={() => {
                          changePage(p);
                          toggleMenu();
                        }}
                        className="menu-link"
                      >
                        {p.name}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
}

export default Navbar;