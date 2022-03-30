import React from 'react'
import './Menu.css'
import logo from '../../images/logoEC.png'
import {AiOutlineSearch} from 'react-icons/ai'
import {MdOutlineShoppingBag} from 'react-icons/md'
import MobileMenu from './MobileMenu'
import { Link } from 'react-router-dom'

function Menu({totalItems}) {

  return (
    <div className="menu__container">
        <div className="menu__long">
            <Link to='/' >
              <img src={logo} alt="" className='menu__logo' />
            </Link>
            <nav>
                <Link to="/" className='text'>
                    home
                </Link>
                <Link to="/shop" className='text'>
                    shop
                </Link>
                <Link to="/about" className='text'>
                    About
                </Link>
                <Link to="/contact" className='text'>
                    contact
                </Link>
            </nav>
            <div className="menu__icons">
                <Link to="/">
                    <AiOutlineSearch className='menu__search' />
                </Link>

                <div className="menu__basket menu__icons">
                    <Link to='/cart' >
                        <MdOutlineShoppingBag/>
                    </Link>
                    <span className="menu__basketCount">
                        {totalItems}
                    </span>
                </div>
                
            </div>
        </div>
        <MobileMenu className="mobile__menu"/>
    </div>
  )
}

export default Menu