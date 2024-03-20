import React, { useRef, useEffect, useState } from "react";
import Footer from "./Footer";
import "bulma/css/bulma.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

interface ItemPurchasingHistory {
  uuid: string;
  item_expiration_date: ItemExpirationDate;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

const PurchasingHistoryList: React.FC = () => {
  const navigate = useNavigate();
  const [itemPurchasingHistories, setItemPurchasingHistories] = useState<
    ItemPurchasingHistory[]
  >([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const groupUuid = localStorage.getItem("selectedGroupUuid");
    const endpointUrl = `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupUuid}/item_purchasing_histories/`;

    if (!accessToken) {
      navigate("/SignIn");
      return;
    }

    axios
      .get<ItemPurchasingHistory[]>(endpointUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        const fetchedItemPurchasingHistories = response.data || [];
        setItemPurchasingHistories(fetchedItemPurchasingHistories);
        console.log(fetchedItemPurchasingHistories);
      })
      .catch(error => {
        console.error("APIリクエストエラー:", error);
        navigate("/SignIn");
      });
  }, [navigate]);

  const purchaseDates = Array.isArray(itemPurchasingHistories)
    ? itemPurchasingHistories.reduce((acc: string[], itemPurchasingHistory) => {
        const formattedDate = Intl.DateTimeFormat("ja-JP").format(
          new Date(itemPurchasingHistory.created_at)
        );
        if (!acc.includes(formattedDate)) {
          acc.push(formattedDate);
        }
        return acc;
      }, [])
    : [];

  return (
    <div className="container">
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-half ">
            <div className="card">
              <div className="card-content">
                <div className="level-left">
                  <h1 className="title">購入履歴</h1>
                </div>
                {purchaseDates.map((created_at: string) => (
                  <div key={created_at}>
                    <h3 className="subtitle">{created_at}</h3>
                    {itemPurchasingHistories
                      .filter(
                        itemPurchasingHistory =>
                          Intl.DateTimeFormat("ja-JP").format(
                            new Date(itemPurchasingHistory.created_at)
                          ) === created_at
                      )
                      .map(filteredItemPurchasingHistory => (
                        <div
                          key={filteredItemPurchasingHistory.uuid}
                          className="box"
                        >
                          <article className="media">
                            <div className="media-left">
                              <figure className="image is-64x64">
                                {/* 仮の画像表示。適切なimgタグに修正してください */}
                                <img
                                  src={
                                    filteredItemPurchasingHistory
                                      .item_expiration_date.item.item_thumbnail
                                      .base64
                                  }
                                  alt={
                                    filteredItemPurchasingHistory
                                      .item_expiration_date.item.name
                                  }
                                />
                              </figure>
                            </div>
                            <div className="media-content">
                              <div className="content">
                                <p>
                                  <strong>
                                    {
                                      filteredItemPurchasingHistory
                                        .item_expiration_date.item.name
                                    }
                                  </strong>{" "}
                                  <small>
                                    {
                                      filteredItemPurchasingHistory
                                        .item_expiration_date.item.selling_price
                                    }
                                    円
                                  </small>
                                  {/* <small>{filteredItemPurchasingHistory.item_expiration_date.uuid}円</small> */}
                                </p>
                              </div>
                            </div>
                          </article>
                        </div>
                      ))}
                  </div>
                ))}
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PurchasingHistoryList;
