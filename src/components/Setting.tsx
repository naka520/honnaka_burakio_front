import React, { useEffect, useState } from "react";
import Footer from './Footer'
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

interface Me {
    uuid: string;
    username: string;
    display_name: string;
    created_at: Date;
    updated_at: Date;
}

interface TopUpBalance {
    topped_up_balance: number
}

const Setting: React.FC = () => {
    const navigate = useNavigate();
    const initialTopUpbalance: TopUpBalance = {
        topped_up_balance: 0
    }
    const [groupInfo, setGroupInfo] = useState<GroupInfo>();
    const [me ,setMe] = useState<Me>();
    const [topUpBalance, setTopUpBalance] = useState<TopUpBalance>(initialTopUpbalance);
    const groupUuid = localStorage.getItem("selectedGroupUuid");
    const accessToken = localStorage.getItem("access_token");


    const [isOpen, setIsOpen] = useState(false);
    const [chargeAmount, setChargeAmount] = useState(0);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleChange = (new_top_up_balance:number) => {
        const charge: TopUpBalance ={
            topped_up_balance: new_top_up_balance
        }
        setTopUpBalance(charge);
    };

    const balanceEndpointUrl =
    `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupUuid}/top_up_balance`;

    const handleTopUpBalance = (event: React.FormEvent) =>{
        closeModal();
        event.preventDefault();
    if (!topUpBalance?.topped_up_balance) {
      console.error("All fields are required");
      return;
    }
    const requestData: TopUpBalance = topUpBalance

    axios
      .post(balanceEndpointUrl, requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        console.log("POSTだぜ！");
        console.log(response.data);
        navigate("/Setting");
        window.location.reload();
      })
      .catch(error => {
        console.error("API request error:", error);
        navigate("/login");
      });
    }

    useEffect(() => {        

        if (!accessToken) {
          navigate("/login");
          return;
        }
    
        const groupEndPointUrl =
        `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me/groups/${groupUuid}`
        axios
          .get<GroupInfo>(groupEndPointUrl, {
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
          const meEndPointUrl =
          `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me`
        axios
            .get<Me>(meEndPointUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(response => {
            setMe(response.data);
            console.log("GETだぜ！");
            console.log(response.data);
          })
          .catch(error => {
            console.error("API request error:", error);
            navigate("/login");
          });
      }, [navigate]);

      if (!groupInfo || !me) {
        return <div>Loading...</div>; // groupInfoがまだない場合はローディングを表示
      }  

      //ページ遷移
      const handleGroupManagementClick = () =>{
        navigate("/GroupManage");
      }

      const handleGroupSignOutClick = () => {
        localStorage.removeItem("selectedGroupUuid");
        navigate("/GroupList")
      }

      const handleGroupWithdrawalClick = () => {
        //あとで
      }

      const handleMeSignOutClick = () => {
        localStorage.removeItem("access_token");
        navigate("/SignIn")
      }

      const withDrawalEndpointUrl =
      `https://brachiocup-honnaka-backend.azurewebsites.net/api/v1/me`;

      const handleAppWithdrawalClick = (event: React.FormEvent) => {
        event.preventDefault();
       

        axios
        .delete(withDrawalEndpointUrl, {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        })
        .then(response => {
            console.log("POSTだぜ！");
            console.log(response.data);
            navigate("/SignUp");
        })
        .catch(error => {
            console.error("API request error:", error);
            navigate("/login");
        });
        }
      


    return (
        <div className="container">
            <div className="section">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="card">
                            <div className="card-content">
                                <div className="content">
                                    <h2 className="title">こんにちは、{me.display_name}さん</h2>
                                    <div className="my-custom-graycolor1 notification  has-text-centered">
                                        <p className="title is-4">あなたの残高</p>
                                        <p className="subtitle is-6">{groupInfo.balance}円</p>
                                        <div className="field">
                                        <div className="control">
                                            <button
                                                className="button is-fullwidth is-dark"
                                                onClick={openModal}
                                            >
                                            チャージする
                                            </button>
                                            <div className={`modal ${isOpen ? "is-active" : ""}`}>
                                                <div className="modal-background" onClick={closeModal}></div>
                                                <div className="modal-content">
                                                    <div className="box">
                                                        <button className="delete" aria-label="close" onClick={closeModal}></button>
                                                        <h2>チャージする金額を入力</h2>
                                                        <input
                                                            className="input"
                                                            type="number"
                                                            value={topUpBalance.topped_up_balance}
                                                            onChange={(e) => handleChange(parseInt(e.target.value))}
                                                        />
                                                        <div className="my-custom-button">
                                                            <button
                                                                className="my-custom-button button is-fullwidth mt-4"
                                                                onClick={handleTopUpBalance}
                                                            >
                                                            チャージする
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    {groupInfo.is_administrator &&
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                type="submit"
                                                className="button is-fullwidth is-dark"
                                                onClick={handleGroupManagementClick}
                                            >
                                            {groupInfo.display_name}を管理する
                                            </button>
                                        </div>
                                    </div>
                                    }
                                    
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                type="submit"
                                                className="button is-fullwidth is-dark"
                                                onClick={handleGroupSignOutClick}
                                            >
                                            {groupInfo.display_name}からサインアウトする
                                            </button>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                type="submit"
                                                className="button is-fullwidth is-dark"
                                                onClick={handleGroupWithdrawalClick}
                                            >
                                            {groupInfo.display_name}から退会する※今は使えません
                                            </button>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                type="submit"
                                                className="button is-fullwidth is-dark"
                                                onClick={handleMeSignOutClick}
                                            >
                                            {me.display_name}からサインアウトする
                                            </button>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button
                                                type="submit"
                                                className="button is-fullwidth is-dark"
                                                onClick={handleAppWithdrawalClick}
                                            >
                                            ちいみせから退会する※今は使えません
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

export default Setting;