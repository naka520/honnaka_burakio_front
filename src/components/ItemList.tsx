import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
// Footerコンポーネントのインポートが必要です。

interface ItemThumbnail {
  uuid: string;
  base64: string;
  created_at: string;
  updated_at: string;
}

interface ItemExpirationDate {
  uuid: string;
  item: Item;
  expiration_date: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

interface Item {
  uuid: string;
  item_group: ItemGroup;
  name: string;
  barcode: string;
  cost_price: number;
  selling_price: number;
  item_expiration_dates: ItemExpirationDate[];
  item_thumbnail: ItemThumbnail;
  created_at: string;
  updated_at: string;
}

interface ItemGroup {
  uuid: string;
  name: string;
  color: string;
  items: Item[];
  created_at: string;
  updated_at: string;
}

const ItemList: React.FC = () => {
  const [itemGroups, setItemGroups] = useState<ItemGroup[]>([]);
  const navigate = useNavigate();
  const [isSortMenuActive, setIsSortMenuActive] = useState(false);

  const sortItems = (sortType: string) => {
    // 新しい配列を作成して元のstateを直接変更しない
    const sortedItemGroups = itemGroups.map(group => ({
      ...group,
      items: [...group.items].sort((a, b) => {
        if (sortType === "価格順") {
          return a.selling_price - b.selling_price;
        }
        if (sortType === "消費期限順") {
          if (
            a.item_expiration_dates[0].expiration_date <=
            b.item_expiration_dates[0].expiration_date
          ) {
            if (
              a.item_expiration_dates[0].expiration_date ===
              b.item_expiration_dates[0].expiration_date
            ) {
              return 0;
            }

            return -1;
          } else {
            return 1;
          }
        }
        // 他のソート条件があればここに追加
        return 0;
      }),
    }));

    setItemGroups(sortedItemGroups);
  };

  const handleSortSelection = (sortType: string) => {
    console.log("Sorting by:", sortType);
    sortItems(sortType);
    setIsSortMenuActive(false); // ソートメニューを閉じる
  };

  useEffect(() => {
    const fetchItems = async () => {
      const accessToken = localStorage.getItem("access_token");
      const groupUuid = localStorage.getItem("selectedGroupUuid");

      if (!groupUuid || !accessToken) {
        console.error("Authentication data not found");
        return;
      }

      try {
        const response = await fetch(
          `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupUuid}/item_groups/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch item groups");
        }

        const data = await response.json();
        if (!data || data.length === 0) {
          console.error("No item groups found or data is empty");
          setItemGroups([]); // 空のデータを設定
          return;
        }

        setItemGroups(data); // 正常にデータを設定
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchItems();
  }, []);

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
                          className="dropdown-item"
                          onClick={() => handleSortSelection("価格順")}
                        >
                          価格順
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() => handleSortSelection("消費期限順")}
                        >
                          消費期限順
                        </a>
                      </div>
                    </div>
                  </div>
                  {itemGroups.map(group => (
                    <div key={group.uuid}>
                      <h3
                        className="subtitle"
                        style={{ backgroundColor: group.color }}
                      >
                        {group.name}
                      </h3>
                      {group.items.map(item => (
                        <div
                          key={item.uuid}
                          className="box"
                          onClick={() =>
                            navigate(
                              `/ConfirmPurchasingItem?barcode=${item.barcode}`
                            )
                          }
                        >
                          <article className="media">
                            <div className="media-left">
                              <figure className="image is-64x64">
                                <img
                                  src={`${item.item_thumbnail.base64}`}
                                  alt={item.name}
                                />
                              </figure>
                            </div>
                            <div className="media-content">
                              <div className="content">
                                <p>
                                  <strong>{item.name}</strong>{" "}
                                </p>
                                <p>
                                  <small>{item.selling_price}円</small>
                                </p>
                                <p>
                                  <small>
                                    {Intl.DateTimeFormat("ja-JP").format(
                                      new Date(
                                        item.item_expiration_dates[0].expiration_date
                                      )
                                    )}
                                  </small>
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
              {/* Assuming Footer is a defined component */}
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
