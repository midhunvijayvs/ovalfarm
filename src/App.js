import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { LanguageProvider } from "./i18n/LanguageContext"
import { CustomerProvider } from "./customer/CustomerContext"
import { CartProvider } from "./customer/CartContext"




import UserLayout from "./user-panel/common-component/Layout"

function App() {




  return (


    <div className="App">

      <Router>
        <LanguageProvider>
        <CustomerProvider>
        <CartProvider>
          <Routes>

            <Route path="/*" element={<UserLayout />} />
          </Routes>
        </CartProvider>
        </CustomerProvider>
        </LanguageProvider>
      </Router>


    </div>

  );
}

export default App;
