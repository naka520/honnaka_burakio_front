import React, { useState } from "react";
import "bulma/css/bulma.min.css";

const GroupCreate: React.FC = () => {
  const [groupData, setGroupData] = useState({
    groupId: "",
    groupName: "",
    groupDesc: "",
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
              <p className="card-header-title">グループを作成する</p>
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
                    <label className="label">グループ名</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="groupName"
                        value={groupData.groupName}
                        onChange={handleInputChange}
                        placeholder="グループ名"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">グループ説明</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="groupDesc"
                        value={groupData.groupDesc}
                        onChange={handleInputChange}
                        placeholder="グループ説明"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <button
                        type="submit"
                        className="button is-dark is-fullwidth"
                      >
                        グループを作成する
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

export default GroupCreate;
