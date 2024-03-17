import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopPage from "./components/TopPage";
import GroupList from "./components/GroupList";
import GroupCreate from "./components/GroupCreate";
import GroupJoin from "./components/GroupJoin";
import GroupHome from "./components/GroupHome";
import BuyItem from "./components/BuyItem";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/GroupList" element={<GroupList />} />
        <Route path="/GroupCreate" element={<GroupCreate />} />
        <Route path="/GroupJoin" element={<GroupJoin />} />
        <Route path="/GroupHome" element={<GroupHome />} />
        <Route path="/BuyItem" element={<BuyItem />} />
        {/* 以下のコメントアウトされたルートも、必要に応じて修正してください */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        {/* 他のルート */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
