import React, { useRef, useEffect, useState } from "react";
import Footer from './Footer'
import "bulma/css/bulma.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
// };

// interface ItemGroup {
//   uuid: string;
//   name: string;
//   color: string;
//   created_at: Date;
//   updated_at: Date;
// };

// interface ItemThumbnail {
//   uuid: string;
//   base64: string;
//   created_at: Date;
//   updated_at: Date;
// };

// interface ItemExpirationDate {
//   uuid: string;
//   expiration_date: Date;
//   quantity: number;
//   created_at: Date;
//   updated_at: Date;
// };

interface NewItem {
  item_group_uuid: string;
  name: string;
  barcode: string;
  cost_price: number;
  selling_price: number;
  new_item_expiration_dates: NewItemExpirationDate[];
  new_item_thumbnail: NewItemThumbnail;
};

interface NewItemExpirationDate {
  expiration_date: string;
  quantity: number;
};

interface NewItemThumbnail {
  base64: string;
};

interface ItemGroup {
  uuid: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
};

interface GroupInfo {
  uuid: string;
  groupname: string;
  display_name: string;
  is_administrator: boolean; // trueのみを期待する場合は `true` リテラル型も可能ですが、一般的にはbooleanが適切です。
  balance: number;
  created_at: string;
  updated_at: string;
}


const ConfirmAddingItem: React.FC = () => {
  const navigate = useNavigate();

  const initializedNewItem: NewItem = {
    item_group_uuid: "",
    name: "",
    barcode: "",
    cost_price: 0,
    selling_price: 0,
    new_item_expiration_dates: [
      {
        expiration_date: "",
        quantity: 0
      }
    ],
    new_item_thumbnail: {
      base64: ""
    }
  };

  // const [item, setItem] = useState<Item>();
  const [newItem, setNewItem] = useState<NewItem>(initializedNewItem);
  const [groupInfo, setGroupInfo] = useState<GroupInfo>();
  const [itemGroups, setItemGroups] = useState<ItemGroup[]>();
  const [selectedItemGroup, setSelectedItemGroup] = useState<ItemGroup>();

  const handleCheckboxChange = (selectedItemGroup: ItemGroup) => {
    setSelectedItemGroup(selectedItemGroup);

    const _newItem: NewItem = {
      item_group_uuid: selectedItemGroup.uuid,
      name: newItem.name,
      barcode: newItem.barcode,
      cost_price: newItem.cost_price,
      selling_price: newItem.selling_price,
      new_item_expiration_dates: [
        {
          expiration_date: newItem.new_item_expiration_dates[0].expiration_date,
          quantity: newItem.new_item_expiration_dates[0].quantity
        }
      ],
      new_item_thumbnail: {
        base64: newItem.new_item_thumbnail.base64
      }
    }

    setNewItem(_newItem);
  };

  const handleNameChange = (newName: string) => {
    const _newItem: NewItem = {
      item_group_uuid: newItem.item_group_uuid,
      name: newName,
      barcode: newItem.barcode,
      cost_price: newItem.cost_price,
      selling_price: newItem.selling_price,
      new_item_expiration_dates: [
        {
          expiration_date: newItem.new_item_expiration_dates[0].expiration_date,
          quantity: newItem.new_item_expiration_dates[0].quantity
        }
      ],
      new_item_thumbnail: {
        base64: newItem.new_item_thumbnail.base64
      }
    }

    setNewItem(_newItem);
  };

  const handleCostPriceChange = (newCostPrice: number) => {
    const _newItem: NewItem = {
      item_group_uuid: newItem.item_group_uuid,
      name: newItem.name,
      barcode: newItem.barcode,
      cost_price: newCostPrice,
      selling_price: newItem.selling_price,
      new_item_expiration_dates: [
        {
          expiration_date: newItem.new_item_expiration_dates[0].expiration_date,
          quantity: newItem.new_item_expiration_dates[0].quantity
        }
      ],
      new_item_thumbnail: {
        base64: newItem.new_item_thumbnail.base64
      }
    }

    setNewItem(_newItem);
  };

  const handleSellingPriceChange = (newSellingPrice: number) => {
    const _newItem: NewItem = {
      item_group_uuid: newItem.item_group_uuid,
      name: newItem.name,
      barcode: newItem.barcode,
      cost_price: newItem.cost_price,
      selling_price: newSellingPrice,
      new_item_expiration_dates: [
        {
          expiration_date: newItem.new_item_expiration_dates[0].expiration_date,
          quantity: newItem.new_item_expiration_dates[0].quantity
        }
      ],
      new_item_thumbnail: {
        base64: newItem.new_item_thumbnail.base64
      }
    }

    setNewItem(_newItem);
  };

  const handleExpirationDateChange = (newExpirationDate: string) => {
    const _newItem: NewItem = {
      item_group_uuid: newItem.item_group_uuid,
      name: newItem.name,
      barcode: newItem.barcode,
      cost_price: newItem.cost_price,
      selling_price: newItem.selling_price,
      new_item_expiration_dates: [
        {
          expiration_date: newExpirationDate,
          quantity: newItem.new_item_expiration_dates[0].quantity
        }
      ],
      new_item_thumbnail: {
        base64: newItem.new_item_thumbnail.base64
      }
    }

    setNewItem(_newItem);
  };

  const handleQuantityIncrement = (newItem: NewItem) => {
    const _newItem: NewItem = {
      item_group_uuid: newItem.item_group_uuid,
      name: newItem.name,
      barcode: newItem.barcode,
      cost_price: newItem.cost_price,
      selling_price: newItem.selling_price,
      new_item_expiration_dates: [
        {
          expiration_date: newItem.new_item_expiration_dates[0].expiration_date,
          quantity: newItem.new_item_expiration_dates[0].quantity + 1
        }
      ],
      new_item_thumbnail: {
        base64: newItem.new_item_thumbnail.base64
      }
    }

    setNewItem(_newItem);
  };

  const handleQuantityDecrement = (newItem: NewItem) => {
    const _newItem: NewItem = {
      item_group_uuid: newItem.item_group_uuid,
      name: newItem.name,
      barcode: newItem.barcode,
      cost_price: newItem.cost_price,
      selling_price: newItem.selling_price,
      new_item_expiration_dates: [
        {
          expiration_date: newItem.new_item_expiration_dates[0].expiration_date,
          quantity: newItem.new_item_expiration_dates[0].quantity - 1
        }
      ],
      new_item_thumbnail: {
        base64: newItem.new_item_thumbnail.base64
      }
    }

    setNewItem(_newItem);
  };

  const itemEndpointUrl = `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupInfo?.uuid}/items/`;

  const handleItemAdding = (event: React.FormEvent) => {
    event.preventDefault();

    const requestData: NewItem = newItem;
    const accessToken = localStorage.getItem("access_token");
    axios
      .post(itemEndpointUrl, requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        console.log("POSTだぜ！");
        console.log(response.data);
        navigate("/GroupManage");
      })
      .catch(error => {
        console.error("API request error:", error);
        navigate("/login");
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const groupUuid = localStorage.getItem("selectedGroupUuid");
    const barcode = localStorage.getItem("barcode");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    const groupEndpointUrl =
    `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupUuid}`
    axios
      .get<GroupInfo>(groupEndpointUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        setGroupInfo(response.data);
        console.log("GETだぜ！");
        console.log(response.data);
      })
      .catch(error => {
        console.error("API request error:", error);
        navigate("/login");
      });

      const itemGroupsEndpointUrl = `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupUuid}/item_groups/`;
      axios
        .get<ItemGroup[]>(itemGroupsEndpointUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(response => {
          setItemGroups(response.data);
        })
        .catch(error => {
          console.error("API request error:", error);
          navigate("/login");
        });
  }, [navigate]);

  if (!groupInfo || !itemGroups) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  <h2 className="title">追加する商品を確認</h2>
                  <section className="section">
                    <h2 className="subtitle">商品グループを選択</h2>
                    {itemGroups.map(itemGroup => (
                      <div key={itemGroup.uuid} className="box">
                        <div className="field">
                          <input
                            id="checkbox"
                            type="checkbox"
                            className="is-checkradio"
                            checked={itemGroup.uuid == selectedItemGroup?.uuid}
                            onChange={() => handleCheckboxChange(itemGroup)}
                          />
                          <label>{itemGroup.name}</label>
                        </div>
                      </div>
                    ))}
                  </section>
                  <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-48x48">

                          </figure>
                        </div>
                        <div className="media-content">
                          <input
                            className="input"
                            type="text"
                            name="name"
                            value={newItem.name}
                            onChange={e => {handleNameChange(e.target.value);}}
                            placeholder="商品名"
                          />
                          <input
                            className="input"
                            type="number"
                            name="cost_price"
                            value={newItem.cost_price}
                            onChange={e => {handleCostPriceChange(Number(e.target.value));}}
                            placeholder="原価"
                          />
                          <input
                            className="input"
                            type="number"
                            name="selling_price"
                            value={newItem.selling_price}
                            onChange={e => {handleSellingPriceChange(Number(e.target.value));}}
                            placeholder="売価"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <section className="section">
                    <h2 className="subtitle">消費期限</h2>
                    <input
                      className="input"
                      type="date"
                      name="item_expiration_date"
                      value={newItem.new_item_expiration_dates[0].expiration_date}
                      onChange={e => {handleExpirationDateChange(e.target.value);}}
                      placeholder="消費期限"
                    />
                  </section>
                  <section className="section">
                    <h2 className="subtitle">数量</h2>
                    <div className="level">
                      <div className="lebel-item has-text-left">
                        <button className="button" onClick={()=>handleQuantityDecrement(newItem)}>-</button>
                      </div>
                      <div className="lebel-item has-text-centered">
                        <p className="title is-6">{newItem.new_item_expiration_dates[0].quantity}</p>
                      </div>
                      <div className="lebel-item has-text-right">
                        <button className="button" onClick={()=>handleQuantityIncrement(newItem)}>+</button>
                      </div>
                    </div>
                  </section>
                  <div className="level">
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">計</p>
                        <p className="title is-4">￥{newItem.selling_price * newItem.new_item_expiration_dates[0].quantity}</p>
                      </div>
                    </div>
                  </div>
                  <div className="my-custom-button">
                    <button
                      className="my-custom-button button is-fullwidth mt-4"
                      onClick={handleItemAdding}
                    >
                      追加する
                    </button>
                  </div>
                  <div className="my-custom-button">
                    <button
                      className="my-custom-button button is-fullwidth mt-4"
                    >
                      戻る
                    </button>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAddingItem;
