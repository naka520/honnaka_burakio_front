import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Myfont.css";

interface Groups {
  uuid: string;
  groupname: string;
  display_name: string;
  is_administrator: boolean;
  balance: number;
}

const GroupList: React.FC = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Groups[]>([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleAddGroupClick = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const handleCreateGroup = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/GroupCreate");
  };

  const handleJoinGroup = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/GroupJoin");
  };

  const handleGroupClick = (uuid: string) => {
    localStorage.setItem("selectedGroupUuid", uuid);
    navigate(`/GroupHome/${uuid}`);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const endpointUrl =
      "https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/";

    if (!accessToken) {
      navigate("/SignIn");
      return;
    }

    axios
      .get<Groups[]>(endpointUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        setGroups(response.data);
        console.log("GETだぜ！");
        console.log(response.data);
      })
      .catch(error => {
        console.error("API request error:", error);
        navigate("/SignIn");
      });
  }, [navigate]);
  const managedGroups = Array.isArray(groups)
    ? groups.filter(group => group.is_administrator)
    : [];
  const joinedGroups = Array.isArray(groups)
    ? groups.filter(group => !group.is_administrator)
    : [];

  return (
    <div className="container">
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="card">
              <div className="card-content">
                <div className="level-left myComponentClass">
                  <h1 className="title">グループ一覧</h1>
                </div>
                <div className="level-right">
                  <div
                    className={`dropdown ${
                      isDropdownActive ? "is-active" : ""
                    }`}
                  >
                    <div className="dropdown-trigger my-custom-graycolor1">
                      <button
                        className="button my-custom-graycolor1"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                        onClick={handleAddGroupClick}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <div
                      className="dropdown-menu"
                      id="dropdown-menu"
                      role="menu"
                    >
                      <div className="dropdown-content myComponentClass">
                        <a
                          href="#"
                          className="dropdown-item"
                          onClick={handleCreateGroup}
                        >
                          グループを作成する
                        </a>
                        <a
                          href="#"
                          className="dropdown-item myComponentClass"
                          onClick={handleJoinGroup}
                        >
                          グループに参加する
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="myComponentClass">
                  <h2 className="title is-4">あなたが管理しているグループ</h2>
                  {managedGroups.length > 0 ? (
                    managedGroups.map(group => (
                      <div
                        key={group.uuid}
                        className="card my-custom-list"
                        style={{ marginBottom: "10px" }}
                        onClick={() => handleGroupClick(group.uuid)}
                      >
                        <div className="card-content">
                          <p className="title is-5">{group.display_name}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>管理しているグループはありません。</p>
                  )}
                </div>

                <div className="myComponentClass">
                  <h2 className="title is-4">あなたが参加しているグループ</h2>
                  {joinedGroups.length > 0 ? (
                    joinedGroups.map(group => (
                      <div
                        key={group.uuid}
                        className="card my-custom-list"
                        style={{ marginBottom: "10px" }}
                        onClick={() => handleGroupClick(group.uuid)}
                      >
                        <div className="card-content">
                          <p className="title is-5">{group.display_name}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>参加しているグループはありません。</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupList;
