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
import RecipeList from '../pages/Recipes/RecipeList';
import RecipeDetails from '../pages/Recipes/RecipeDetails';
import WhyMushrooms from '../pages/WhyMushrooms/WhyMushrooms';
import ShopList from '../pages/Shop/ShopList';
import ProductDetails from '../pages/Shop/ProductDetails';
import ComingSoon from '../pages/Shop/ComingSoon';
import AboutUs from '../pages/AboutUs/AboutUs';

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

// Sends /recipes/... (the other spelling) to the same page under /recipies/...
const RecipesSpellingRedirect = () => {
  const { pathname } = useLocation()
  const target = pathname.replace(/^\/recipes/, '/recipies')
  return <Navigate to={target === '/recipies' || target === '/recipies/' ? '/recipies/list' : target} replace />
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
          <Route path="why-mushrooms" element={<WhyMushrooms />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="shop" element={<Navigate to="/shop/list" replace />} />
          <Route path="shop/list" element={<ShopList />} />
          <Route path="shop/details/:id" element={<ProductDetails />} />
          <Route path="shop/coming-soon" element={<ComingSoon />} />
          <Route path="recipies" element={<Navigate to="/recipies/list" replace />} />
          <Route path="recipies/list" element={<RecipeList />} />
          <Route path="recipies/details/:id" element={<RecipeDetails />} />
          <Route path="recipes/*" element={<RecipesSpellingRedirect />} />

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
