import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="sunshine" role="presentation" />
        <header className="banner" role="banner">
          <h1 className="accessible-hide">
            Desert Island Suicide
          </h1>
          <img className="logo" src="../images/dis-logo.svg" />
        </header>
        <div className="mission-statement">
          If you were marooned on a desert island and you were limited to the music of only
          ONE band, what band would immediately cause you to choose suicide over survival?
        </div>
      </div>
    );
  }
}

export default Header;
