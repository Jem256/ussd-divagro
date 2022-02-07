import React from 'react';
import'./Header.css';
import SearchIcon from '@mui/icons-material/Search';
import HeaderOption from './HeaderOption';
import HomeIcon from '@mui/icons-material/Home';

function Header() {
  return (
      <div className='header'>

          <div className="header__left">
              <img src="./images/linkedin.png" alt="" />

              <div className="header__search">
                  <SearchIcon />
                  <input type="text" />
              </div>
          </div>

          <div className="header__right">
              <HeaderOption Icon={HomeIcon} title='Home' />
              <HeaderOption title='My Network' />
          </div>

      </div>
  );
}

export default Header;
