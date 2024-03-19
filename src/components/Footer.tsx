import React from "react";
import "bulma/css/bulma.min.css";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    const uuid = localStorage.getItem("selectedGroupUuid");
    if (uuid) {
      navigate(`/GroupHome/${uuid}`);
    } else {
      // Handle the case where there is no UUID stored, for example, navigate to a default page
      navigate("/"); // Adjust this as needed
    }
  };

  return (
    <footer className="my-custom-button  card-footer is-flex is-justify-content-space-around">
      <button className="button" onClick={navigateToHome}>
        ホーム
      </button>
      <button className="button" onClick={() => navigate("/BuyItem")}>
        購入
      </button>
      <button
        className="button"
        onClick={() => navigate("/PurchasingHistories")}
        // Add corresponding onClick handlers when necessary
      >
        購入履歴
      </button>
      <button
        className="button"
        onClick={() => navigate("/Setting")}
        // Add corresponding onClick handlers when necessary
      >
        設定
      </button>
    </footer>
  );
};

export default Footer;
