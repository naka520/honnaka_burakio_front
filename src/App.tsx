import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GroupList from "./components/GroupList";
import GroupCreate from "./components/GroupCreate";
import GroupJoin from "./components/GroupJoin";
import GroupHome from "./components/GroupHome";
import BuyItem from "./components/BuyItem";
import ItemEditList from "./components/ItemEditList";
import ItemList from "./components/ItemList";
import ItemManage from "./components/ItemManage";
import PurchasingHistoryList from "./components/PurchasingHistoryList";
import Setting from "./components/Setting";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ConfirmPurchasingItem from "./components/ConfirmPurchasingItem";
import GroupManage from "./components/GroupManage";
import ItemAdd from "./components/ItemAdd";
import ConfirmAddingItem from "./components/ConfirmAddingItem";
import "./Myfont.css";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/GroupList" element={<GroupList />} />
        <Route path="/GroupCreate" element={<GroupCreate />} />
        <Route path="/GroupJoin" element={<GroupJoin />} />
        <Route path="/GroupHome/:uuid" element={<GroupHome />} />
        <Route path="/BuyItem" element={<BuyItem />} />
        <Route
          path="/ConfirmPurchasingItem"
          element={<ConfirmPurchasingItem />}
        />
        <Route path="/ItemList" element={<ItemList />} />
        <Route path="/ItemEditList" element={<ItemEditList />} />
        <Route path="/ItemManage" element={<ItemManage />} />
        <Route
          path="/PurchasingHistoryList"
          element={<PurchasingHistoryList />}
        />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/GroupManage" element={<GroupManage />} />
        <Route path="/ItemAdd" element={<ItemAdd />} />
        <Route path="/ConfirmAddingItem" element={<ConfirmAddingItem />} />
        {/* 以下のコメントアウトされたルートも、必要に応じて修正してください */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        {/* 他のルート */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
