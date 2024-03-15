import React from "react";
import "bulma/css/bulma.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface GroupItem {
  id: number;
  name: string;
  type: "managed" | "joined";
}

// モックデータ
const mockData: GroupItem[] = [
  { id: 1, name: "嶋田研究室", type: "managed" },
  { id: 2, name: "生協理事", type: "joined" },
  { id: 3, name: "編入生委員会", type: "joined" },
];

const GroupCreate: React.FC = () => {
  // グループタイプに基づいてリストを分ける
  const managedGroups = mockData.filter(group => group.type === "managed");
  const joinedGroups = mockData.filter(group => group.type === "joined");

  const handleAddGroup = () => {
    // グループ追加処理
    console.log("Add group clicked");
  };

  return (
    <div className="container">
      <section className="section">
        <div className="box">
          <div className="level">
            <div className="level-left">
              <h1 className="title">グループ一覧</h1>
            </div>
            <div className="level-right">
              <button className="button is-primary" onClick={handleAddGroup}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
          <h2 className="title is-4">あなたが管理しているグループ</h2>
          {managedGroups.map(group => (
            <div
              key={group.id}
              className="box"
              style={{ marginBottom: "10px" }}
            >
              {group.name}
            </div>
          ))}
          <h2 className="title is-4" style={{ marginTop: "20px" }}>
            あなたが参加しているグループ
          </h2>
          {joinedGroups.map(group => (
            <div
              key={group.id}
              className="box"
              style={{ marginBottom: "10px" }}
            >
              {group.name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GroupCreate;
