import React, { useState } from "react";
import "bulma/css/bulma.min.css";

const GroupJoin: React.FC = () => {
  const [groupData, setGroupData] = useState({
    groupId: "",
    grouppassword: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGroupData({ ...groupData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(groupData);
    // グループ作成処理をここに実装します
  };

  return (
    <div className="container">
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-4">
            <div className="card">
              <p className="card-header-title">グループに参加</p>
              <div className="card-content">
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">グループID</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="groupId"
                        value={groupData.groupId}
                        onChange={handleInputChange}
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
                        value={groupData.grouppassword}
                        onChange={handleInputChange}
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
