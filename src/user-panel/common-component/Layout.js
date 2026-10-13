import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from './Header';
import Footer from './Footer'
import './Layout.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Home from '../pages/Home/Home';
import ResumePreview from '../pages/ResumePreview/ResumePreview';
import ResumeList from '../pages/ResumeList/ResumeList';
import ContactUs from '../pages/ContactUs/ContactUs';
import ToolsHome from '../pages/ToolsHome/ToolsHome';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import CookiePolicy from '../pages/CookiePolicy/CookiePolicy';
import TermsAndConditions from '../pages/TermsAndConditions/TermsAndConditions';
import InformationSecurityPolicy from '../pages/InformationSecurityPolicy/InformationSecurityPolicy';
import NoPage from '../pages/NoPage/NoPage';

// Scrolls to the top on every new page, or to a section when the link has a #hash
const ScrollManager = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // Wait a moment so the page has rendered before looking for the section
    const timer = setTimeout(() => {
      const target = document.getElementById(hash.slice(1))
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}

const Layout = () => {
  return (
    <>
      <ScrollManager />
      <Header />

      <main className='app-content'>
        <Routes>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="contact-us" element={<ContactUs />} />

          {/* Pages left over from the earlier template, not linked from the menu */}
          <Route path="tools-home" element={<ToolsHome />} />
          <Route path="resume-list" element={<ResumeList />} />
          <Route path="resume-preview/:id" element={<ResumePreview />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="information-security-policy" element={<InformationSecurityPolicy />} />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default Layout
