import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import "bulma/css/bulma.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GroupJoin from "./GroupJoin";

// interface Item {
//   id: number;
//   name: string;
//   price: number;
//   // 商品の画像パスを追加する
//   imageUrl: string;
// }

// const items: Item[] = [
//   { id: 1, name: "キムチ", price: 120, imageUrl: "path-to-kimchi-image.png" },
//   {
//     id: 2,
//     name: "チョコレート",
//     price: 200,
//     imageUrl: "path-to-chocolate-image.png",
//   },
// ];

interface GroupInfo {
  uuid: string;
  groupname: string;
  display_name: string;
  is_administrator: boolean; // trueのみを期待する場合は `true` リテラル型も可能ですが、一般的にはbooleanが適切です。
  balance: number;
  created_at: Date;
  updated_at: Date;
}

interface ItemThumbnail {
  uuid: string;
  base64: string;
  created_at: string;
  updated_at: string;
}

interface ItemGroup {
  uuid: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

interface ItemExpirationDate {
  uuid: string;
  item: Item; // Item は再帰的に参照されるため、後で定義
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

// 最終的には、Item オブジェクトの配列を受け取ることを想定する
// そのため、Item[] 型を利用する場所（APIのレスポンスなど）でこれを使用します
type Items = Item[];

const GroupHome: React.FC = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const groupUuid = localStorage.getItem("selectedGroupUuid");
  const [groupInfo, setGroupInfo] = useState<GroupInfo>();
  const endpointUrl = `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupUuid}`;
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }

    axios
      .get<GroupInfo>(endpointUrl, {
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

    const itemsEndpointUrl = `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupUuid}/items/recommended?size=10`; // アイテム情報のエンドポイント
    axios
      .get<Item[]>(itemsEndpointUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("API request error:", error);
      });
  }, [navigate]);

  if (!groupInfo) {
    return <div>Loading...</div>; // groupInfoがまだない場合はローディングを表示
  }
  return (
    <div className="container">
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  <h2 className="title">{groupInfo.display_name}</h2>
                  <div className="my-custom-graycolor1 notification  has-text-centered">
                    <p className="title is-4">あなたの残高</p>
                    <p className="subtitle is-6">{groupInfo.balance}</p>
                  </div>
                  {/* 商品リストをカード形式で表示 */}
                  <div className="box">
                    <h2 className="title is-4">あなたにおすすめの商品</h2>
                    {items.length > 0 ? (
                      items.map(item => (
                        <div key={item.uuid} className="media">
                          <div className="media-content">
                            <div className="content">
                              <p className="title is-6">{item.name}</p>
                              <p className="subtitle is-7">
                                {item.selling_price}円
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>おすすめの商品がありません。</p>
                    )}
                  </div>
                  <Footer />
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
