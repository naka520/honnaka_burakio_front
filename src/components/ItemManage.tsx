import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ColorPicker from './ColorPicker';
import axios from "axios";
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

interface ItemGroupWithoutItem {
    name: string;
    color: string;
}

const ItemManage: React.FC = () => {
  const initialItemGroupWithoutItem:ItemGroupWithoutItem = {
    name:"",
    color:""
  };

  const handleSetItemGroupWithoutItem = (new_name:string,new_color:string) =>{
    const newItemGroupWithoutItem:ItemGroupWithoutItem ={
      name:new_name,
      color:new_color
    };
    setItemGroupWithoutItem(newItemGroupWithoutItem)
  }
  const [itemGroups, setItemGroups] = useState<ItemGroup[]>([]);
  const [itemGroupWithoutItem, setItemGroupWithoutItem] = useState<ItemGroupWithoutItem>(initialItemGroupWithoutItem);
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

  const handleItemDelete = (event: React.FormEvent, itemUuid: string) => {
    event.preventDefault();
    const shouldDelete = window.confirm("本当に削除しますか？");
    if (!shouldDelete) {
      console.log("削除をキャンセルしました");
    } else {

        const accessToken = localStorage.getItem("access_token");
        const groupUuid = localStorage.getItem("selectedGroupUuid");
        const itemDeleteEndpointUrl = 
        `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupUuid}/items/${itemUuid}`;

        if(!accessToken || !groupUuid ||!itemUuid){
            console.error("All fields are required");
            return;
        }

        axios
        .delete(itemDeleteEndpointUrl, {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        })
        .then(response => {
            console.log("Deleteだぜ！");
            console.log(response.data);
            navigate("/SignUp");
        })
        .catch(error => {
            console.error("API request error:", error);
            navigate("/login");
        });
  
      }
    
  }
  //modalまわり
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //ItemGroupMakeまわり

  const handleNameChange = (newName: string) => {
    const newItemGroupWithoutItem: ItemGroupWithoutItem = structuredClone(itemGroupWithoutItem);
    newItemGroupWithoutItem.name = newName;

    setItemGroupWithoutItem(newItemGroupWithoutItem);
  };

  const handleColorChange = (newColor: string) => {
    const newItemGroupWithoutItem: ItemGroupWithoutItem = structuredClone(itemGroupWithoutItem);
    newItemGroupWithoutItem.color = newColor;

    setItemGroupWithoutItem(newItemGroupWithoutItem);

  };

  const handleCreateItemGroupClick = (event:React.FormEvent) =>{
    event.preventDefault();

    const accessToken = localStorage.getItem("access_token");
    const groupUuid = localStorage.getItem("selectedGroupUuid");
    const itemGroupsEndpointUrl=
    `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupUuid}/item_groups/`;

    const requestData = itemGroupWithoutItem;

    axios
    .post(itemGroupsEndpointUrl, requestData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      console.log("POSTだぜ！");
      console.log(response.data);
      navigate("/ItemManage");
      window.location.reload();
    })
    .catch(error => {
      console.error("API request error:", error);
      navigate("/Signin");
    });
  }

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
                  <h2 className="title">リストから編集</h2>
                  <div className="my-custom-button">
                    <button
                      className="my-custom-button button is-fullwidth mt-4"
                      onClick={() => navigate("/BuyItem")}
                    >
                      バーコードのスキャンに戻る
                    </button>
                  </div>
                  <div className="control">
                    <div >
                      
                      <button
                        className="my-custom-button button is-fullwidth mt-4"
                        onClick={openModal}
                      >
                        商品グループの作成
                      </button>
                      
                      
                      <div className={`modal ${isOpen ? "is-active" : ""}`}>
                        <div className="modal-background" onClick={closeModal}></div>
                        <div className="modal-content">
                          <div className="box">
                            <button className="delete" aria-label="close" onClick={closeModal}></button>
                            <div className="field">
                              <label className="label">商品グループ名</label>
                              <div className="control">
                                <input
                                  className="input"
                                  type="text"
                                  placeholder="商品グループ名を入力してください"
                                  value={itemGroupWithoutItem.name}
                                  onChange={(event) => {handleNameChange(event.target.value);}}
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">色を選択</label>
                              <div className="control">
                                <ColorPicker onChange={handleColorChange} />
                              </div>
                            </div>
                            <div className="my-custom-button">
                              <button
                                className="my-custom-button button is-fullwidth mt-4"
                                onClick={handleCreateItemGroupClick}
                              >
                              商品グループを作成する
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                            <div className="media-right">
                                <button 
                                className="delete"
                                onClick={(e) =>handleItemDelete(e, item.uuid)}
                                ></button>
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

export default ItemManage;
