// import React from "react";
// import Home from "./pages/Home";
// import "./App.css";

// function App() {
//   return <Home />;
// }

// export default App;

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";
import MissionPage from "./pages/MissionPage";
// import Awards from "./pages/Awards";
import BoardOfTrustees from "./pages/BoardOfTrustees";
import MeetOurTrustees from "./pages/MeetOurTrustees";
import GoverningBody from "./pages/GoverningBody";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
// import Donate from "./pages/Donate";
// import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import MediaPage from "./pages/MediaPage";
import ScholarshipApply from "./pages/ScholarshipApply";
import ScholarshipAdminPage from "./pages/admin/ScholarshipAdminPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import StudentProfile from "./pages/StudentProfile";
import ScholarshipInfo from "./pages/ScholarshipInfo";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mission" element={<MissionPage />} />
        {/* <Route path="/awards" element={<Awards />} /> */}
        <Route path="/board-of-trustees" element={<BoardOfTrustees />} />
        <Route path="/about/trustees" element={<MeetOurTrustees />} />
        <Route path="/about/governing-body" element={<GoverningBody />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/media" element={<MediaPage />} />
        {/* <Route path="/donate" element={<Donate />} /> */}
        {/* <Route path="/blog" element={<Blog />} /> */}
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/scholarship/apply" element={<ScholarshipApply />} />
        <Route path="/scholarship-info" element={<ScholarshipInfo />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/scholarships" element={<ScholarshipAdminPage />} />
        <Route path="/profile" element={<StudentProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
