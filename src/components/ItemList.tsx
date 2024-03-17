import React, { useState } from "react";
import "bulma/css/bulma.min.css";

import { useNavigate } from "react-router-dom";

interface Item {
  id: number;
  name: string;
  price: number;
  category: string;
}

const items: Item[] = [
  { id: 1, name: "キムチ", price: 120, category: "おかず" },
  { id: 2, name: "チョコレート", price: 200, category: "スナック" },
  // 他のカテゴリや商品を追加
];

const categories = items.reduce((acc: string[], item) => {
  if (!acc.includes(item.category)) {
    acc.push(item.category);
  }
  return acc;
}, []);

const ItemList: React.FC = () => {
  const [isSortMenuActive, setIsSortMenuActive] = useState(false);
  const navigate = useNavigate();
  const handleSortSelection = (sortType: string) => {
    console.log("Sorting by:", sortType);
    // 実際にはここで商品リストのソート処理を行います。
  };
  // カメラ関連の機能は省略して、カテゴリに分けた商品リストの表示に集中します

  return (
    <div className="container">
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  <h2 className="title">リストから選択</h2>
                  <div className="my-custom-button">
                    <button
                      className="my-custom-button button is-fullwidth mt-4"
                      onClick={() => navigate(-1)}
                    >
                      バーコードのスキャンに戻る
                    </button>
                  </div>
                  <div
                    className={`dropdown ${
                      isSortMenuActive ? "is-active" : ""
                    }`}
                  >
                    <div className="dropdown-trigger">
                      <div className="my-custom-button">
                        <button
                          className="button"
                          aria-haspopup="true"
                          aria-controls="sort-menu"
                          onClick={() => setIsSortMenuActive(!isSortMenuActive)}
                        >
                          ソート
                          <span className="icon is-small">
                            <i
                              className="fas fa-angle-down"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="dropdown-menu" id="sort-menu" role="menu">
                      <div className="dropdown-content">
                        <a
                          href="#"
                          className="dropdown-item"
                          onClick={() => handleSortSelection("価格順")}
                        >
                          価格順
                        </a>
                        <a
                          href="#"
                          className="dropdown-item"
                          onClick={() => handleSortSelection("人気順")}
                        >
                          消費期限順
                        </a>
                        {/* 他のソートオプションを追加 */}
                      </div>
                    </div>
                  </div>
                  {/* 商品リスト */}
                  {categories.map(category => (
                    <div key={category}>
                      <h3 className="subtitle">{category}</h3>
                      {items
                        .filter(item => item.category === category)
                        .map(filteredItem => (
                          <div key={filteredItem.id} className="box">
                            <article className="media">
                              <div className="media-left">
                                <figure className="image is-64x64">
                                  {/* 仮の画像表示。適切なimgタグに修正してください */}
                                  <img
                                    src="path-to-your-image.png"
                                    alt={filteredItem.name}
                                  />
                                </figure>
                              </div>
                              <div className="media-content">
                                <div className="content">
                                  <p>
                                    <strong>{filteredItem.name}</strong>{" "}
                                    <small>{filteredItem.price}円</small>
                                  </p>
                                </div>
                              </div>
                            </article>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
              {/* ナビゲーションボタン */}
              <footer className="my-custom-button  card-footer is-flex is-justify-content-space-around">
                <button
                  className="button"
                  onClick={() => navigate("/GroupHome")}
                >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
