import React from 'react';
import "bulma/css/bulma.min.css";

import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
    const navigate = useNavigate();
    return(
        <footer className="my-custom-button  card-footer is-flex is-justify-content-space-around">
            <button className="button" onClick={() => navigate("/BuyItem")}>
                ホーム
            </button>
            <button className="button" onClick={() => navigate("/BuyItem")}>
                購入
            </button>
            <button
                className="button "
                // onClick={() => navigateToPage("/profile")}
            >
                プロフィール
            </button>
            <button
                className="button"
                // onClick={() => navigateToPage("/settings")}
            >
                設定
            </button>
        </footer>
    )
};

export default Footer;