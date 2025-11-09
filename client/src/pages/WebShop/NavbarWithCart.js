import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import "../../styles/webshop/navbarshop.css"
import { AppContext } from '../../AppContext';

const NavbarWithCart = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [searchValue, setSearchValue] = useState("")

  const { cartItems } = useContext(AppContext);

  return (
    <header className="header">
      {/* Mobile Top Row */}
      <div className="mobile-header">
        <h1 className="mobile-title">PRODEX</h1>
        <button className="menu-button" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Main Header Content */}
      <div className={`nav-wrapper ${menuOpen ? 'open' : ''}`}>
        {/* Search bar (left on desktop) */}
        <div className="search">
          <input type="text" placeholder="Pretraga..." onChange={e => setSearchValue(e.target.value)}/>
          <Link to={"/filteredproducts/" } state={{ searchValue: searchValue }} className="search-icon">
            <FaSearch />
          </Link>
        </div>

        {/* <input type="text" placeholder="Pretraga..." name="search" onChange={e => setSearchValue(e.target.value)} />
                   <Link to={"/filteredproducts/" } state={{ searchValue: searchValue }} className="linkbutton"   > 
                        <img src="/images/svg/loupe-svgrepo-com.svg" className="img-svg-loupe"  alt="..."/> 
                 </Link> */}
               

        {/* Navbar (centered on desktop) */}
        <nav className="navbar">
          <Link to="/">POČETNA</Link>
          <Link to="/about">O NAMA</Link>
          <Link  to="/productscatalogs">KATALOZI</Link>
          <Link  to="/contact">KONTAKT</Link>
        </nav>


        {/* Title (right on desktop) */}
        <h1 className="desktop-title">PRODEX</h1>
      </div>
       <div className="cart-row">
          <div className="cart-icon-wrapper">
            <Link to="/cart" className="cart-link">
             <span className="cart-label">Korpa</span>
              <FaShoppingCart className="cart-icon" />
             
              {/* You can show item count if you want */}
              {/* <span className="cart-count">3</span> */}
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
              )}
            </Link>
          </div>
        </div>
    </header>
  );
};

export default NavbarWithCart;

 