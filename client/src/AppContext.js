// import { createContext } from "react"

// export const AppContext = createContext()

import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [userCredentials, setUserCredentials] = useState(() => {
    const data = localStorage.getItem("credentials");
    return data ? JSON.parse(data) : null;
  });

  const [allCatalogs, setAllCatalogs] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("credentials", JSON.stringify(userCredentials));
  }, [userCredentials]);


  useEffect(() => {
    //fetch("https://prodexmd.ba/api/catalogs/?page=1&perPage=90")
    // fetch("http://localhost:5000/api/catalogs/?page=1&perPage=90")
    //   .then(res => res.json())
    //   .then(data => {
    //     const sorted = [...data.catalogs].sort((a, b) => a.name.localeCompare(b.name));
    //     setAllCatalogs(sorted);
    //   })
    //   .catch(err => console.error("Failed to fetch catalogs", err));

       let url = '';
        if (process.env.NODE_ENV === 'production') {
            url = `https://prodexmd.ba/api/catalogs/?page=1&perPage=90`;
        } else {
             url = `http://localhost:5000/api/catalogs/?page=1&perPage=90`;
        }
        
        fetch(url)
          .then(res => res.json())
          .then(data => {
            const sorted = [...data.catalogs].sort((a, b) => a.name.localeCompare(b.name));
            setAllCatalogs(sorted);
          })
          .catch(err => console.error("Failed to fetch catalogs", err));

       
  }, []);

  const addToCart = (product) => {
   
    setCartItems(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
     console.log('evo karte:')
      console.log(cartItems)
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <AppContext.Provider value={{
      userCredentials,
      setUserCredentials,
      allCatalogs,
      setAllCatalogs,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </AppContext.Provider>
  );
}
