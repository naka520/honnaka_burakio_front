import React from "react";
import "bulma/css/bulma.min.css";
import { useNavigate } from "react-router-dom";

interface Item {
  id: number;
  name: string;
  price: number;
  // 商品の画像パスを追加する
  imageUrl: string;
}

const items: Item[] = [
  { id: 1, name: "キムチ", price: 120, imageUrl: "path-to-kimchi-image.png" },
  {
    id: 2,
    name: "チョコレート",
    price: 200,
    imageUrl: "path-to-chocolate-image.png",
  },
];

const GroupHome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  <h2 className="title">グループ名</h2>
                  <div className="my-custom-graycolor1 notification  has-text-centered">
                    <p className="title is-4">あなたの残高</p>
                    <p className="subtitle is-6">1200円</p>
                  </div>
                  {/* 商品リストをカード形式で表示 */}
                  <div className="box">
                    <h2 className="title is-4">あなたにおすすめの商品</h2>
                    {items.map(item => (
                      <div key={item.id} className="media">
                        <figure className="media-left image is-48x48">
                          <img src={item.imageUrl} alt={item.name} />
                        </figure>
                        <div className="media-content">
                          <div className="content">
                            <p className="title is-6">{item.name}</p>
                            <p className="subtitle is-7">{item.price}円</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <footer className="my-custom-button card-footer is-flex is-justify-content-space-around">
                    <button
                      className="button"
                      onClick={() => navigate("/GroupHome")}
                    >
                      ホーム
                    </button>
                    <button
                      className="button"
                      onClick={() => navigate("/BuyItem")}
                    >
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupHome;
