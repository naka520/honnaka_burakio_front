import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GroupList from "./components/GroupList";
import GroupCreate from "./components/GroupCreate";
import GroupJoin from "./components/GroupJoin";
import GroupHome from "./components/GroupHome";
import BuyItem from "./components/BuyItem";
import ItemEditList from "./components/ItemEditList"
import ItemList from "./components/ItemList";
import PurchasingHistory from "./components/PurchasingHistory";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/GroupList" element={<GroupList />} />
        <Route path="/GroupCreate" element={<GroupCreate />} />
        <Route path="/GroupJoin" element={<GroupJoin />} />
        <Route path="/GroupHome" element={<GroupHome />} />
        <Route path="/BuyItem" element={<BuyItem />} />
        <Route path="/ItemList" element={<ItemList />} />
        <Route path="/ItemEditList" element={<ItemEditList />} />
        <Route path="/PurchasingHistories" element={<PurchasingHistory />}/>
        {/* 以下のコメントアウトされたルートも、必要に応じて修正してください */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        {/* 他のルート */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
