import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopPage from "./components/TopPage";
import GroupList from "./components/GroupList";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/GroupList" element={<GroupList />} />
        {/* 以下のコメントアウトされたルートも、必要に応じて修正してください */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        {/* 他のルート */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
