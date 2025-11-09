

//  import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaSearch, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
// import "../styles/navbar.css"

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchValue, setSearchValue] = useState("");

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   return (
//     <header className="header">
//       {/* Mobile Top Row */}
//       <div className="mobile-header">
//         <h1 className="mobile-title">PRODEX</h1>
//         <button className="menu-button" onClick={toggleMenu}>
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Main Header Content */}
//       <div className={`nav-wrapper ${menuOpen ? 'open' : ''}`}>
        
          
//         {/* Search bar below (hidden on desktop) */}

//         <div className="top-bar">
//           <h1 className="desktop-title">PRODEX</h1>
//           <div className="auth-buttons-wrapper">
//             <Link to="/login" className="auth-button">Prijava</Link>
//             <Link to="/register" className="auth-button register">Registracija</Link>
//           </div>
//         </div>

//         <div className="middle-bar">
//           <nav className="navbar">
//             <Link to="/">POČETNA</Link>
//             <Link to="/about">O NAMA</Link>
//             <Link to="/productscatalogs">KATALOZI</Link>
//             <Link to="/contact">KONTAKT</Link>
//           </nav>
//           <Link to="/cart" className="cart-link">
//             <FaShoppingCart className="cart-icon" />
//           </Link>
//         </div>
//            <div className="search">
//             <input
//               type="text"
//               placeholder="Pretraga..."
//               onChange={e => setSearchValue(e.target.value)}
//             />
//             <Link to={"/filteredproducts/"} state={{ searchValue }} className="search-icon">
//               <FaSearch />
//             </Link>
//           </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState, useContext } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import "../styles/navbar.css";
import { AppContext } from '../AppContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { userCredentials, setUserCredentials } = useContext(AppContext);
  const navigate = useNavigate();

  const { cartItems } = useContext(AppContext);

  const handleLogout = () => {
      setUserCredentials(null);
      localStorage.removeItem("credentials");
      navigate('/'); 
  };



  return (
    <header className="header">
      {/* Desktop Top Section */}
      <div className="top-bar">
        <div className="logo-container">
          <h1 className="desktop-title">PRODEX</h1>
        </div>
        <div className="auth-container">
            {!userCredentials ? (
              <>
                <Link to="/auth/login" className="auth-button">Prijava</Link>
                <Link to="/auth/register" className="auth-button register">Registracija</Link>
              </>
            ) : (
              <>
                <Link to="/account" className="auth-button">Moj Nalog</Link>
                <button onClick={handleLogout} className="auth-button logout">Odjavite se</button>
              </>
            )}
        </div>
        {/* Mobile auth buttons (shown only in menu) */}
        {menuOpen && (
          <div className="auth-container mobile-auth">
            {!userCredentials ? (
              <>
                <Link to="/auth/login" className="auth-button">Prijava</Link>
                <Link to="/auth/register" className="auth-button register">Registracija</Link>
              </>
            ) : (
              <>
                <Link to="/account" className="auth-button">Moj Nalog</Link>
                <button onClick={handleLogout} className="auth-button logout">Odjavite se</button>
              </>
            )}
          </div>
        )}


        <button className="menu-button mobile-menu-button" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile-first Navigation Area */}
      <div className={`nav-content ${menuOpen ? 'open' : ''}`}>
        <nav className="navbar">
          <Link to="/">POČETNA</Link>
          <Link to="/about">O NAMA</Link>
          <Link to="/productscatalogs">KATALOZI</Link>
          <Link to="/contact">KONTAKT</Link>
        </nav>
        {/* <Link to="/cart" className="cart-link">
          <FaShoppingCart className="cart-icon" />
        </Link> */}
       <div className="search">
          <input
            type="text"
            placeholder="Pretraga..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate('/filteredproducts/', { state: { searchValue } });
              }
            }}
          />
          <button
            className="search-icon"
            onClick={() => navigate('/filteredproducts/', { state: { searchValue } })}
          >
            <FaSearch />
          </button>
      </div>

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

export default Header;
