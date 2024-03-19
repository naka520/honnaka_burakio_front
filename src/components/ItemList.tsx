// //元のコード

// import React, { useState, useEffect } from "react";
// import Footer from "./Footer";
// import "bulma/css/bulma.min.css";
// import { useNavigate } from "react-router-dom";

// interface ItemThumbnail {
//   uuid: string;
//   base64: string;
//   created_at: Date;
//   updated_at: Date;
// }

// interface ItemExpirationDate {
//   uuid: string;
//   item: Item;
//   expiration_date: Date;
//   quantity: number;
//   created_at: Date;
//   updated_at: Date;
// }

// interface Item {
//   uuid: string;
//   item_group: ItemGroup;
//   name: string;
//   barcode: string;
//   cost_price: number;
//   selling_price: number;
//   item_expiration_dates: ItemExpirationDate[];
//   item_thumbnail: ItemThumbnail;
//   created_at: Date;
//   updated_at: Date;
// }

// interface ItemGroup {
//   uuid: string;
//   name: string;
//   color: string;
//   items: Item[];
//   created_at: Date;
//   updated_at: Date;
// }

// const ItemList: React.FC = () => {
//   // Here we're assuming that you receive an array of ItemGroup objects
//   const [itemGroups, setItemGroups] = useState<ItemGroup[]>([]);
//   const [isSortMenuActive, setIsSortMenuActive] = useState(false);
//   const navigate = useNavigate();
//   const handleSortSelection = (sortType: string) => {
//     console.log("Sorting by:", sortType);
//     // 実際にはここで商品リストのソート処理を行います。
//   };

//   useEffect(() => {
//     const fetchItems = async () => {
//       const accessToken = localStorage.getItem("access_token");
//       const groupUuid = localStorage.getItem("selectedGroupUuid");

//       if (!groupUuid || !accessToken) {
//         console.error("Authentication data not found");
//         return;
//       }

//       try {
//         const response = await fetch(
//           `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupUuid}/item_groups/`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch item groups");
//         }

//         const data = await response.json();
//         if (!data || data.length === 0) {
//           console.error("No item groups found or data is empty");
//           setItemGroups([]); // 空のデータを設定しても良いか、または適切なエラーメッセージを表示する
//           return;
//         }

//         setItemGroups(data); // 正常にデータを設定
//       } catch (error) {
//         console.error("An error occurred:", error);
//       }
//     };

//     fetchItems();
//   }, []);

//   return (
//     <div className="container">
//       <div className="section">
//         <div className="columns is-centered">
//           <div className="column is-half">
//             <div className="card">
//               <div className="card-content">
//                 <div className="content">
//                   <h2 className="title">リストから選択</h2>
//                   <div className="my-custom-button">
//                     <button
//                       className="my-custom-button button is-fullwidth mt-4"
//                       onClick={() => navigate(-1)}
//                     >
//                       バーコードのスキャンに戻る
//                     </button>
//                   </div>
//                   <div
//                     className={`dropdown ${
//                       isSortMenuActive ? "is-active" : ""
//                     }`}
//                   >
//                     <div className="dropdown-trigger">
//                       <div className="my-custom-button">
//                         <button
//                           className="button"
//                           aria-haspopup="true"
//                           aria-controls="sort-menu"
//                           onClick={() => setIsSortMenuActive(!isSortMenuActive)}
//                         >
//                           ソート
//                           <span className="icon is-small">
//                             <i
//                               className="fas fa-angle-down"
//                               aria-hidden="true"
//                             ></i>
//                           </span>
//                         </button>
//                       </div>
//                     </div>
//                     <div className="dropdown-menu" id="sort-menu" role="menu">
//                       <div className="dropdown-content">
//                         <a
//                           href="#"
//                           className="dropdown-item"
//                           onClick={() => handleSortSelection("価格順")}
//                         >
//                           価格順
//                         </a>
//                         <a
//                           href="#"
//                           className="dropdown-item"
//                           onClick={() => handleSortSelection("人気順")}
//                         >
//                           消費期限順
//                         </a>
//                         {/* 他のソートオプションを追加 */}
//                       </div>
//                     </div>
//                   </div>
//                   {itemGroups.map(group => (
//                     <div key={group.uuid}>
//                       <h3
//                         className="subtitle"
//                         style={{ backgroundColor: group.color }}
//                       >
//                         {group.name}
//                       </h3>
//                       {group.items.map(item => (
//                         <div
//                           key={item.uuid}
//                           className="box"
//                           onClick={() =>
//                             navigate(
//                               `/ConfirmPurchasingItem?barcode=${item.barcode}`
//                             )
//                           }
//                         >
//                           <article className="media">
//                             <div className="media-left">
//                               <figure className="image is-64x64">
//                                 <img
//                                   src={`data:image/png;base64,${item.item_thumbnail.base64}`}
//                                   alt={item.name}
//                                 />
//                               </figure>
//                             </div>
//                             <div className="media-content">
//                               <div className="content">
//                                 <p>
//                                   <strong>{item.name}</strong>{" "}
//                                   <small>{item.selling_price}円</small>
//                                 </p>
//                               </div>
//                             </div>
//                           </article>
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {/* Assuming Footer is a defined component */}
//               <Footer />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemList;

//元のコード

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
// Footerコンポーネントのインポートが必要です。

interface ItemThumbnail {
  uuid: string;
  base64: string;
  created_at: Date;
  updated_at: Date;
}

interface ItemExpirationDate {
  uuid: string;
  item: Item;
  expiration_date: Date;
  quantity: number;
  created_at: Date;
  updated_at: Date;
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
  created_at: Date;
  updated_at: Date;
}

interface ItemGroup {
  uuid: string;
  name: string;
  color: string;
  items: Item[];
  created_at: Date;
  updated_at: Date;
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
                          href="#"
                          className="dropdown-item"
                          onClick={() => handleSortSelection("価格順")}
                        >
                          価格順
                        </a>
                        {/* 他のソートオプションが必要な場合はここに追加 */}
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
                                  src={`data:image/png;base64,${item.item_thumbnail.base64}`}
                                  alt={item.name}
                                />
                              </figure>
                            </div>
                            <div className="media-content">
                              <div className="content">
                                <p>
                                  <strong>{item.name}</strong>{" "}
                                  <small>{item.selling_price}円</small>
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
