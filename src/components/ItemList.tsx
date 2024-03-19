// import React, { useState } from "react";
// import Footer from "./Footer";
// import "bulma/css/bulma.min.css";

// import { useNavigate } from "react-router-dom";

// interface Item {
//   id: number;
//   name: string;
//   price: number;
//   category: string;
// }

// const items: Item[] = [
//   { id: 1, name: "キムチ", price: 120, category: "おかず" },
//   { id: 2, name: "チョコレート", price: 200, category: "スナック" },
//   // 他のカテゴリや商品を追加
// ];

// interface Item {
//   uuid: string;
//   item_group: ItemGroup;
//   name: string;
//   barcode: string;
//   cost_price: number;
//   selling_price: number;
//   item_thumbnail: ItemThumbnail;
//   created_at: Date;
//   updated_at: Date;
// }

// interface ItemGroup {
//   uuid: string;
//   name: string;
//   color: string;
//   created_at: Date;
//   updated_at: Date;
// }

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

// interface ItemPurchasingHistory {
//   uuid: string;
//   item_expiration_date: ItemExpirationDate;
//   quantity: number;
//   created_at: Date;
//   updated_at: Date;
// }

// const categories = items.reduce((acc: string[], item) => {
//   if (!acc.includes(item.category)) {
//     acc.push(item.category);
//   }
//   return acc;
// }, []);

// const ItemList: React.FC = () => {
//   const [isSortMenuActive, setIsSortMenuActive] = useState(false);
//   const navigate = useNavigate();
//   const handleSortSelection = (sortType: string) => {
//     console.log("Sorting by:", sortType);
//     // 実際にはここで商品リストのソート処理を行います。
//   };
//   // カメラ関連の機能は省略して、カテゴリに分けた商品リストの表示に集中します

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
//                   {/* 商品リスト */}
//                   {categories.map(category => (
//                     <div key={category}>
//                       <h3 className="subtitle">{category}</h3>
//                       {items
//                         .filter(item => item.category === category)
//                         .map(filteredItem => (
//                           <div key={filteredItem.id} className="box">
//                             <article className="media">
//                               <div className="media-left">
//                                 <figure className="image is-64x64">
//                                   {/* 仮の画像表示。適切なimgタグに修正してください */}
//                                   <img
//                                     src="path-to-your-image.png"
//                                     alt={filteredItem.name}
//                                   />
//                                 </figure>
//                               </div>
//                               <div className="media-content">
//                                 <div className="content">
//                                   <p>
//                                     <strong>{filteredItem.name}</strong>{" "}
//                                     <small>{filteredItem.price}円</small>
//                                   </p>
//                                 </div>
//                               </div>
//                             </article>
//                           </div>
//                         ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>
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

// import React, { useState } from "react";
// import Footer from "./Footer";
// import "bulma/css/bulma.min.css";
// import { useNavigate } from "react-router-dom";

// // 各インターフェース定義は省略（既に提供されているため）

// // 仮のデータをコメントアウトまたは削除
// // const items: Item[] = [...];

// // 省略: インターフェイス定義部分

// // APIから取得した商品リストを想定する仮データ
// // 実際にはAPIから取得したデータを使用します

// interface Item {
//   uuid: string;
//   item_group: ItemGroup;
//   name: string;
//   barcode: string;
//   cost_price: number;
//   selling_price: number;
//   item_thumbnail: ItemThumbnail;
//   created_at: Date;
//   updated_at: Date;
// }

// interface ItemGroup {
//   uuid: string;
//   name: string;
//   color: string;
//   created_at: Date;
//   updated_at: Date;
// }

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

// interface ItemPurchasingHistory {
//   uuid: string;
//   item_expiration_date: ItemExpirationDate;
//   quantity: number;
//   created_at: Date;
//   updated_at: Date;
// }
// const items: Item[] = [
//   {
//     uuid: "exampleUuid1",
//     item_group: {
//       uuid: "groupUuid1",
//       name: "おかず",
//       color: "#FFD700", // 例: ゴールド
//       created_at: new Date(),
//       updated_at: new Date(),
//     },
//     name: "キムチ",
//     barcode: "123456789",
//     cost_price: 100,
//     selling_price: 120,
//     item_thumbnail: {
//       uuid: "thumbUuid1",
//       base64: "path-to-your-image.png",
//       created_at: new Date(),
//       updated_at: new Date(),
//     },
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
//   {
//     uuid: "exampleUuid2",
//     item_group: {
//       uuid: "groupUuid2",
//       name: "スナック",
//       color: "#C0C0C0", // 例: シルバー
//       created_at: new Date(),
//       updated_at: new Date(),
//     },
//     name: "チョコレート",
//     barcode: "987654321",
//     cost_price: 180,
//     selling_price: 200,
//     item_thumbnail: {
//       uuid: "thumbUuid2",
//       base64: "path-to-another-image.png",
//       created_at: new Date(),
//       updated_at: new Date(),
//     },
//     created_at: new Date(),
//     updated_at: new Date(),
//   },
// ];

// const ItemList: React.FC = () => {
//   const [isSortMenuActive, setIsSortMenuActive] = useState(false);
//   const navigate = useNavigate();

//   const handleSortSelection = (sortType: string) => {
//     console.log("Sorting by:", sortType);
//     // 実際にはここで商品リストのソート処理を行います。
//   };

//   // カテゴリの一覧を抽出
//   const categories = items.reduce(
//     (acc: { name: string; color: string }[], item) => {
//       const { name, color } = item.item_group;
//       if (!acc.some(category => category.name === name)) {
//         acc.push({ name, color });
//       }
//       return acc;
//     },
//     []
//   );

//   return (
//     <div className="container">
//       <div className="section">
//         <div className="columns is-centered">
//           <div className="column is-half">
//             <div className="card">
//               <div className="card-content">
//                 <div className="content">
//                   <h2 className="title">リストから選択</h2>
//                   {/* 商品リスト */}
//                   {categories.map(({ name, color }) => (
//                     <div key={name}>
//                       <h3
//                         className="subtitle"
//                         style={{ backgroundColor: color }}
//                       >
//                         {name}
//                       </h3>
//                       {items
//                         .filter(item => item.item_group.name === name)
//                         .map(
//                           ({
//                             uuid,
//                             name,
//                             selling_price,
//                             item_thumbnail,
//                             barcode,
//                           }) => (
//                             <div
//                               key={uuid}
//                               className="box"
//                               onClick={() =>
//                                 navigate(`/purchase?barcode=${barcode}`)
//                               }
//                             >
//                               <article className="media">
//                                 <div className="media-left">
//                                   <figure className="image is-64x64">
//                                     <img
//                                       src={`data:image/png;base64,${item_thumbnail.base64}`}
//                                       alt={name}
//                                     />
//                                   </figure>
//                                 </div>
//                                 <div className="media-content">
//                                   <div className="content">
//                                     <p>
//                                       <strong>{name}</strong>{" "}
//                                       <small>{selling_price}円</small>
//                                     </p>
//                                   </div>
//                                 </div>
//                               </article>
//                             </div>
//                           )
//                         )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
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

import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import "bulma/css/bulma.min.css";
import { useNavigate } from "react-router-dom";

// interface Item {
//   uuid: string;
//   item_group: ItemGroup;
//   name: string;
//   barcode: string;
//   cost_price: number;
//   selling_price: number;
//   item_thumbnail: ItemThumbnail;
//   created_at: Date;
//   updated_at: Date;
// }

// interface ItemGroup {
//   uuid: string;
//   name: string;
//   color: string;
//   created_at: Date;
//   updated_at: Date;
// }

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

// interface ItemPurchasingHistory {
//   uuid: string;
//   item_expiration_date: ItemExpirationDate;
//   quantity: number;
//   created_at: Date;
//   updated_at: Date;
// }

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
  // Here we're assuming that you receive an array of ItemGroup objects
  const [itemGroups, setItemGroups] = useState<ItemGroup[]>([]);
  const navigate = useNavigate();

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
          setItemGroups([]); // 空のデータを設定しても良いか、または適切なエラーメッセージを表示する
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
                            navigate(`/purchase?barcode=${item.barcode}`)
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
