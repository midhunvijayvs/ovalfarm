import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { UserProvider } from "./authentication/pages/UserContext"
import { LanguageProvider } from "./i18n/LanguageContext"
import { CustomerProvider } from "./customer/CustomerContext"
import { CartProvider } from "./customer/CartContext"




import UserLayout from "./user-panel/common-component/Layout"
import AdminLayout from "./admin-panel/common-components/Layout"

import SignUp from './authentication/pages/SignUp';
import Login from './authentication/pages/Login';
import EmailConfirmation from './authentication/pages/EmailConfirmation';
import EmailConfirmed from './authentication/pages/EmailConfirmed';
import ForgotPassword from './authentication/pages/ForgotPassword';

import NewPassword from './authentication/pages/NewPassword';
import PasswordChanged from './authentication/pages/PasswordChanged';
import LandingPage from "./landing-page/LandingPage";
import AuthenticationPrivacyPolicy from "./authentication/pages/PrivacyPolicy";
import LandingPrivacyPolicy from "./landing-page/privacy-policy/PrivacyPolicy";






function App() {




  return (


    <div className="App">

      <Router>
        <LanguageProvider>
        <UserProvider>
        <CustomerProvider>
        <CartProvider>
          <Routes>

            <Route path="/*" element={<UserLayout />} />

            <Route exact path="/admin/*" element={<AdminLayout />} />




            <Route exact path="/admin-login/*" element={
              <>
                {localStorage.setItem("userRoleRequest", "admin")}
                <Navigate to="/login" />
              </>
            } />



            <Route path="login" element={<Login />} />
            <Route exact path="/login/*" element={
              <>
                {localStorage.setItem("userRoleRequest", "user")}
                <Navigate to="/login" />
              </>
            } />
            <Route path="sign-up" element={<SignUp />} />
            

          <Route path="/confirm-mail" element={<EmailConfirmation />} />
             <Route path="/mail-confirmed" element={<EmailConfirmed />} /> 
            <Route path="/forgot-password" element={<ForgotPassword />} /> 
            <Route path="/password-reset/confirm/*" element={<NewPassword />} />
            <Route path="/password-changed" element={<PasswordChanged />} />
            <Route path="/authentication-privacy-policy" element={<AuthenticationPrivacyPolicy/>} />


            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/landing-page-privacy-policy" element={<LandingPrivacyPolicy />} />

          </Routes>
        </CartProvider>
        </CustomerProvider>
        </UserProvider>
        </LanguageProvider>
      </Router>


    </div>

  );
}

export default App;
