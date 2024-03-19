import React, { useRef, useEffect, useState } from "react";
import Footer from "./Footer";
import "bulma/css/bulma.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface PurchaseItem {
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
  created_at: Date;
  updated_at: Date;
}

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
  item_thumbnail: ItemThumbnail;
  created_at: Date;
  updated_at: Date;
}

interface ItemPurchasing {
  item_expiration_date_uuid: string;
  quantity: number;
}

interface GroupInfo {
  uuid: string;
  groupname: string;
  display_name: string;
  is_administrator: boolean; // trueのみを期待する場合は `true` リテラル型も可能ですが、一般的にはbooleanが適切です。
  balance: number;
  created_at: Date;
  updated_at: Date;
}

const ConfirmPurchasingItem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialItemPurchasing: ItemPurchasing = {
    item_expiration_date_uuid: "",
    quantity: 0,
  };

  const [purchaseItem, setPurchaseItem] = useState<PurchaseItem>();
  const [selectedDate, setSelectedDate] = useState<ItemExpirationDate>();
  const [itemPurchasing, setItemPurchasing] = useState<ItemPurchasing>(
    initialItemPurchasing
  );
  const [groupInfo, setGroupInfo] = useState<GroupInfo>();

  const handleCheckboxChange = (selectedDate: ItemExpirationDate) => {
    setSelectedDate(selectedDate);
    const item: ItemPurchasing = {
      item_expiration_date_uuid: selectedDate.uuid,
      quantity: 0,
    };
    setItemPurchasing(item);
  };

  const handleItemPurchasingQuantityIncrement = (
    itemPurchasing: ItemPurchasing
  ) => {
    const item: ItemPurchasing = {
      item_expiration_date_uuid: itemPurchasing.item_expiration_date_uuid,
      quantity: itemPurchasing.quantity + 1,
    };
    setItemPurchasing(item);
  };

  const handleItemPurchasingQuantityDecrement = (
    itemPurchasing: ItemPurchasing
  ) => {
    const item: ItemPurchasing = {
      item_expiration_date_uuid: itemPurchasing.item_expiration_date_uuid,
      quantity: itemPurchasing.quantity - 1,
    };
    setItemPurchasing(item);
  };

  const purchaseEndpointUrl = `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupInfo?.uuid}/items/purchase`;

  const handleItemPurchasing = (event: React.FormEvent) => {
    console.log({ purchaseEndpoinUrl: purchaseEndpointUrl });

    event.preventDefault();
    if (!itemPurchasing.item_expiration_date_uuid || !itemPurchasing.quantity) {
      console.error("All fields are required");
      return;
    }
    // const requestData: ItemPurchasing = {
    //   item_expiration_date_uuid: itemPurchasing.item_expiration_date_uuid,
    //   quantity: itemPurchasing.quantity
    // };
    const requestData: ItemPurchasing = itemPurchasing;
    console.log({ requestData });
    const accessToken = localStorage.getItem("access_token");
    axios
      .post(purchaseEndpointUrl, requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        console.log("POSTだぜ！");
        console.log(response.data);
        navigate("/PurchasingHistoryList");
      })
      .catch(error => {
        console.error("API request error:", error);
        navigate("/login");
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const groupUuid = localStorage.getItem("selectedGroupUuid");
    const queryParams = new URLSearchParams(location.search);
    const barcode = queryParams.get("barcode");

    console.log({ barcode });
    const barcodeEndpointUrl = `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupUuid}/items/${barcode}`;

    if (!accessToken) {
      navigate("/login");
      return;
    }

    console.log("OK");
    axios
      .get<PurchaseItem>(barcodeEndpointUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        console.log("GETだぜ！");
        setPurchaseItem(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("APIリクエストエラー:", error);
        navigate("/login");
      });
    const balance_endpointUrl = `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupUuid}`;
    axios
      .get<GroupInfo>(balance_endpointUrl, {
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
  }, [navigate]);

  if (!purchaseItem || !groupInfo) {
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
                  <h2 className="title">購入確認</h2>
                  <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-48x48">
                            <img src={purchaseItem.item_thumbnail.base64} />
                          </figure>
                        </div>
                        <div className="media-content">
                          <p className="title is-4">{purchaseItem.name}</p>
                          <p className="subtitle is-6">
                            {purchaseItem.selling_price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <section className="section">
                    <h2 className="subtitle">消費期限を選択</h2>
                    {purchaseItem.item_expiration_dates.map(
                      item_expiration_date => (
                        <div key={item_expiration_date.uuid} className="box">
                          <div className="field">
                            <input
                              id="checkbox"
                              type="checkbox"
                              className="is-checkradio"
                              checked={
                                item_expiration_date.uuid === selectedDate?.uuid
                              }
                              onChange={() =>
                                handleCheckboxChange(item_expiration_date)
                              }
                            />
                            <label>
                              {Intl.DateTimeFormat("ja-JP").format(
                                new Date(item_expiration_date.expiration_date)
                              )}
                            </label>
                          </div>
                        </div>
                      )
                    )}
                  </section>
                  <section className="section">
                    <h2 className="subtitle">数量</h2>
                    <div className="level is-mobile">
                      <div className="lebel-item has-text-left">
                        <button
                          className="button"
                          onClick={() =>
                            handleItemPurchasingQuantityDecrement(
                              itemPurchasing
                            )
                          }
                        >
                          -
                        </button>
                      </div>
                      <div className="lebel-item has-text-centered">
                        <p className="title is-6">{itemPurchasing.quantity}</p>
                      </div>
                      <div className="lebel-item has-text-right">
                        <button
                          className="button"
                          onClick={() =>
                            handleItemPurchasingQuantityIncrement(
                              itemPurchasing
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </section>
                  <div className="level">
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">計</p>
                        <p className="title is-4">
                          ￥
                          {purchaseItem.selling_price * itemPurchasing.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">購入後の残高</p>
                        <p className="title is-4">
                          ￥
                          {groupInfo.balance -
                            purchaseItem.selling_price *
                              itemPurchasing.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="my-custom-button">
                    <button
                      className="my-custom-button button is-fullwidth mt-4"
                      onClick={handleItemPurchasing}
                    >
                      購入する
                    </button>
                  </div>
                  <div className="my-custom-button">
                    <button className="my-custom-button button is-fullwidth mt-4">
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

export default ConfirmPurchasingItem;
