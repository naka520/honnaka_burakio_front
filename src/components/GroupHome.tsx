import React from "react";
import "bulma/css/bulma.min.css";

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
  const navigateToPage = (path: string) => {
    // React RouterのuseNavigateを使うか、window.locationを使ってページを移動します。
    console.log("Navigating to:", path);
  };
  return (
    <div className="container">
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  <h2 className="title">グループ名</h2>
                  <div className="notification is-primary has-text-centered">
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
                  <footer className="card-footer">
                    <div className="card-footer-item">
                      <button
                        className="button is-link is-fullwidth"
                        onClick={() => navigateToPage("/home")}
                      >
                        ホーム
                      </button>
                    </div>
                    <div className="card-footer-item">
                      <button
                        className="button is-link is-fullwidth"
                        onClick={() => navigateToPage("/explore")}
                      >
                        購入
                      </button>
                    </div>
                    <div className="card-footer-item">
                      <button
                        className="button is-link is-fullwidth"
                        onClick={() => navigateToPage("/profile")}
                      >
                        プロフィール
                      </button>
                    </div>
                    <div className="card-footer-item">
                      <button
                        className="button is-link is-fullwidth"
                        onClick={() => navigateToPage("/settings")}
                      >
                        設定
                      </button>
                    </div>
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
