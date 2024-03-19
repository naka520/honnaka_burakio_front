import React, { useState, useEffect } from "react";
import "bulma/css/bulma.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Groups {
  groupname: string;
  password: string;
}

const GroupJoin: React.FC = () => {
  const navigate = useNavigate();
  const [groupname, setGroupname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [groups, setGroups] = useState<Groups[]>([]);
  const EndpoinUrl =
    "https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/signin";

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
    }
  }, [navigate]);

  const handlechange = (event: React.FormEvent) => {
    event.preventDefault();
    if (!groupname || !password) {
      console.error("All fields are required");
      return;
    }
    const requestData: Groups = {
      groupname: groupname,
      password: password,
    };
    const accessToken = localStorage.getItem("access_token");
    axios
      .post(EndpoinUrl, requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        setGroups(response.data);
        console.log("POSTだぜ！");
        console.log(response.data);
        navigate("/GroupList");
      })
      .catch(error => {
        console.error("API request error:", error);
        navigate("/login");
      });
  };

  return (
    <div className="container">
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-4">
            <div className="card">
              <p className="card-header-title">グループに参加</p>
              <div className="card-content">
                <form onSubmit={handlechange}>
                  <div className="field">
                    <label className="label">グループID</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="groupId"
                        value={groupname}
                        onChange={e => {
                          setGroupname(e.target.value);
                        }}
                        placeholder="グループID"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">パスワード</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="groupName"
                        value={password}
                        onChange={e => {
                          setPassword(e.target.value);
                        }}
                        placeholder="パスワード"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <button
                        type="submit"
                        className="button is-dark is-fullwidth"
                      >
                        グループに参加する
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupJoin;
