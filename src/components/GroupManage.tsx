import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import "bulma/css/bulma.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface GroupInfo {
  uuid: string;
  groupname: string;
  display_name: string;
  is_administrator: boolean; // trueのみを期待する場合は `true` リテラル型も可能ですが、一般的にはbooleanが適切です。
  balance: number;
  created_at: Date;
  updated_at: Date;
}

const GroupManage: React.FC = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const groupUuid = localStorage.getItem("selectedGroupUuid");
  const [groupInfo, setGroupInfo] = useState<GroupInfo>();
  const endpointUrl = `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupUuid}`;

  const handleEditItemClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/ItemAdd");
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/SignIn");
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
        navigate("/SignIn");
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
                  <h2 className="title">{groupInfo.display_name}を管理</h2>
                  <div className="field">
                    <div className="control">
                      <button
                        type="submit"
                        className="button is-fullwidth is-dark"
                        onClick={handleEditItemClick}
                      >
                        商品を編集する
                      </button>
                    </div>
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

export default GroupManage;
