// import React from "react";
// import "bulma/css/bulma.min.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

// interface GroupItem {
//   id: number;
//   name: string;
//   type: "managed" | "joined";
// }

// // モックデータ
// const mockData: GroupItem[] = [
//   { id: 1, name: "嶋田研究室", type: "managed" },
//   { id: 2, name: "生協理事", type: "joined" },
//   { id: 3, name: "編入生委員会", type: "joined" },
// ];

// const GroupList: React.FC = () => {
//   // グループタイプに基づいてリストを分ける
//   const managedGroups = mockData.filter(group => group.type === "managed");
//   const joinedGroups = mockData.filter(group => group.type === "joined");

//   const handleAddGroup = () => {
//     // グループ追加処理
//     console.log("Add group clicked");
//   };

//   return (
//     <div className="container">
//       <section className="section">
//         <div className="box">
//           <div className="level">
//             <div className="level-left">
//               <h1 className="title">グループ一覧</h1>
//             </div>
//             <div className="level-right">
//               <button className="button is-primary" onClick={handleAddGroup}>
//                 <FontAwesomeIcon icon={faPlus} />
//               </button>
//             </div>
//           </div>
//           <h2 className="title is-4">あなたが管理しているグループ</h2>
//           {managedGroups.map(group => (
//             <div
//               key={group.id}
//               className="box"
//               style={{ marginBottom: "10px" }}
//             >
//               {group.name}
//             </div>
//           ))}
//           <h2 className="title is-4" style={{ marginTop: "20px" }}>
//             あなたが参加しているグループ
//           </h2>
//           {joinedGroups.map(group => (
//             <div
//               key={group.id}
//               className="box"
//               style={{ marginBottom: "10px" }}
//             >
//               {group.name}
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default GroupList;

import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
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

const GroupList: React.FC = () => {
  const navigate = useNavigate();
  // グループタイプに基づいてリストを分ける
  const managedGroups = mockData.filter(group => group.type === "managed");
  const joinedGroups = mockData.filter(group => group.type === "joined");

  const handleAddGroup = () => {
    // グループ追加処理
    console.log("Add group clicked");
  };
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const handleAddGroupClick = () => {
    // ドロップダウンの表示状態を切り替える
    setIsDropdownActive(!isDropdownActive);
  };

  const handleCreateGroup = (event: React.MouseEvent) => {
    // デフォルトのイベントをキャンセル
    event.preventDefault();
    // グループ作成ページに遷移
    console.log("グループを作成する clicked");
    navigate("/GroupCreate");
    // ページ遷移のロジックをここに実装します。
  };

  const handleJoinGroup = (event: React.MouseEvent) => {
    // デフォルトのイベントをキャンセル
    event.preventDefault();
    // グループ参加ページに遷移
    console.log("グループに参加する clicked");
    navigate("/GroupJoin");
    // ページ遷移のロジックをここに実装します。
  };

  return (
    <div className="container">
      <section className="section">
        <div className="columns is-centered">
          <div className=" column is-half my-custom-background">
            <div className="level">
              <div className="level-left">
                <h1 className="title">グループ一覧</h1>
              </div>
              <div className="level-right">
                <div
                  className={`dropdown ${isDropdownActive ? "is-active" : ""}`}
                >
                  <div className="dropdown-trigger">
                    <button
                      className="button my-custom-graycolor1"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                      onClick={handleAddGroupClick}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                      <a
                        href="#"
                        className="dropdown-item"
                        onClick={handleCreateGroup}
                      >
                        グループを作成する
                      </a>
                      <a
                        href="#"
                        className="dropdown-item"
                        onClick={handleJoinGroup}
                      >
                        グループに参加する
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="title is-4">あなたが管理しているグループ</h2>
              {managedGroups.map(group => (
                <div
                  key={group.id}
                  className="card my-custom-list"
                  style={{ marginBottom: "10px" }}
                >
                  <div className="card-content">{group.name}</div>
                </div>
              ))}
            </div>
            <div>
              <h2 className="title is-4" style={{ marginTop: "20px" }}>
                あなたが参加しているグループ
              </h2>
              {joinedGroups.map(group => (
                <div
                  key={group.id}
                  className="card my-custom-list"
                  style={{ marginBottom: "10px" }}
                >
                  <div className="card-content">{group.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupList;
