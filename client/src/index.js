import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { AppContext, AppProvider } from './AppContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; 
import Contact from './pages/Contact';
// // import NotFound from './pages/NotFound';
import About from './pages/About';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './pages/admin/products/ProductList';
import CatalogList from './pages/admin/catalogs/CatalogList';

import CreateProduct from './pages/admin/products/CreateProduct';
// // import { AdminRoute, AuthenticatedUserRoute } from './components/authorization';
import Login from './pages/auth/Login';
import EditProduct from './pages/admin/products/EditProduct';
// import ProductDetails from './pages/admin/products/ProductDetails';
import Products from './pages/Products';
import ProductsCatalogs from './pages/ProductsCatalogs';

import Product from './pages/Product';
import FilteredProducts from './pages/FilteredProducts';
import AlingCatalogs from './catalogs/AlingCatalogs';
import RezerveCatalog from './catalogs/RezerveCatalog';
import CreateCatalog from './pages/admin/catalogs/CreateCatalog';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import EditCatalog from './pages/admin/catalogs/EditCatalog';
import ProductsWithCart from './pages/WebShop/ProductsWithCart';
import NavbarWithCart from './pages/WebShop/NavbarWithCart';
import CartPage from './pages/WebShop/CartPage ';
import ProductWithCart from './pages/WebShop/ProductWithCart';
import Register from './pages/auth/Register';
import CheckoutPage from './pages/WebShop/CheckoutPage';
import LoggedInCheckout from './pages/WebShop/LoggedInCheckout';
import OrdersList from './pages/admin/orders/OrdersList';
import OrderList from './pages/admin/orders/OrdersList';
import UserList from './pages/admin/users/UserList';
import OrderView from './pages/admin/orders/OrderView';
import LogedinRoute from './pages/auth/LogedinRoute';
import Account from './pages/WebShop/Account/Account';
import Orders from './pages/WebShop/Account/Orders';
import ClientOrderView from './pages/WebShop/Account/ClientOrderView';
import EditAccount from './pages/WebShop/Account/EditAccount';
import UserDetails from './pages/admin/users/UserDetails';
 


function App(){

   const { userCredentials } = useContext(AppContext);

  //  {userCredentials ? <Navbar /> : <NavbarWithCart />}
   //{userCredentials ? <NavbarWithCart /> : <Navbar />}

  //  console.log('evo ba kredenca:')
  //  console.log(userCredentials.username)

//   function getStoredCredentials(){

//     // console.log('Evo kredencijala:')
//     let data = localStorage.getItem("credentials")

//     // console.log(data)

//     if(data){
//       let json = JSON.parse(data)
//       return json
//     }
//     return null
//   }

//   const [userCredentials, setUserCredentials] = useState(getStoredCredentials())
//   const [allCatalogs, setAllCatalogs] = useState([]);  


//   useEffect(() => {
 
//     let str = JSON.stringify(userCredentials)
//     localStorage.setItem("credentials", str)
//   }, [userCredentials])

//   // Optional: preload the catalog tree here if desired
// useEffect(() => {
//   fetch("https://prodexmd.ba/api/catalogs/?page=1&perPage=90")
 
//   //fetch("http://localhost:5000/api/catalogs")
//     .then(res => res.json())
//     .then(data => {
//       const sorted = [...data.catalogs].sort((a, b) => a.name.localeCompare(b.name));
//       setAllCatalogs(sorted);
//     })
//     .catch(err => console.error("Failed to fetch catalogs", err));
// }, []);

  return(
    // <AppContext.Provider value={{
    //     userCredentials,
    //     setUserCredentials,
    //     allCatalogs,
    //     setAllCatalogs
    //   }}>
      
         <BrowserRouter>  
           
           {/* <NavbarWithCart/> */}
           
           {userCredentials && userCredentials.username === "prodex123"
              ? <NavbarWithCart />
              : <Navbar />}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                     {/*<Route path="*" element={<NotFound/>}/>
                    <Route path="/pricing" element={<Pricing/>}></Route>*/}
                    <Route path="/about" element={<About/>}></Route>
                    {/* <Route path="/products" element={<Products/>}></Route>  */}
                    <Route path="/productscatalogs/:catalogId/products" element={<Products />} />
                    <Route path="/productscatalogs" element={<ProductsCatalogs/>}></Route> 
                    <Route path="/productscatalogs/:id" element={<ProductsCatalogs />} />
                    <Route path="/filteredproducts" element={<FilteredProducts/>}></Route> 
                    <Route path="/alingcatalog" element={<AlingCatalogs/>}></Route> 
                    <Route path="/rezervnicatalog" element={<RezerveCatalog/>}></Route> 

                     <Route path="/webshopproducts" element={
                       <ProtectedRoute>
                          <ProductsWithCart />
                      </ProtectedRoute>
                    } />
                     <Route path="/cart" element={
                       
                          <CartPage />
                       
                    } />
                     {/* <Route path="/webshopproducts" element={<ProductsWithCart/>}></Route>  */}
                     {/* <Route path="/cart" element={<CartPage/>} /> */}

                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/checkout-logged-in" element={<LoggedInCheckout />} />

                    <Route path="/auth/login" element={<Login/>}/> 


                    <Route path="/admin/catalogs" element={
                       <ProtectedRoute>
                          <CatalogList />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/catalogs/create" element={
                       <ProtectedRoute>
                          <CreateCatalog />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/catalogs/edit/:id" element={
                       <ProtectedRoute>
                          <EditCatalog />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/products/edit/:id" element={
                       <ProtectedRoute>
                          <EditProduct />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/products/create" element={
                       <ProtectedRoute>
                          <CreateProduct />
                      </ProtectedRoute>
                    } />
                   <Route path="/admin/products" element={
                       <ProtectedRoute>
                          <ProductList />
                      </ProtectedRoute>
                    } />

                     <Route path="/admin/orders" element={
                       <ProtectedRoute>
                          <OrderList />
                      </ProtectedRoute>
                    } />
                       <Route path="/admin/users" element={
                       <ProtectedRoute>
                          <UserList />
                      </ProtectedRoute>
                    } />
                     <Route path="/admin/users/:id" element={
                       <ProtectedRoute>
                          <UserDetails />
                      </ProtectedRoute>
                    } />

                    <Route path="/admin/orders/view/:id" element={
                       <ProtectedRoute>
                          <OrderView />
                      </ProtectedRoute>
                    } />

                    <Route path="/account" element={
                       <LogedinRoute>
                          <Account />
                      </LogedinRoute>
                    } />

                    <Route path="/myorders" element={
                       <LogedinRoute>
                          <Orders />
                      </LogedinRoute>
                    } />

   
                    <Route path="/orders/view/:id" element={
                       <LogedinRoute>
                          <ClientOrderView />
                      </LogedinRoute>
                    } />

                    <Route path="/editaccount" element={
                       <LogedinRoute>
                          <EditAccount />
                      </LogedinRoute>
                    } />


                    {/* <Route path="/admin/products/create" element={<AdminRoute><CreateProduct/></AdminRoute>}/> */}
                    {/* <Route path="/admin/products/edit/:id" element={<AdminRoute><EditProduct/></AdminRoute>}/> */}
                   {/* <Route path="/admin/products/edit/:id" element={ <EditProduct/>  }/>  */}

                    <Route path="/products1/:id" element={<ProductWithCart/>}/>
                    
                    <Route path="/products/:id" element={<Product/>}/>

                    <Route path="auth/register" element={<Register />} />
   
                </Routes>  
              <Footer/>
        </BrowserRouter>
    // </AppContext.Provider>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
        <App />
    </AppProvider>
    
  </React.StrictMode>
);
 