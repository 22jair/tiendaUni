import React from 'react';
import './MainHeader.css';
function MainHeader(props) {
    return (
      <header id="main-header">
        <div className="container">
          <h1>Tienda UNI</h1>
          <p>Siempre productos y ofertas nuevas</p>
        </div>
      </header>
    );
}

export default MainHeader;