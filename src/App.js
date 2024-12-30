import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Navigation from "./component/Navigation";
import Facilities from "./component/Facilities"; // Đường dẫn tới Facilities
import AddFacilities from "./component/AddFacilities";
import DetailFacilities from "./component/DetailFacilities";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 facility-bg">
        <Header />
        <Navigation />
        <div className="container flex-grow-1 ">
          <Routes>
            <Route path="/" element={<h2 className="text-center mt-4">Welcome to Furama Resort</h2>} />
            <Route path="/facilities" element={<Facilities />} /> {/* Đổi route từ /services sang /facilities */}
            <Route path="/AddFacilities" element = {<AddFacilities />} />
            <Route path="/facilities/ :id" element = {<DetailFacilities />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
